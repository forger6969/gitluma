import React from "react";
import { useTranslation } from "react-i18next";
import img from "../assets/code.png";
import bgimg from "../assets/bg.png";

const Landing = () => {
  const { t, i18n } = useTranslation();

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-b from-[#0b0f19] to-[#0d1323] text-white">


        <div className="flex items-center justify-between px-40 py-5">
          <h1 className="text-lg font-semibold">GitLuma</h1>

          <div className="flex items-center gap-8 text-gray-400 text-sm">
            <p className="hover:text-white cursor-pointer">{t("platform")}</p>
            <p className="hover:text-white cursor-pointer">{t("documentation")}</p>
            <p className="hover:text-white cursor-pointer">{t("changelog")}</p>

          
            <div className="flex gap-2 bg-white/10 backdrop-blur px-2 py-1 rounded-lg text-xs">
              <button onClick={() => changeLang("en")}>EN</button>
              <button onClick={() => changeLang("uz")}>UZ</button>
              <button onClick={() => changeLang("ru")}>RU</button>
            </div>
          </div>
        </div>

      
        <div className="flex flex-col items-center text-center mt-20 px-4">

          <div className="bg-gray-800 text-gray-300 text-xs px-4 py-1 rounded-full mb-6">
            BETA 2.0 NOW LIVE
          </div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight max-w-3xl">
            {t("hero_title")} <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              {t("commits")}
            </span>
          </h1>

          <p className="text-gray-400 mt-6 max-w-xl">
            {t("hero_desc")}
          </p>

          <div className="flex gap-4 mt-8">
            <button className="bg-gray-800 px-6 py-3 rounded-xl hover:bg-gray-700">
              {t("view_docs")}
            </button>
          </div>

          <div className="mt-16 bg-[#0a0f1c] border border-gray-800 rounded-xl w-full max-w-2xl text-left p-5 shadow-xl">
            <p className="text-gray-500 text-sm mb-2">zsh • kinetic-cli</p>
            <img src={img} alt="" />
          </div>
        </div>
      </div>

      
      <div className="bg-[#0b0f19] text-white py-20 px-6">
        <div className="max-w-6xl mx-auto">

          <div className="mb-12">
            <h2 className="text-3xl font-semibold">{t("how_it_works")}</h2>
            <p className="text-gray-400 mt-2">{t("how_desc")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">

            <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">
              <p className="text-xs text-gray-400 mb-2">phase 01</p>
              <h3 className="text-lg font-semibold mb-2">{t("phase1")}</h3>
              <p className="text-gray-400 text-sm">{t("phase1_desc")}</p>
            </div>

            <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">
              <p className="text-xs text-gray-400 mb-2">phase 02</p>
              <h3 className="text-lg font-semibold mb-2">{t("phase2")}</h3>
              <p className="text-gray-400 text-sm">{t("phase2_desc")}</p>
            </div>

            <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">
              <p className="text-xs text-gray-400 mb-2">phase 03</p>
              <h3 className="text-lg font-semibold mb-2">{t("phase3")}</h3>
              <p className="text-gray-400 text-sm">{t("phase3_desc")}</p>
            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="relative rounded-2xl overflow-hidden border border-gray-800">
              <img src={bgimg} alt="IDE" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50"></div>

              <div className="absolute bottom-6 left-6">
                <h2 className="text-xl font-semibold">{t("ide")}</h2>
                <p className="text-gray-300 text-sm mt-1">{t("ide_desc")}</p>
              </div>
            </div>

            <div className="bg-[#13233a] rounded-2xl p-6 border border-blue-500/30">
              <h2 className="text-xl font-semibold">{t("analytics")}</h2>
              <p className="text-gray-300 text-sm mt-2">{t("analytics_desc")}</p>
            </div>

          </div>
        </div>
      </div>

     
      <div className="bg-[#0b0f19] text-white">
        <div className="text-center py-20 px-6 border-b border-gray-800">
          <h2 className="text-3xl font-semibold mb-6">{t("cta")}</h2>
          <button className="bg-gradient-to-r from-purple-400 to-indigo-500 px-8 py-3 rounded-xl">
            {t("start")}
          </button>
        </div>

    
        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">

          <div>
            <h1 className="text-lg font-semibold mb-4">Gitluma</h1>
            <p className="text-gray-400 text-sm">{t("footer_desc")}</p>
          </div>

          <div>
            <h3 className="text-sm text-gray-400 mb-4">{t("platform")}</h3>
            <ul className="space-y-2 text-sm">
              <li>{t("features")}</li>
              <li>{t("integrations")}</li>
              <li>{t("pricing")}</li>
              <li>{t("cli")}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm text-gray-400 mb-4">{t("company")}</h3>
            <ul className="space-y-2 text-sm">
              <li>{t("about")}</li>
              <li>{t("careers")}</li>
              <li>{t("contact")}</li>
              <li>{t("privacy")}</li>
            </ul>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">{t("status")}</p>
            <p className="text-sm text-yellow-400">{t("operational")}</p>
          </div>

        </div>

        <div className="border-t border-gray-800 text-center text-gray-500 text-sm py-6">
          © 2024 Gitluma. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Landing;