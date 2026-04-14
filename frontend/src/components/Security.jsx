import { useTranslation } from "react-i18next";

const Security = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-white text-[#2B3141]">
      <div className="max-w-5xl mx-auto px-6 text-center">

        <h2 className="text-3xl mb-4">
          {t("security_title")}
        </h2>

        <p className="text-[#5b6275] mb-10">
          {t("security_desc")}
        </p>

        <div className="grid md:grid-cols-3 gap-6">

          {[1,2,3].map((i) => (
            <div
              key={i}
              className="bg-[#EEF1F7] p-6 rounded-xl border border-gray-200 shadow-sm"
            >
              <h3 className="mb-2 font-semibold">
                {t(`security_${i}_title`)}
              </h3>

              <p className="text-sm text-[#5b6275]">
                {t(`security_${i}_desc`)}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Security;