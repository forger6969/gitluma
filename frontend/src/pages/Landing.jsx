import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

gsap.registerPlugin(ScrollTrigger);

const Landing = () => {
  useEffect(() => {
    const targets = gsap.utils.toArray("h1, h2, h3, p, li");

    targets.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="bg-[#EEF1F7] text-[#2B3141]">
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