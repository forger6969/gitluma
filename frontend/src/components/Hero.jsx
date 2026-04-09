import { useTranslation } from "react-i18next";
import img from "../assets/code.png";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center text-center mt-20 px-4">

      <div className="bg-gray-800 text-gray-300 text-xs px-4 py-1 rounded-full mb-6">
        BETA 2.0 NOW LIVE
      </div>

      <h1 className="text-5xl md:text-6xl font-bold max-w-3xl">
        {t("hero_title")} <br />
        <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          {t("commits")}
        </span>
      </h1>

      <p className="text-gray-400 mt-6 max-w-xl">
        {t("hero_desc")}
      </p>

      <button className="bg-gray-800 px-6 py-3 rounded-xl mt-6 hover:bg-gray-700">
        {t("view_docs")}
      </button>

      <div className="mt-16 bg-[#0a0f1c] border border-gray-800 rounded-xl w-full max-w-2xl p-5">
        <img src={img} alt="" />
      </div>
    </div>
  );
};

export default Hero;