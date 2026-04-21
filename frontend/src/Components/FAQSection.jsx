import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useTranslation } from "react-i18next";

const FAQSection = () => {
  const { t } = useTranslation();

  const FAQS = [
    { q: t("faq.q1"), a: t("faq.a1") },
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
    { q: t("faq.q4"), a: t("faq.a4") },
    { q: t("faq.q5"), a: t("faq.a5") },
    { q: t("faq.q6"), a: t("faq.a6") },
    { q: t("faq.q7"), a: t("faq.a7") },
    { q: t("faq.q8"), a: t("faq.a8") },
  ];

  const FAQItem = ({ faq, index }) => {
    const [open, setOpen] = useState(false);
    const [hovered, setHovered] = useState(false);
    const bodyRef = useRef(null);

    const toggle = () => {
      const el = bodyRef.current;
      if (!el) return;

      if (!open) {
        gsap.fromTo(el, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: 0.35 });
      } else {
        gsap.to(el, { height: 0, opacity: 0, duration: 0.25 });
      }

      setOpen(o => !o);
    };

    return (
      <div className="border-b last:border-0">
        <button
          className="w-full flex justify-between py-5"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={toggle}
        >
          <div className="flex gap-3">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span>{faq.q}</span>
          </div>

          <div>{open ? "-" : "+"}</div>
        </button>

        <div ref={bodyRef} style={{ height: 0, overflow: "hidden" }}>
          <p className="pb-5 pl-8">{faq.a}</p>
        </div>
      </div>
    );
  };

  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-6">

        <div className="text-center mb-12">
          <span>FAQ</span>

          <h2>{t("faq.title")}</h2>

          <p>
            {t("faq.subtitle")}{" "}
            <span>{t("faq.contact")}</span>
          </p>
        </div>

        <div className="rounded-2xl px-8">
          {FAQS.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;