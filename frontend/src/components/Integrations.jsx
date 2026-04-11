import { useTranslation } from "react-i18next";

const Integrations = () => {
  const { t } = useTranslation();

  const tools = [
    "GitHub",
    "GitLab",
    "Bitbucket",
    "Slack",
    "Jira",
    "VS Code"
  ];

  return (
    <section className="py-24 bg-[#0e1424] text-white text-center">
      <h2 className="text-3xl mb-4">{t("integrations_title")}</h2>
      <p className="text-gray-400 mb-12">{t("integrations_desc")}</p>

      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6 px-6">
        {tools.map((tool, i) => (
          <div
            key={i}
            className="bg-[#111827] p-6 rounded-xl border border-gray-800 hover:border-indigo-500 transition"
          >
            {tool}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Integrations;