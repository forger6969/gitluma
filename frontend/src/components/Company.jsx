import { useTranslation } from "react-i18next";

export default function Company() {
  const { t } = useTranslation();

  return (
    <div
      className="py-16 px-6 text-white"
      style={{ background: "#2B3141" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* TITLE */}
        <h2 className="text-3xl font-bold mb-6">
          {t("about")}
        </h2>

        {/* DESCRIPTION */}
        <p className="text-gray-300 mb-6 leading-relaxed">
          {t("about_desc")}
        </p>

        {/* GOALS */}
        <h3 className="text-2xl font-semibold text-[#E8654A] mb-4">
          {t("goals")}
        </h3>

        <ul className="space-y-2 text-gray-300 mb-8">
          <li>• {t("goal1")}</li>
          <li>• {t("goal2")}</li>
          <li>• {t("goal3")}</li>
          <li>• {t("goal4")}</li>
        </ul>

        {/* ADVANTAGES */}
        <h3 className="text-2xl font-semibold text-[#E8654A] mb-4">
          {t("advantages")}
        </h3>

        <ul className="space-y-2 text-gray-300">
          <li>• {t("adv1")}</li>
          <li>• {t("adv2")}</li>
          <li>• {t("adv3")}</li>
          <li>• {t("adv4")}</li>
        </ul>
      </div>
    </div>
  );
}