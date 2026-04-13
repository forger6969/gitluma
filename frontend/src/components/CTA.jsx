import { useTranslation } from "react-i18next";

const CTA = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-[#2B3141] text-center text-white">

      <h2 className="text-3xl font-semibold mb-4">
        {t("cta_title")}
      </h2>

      <p className="text-gray-300 mb-8">
        {t("cta_desc")}
      </p>

      <button className="bg-[#E8654A] px-6 py-3 rounded-lg font-medium 
      hover:bg-[#d4553d] active:bg-[#b8432f] transition">
        {t("cta_button")}
      </button>

    </section>
  );
};

export default CTA;