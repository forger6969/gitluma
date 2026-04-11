import React from "react";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import SecuritySection from "../components/SecuritySection";
import HowItWorksSection from "../components/HowItWorksSection";
import CTASection from "../components/CTASection";

const Info = () => {
  return (
    <div className="bg-[#0b0f19] text-white">
      <HeroSection />
      <FeaturesSection />
      <SecuritySection />
      <HowItWorksSection />
      <CTASection />
    </div>
  );
};

export default Info;