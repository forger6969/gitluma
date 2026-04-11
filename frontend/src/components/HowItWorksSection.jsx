import React from "react";
import { useTranslation } from "react-i18next";

const HowItWorksSection = () => {
  const { t } = useTranslation();

  const steps = [
    t("step_1"),
    t("step_2"),
    t("step_3"),
    t("step_4"),
    t("step_5"),
  ];

  return (
    <section className="py-24 bg-[#0f172a] text-center">
      <h2 className="text-3xl mb-10">
        {t("how_it_works")}
      </h2>

      <div className="grid md:grid-cols-5 gap-4 px-6 max-w-6xl mx-auto">
        {steps.map((step, i) => (
          <div
            key={i}
            className="p-4 border border-gray-800 rounded-lg bg-[#111827]"
          >
            {step}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;