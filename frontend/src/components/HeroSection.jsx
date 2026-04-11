import React from "react";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 text-center">
      <h1 className="text-5xl font-bold mb-6">
        {t("hero_title")}
      </h1>

      <p className="text-gray-400 max-w-2xl mx-auto mb-8">
        {t("hero_desc")}
      </p>

      <button className="bg-white text-black px-8 py-3 rounded-lg">
        {t("get_started")}
      </button>
    </section>
  );
};

export default HeroSection;