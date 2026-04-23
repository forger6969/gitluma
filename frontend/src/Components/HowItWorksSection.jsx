import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GH_PATH =
  "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12";

// ── Browser / App window frame ────────────────────────────────────────────────
const AppWindow = ({ url, accentColor, children, hovered }) => (
  <div
    className="rounded-2xl overflow-hidden transition-all duration-300"
    style={{
      border:     `1px solid ${hovered ? accentColor : "var(--gl-border-subtle)"}`,
      boxShadow:  hovered
        ? `0 20px 50px rgba(0,0,0,0.10), 0 0 0 1px ${accentColor}`
        : "0 4px 20px rgba(0,0,0,0.05)",
      transform:  hovered ? "translateY(-4px)" : "translateY(0)",
    }}
  >
    {/* Chrome bar */}
    <div
      className="flex items-center gap-2 px-3.5 py-2.5 border-b"
      style={{
        background:   "var(--gl-bg-card-hdr, var(--gl-bg-card))",
        borderColor:  "var(--gl-border-subtle)",
      }}
    >
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FEBC2E" }} />
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28C840" }} />
      </div>
      <div
        className="flex-1 mx-2 rounded-md px-2.5 py-1 text-[10px] font-mono flex items-center gap-1.5"
        style={{ background: "var(--gl-bg-page)", color: "var(--gl-muted)" }}
      >
        <div className="w-2 h-2 rounded-full shrink-0" style={{ background: accentColor, opacity: 0.8 }} />
        {url}
      </div>
    </div>
    {/* Content */}
    <div style={{ background: "var(--gl-bg-page)" }}>
      {children}
    </div>
  </div>
);

// ── Window 1: GitHub OAuth ────────────────────────────────────────────────────
const AuthWindow = () => (
  <div className="p-5">
    {/* GitLuma logo */}
    <div className="flex flex-col items-center mb-4">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center mb-2"
        style={{ background: "rgba(232,101,74,0.12)" }}
      >
        <span className="text-base">⚡</span>
      </div>
      <div className="text-sm font-bold" style={{ color: "var(--gl-heading)" }}>GitLuma</div>
      <div className="text-[10px] mt-0.5" style={{ color: "var(--gl-muted)" }}>
        Sign in to continue
      </div>
    </div>

    {/* GitHub button */}
    <div
      className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-white mb-3"
      style={{ background: "#24292e" }}
    >
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white">
        <path d={GH_PATH} />
      </svg>
      Continue with GitHub
    </div>

    {/* Authorized state */}
    <div
      className="rounded-xl p-2.5 flex items-center gap-2"
      style={{
        background: "rgba(34,176,125,0.08)",
        border:     "1px solid rgba(34,176,125,0.25)",
      }}
    >
      <div
        className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-bold shrink-0"
        style={{ background: "#22B07D" }}
      >
        A
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] font-semibold" style={{ color: "var(--gl-heading)" }}>
          forger6969
        </div>
        <div className="text-[9px]" style={{ color: "#22B07D" }}>
          Authorized · 12 repos found
        </div>
      </div>
      <span className="text-[10px]" style={{ color: "#22B07D" }}>✓</span>
    </div>
  </div>
);

// ── Window 2: Create Project ──────────────────────────────────────────────────
const CreateWindow = () => (
  <div className="p-5">
    <div className="text-xs font-semibold mb-3" style={{ color: "var(--gl-heading)" }}>
      New Project
    </div>

    {/* Name field */}
    <div className="mb-2">
      <div className="text-[9px] font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--gl-muted)" }}>
        Name
      </div>
      <div
        className="rounded-lg px-2.5 py-2 text-[10px] font-mono"
        style={{
          background:  "var(--gl-bg-card)",
          border:      "1.5px solid var(--gl-coral)",
          color:       "var(--gl-heading)",
        }}
      >
        my-awesome-app
      </div>
    </div>

    {/* Repo field */}
    <div className="mb-3">
      <div className="text-[9px] font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--gl-muted)" }}>
        Repository
      </div>
      <div
        className="rounded-lg px-2.5 py-2 text-[10px] flex items-center justify-between"
        style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}
      >
        <div className="flex items-center gap-1.5">
          <svg viewBox="0 0 16 16" className="w-3 h-3 fill-current" style={{ color: "var(--gl-muted)" }}>
            <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9z"/>
          </svg>
          <span style={{ color: "var(--gl-heading)" }}>forger6969/my-awesome-app</span>
        </div>
        <span style={{ color: "#22B07D" }}>✓</span>
      </div>
    </div>

    {/* Webhook status */}
    <div
      className="flex items-center gap-2 rounded-lg px-2.5 py-2"
      style={{ background: "rgba(34,176,125,0.08)", border: "1px solid rgba(34,176,125,0.2)" }}
    >
      <div className="w-2 h-2 rounded-full animate-pulse shrink-0" style={{ background: "#22B07D" }} />
      <div className="text-[10px]" style={{ color: "#22B07D" }}>
        Webhook auto-wired · Real-time sync active
      </div>
    </div>
  </div>
);

// ── Window 3: Team + Commit notification ──────────────────────────────────────
const TeamWindow = () => (
  <div className="p-5">
    {/* Team header */}
    <div className="flex items-center gap-2 mb-3">
      <div className="flex -space-x-1.5">
        {[
          { l: "A", c: "#3A7EE8" },
          { l: "M", c: "#22B07D" },
          { l: "J", c: "#E8654A" },
        ].map((av, i) => (
          <div
            key={i}
            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold"
            style={{ background: av.c, outline: "2px solid var(--gl-bg-page)" }}
          >
            {av.l}
          </div>
        ))}
      </div>
      <span className="text-[11px] font-semibold" style={{ color: "var(--gl-heading)" }}>
        3 active · 4 tasks
      </span>
    </div>

    {/* Mini kanban */}
    <div
      className="rounded-xl overflow-hidden mb-3"
      style={{ border: "1px solid var(--gl-border-subtle)" }}
    >
      <div className="grid grid-cols-3 divide-x" style={{ divideColor: "var(--gl-border-subtle)" }}>
        {[
          { col: "Todo",       c: "#5C6480", tasks: ["API docs"] },
          { col: "In Progress", c: "#3A7EE8", tasks: ["auth mod"] },
          { col: "Done",        c: "#22B07D", tasks: ["login UI"] },
        ].map((col, ci) => (
          <div
            key={ci}
            className="px-2 py-2"
            style={{ borderRight: ci < 2 ? "1px solid var(--gl-border-subtle)" : "none" }}
          >
            <div className="text-[8px] font-bold uppercase" style={{ color: col.c }}>
              {col.col}
            </div>
            {col.tasks.map((t, ti) => (
              <div
                key={ti}
                className="mt-1 text-[9px] rounded px-1 py-0.5"
                style={{
                  background: ci === 2 ? "rgba(34,176,125,0.12)" : "var(--gl-bg-card)",
                  color:      ci === 2 ? "#22B07D" : "var(--gl-muted)",
                }}
              >
                {t}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>

    {/* Commit toast */}
    <div
      className="flex items-center gap-2.5 rounded-xl px-3 py-2"
      style={{
        background: "rgba(34,176,125,0.07)",
        border:     "1px solid rgba(34,176,125,0.3)",
      }}
    >
      <div
        className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: "rgba(34,176,125,0.2)" }}
      >
        <span className="text-xs">⚡</span>
      </div>
      <div>
        <div className="text-[10px] font-semibold" style={{ color: "var(--gl-heading)" }}>
          New commit by alex
        </div>
        <div className="text-[9px]" style={{ color: "#22B07D" }}>
          GLM-1: auth module → Done ✓
        </div>
      </div>
    </div>
  </div>
);

// ── Arrow connector ───────────────────────────────────────────────────────────
const Arrow = ({ color }) => (
  <div className="hidden md:flex items-center justify-center w-12 shrink-0" style={{ marginTop: -20 }}>
    <div className="flex flex-col items-center gap-1.5">
      <div className="h-px w-8" style={{ background: color, opacity: 0.3 }} />
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M3 8h10M9 4l4 4-4 4"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
        />
      </svg>
    </div>
  </div>
);

// ── Steps config ──────────────────────────────────────────────────────────────
const STEPS_CONFIG = [
  {
    num:   "01",
    color: "#3A7EE8",
    badge: "OAuth 2.0",
    Window: AuthWindow,
    url: "app.gitluma.dev/login",
    bullets: [
      "Sign in once via GitHub",
      "All repos auto-synced",
      "No manual token setup",
    ],
  },
  {
    num:   "02",
    color: "#E8654A",
    badge: "Webhooks",
    Window: CreateWindow,
    url: "app.gitluma.dev/new",
    bullets: [
      "Pick a repo and name your project",
      "Webhook configured automatically",
      "Commits flow in from the first push",
    ],
  },
  {
    num:   "03",
    color: "#22B07D",
    badge: "Live Sync",
    Window: TeamWindow,
    url: "app.gitluma.dev/my-awesome-app",
    bullets: [
      "Invite teammates via email",
      "Assign tasks and track progress",
      "Every commit auto-updates tasks",
    ],
  },
];

// ── Component ─────────────────────────────────────────────────────────────────
const HowItWorksSection = () => {
  const { t }   = useTranslation();
  const ref     = useRef(null);
  const [hov, setHov] = useState(null);

  const STEPS = STEPS_CONFIG.map((s, i) => ({
    ...s,
    title: t(`how${i + 1}_t`),
    desc:  t(`how${i + 1}_d`),
  }));

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    const cols = Array.from(section.querySelectorAll(".hiw-col"));
    gsap.set(cols, { opacity: 0, y: 45 });

    ScrollTrigger.create({
      trigger: section,
      start:   "top 70%",
      once:    true,
      onEnter: () => {
        gsap.to(cols, {
          opacity:  1,
          y:        0,
          duration: 0.7,
          ease:     "power3.out",
          stagger:  0.16,
        });
      },
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

        {/* Header */}
        <div className="text-center mb-14">
          <span
            className="text-xs font-semibold tracking-widest px-4 py-1.5 rounded-full"
            style={{ color: "var(--gl-coral)", background: "var(--gl-coral-bg)" }}
          >
            {t("how_badge")}
          </span>
          <h2 className="text-4xl font-bold mt-5" style={{ color: "var(--gl-heading)" }}>
            {t("how_h2")}
          </h2>
          <p className="mt-4 max-w-md mx-auto" style={{ color: "var(--gl-muted)" }}>
            {t("how_sub")}
          </p>
        </div>

        {/* Steps row */}
        <div className="flex md:flex-row flex-col items-start gap-0">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className="hiw-col flex md:flex-row flex-col flex-1 items-start gap-0 w-full"
            >
              {/* Step content */}
              <div
                className="flex-1 w-full"
                onMouseEnter={() => setHov(i)}
                onMouseLeave={() => setHov(null)}
              >
                {/* Browser window */}
                <AppWindow url={step.url} accentColor={step.color} hovered={hov === i}>
                  <step.Window />
                </AppWindow>

                {/* Step info below window */}
                <div className="px-1 pt-5 pb-2">
                  {/* Number + badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="text-3xl font-black leading-none"
                      style={{
                        color: hov === i ? step.color : "var(--gl-border-default)",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {step.num}
                    </span>
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        background: `${step.color}18`,
                        color:      step.color,
                        border:     `1px solid ${step.color}40`,
                      }}
                    >
                      {step.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-lg font-semibold mb-2 transition-colors duration-200"
                    style={{ color: hov === i ? step.color : "var(--gl-heading)" }}
                  >
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--gl-muted)" }}>
                    {step.desc}
                  </p>

                  {/* Bullet details */}
                  <ul className="space-y-1.5">
                    {step.bullets.map((b, bi) => (
                      <li key={bi} className="flex items-start gap-2 text-xs" style={{ color: "var(--gl-muted)" }}>
                        <span
                          className="shrink-0 mt-px font-bold text-[11px]"
                          style={{ color: step.color }}
                        >
                          ✓
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Arrow between steps */}
              {i < STEPS.length - 1 && <Arrow color={STEPS[i + 1].color} />}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <button
            className="inline-flex items-center gap-2.5 font-semibold px-8 py-4 rounded-xl text-white transition-all duration-200"
            style={{ background: "#E8654A" }}
            onMouseEnter={e => {
              e.currentTarget.style.background  = "#D4512F";
              e.currentTarget.style.transform   = "translateY(-2px)";
              e.currentTarget.style.boxShadow   = "0 8px 24px rgba(232,101,74,0.4)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background  = "#E8654A";
              e.currentTarget.style.transform   = "translateY(0)";
              e.currentTarget.style.boxShadow   = "none";
            }}
            onMouseDown={e  => e.currentTarget.style.background = "#C04020"}
            onMouseUp={e    => e.currentTarget.style.background = "#D4512F"}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
              <path d={GH_PATH} />
            </svg>
            {t("how_cta")}
          </button>
        </div>

      </div>
    </section>
  );
};

export default HowItWorksSection;
