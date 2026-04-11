import { useTranslation } from "react-i18next";
import img from "../assets/code.png";
import SoftAurora from "./SoftAurora";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <div className="relative flex flex-col items-center text-center mt-20 px-4 overflow-hidden">

      <div className="absolute inset-0 pointer-events-none z-0">
        <SoftAurora
          speed={0.6}
          scale={1.5}
          brightness={1}
          color1="#a855f7"
          color2="#6366f1"
          noiseFrequency={2.5}
          noiseAmplitude={1}
          bandHeight={0.5}
          bandSpread={1}
          octaveDecay={0.1}
          layerOffset={0}
          colorSpeed={1}
          enableMouseInteraction={true}
          mouseInfluence={0.25}
        />
      </div>

      {/* Content — aurora ustida */}
      <div className="relative z-10 flex flex-col items-center">
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

        <div className="flex gap-5 items-center mt-5">
          <button className="bg-gradient-to-r from-indigo-400 to-indigo-600 text-white font-semibold px-4 py-4 rounded-lg hover:from-indigo-500 hover:to-indigo-700 transition">
            Continue with GitHub
          </button>

          <button className="bg-gray-800 px-6 py-4 rounded-xl hover:bg-gray-700 text-white font-semibold">
            {t("view_docs")}
          </button>
        </div>

        <div className="mt-16 bg-[#0a0f1c] border border-gray-800 rounded-xl w-full max-w-2xl p-5">
          <img src={img} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
