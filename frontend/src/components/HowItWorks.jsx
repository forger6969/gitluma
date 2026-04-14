import { useTranslation } from "react-i18next";
import FeatureCard from "./FeatureCard";
import ImageCard from "./ImageCard";
import bgimg from "../assets/bg.png";

const HowItWorks = () => {
  const { t } = useTranslation();

  return (
    <div className="py-20 px-6 bg-[#EEF1F7] text-[#2B3141]">

      <h2 className="text-3xl font-semibold mb-2">
        {t("how_it_works")}
      </h2>

      <p className="text-[#5b6275] mb-10">
        {t("how_desc")}
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <FeatureCard phase="phase 01" title={t("phase1")} desc={t("phase1_desc")} />
        <FeatureCard phase="phase 02" title={t("phase2")} desc={t("phase2_desc")} />
        <FeatureCard phase="phase 03" title={t("phase3")} desc={t("phase3_desc")} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <ImageCard img={bgimg} desc={t("ide_desc")} />

        <div className="bg-[#2B3141] text-white rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-2">
            {t("analytics")}
          </h2>
          <p className="text-gray-300">
            {t("analytics_desc")}
          </p>
        </div>
      </div>

    </div>
  );
};

export default HowItWorks;