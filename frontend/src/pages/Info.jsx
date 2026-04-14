import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Features from "../Components/Features";
import Integrations from "../Components/Integrationss";
import Company from "../Components/Company";
import LanguageSwitcher from "../Components/LanguageSwitcher";
import Testimonials from "../Components/Testimonials";
import Step from "../Components/Step";

gsap.registerPlugin(ScrollTrigger);

export default function Info() {
  const { t } = useTranslation();

  useEffect(() => {
    const elements = gsap.utils.toArray(".animate");

    elements.forEach((el) => {
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
    <div>
      <div
        className="text-center py-20 text-white animate"
        style={{ background: "#2B3141" }}
      >
        <h1 className="text-4xl font-bold mb-4 animate">
          {t("hero_title")}
        </h1>

        <p className="text-gray-300 animate">
          {t("hero_desc")}
        </p>

        <div className="animate">
          <LanguageSwitcher />
        </div>
      </div>
      <div className="animate">
        <Step/>
      </div>
      <div className="animate">
        <Testimonials />
      </div>
      <div className="animate">
        <Features />
      </div>

      <div className="animate">
        <Integrations />
      </div>

      <div className="animate">
        <Company />
      </div>
      
    </div>
  );
}