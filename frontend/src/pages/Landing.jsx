import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "../сomponents/Navbar";
import Hero from "../сomponents/Hero";
import GitBranchAnimation from "../сomponents/GitBranchAnimation";
import ProductDemo from "../сomponents/ProductDemo";
import FeaturesSection from "../сomponents/FeaturesSection";
import HowItWorksSection from "../сomponents/HowItWorksSection";
import TestimonialsSection from "../сomponents/TestimonialsSection";

import FAQSection from "../сomponents/FAQSection";
import CTA from "../сomponents/CTA";
import Footer from "../сomponents/Footer";

gsap.registerPlugin(ScrollTrigger);

const Landing = () => {
  useEffect(() => {
    // Scroll-reveal for headings & paragraphs (skip elements inside git animation)
    const targets = gsap.utils
      .toArray("h1, h2, h3, p, li")
      .filter((el) => !el.closest(".git-no-reveal"));

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
        },
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
