import { useTranslation } from "react-i18next";

export default function Features() {
  const { t } = useTranslation();

  return (
    <div className="py-16 px-6 bg-[#EEF1F7]">
      <h2 className="text-3xl text-center mb-10 text-[#2B3141] font-bold">
        {t("features")}
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl">
          {t("feature1")}
        </div>
        <div className="bg-white p-6 rounded-xl">
          {t("feature2")}
        </div>
        <div className="bg-white p-6 rounded-xl">
          {t("feature3")}
        </div>
      </div>
    </div>
  );
}