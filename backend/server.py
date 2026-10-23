import logging
import os
import uuid
from datetime import datetime, timezone
from pathlib import Path

import httpx
from dotenv import load_dotenv
from fastapi import APIRouter, FastAPI, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr, Field
from starlette.middleware.cors import CORSMiddleware

load_dotenv(Path(__file__).parent / ".env")

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("safenest")

_client = None


def get_db():
    """Create the Mongo client lazily (safe for serverless cold starts)."""
    global _client
    if _client is None:
        _client = AsyncIOMotorClient(os.environ["MONGO_URL"])
    return _client[os.environ.get("DB_NAME", "safenest")]


app = FastAPI(title="SafeNest Home Care API")
api = APIRouter(prefix="/api")


class ContactIn(BaseModel):
    name: str = Field(min_length=1, max_length=200)
    email: EmailStr
    phone: str = Field(default="", max_length=50)
    message: str = Field(min_length=1, max_length=5000)


async def send_notification(c: ContactIn):
    """Optional email alert via Resend. Skipped if RESEND_API_KEY is not set."""
    key = os.environ.get("RESEND_API_KEY")
    to = os.environ.get("CONTACT_TO_EMAIL")
    if not key or not to:
        return
    sender = os.environ.get("CONTACT_FROM_EMAIL", "SafeNest Website <onboarding@resend.dev>")
    body = f"Name: {c.name}\nEmail: {c.email}\nPhone: {c.phone}\n\n{c.message}"
    try:
        async with httpx.AsyncClient(timeout=10) as http:
            r = await http.post(
                "https://api.resend.com/emails",
                headers={"Authorization": f"Bearer {key}"},
                json={"from": sender, "to": [to], "reply_to": c.email,
                      "subject": f"New website enquiry from {c.name}", "text": body},
            )
            r.raise_for_status()
    except Exception:
        logger.exception("Email notification failed (enquiry was still saved)")


@api.get("/")
async def root():
    return {"status": "ok", "service": "safenest-api"}


@api.post("/contact")
async def contact(payload: ContactIn):
    doc = payload.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    try:
        await get_db().contact_messages.insert_one(doc)
    except Exception:
        logger.exception("Failed to save contact message")
        raise HTTPException(status_code=500, detail="Could not save message")
    await send_notification(payload)
    return {"success": True, "id": doc["id"]}


app.include_router(api)

origins = [o.strip() for o in os.environ.get("CORS_ORIGINS", "*").split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_credentials=False,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)
