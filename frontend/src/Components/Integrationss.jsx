import { useTranslation } from "react-i18next";

export default function Integrationss() {
  const { t } = useTranslation();

  return (
    <div className="py-16 px-6 bg-white">
      <h2 className="text-3xl font-bold text-center mb-10 text-[#2B3141]">
        {t("integrations")}
      </h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div className="p-6 border rounded-xl hover:border-[#E8654A] transition">
          <h3 className="text-lg font-semibold text-[#2B3141] mb-2">
            {t("integr1")}
          </h3>
          <p className="text-gray-600">
            API орқали repository, commit ва PR маълумотларини олиш.
          </p>
        </div>

        <div className="p-6 border rounded-xl hover:border-[#E8654A] transition">
          <h3 className="text-lg font-semibold text-[#2B3141] mb-2">
            {t("integr2")}
          </h3>
          <p className="text-gray-600">
            CI/CD pipeline’ларни автоматик ишга тушириш ва monitoring.
          </p>
        </div>

        <div className="p-6 border rounded-xl hover:border-[#E8654A] transition">
          <h3 className="text-lg font-semibold text-[#2B3141] mb-2">
            {t("integr3")}
          </h3>
          <p className="text-gray-600">
            GitHub орқали хавфсиз авторизация ва user management.
          </p>
        </div>
      </div>
    </div>
  );
}
