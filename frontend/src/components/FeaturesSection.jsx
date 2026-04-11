import React from "react";
import { useTranslation } from "react-i18next";

const FeaturesSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      title: t("feature_1_title"),
      desc: t("feature_1_desc"),
    },
    {
      title: t("feature_2_title"),
      desc: t("feature_2_desc"),
    },
    {
      title: t("feature_3_title"),
      desc: t("feature_3_desc"),
    },
  ];

  return (
    <section className="py-24 bg-[#0f172a] text-center">
      <h2 className="text-3xl mb-4">{t("features_title")}</h2>

      <p className="text-gray-400 mb-12">
        {t("features_desc")}
      </p>

      <div className="grid md:grid-cols-3 gap-6 px-6 max-w-6xl mx-auto">
        {features.map((item, i) => (
          <div
            key={i}
            className="bg-[#111827] p-6 rounded-xl border border-gray-800"
          >
            <h3 className="mb-2">{item.title}</h3>
            <p className="text-sm text-gray-400">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;