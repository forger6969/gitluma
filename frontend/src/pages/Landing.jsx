import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <div className="bg-[#0b0f19] text-white">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Landing;