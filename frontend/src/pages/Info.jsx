import { useTranslation } from "react-i18next";
import Features from "../Components/Features";
import Integrations from "../Components/Integrationss";
import Company from "../Components/Company"
import LanguageSwitcher from "../Components/LanguageSwitcher";

export default function Info() {
  const { t } = useTranslation();

  return (
    <div>
      <div
        className="text-center py-20 text-white"
        style={{ background: "#2B3141" }}
      >
        <h1 className="text-4xl font-bold mb-4">
          {t("hero_title")}
        </h1>

        <p className="text-gray-300">
          {t("hero_desc")}
        </p>

        <LanguageSwitcher />
      </div>

      <Features />
      <Integrations />
      <Company />
    </div>
  );
}