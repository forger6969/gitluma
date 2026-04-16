import { useTranslation } from "react-i18next";

const FeaturesGrid = () => {
  const { t } = useTranslation();

  const features = [
    "feature_1",
    "feature_2",
    "feature_3",
    "feature_4",
    "feature_5",
    "feature_6"
  ];

  return (
    <section className="py-24 bg-[#EEF1F7] text-[#2B3141]">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-3xl mb-12 text-center">
          {t("features")}
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((key, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl border border-gray-200 
              hover:border-[#E8654A] transition shadow-sm"
            >
              <h3 className="font-semibold mb-2">{t(key)}</h3>
              <p className="text-sm text-[#5b6275]">
                {t("feature_desc")}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturesGrid;