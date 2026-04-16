import { useTranslation } from "react-i18next";

const Integrations = () => {
  const { t } = useTranslation();

  const tools = ["GitHub", "GitLab", "VS Code"];

  return (
    <section className="py-24 bg-[#EEF1F7] text-center text-[#2B3141]">

      <h2 className="text-3xl mb-4">
        {t("integrations_title")}
      </h2>

      <p className="text-[#5b6275] mb-12">
        {t("integrations_desc")}
      </p>

      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6 px-6">
        {tools.map((tool, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl border border-gray-200 
            hover:border-[#E8654A] transition shadow-sm"
          >
            {tool}
          </div>
        ))}
      </div>

    </section>
  );
};

export default Integrations;