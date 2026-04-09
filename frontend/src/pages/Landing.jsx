import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";
import FeaturesGrid from "../components/FeaturesGrid";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import Integrations from "../components/Integrations";
import Security from "../components/Security";

const Landing = () => {
  return (
    <div className="bg-[#0b0f19] text-white">
      <Navbar />    
      <Hero />

      <HowItWorks />

      <FeaturesGrid />
      <Testimonials />
      <FAQ />
      <Integrations />
      <Security />
      <CTA />

      <Footer />
    </div>
  );
};

export default Landing;