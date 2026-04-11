import React from "react";
import { useTranslation } from "react-i18next";

const CTASection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 text-center">
      <h2 className="text-3xl mb-4">
        {t("cta_title")}
      </h2>

      <p className="text-gray-400 mb-6">
        {t("cta_desc")}
      </p>

      <button className="bg-white text-black px-8 py-3 rounded-lg">
        {t("cta_button")}
      </button>
    </section>
  );
};

export default CTASection;