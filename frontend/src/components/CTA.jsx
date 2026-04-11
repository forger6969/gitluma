import { useTranslation } from "react-i18next";

const CTA = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-gradient-to-r from-indigo-700 to-purple-800 text-center text-white">
      <h2 className="text-3xl font-semibold mb-4">
        {t("cta_title")}
      </h2>
      <p className="text-gray-200 mb-8">
        {t("cta_desc")}
      </p>

      <button className="bg-black px-6 py-3 rounded-lg font-medium hover:bg-gray-900 transition">
        {t("cta_button")}
      </button>
    </section>
  );
};

export default CTA;