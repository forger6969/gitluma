import { useTranslation } from "react-i18next";

const FAQ = () => {
  const { t } = useTranslation();

  const data = [1, 2, 3];

  return (
    <section className="py-24 bg-white text-[#2B3141]">
      <div className="max-w-4xl mx-auto px-6">

        <h2 className="text-3xl mb-10 text-center">
          {t("faq")}
        </h2>

        <div className="space-y-6">
          {data.map((i) => (
            <div
              key={i}
              className="border-b border-gray-200 pb-4"
            >
              <h3 className="font-semibold">
                {t(`faq_q${i}`)}
              </h3>

              <p className="text-[#5b6275] text-sm mt-2">
                {t(`faq_a${i}`)}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;