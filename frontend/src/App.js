import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollReveal from "./components/ScrollReveal";
import { Toaster } from "./components/ui/sonner";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import Testimonials from "./pages/Testimonials";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import PortalPrompt from "./components/PortalPrompt";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <ScrollReveal />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
        <PortalPrompt />
        <Toaster position="top-right" />
      </BrowserRouter>
    </div>
  );
}

export default App;
