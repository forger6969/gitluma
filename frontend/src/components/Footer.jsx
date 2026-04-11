import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#0b0f19] text-gray-400 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10 text-left">

       
        <div>
          <h2 className="text-white font-semibold text-lg mb-4">GitLuma</h2>
          <p className="text-sm leading-relaxed">
            {t("footer_desc")}
          </p>
        </div>

      
        <div>
          <h3 className="text-white mb-4">{t("features")}</h3>
          <ul className="space-y-2 text-sm">
            <li>{t("features")}</li>
            <li>{t("integrations")}</li>
            {/* <li>{t("cli")}</li> */}
          </ul>
        </div>

   
        <div>
          <h3 className="text-white mb-4">{t("company")}</h3>
          <ul className="space-y-2 text-sm">
            <li>{t("about")}</li>
            <li>{t("contact")}</li>
          </ul>
        </div>

     
        <div>
          <h3 className="text-white mb-4">{t("status")}</h3>
          <div className="flex items-center gap-2 text-sm">
            <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
            <span>{t("operational")}</span>
          </div>
        </div>
      </div>

    
      <div className="text-center text-xs text-gray-500 border-t border-gray-800 py-6">
        © 2024 Gitluma. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;