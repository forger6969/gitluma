import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GH_PATH =
  "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12";

const CheckIcon = ({ avail, color }) => (
  avail ? (
    <svg viewBox="0 0 16 16" className="w-4 h-4 shrink-0" fill="none">
      <circle cx="8" cy="8" r="7.5" stroke={color} strokeOpacity="0.25" />
      <path d="M5 8l2 2 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg viewBox="0 0 16 16" className="w-4 h-4 shrink-0" fill="none">
      <circle cx="8" cy="8" r="7.5" stroke="#C8CDD9" />
      <path d="M5.5 10.5l5-5M10.5 10.5l-5-5" stroke="#C8CDD9" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
);

const PricingSection = () => {
  const { t } = useTranslation();
  const ref        = useRef(null);
  const [annual, setAnnual] = useState(false);
  const [hov,    setHov]    = useState(null);

  const PLANS = [
    {
      key:      "starter",
      name:     t("price_starter"),
      price:    { monthly: 0, annual: 0 },
      period:   t("price_forever"),
      desc:     t("price_starter_desc"),
      color:    "#5C6480",
      features: [
        { text: t("price_f1_1"), avail: true  },
        { text: t("price_f1_2"), avail: true  },
        { text: t("price_f1_3"), avail: true  },
        { text: t("price_f1_4"), avail: true  },
        { text: t("price_f1_5"), avail: true  },
        { text: t("price_f1_6"), avail: false },
        { text: t("price_f1_7"), avail: false },
      ],
      cta:     t("price_starter_cta"),
      ctaIcon: false,
      popular: false,
    },
    {
      key:    "pro",
      name:   t("price_pro_name"),
      price:  { monthly: 12, annual: 9 },
      period: t("price_per_month"),
      desc:   t("price_pro_desc"),
      color:  "#E8654A",
      features: [
        { text: t("price_f2_1"), avail: true },
        { text: t("price_f2_2"), avail: true },
        { text: t("price_f2_3"), avail: true },
        { text: t("price_f2_4"), avail: true },
        { text: t("price_f2_5"), avail: true },
        { text: t("price_f2_6"), avail: true },
        { text: t("price_f2_7"), avail: false },
      ],
      cta:     t("price_pro_cta"),
      ctaIcon: true,
      popular: true,
    },
    {
      key:    "team",
      name:   t("price_team_name"),
      price:  { monthly: 29, annual: 22 },
      period: t("price_per_month"),
      desc:   t("price_team_desc"),
      color:  "#3A7EE8",
      features: [
        { text: t("price_f3_1"), avail: true },
        { text: t("price_f3_2"), avail: true },
        { text: t("price_f3_3"), avail: true },
        { text: t("price_f3_4"), avail: true },
        { text: t("price_f3_5"), avail: true },
        { text: t("price_f3_6"), avail: true },
        { text: t("price_f3_7"), avail: true },
      ],
      cta:     t("price_team_cta"),
      ctaIcon: false,
      popular: false,
    },
  ];

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const cards = section.querySelectorAll(".pcard");
    gsap.set(cards, { opacity: 0, y: 40 });
    ScrollTrigger.create({
      trigger: section, start: "top 70%", once: true,
      onEnter: () => gsap.to(cards, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out", stagger: 0.14 }),
    });
    return () => ScrollTrigger.getAll().forEach(st => st.kill());
  }, []);

  return (
    <section
      ref={ref}
      className="py-24 git-no-reveal"
      style={{ background: "var(--gl-bg-page)" }}
    >
      <div className="max-w-5xl mx-auto px-6">

        <div className="text-center mb-12">
          <span
            className="text-xs font-semibold tracking-widest px-4 py-1.5 rounded-full"
            style={{ color: "var(--gl-coral)", background: "var(--gl-coral-bg)" }}
          >
            {t("price_badge")}
          </span>
          <h2 className="text-4xl font-bold mt-5" style={{ color: "var(--gl-heading)" }}>
            {t("price_h2")}
          </h2>
          <p className="mt-4 max-w-md mx-auto" style={{ color: "var(--gl-muted)" }}>
            {t("price_sub")}
          </p>

          <div className="flex items-center justify-center gap-3 mt-7">
            <span className="text-sm" style={{ color: annual ? "var(--gl-muted)" : "var(--gl-heading)", fontWeight: annual ? 400 : 600 }}>
              {t("price_monthly")}
            </span>
            <button
              onClick={() => setAnnual(a => !a)}
              className="relative w-11 h-6 rounded-full transition-all duration-300"
              style={{ background: annual ? "#E8654A" : "var(--gl-border-default)" }}
            >
              <div
                className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-300"
                style={{ left: annual ? "calc(100% - 1.4rem)" : "0.125rem" }}
              />
            </button>
            <span className="text-sm" style={{ color: annual ? "var(--gl-heading)" : "var(--gl-muted)", fontWeight: annual ? 600 : 400 }}>
              {t("price_annual")}
            </span>
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(34,176,125,0.12)",
                color:      "#22B07D",
                opacity:    annual ? 1 : 0,
                transition: "opacity 0.3s",
              }}
            >
              {t("price_save")}
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {PLANS.map((plan, i) => {
            const price = annual ? plan.price.annual : plan.price.monthly;
            const isHov = hov === i;
            const isPop = plan.popular;

            return (
              <div
                key={plan.key}
                className="pcard rounded-2xl p-6 relative flex flex-col cursor-default"
                style={{
                  background:  isPop ? "#2B3141" : "var(--gl-bg-card)",
                  border:      `1px solid ${isHov ? plan.color : isPop ? "transparent" : "var(--gl-border-subtle)"}`,
                  transform:   isPop
                    ? (isHov ? "translateY(-8px) scale(1.015)" : "translateY(-4px) scale(1.01)")
                    : (isHov ? "translateY(-6px)"               : "translateY(0)"),
                  boxShadow:   isPop
                    ? `0 24px 60px rgba(0,0,0,0.18)${isHov ? `, 0 0 0 1.5px ${plan.color}` : ""}`
                    : isHov ? `0 16px 40px rgba(0,0,0,0.07), 0 0 0 1px ${plan.color}` : "none",
                  transition:  "all 0.3s ease",
                }}
                onMouseEnter={() => setHov(i)}
                onMouseLeave={() => setHov(null)}
              >
                {isPop && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold px-3 py-1 rounded-full text-white"
                    style={{ background: "#E8654A", boxShadow: "0 4px 12px rgba(232,101,74,0.5)" }}
                  >
                    {t("price_popular")}
                  </div>
                )}

                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: plan.color }} />
                  <span
                    className="text-sm font-semibold"
                    style={{ color: isPop ? "#e6edf3" : "var(--gl-heading)" }}
                  >
                    {plan.name}
                  </span>
                </div>

                <div className="flex items-end gap-1.5 mb-2 mt-3">
                  <span
                    className="text-4xl font-black"
                    style={{ color: isPop ? "#e6edf3" : "var(--gl-heading)", lineHeight: 1 }}
                  >
                    {price === 0 ? t("price_free") : `$${price}`}
                  </span>
                  {price > 0 && (
                    <span className="text-sm mb-1" style={{ color: isPop ? "#8b949e" : "var(--gl-muted)" }}>
                      /{plan.period}
                    </span>
                  )}
                </div>
                {price > 0 && annual && (
                  <div className="text-[10px] mb-1" style={{ color: "#22B07D" }}>
                    {t("price_billed", { price: plan.price.monthly })}
                  </div>
                )}
                {price === 0 && (
                  <div className="text-[10px] mb-1" style={{ color: isPop ? "#8b949e" : "var(--gl-muted)" }}>
                    {plan.period}
                  </div>
                )}

                <p
                  className="text-xs leading-relaxed mb-5 mt-1"
                  style={{ color: isPop ? "#8b949e" : "var(--gl-muted)" }}
                >
                  {plan.desc}
                </p>

                <div
                  className="h-px mb-5"
                  style={{ background: isPop ? "rgba(255,255,255,0.08)" : "var(--gl-border-subtle)" }}
                />

                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-2.5 text-xs"
                      style={{ color: f.avail ? (isPop ? "#cdd9e5" : "var(--gl-body)") : (isPop ? "#6e7681" : "var(--gl-placeholder)") }}>
                      <CheckIcon avail={f.avail} color={plan.color} />
                      {f.text}
                    </li>
                  ))}
                </ul>

                <button
                  className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                  style={{
                    background: isPop ? "#E8654A"       : "transparent",
                    border:     isPop ? "none"           : `1.5px solid ${plan.color}`,
                    color:      isPop ? "#ffffff"        : plan.color,
                    boxShadow:  isPop && isHov ? "0 6px 20px rgba(232,101,74,0.4)" : "none",
                    transform:  isHov ? "translateY(-1px)" : "translateY(0)",
                  }}
                  onMouseEnter={e => { if (!isPop) e.currentTarget.style.background = `${plan.color}12`; }}
                  onMouseLeave={e => { if (!isPop) e.currentTarget.style.background = "transparent"; }}
                >
                  {plan.ctaIcon && (
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                      <path d={GH_PATH} />
                    </svg>
                  )}
                  {plan.cta}
                </button>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs mt-8" style={{ color: "var(--gl-muted)" }}>
          {t("price_note_pre")}{" "}
          <span className="font-semibold" style={{ color: "var(--gl-heading)" }}>
            {t("price_note_trial")}
          </span>
          {t("price_note_post")}
        </p>

      </div>
    </section>
  );
};

export default PricingSection;
