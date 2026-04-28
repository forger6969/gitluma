import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";

const FAQItem = ({ faq, index }) => {
  const [open,    setOpen]    = useState(false);
  const [hovered, setHovered] = useState(false);
  const bodyRef = useRef(null);

  const toggle = () => {
    const el = bodyRef.current;
    if (!el) return;
    if (!open) {
      gsap.fromTo(el, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: 0.35, ease: "power3.out" });
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.25, ease: "power3.in" });
    }
    setOpen(o => !o);
  };

  return (
    <div
      className="border-b last:border-0 transition-all duration-200"
      style={{ borderColor: "var(--gl-border-subtle)" }}
    >
      <button
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
        style={{ cursor: "pointer" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={toggle}
      >
        <div className="flex items-start gap-3.5 flex-1 min-w-0">
          <span
            className="text-xs font-bold mt-0.5 shrink-0 tabular-nums transition-colors duration-200"
            style={{ color: open || hovered ? "var(--gl-coral)" : "var(--gl-muted)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="text-sm font-semibold leading-snug transition-colors duration-200"
            style={{ color: open || hovered ? "var(--gl-heading)" : "var(--gl-body)" }}
          >
            {faq.q}
          </span>
        </div>

        <div
          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300"
          style={{
            background: open ? "var(--gl-coral)" : "var(--gl-bg-page)",
            border:     `1px solid ${open ? "var(--gl-coral)" : "var(--gl-border-subtle)"}`,
          }}
        >
          <svg
            viewBox="0 0 16 16"
            className="w-3.5 h-3.5 transition-transform duration-300"
            fill="none"
            style={{
              stroke:    open ? "white" : "var(--gl-muted)",
              transform: open ? "rotate(45deg)" : "rotate(0deg)",
            }}
          >
            <path d="M8 3v10M3 8h10" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
      </button>

      <div ref={bodyRef} style={{ height: 0, overflow: "hidden", opacity: 0 }}>
        <p
          className="text-sm leading-relaxed pb-5 pl-8"
          style={{ color: "var(--gl-muted)" }}
        >
          {faq.a}
        </p>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const { t } = useTranslation();

  const FAQS = [
    { q: t("faqs_q1"), a: t("faqs_a1") },
    { q: t("faqs_q2"), a: t("faqs_a2") },
    { q: t("faqs_q3"), a: t("faqs_a3") },
    { q: t("faqs_q4"), a: t("faqs_a4") },
    { q: t("faqs_q5"), a: t("faqs_a5") },
    { q: t("faqs_q6"), a: t("faqs_a6") },
    { q: t("faqs_q7"), a: t("faqs_a7") },
    { q: t("faqs_q8"), a: t("faqs_a8") },
  ];

  return (
    <section
      className="py-24 git-no-reveal"
      style={{ background: "var(--gl-bg-card)" }}
    >
      <div className="max-w-3xl mx-auto px-6">

        <div className="text-center mb-12">
          <span
            className="text-xs font-semibold tracking-widest px-4 py-1.5 rounded-full"
            style={{ color: "var(--gl-coral)", background: "var(--gl-coral-bg)" }}
          >
            {t("faqs_badge")}
          </span>
          <h2 className="text-4xl font-bold mt-5" style={{ color: "var(--gl-heading)" }}>
            {t("faqs_h2")}
          </h2>
          <p className="mt-4" style={{ color: "var(--gl-muted)" }}>
            {t("faqs_sub")}{" "}
            <span
              className="cursor-pointer font-medium transition-colors duration-150"
              style={{ color: "var(--gl-coral)" }}
              onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
              onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}
            >
              {t("faqs_contact")}
            </span>
          </p>
        </div>

        <div
          className="rounded-2xl px-8"
          style={{
            background: "var(--gl-bg-page)",
            border:     "1px solid var(--gl-border-subtle)",
          }}
        >
          {FAQS.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
