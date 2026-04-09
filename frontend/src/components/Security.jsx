import { useTranslation } from "react-i18next";

const Security = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-[#0b0f19] text-white">
      <div className="max-w-5xl mx-auto px-6 text-center">

        <h2 className="text-3xl mb-4">
          {t("security_title")}
        </h2>

        <p className="text-gray-400 mb-10">
          {t("security_desc")}
        </p>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-[#111827] p-6 rounded-xl border border-gray-800">
            <h3 className="mb-2">{t("security_1_title")}</h3>
            <p className="text-sm text-gray-400">
              {t("security_1_desc")}
            </p>
          </div>

          <div className="bg-[#111827] p-6 rounded-xl border border-gray-800">
            <h3 className="mb-2">{t("security_2_title")}</h3>
            <p className="text-sm text-gray-400">
              {t("security_2_desc")}
            </p>
          </div>

          <div className="bg-[#111827] p-6 rounded-xl border border-gray-800">
            <h3 className="mb-2">{t("security_3_title")}</h3>
            <p className="text-sm text-gray-400">
              {t("security_3_desc")}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Security;