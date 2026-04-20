import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import GitBranchAnimation from "../Components/GitBranchAnimation";
import ProductDemo from "../components/ProductDemo";
import FeaturesSection from "../components/FeaturesSection";
import HowItWorksSection from "../components/HowItWorksSection";
import TestimonialsSection from "../components/TestimonialsSection";

import FAQSection from "../components/FAQSection";
import CTA from "../components/CTA";
import Footer from "../Components/Footer";

gsap.registerPlugin(ScrollTrigger);

const Landing = () => {
  useEffect(() => {
    // Scroll-reveal for headings & paragraphs (skip elements inside git animation)
    const targets = gsap.utils.toArray("h1, h2, h3, p, li").filter(
      (el) => !el.closest(".git-no-reveal")
    );

    targets.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 91%",
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
    <div style={{ background: "var(--gl-bg-page)", color: "var(--gl-body)" }}>
      <Navbar />
      <Hero />
      <GitBranchAnimation />
      <ProductDemo />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FAQSection />
      <CTA />
      <Footer />
    </div>
  );
};

export default Landing;
