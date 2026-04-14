import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import Footer from "../Components/Footer";
import FAQ from "../Components/FAQ";
import CTA from "../Components/CTA";
import Integrations from "../Components/Integrations";
import Security from "../Components/Security";

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
      <FAQ />
      <Integrations />
      <Security />
      <CTA />
      <Footer />
    </div>
  );
};

export default Landing;