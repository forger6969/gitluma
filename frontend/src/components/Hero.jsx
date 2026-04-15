import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import SoftAurora from "./SoftAurora";

const GH_PATH =
  "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12";

// ── Floating card: live commit feed ──────────────────────────────────────────
const LiveCommitCard = () => {
  const COMMITS = [
    { user: "A", color: "#3A7EE8", msg: "GLM-1: add auth module",  time: "just now", branch: "feat/auth" },
    { user: "M", color: "#22B07D", msg: "GLM-3: fix token refresh", time: "2m ago",   branch: "fix/tokens" },
    { user: "J", color: "#E8654A", msg: "GLM-5: update docs",       time: "5m ago",   branch: "docs" },
  ];
  return (
    <div
      className="rounded-2xl overflow-hidden shadow-xl"
      style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)", width: 230 }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2 px-4 py-2.5 border-b"
        style={{ borderColor: "var(--gl-border-subtle)" }}
      >
        <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#22B07D" }} />
        <span className="text-xs font-semibold" style={{ color: "var(--gl-heading)" }}>
          Live Commits
        </span>
        <span
          className="ml-auto text-[9px] px-1.5 py-0.5 rounded font-semibold"
          style={{ background: "rgba(34,176,125,0.12)", color: "#22B07D" }}
        >
          3 today
        </span>
      </div>
      {/* Commit rows */}
      {COMMITS.map((c, i) => (
        <div
          key={i}
          className="flex items-center gap-2.5 px-4 py-2.5"
          style={{ borderBottom: i < 2 ? `1px solid var(--gl-border-subtle)` : "none" }}
        >
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
            style={{ background: c.color }}
          >
            {c.user}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-mono truncate" style={{ color: "var(--gl-body)" }}>
              {c.msg}
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span
                className="text-[9px] px-1 py-px rounded font-mono"
                style={{ background: "var(--gl-bg-page)", color: "var(--gl-muted)" }}
              >
                {c.branch}
              </span>
              <span className="text-[9px]" style={{ color: "var(--gl-muted)" }}>
                {c.time}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ── Floating card: team activity ──────────────────────────────────────────────
const TeamActivityCard = () => {
  const TEAM = [
    { letter: "A", name: "Alex",  task: "feat: auth module",  color: "#3A7EE8", status: "coding" },
    { letter: "M", name: "Maria", task: "fix: token refresh", color: "#22B07D", status: "review" },
    { letter: "J", name: "Jake",  task: "docs: API guide",    color: "#E8654A", status: "writing" },
  ];
  return (
    <div
      className="rounded-2xl overflow-hidden shadow-xl"
      style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)", width: 210 }}
    >
      <div
        className="flex items-center gap-2 px-4 py-2.5 border-b"
        style={{ borderColor: "var(--gl-border-subtle)" }}
      >
        <span className="text-xs font-semibold" style={{ color: "var(--gl-heading)" }}>
          Team Activity
        </span>
        <div className="ml-auto flex -space-x-1.5">
          {TEAM.map((m, i) => (
            <div
              key={i}
              className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-bold"
              style={{ background: m.color, outline: "2px solid var(--gl-bg-card)" }}
            >
              {m.letter}
            </div>
          ))}
        </div>
      </div>
      {TEAM.map((m, i) => (
        <div
          key={i}
          className="flex items-center gap-2.5 px-4 py-2.5"
          style={{ borderBottom: i < 2 ? `1px solid var(--gl-border-subtle)` : "none" }}
        >
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
            style={{ background: m.color }}
          >
            {m.letter}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-medium truncate" style={{ color: "var(--gl-body)" }}>
              {m.name}
            </div>
            <div className="text-[9px] truncate" style={{ color: "var(--gl-muted)" }}>
              {m.task}
            </div>
          </div>
          <span
            className="text-[9px] px-1.5 py-0.5 rounded font-medium shrink-0"
            style={{ background: "var(--gl-bg-page)", color: "var(--gl-muted)" }}
          >
            {m.status}
          </span>
        </div>
      ))}
    </div>
  );
};

// ── Main Hero ─────────────────────────────────────────────────────────────────
const Hero = () => {
  const { t }          = useTranslation();
  const heroRef        = useRef(null);
  const [btn1, setBtn1] = useState(false);
  const [btn2, setBtn2] = useState(false);

  const STATS = [
    { value: t("stat_rt"),     label: t("stat_rt_lbl")   },
    { value: t("stat_auto_v"), label: t("stat_auto_lbl") },
    { value: t("stat_1c"),     label: t("stat_1c_lbl")   },
  ];

  useEffect(() => {
    const section = heroRef.current;
    if (!section) return;

    const leftCard  = section.querySelector("#hero-left-card");
    const rightCard = section.querySelector("#hero-right-card");

    if (leftCard)  gsap.fromTo(leftCard,  { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", delay: 0.6 });
    if (rightCard) gsap.fromTo(rightCard, { opacity: 0, x:  30 }, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", delay: 0.9 });

    // subtle float animation
    if (leftCard)  gsap.to(leftCard,  { y: -8, duration: 3.5, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.4 });
    if (rightCard) gsap.to(rightCard, { y:  8, duration: 4.0, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.8 });
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative flex flex-col items-center text-center pt-20 pb-28 px-4 overflow-hidden"
      style={{ background: "var(--gl-bg-page)" }}
    >
      {/* Aurora background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-[75%] opacity-70">
          <SoftAurora speed={0.4} scale={1.4} brightness={0.85} color1="#E8654A" color2="#2B3141" />
        </div>
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, var(--gl-bg-page) 0%, transparent 100%)" }}
        />
      </div>

      {/* Floating left card — Live Commits */}
      <div
        id="hero-left-card"
        className="absolute left-6 top-1/2 -translate-y-1/2 z-10 hidden xl:block"
        style={{ opacity: 0 }}
      >
        <LiveCommitCard />
      </div>

      {/* Floating right card — Team Activity */}
      <div
        id="hero-right-card"
        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 hidden xl:block"
        style={{ opacity: 0 }}
      >
        <TeamActivityCard />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center max-w-3xl">

        {/* Badge */}
        <div
          className="flex items-center gap-2 text-xs px-4 py-1.5 rounded-full mb-8"
          style={{
            background: "var(--gl-bg-card)",
            border:     "1px solid var(--gl-border-subtle)",
            color:      "var(--gl-heading)",
            boxShadow:  "var(--gl-shadow)",
          }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--gl-coral)" }} />
          <span className="font-medium">{t("hero_badge")}</span>
        </div>

        {/* Headline */}
        <h1
          className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight"
          style={{ color: "var(--gl-heading)" }}
        >
          {t("hero_h1")}
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(to right,#E8654A,#D4512F)" }}
          >
            {t("hero_h2")}
          </span>
          <br />
          {t("hero_h3")}
        </h1>

        {/* Subtitle */}
        <p className="mt-7 max-w-2xl text-lg leading-relaxed" style={{ color: "var(--gl-muted)" }}>
          {t("hero_sub")}
        </p>

        {/* Buttons */}
        <div className="flex gap-4 items-center mt-10 flex-wrap justify-center">
          <button
            className="flex items-center gap-2.5 font-semibold px-7 py-4 rounded-xl transition-all duration-200"
            style={{
              background:  btn1 ? "#3a4155" : "var(--gl-body)",
              color:       "#FFFFFF",
              boxShadow:   btn1 ? "0 8px 24px rgba(43,49,65,0.4)" : "0 2px 8px rgba(43,49,65,0.2)",
              transform:   btn1 ? "translateY(-2px)" : "translateY(0)",
            }}
            onMouseEnter={() => setBtn1(true)}
            onMouseLeave={() => setBtn1(false)}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
              <path d={GH_PATH} />
            </svg>
            {t("hero_github")}
          </button>

          <button
            className="font-semibold px-7 py-4 rounded-xl transition-all duration-200"
            style={{
              background: btn2 ? "var(--gl-sec-hover)" : "transparent",
              border:     "1.5px solid var(--gl-border-default)",
              color:      "var(--gl-body)",
              transform:  btn2 ? "translateY(-2px)" : "translateY(0)",
            }}
            onMouseEnter={() => setBtn2(true)}
            onMouseLeave={() => setBtn2(false)}
          >
            {t("view_docs")}
          </button>
        </div>

        {/* Stats strip */}
        <div
          className="flex gap-0 items-center mt-16 rounded-2xl overflow-hidden"
          style={{
            background: "var(--gl-bg-card)",
            border:     "1px solid var(--gl-border-subtle)",
            boxShadow:  "var(--gl-shadow)",
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              className="text-center px-8 py-4"
              style={{
                borderRight: i < STATS.length - 1 ? "1px solid var(--gl-border-subtle)" : "none",
              }}
            >
              <div className="text-xl font-bold" style={{ color: "var(--gl-heading)" }}>
                {s.value}
              </div>
              <div className="text-xs mt-0.5" style={{ color: "var(--gl-muted)" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Social proof */}
        <div className="flex items-center gap-3 mt-6">
          <div className="flex -space-x-2">
            {["#3A7EE8", "#22B07D", "#E8654A", "#9370DB", "#F59E0B"].map((c, i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                style={{ background: c, outline: "2px solid var(--gl-bg-page)" }}
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <p className="text-sm" style={{ color: "var(--gl-muted)" }}>
            Trusted by <span className="font-semibold" style={{ color: "var(--gl-heading)" }}>200+</span> dev teams
          </p>
        </div>

      </div>
    </div>
  );
};

export default Hero;
