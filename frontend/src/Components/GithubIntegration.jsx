import { useTranslation } from "react-i18next";

const GithubIntegration = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-[#0e1424] text-center text-white">
      <div className="max-w-4xl mx-auto px-6">

        <h2 className="text-3xl font-semibold mb-4">
          {t("github_title")}
        </h2>

        <p className="text-gray-400 mb-8">
          {t("github_desc")}
        </p>

        <button className="bg-indigo-600 hover:bg-indigo-500 transition px-6 py-3 rounded-lg font-medium">
          {t("connect_github")}
        </button>

      </div>
    </section>
  );
};

export default GithubIntegration;