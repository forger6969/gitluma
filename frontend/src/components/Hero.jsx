import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import img from "../assets/code.png";
import SoftAurora from "./SoftAurora";

const Hero = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="bg-[#EEF1F7] relative flex flex-col items-center text-center mt-16 py-10 px-4 overflow-hidden">

     
      <div className="absolute inset-0 z-0 pointer-events-none">

        
        <div className="absolute bottom-0 left-0 right-0 h-[80%] opacity-80">
          <SoftAurora
            speed={0.5}
            scale={1.3}
            brightness={0.9}
            color1="#E8654A"
            color2="#2B3141"
          />
        </div>

        {/* Top clean gradient (USTIGA chiqmaydi endi) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#EEF1F7] via-[#EEF1F7]/1 to-transparent" />

      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">

        {/* Badge */}
        <div className="bg-[#E8654A]/10 text-[#E8654A] text-xs px-4 py-1 rounded-full mb-6">
          BETA 2.0 NOW LIVE
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold max-w-3xl text-[#2B3141] leading-tight">
          {t("hero_title")} <br />
          <span className="bg-gradient-to-r from-[#E8654A] to-[#d4553d] bg-clip-text text-transparent">
            {t("commits")}
          </span>
        </h1>

        {/* Desc */}
        <p className="text-[#5b6275] mt-6 max-w-xl">
          {t("hero_desc")}
        </p>

        {/* Buttons */}
        <div className="flex gap-5 items-center mt-8 flex-wrap justify-center">

          <button
            className="bg-[#E8654A] text-white font-semibold px-6 py-4 rounded-lg 
            hover:bg-[#d4553d] active:bg-[#b8432f] transition
            hover:shadow-[0_10px_30px_rgba(232,101,74,0.4)]"
          >
            Continue with GitHub
          </button>

          <button
            className="bg-white border border-gray-200 px-6 py-4 rounded-xl 
            hover:bg-gray-100 text-[#2B3141] font-semibold transition"
          >
            {t("view_docs")}
          </button>

        </div>

        {/* Image */}
        <div className="mt-16 bg-white border border-gray-200 rounded-xl w-full max-w-2xl p-5 shadow-sm">
          <img src={img} alt="preview" className="rounded-lg" />
        </div>
        <div className="text-center py-5 text-xl">
         {/* 🔥 More button */}
         <button
            onClick={() => navigate("/info")}
            className="bg-orange-500 hover:bg-orange-600 text-white text-xl px-6 py-4 rounded-xl transition"
          >
            More Info
          </button>
      </div>
      </div>
    </div>
  );
};

export default Hero;