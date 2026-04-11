import { useTranslation } from "react-i18next";

const Testimonials = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-[#0b0f19] text-white text-center">
      <h2 className="text-3xl mb-12">{t("testimonials")}</h2>

      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 px-6">
        {[1,2,3].map((i) => (
          <div key={i} className="bg-[#111827] p-6 rounded-xl border border-gray-800">
            <p className="text-gray-400 mb-4">
              {t(`testimonial_${i}`)}
            </p>
            <h4 className="font-semibold">{t("developer")}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;