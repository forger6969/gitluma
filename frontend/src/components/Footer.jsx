import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="border-t border-gray-800 text-center py-10">
      <p className="text-gray-400">{t("footer_desc")}</p>
      <p className="text-gray-500 text-sm mt-4">
        © 2024 Gitluma
      </p>
    </div>
  );
};

export default Footer;