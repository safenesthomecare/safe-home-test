import "@/App.css";
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
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
import DemoBanner from "./components/DemoBanner";
import { DEMO } from "./lib/demo";

// Static demo hosting (GitHub Pages) cannot rewrite unknown URLs to index.html, so the demo build uses #/routes.
const Router = DEMO ? HashRouter : BrowserRouter;

function App() {
  return (
    <div className="App">
      <Router>
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
        <DemoBanner />
        <Toaster position="top-right" />
      </Router>
    </div>
  );
}

export default App;
