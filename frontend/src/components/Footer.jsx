import { useTranslation } from "react-i18next";


const Footer = () => {
  const { t } = useTranslation();


  return (
    <footer className="bg-white text-[#5b6275] border-t border-gray-200">

      <div className="max-w-7xl mx-auto px-6 py-6 grid md:grid-cols-4 gap-10">

        <div>
          <h2 className="text-[#2B3141] font-semibold text-lg mb-4">
            GitLuma
          </h2>
          <p className="text-sm leading-relaxed mb-4">
            {t("footer_desc")}
          </p>

         
        </div>

        <div>
          <h3 className="text-[#2B3141] mb-4">{t("features")}</h3>
          <ul className="space-y-2 text-sm">
            <li>{t("features")}</li>
            <li>{t("integrations")}</li>
          </ul>
        </div>

        <div>
          <h3 className="text-[#2B3141] mb-4">{t("company")}</h3>
          <ul className="space-y-2 text-sm">
            <li>{t("about")}</li>
          </ul>
        </div>

        <div>
          <h3 className="text-[#2B3141] mb-4">{t("status")}</h3>
          <div className="flex items-center gap-2 text-sm">
            <span className="w-2 h-2 bg-[#E8654A] rounded-full"></span>
            <span>{t("operational")}</span>
          </div>
        </div>

      </div>
      
      


      <div className="text-center text-xs text-gray-400 border-t border-gray-200 py-6">
        © 2024 Gitluma. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;