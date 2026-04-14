import { useTranslation } from "react-i18next";
import Features from "../components/Features";
import Integrations from "../components/Integrations";
import Company from "../components/Company"
import LanguageSwitcher from "../components/LanguageSwitcher";

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