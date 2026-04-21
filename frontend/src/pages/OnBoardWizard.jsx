import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { icons } from "../components/onboarding/OnBoardIcons.jsx";
import { getStepsTree } from "../components/onboarding/OnBoardStepsTree.js";
import OptionCard from "../components/onboarding/OnBoardOptionCard.jsx";
import CompleteScreen from "../components/onboarding/OnBoardCompleteScreen.jsx";
import api from "../api/api.js";
import i18n from "../locales/i18n.js";

const LANGS = [
  { code: "en", label: "EN" },
  { code: "uz", label: "UZ" },
  { code: "ru", label: "RU" },
];

export default function OnBoardWizard() {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [animState, setAnimState] = useState("idle");
  const [isComplete, setIsComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("gl-theme") || "light"
  );
  const [lang, setLang] = useState(
    () => localStorage.getItem("lang") || i18n.language || "en"
  );

  const totalSteps = 5;
  const isDark = theme === "dark";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("gl-theme", theme);
  }, [theme]);

  const handleThemeToggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  const handleLangChange = (code) => {
    setLang(code);
    i18n.changeLanguage(code);
    localStorage.setItem("lang", code);
  };

  const STEPS_TREE = getStepsTree(t);

  const getStepData = () => {
    if (step === 1) return STEPS_TREE[1];
    if (step === 2) {
      const role = answers[1];
      return STEPS_TREE[2][role] || STEPS_TREE[1];
    }
    return STEPS_TREE[step];
  };

  const stepData = getStepData();

  useEffect(() => {
    setSelected(answers[step] || null);
  }, [step]);

  const handleSelect = (optionId) => {
    setSelected(optionId);
    setSubmitError(null);
  };

  const handleNext = async () => {
    if (!selected) return;
    const finalAnswers = { ...answers, [step]: selected };
    setAnswers(finalAnswers);

    if (step === totalSteps) {
      setIsSubmitting(true);
      setSubmitError(null);
      try {
        await api.post("/api/onboarding", {
          role:            finalAnswers[1],
          stack:           finalAnswers[2],
          experience:      finalAnswers[3],
          goal:            finalAnswers[4],
          workspace_style: finalAnswers[5],
        });
        setAnimState("exit-left");
        setTimeout(() => {
          setIsComplete(true);
          setAnimState("idle");
        }, 480);
      } catch (err) {
        const status = err?.response?.status;
        const msg =
          err?.response?.data?.message ||
          err?.message ||
          "Something went wrong. Please try again.";
        setSubmitError(status ? `${msg} (HTTP ${status})` : msg);
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    setAnimState("exit-left");
    setTimeout(() => {
      setStep((s) => s + 1);
      setAnimState("enter-right");
      setTimeout(() => setAnimState("idle"), 50);
    }, 480);
  };

  const handleBack = () => {
    if (step === 1) return;
    setAnimState("exit-right");
    setTimeout(() => {
      setStep((s) => s - 1);
      setAnimState("enter-left");
      setTimeout(() => setAnimState("idle"), 50);
    }, 480);
  };

  const getContentStyle = () => {
    switch (animState) {
      case "exit-left":   return { animation: "slideOutLeft 0.48s cubic-bezier(0.55,0,1,0.45) forwards" };
      case "exit-right":  return { animation: "slideOutRight 0.48s cubic-bezier(0.55,0,1,0.45) forwards" };
      case "enter-right": return { animation: "slideInFromRight 0.55s cubic-bezier(0.22,1,0.36,1) forwards" };
      case "enter-left":  return { animation: "slideInFromLeft 0.55s cubic-bezier(0.22,1,0.36,1) forwards" };
      default: return {};
    }
  };

  const progressPct = (step / totalSteps) * 100;
  const gridCols =
    stepData?.options?.length <= 4 ? "grid-cols-2 sm:grid-cols-4" :
    stepData?.options?.length === 5 ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-5" :
    "grid-cols-2 sm:grid-cols-3";

  const cssVars = isDark ? `
    :root {
      --coral: #E8654A; --coral-hover: #F0785D; --coral-pressed: #C04020;
      --coral-light: rgba(232,101,74,0.15);
      --charcoal: #C8D0E8; --charcoal-dark: #EEF1F7;
      --frost: #0F1117; --white: #1A1F2E;
      --muted: #8B97C8; --placeholder: #4A5580;
      --border-subtle: #1E2436; --border-default: #2A3050; --border-strong: #3D4870;
      --card-surface: #1A1F2E; --input-bg: #141927; --dark-surface: #0F1117;
      --grid-color: rgba(255,255,255,0.04);
      --blob-coral-opacity: 0.10; --blob-charcoal-opacity: 0.12;
      --center-glow: rgba(232,101,74,0.18); --dot-opacity: 0.30;
    }
  ` : `
    :root {
      --coral: #E8654A; --coral-hover: #D4512F; --coral-pressed: #C04020;
      --coral-light: #FCEEE9;
      --charcoal: #2B3141; --charcoal-dark: #181D2A;
      --frost: #EEF1F7; --white: #FFFFFF;
      --muted: #5C648B; --placeholder: #9AABB4;
      --border-subtle: #E2E5EE; --border-default: #C8CDD9; --border-strong: #9AABB4;
      --card-surface: #FFFFFF; --input-bg: #F4F6F8; --dark-surface: #2B3141;
      --grid-color: rgba(43,49,65,0.06);
      --blob-coral-opacity: 0.07; --blob-charcoal-opacity: 0.05;
      --center-glow: rgba(232,101,74,0.14); --dot-opacity: 0.25;
    }
  `;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Plus Jakarta Sans', sans-serif; }
        h1, h2, .brand { font-family: 'Plus Jakarta Sans', sans-serif; }

        ${cssVars}

        @keyframes slideOutLeft { from{opacity:1;transform:translateX(0)} to{opacity:0;transform:translateX(-64px)} }
        @keyframes slideOutRight { from{opacity:1;transform:translateX(0)} to{opacity:0;transform:translateX(64px)} }
        @keyframes slideInFromRight { from{opacity:0;transform:translateX(72px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideInFromLeft { from{opacity:0;transform:translateX(-72px)} to{opacity:1;transform:translateX(0)} }
        @keyframes cardReveal { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeInDown { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes floatDot { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes pulseGlow { 0%,100%{opacity:0.08;transform:scale(0.96)} 50%{opacity:0.18;transform:scale(1.04)} }
        @keyframes orbitGlow { from{transform:rotate(0deg) translateX(18px) rotate(0deg)} to{transform:rotate(360deg) translateX(18px) rotate(-360deg)} }
        @keyframes shimmerLine { 0%{transform:translateX(-110%);opacity:0} 35%{opacity:0.65} 100%{transform:translateX(230%);opacity:0} }
        @keyframes cardSelectedGlow {
          0%,100%{box-shadow:0 0 0 4px rgba(232,101,74,0.1),0 4px 16px rgba(232,101,74,0.12)}
          50%{box-shadow:0 0 0 6px rgba(232,101,74,0.16),0 8px 22px rgba(232,101,74,0.2)}
        }
        @keyframes iconSelectedBreath { 0%,100%{filter:drop-shadow(0 0 0 rgba(255,255,255,0))} 50%{filter:drop-shadow(0 0 10px rgba(255,255,255,0.38))} }
        @keyframes badgePulse { 0%,100%{transform:scale(1);box-shadow:0 0 0 0 rgba(232,101,74,0.35)} 50%{transform:scale(1.06);box-shadow:0 0 0 6px rgba(232,101,74,0)} }
        @keyframes cardFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes cardIdlePulse { 0%,100%{box-shadow:0 1px 4px rgba(43,49,65,0.06)} 50%{box-shadow:0 6px 16px rgba(43,49,65,0.11)} }
        @keyframes badgeAppear { from{opacity:0;transform:scale(0.84)} to{opacity:1;transform:scale(1)} }
        @keyframes spinLoader { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes errorShake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-6px)} 40%,80%{transform:translateX(6px)} }

        .brand-logo { font-weight:800; letter-spacing:-0.02em; color:var(--charcoal-dark); }
        .brand-logo span { color:var(--coral); }

        .step-dot { width:8px; height:8px; border-radius:50%; background:var(--border-default); transition:all 0.3s ease; }
        .step-dot.active { background:var(--coral); width:24px; border-radius:4px; }
        .step-dot.done { background:var(--coral); opacity:0.4; }

        .btn-primary {
          background:var(--coral); color:white; border:none;
          font-weight:600; letter-spacing:0.01em;
          transition:all 0.2s ease;
          box-shadow:0 2px 12px rgba(232,101,74,0.28);
        }
        .btn-primary:hover:not(:disabled) { background:var(--coral-hover); box-shadow:0 4px 20px rgba(232,101,74,0.38); transform:translateY(-1px); }
        .btn-primary:active:not(:disabled) { background:var(--coral-pressed); transform:translateY(0); }
        .btn-primary:disabled { background:var(--coral); opacity:0.45; cursor:not-allowed; box-shadow:none; }

        .btn-secondary {
          background:transparent; color:var(--muted);
          border:1.5px solid var(--border-default); font-weight:500;
          transition:all 0.2s ease;
        }
        .btn-secondary:hover:not(:disabled) { background:var(--border-subtle); border-color:var(--border-strong); color:var(--charcoal); }
        .btn-secondary:disabled { opacity:0.35; cursor:not-allowed; }

        .decorative-grid {
          background-image: linear-gradient(var(--grid-color) 1px,transparent 1px), linear-gradient(90deg,var(--grid-color) 1px,transparent 1px);
          background-size:40px 40px;
        }

        .theme-toggle {
          position:relative; width:48px; height:26px; border-radius:999px;
          border:1.5px solid var(--border-default);
          cursor:pointer; display:flex; align-items:center; padding:2px;
          transition: background 0.35s ease, border-color 0.35s ease;
        }
        .theme-toggle-knob {
          width:20px; height:20px; border-radius:50%;
          background:var(--coral);
          transition:transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
          display:flex; align-items:center; justify-content:center; font-size:11px;
        }
        .theme-toggle.dark-mode .theme-toggle-knob { transform:translateX(22px); }

        .lang-btn {
          font-size:11px; font-weight:700; letter-spacing:0.08em;
          padding:4px 9px; border-radius:7px; border:1.5px solid transparent;
          cursor:pointer; transition:all 0.18s ease;
          color:var(--muted); background:transparent;
        }
        .lang-btn.active { background:var(--coral-light); color:var(--coral); border-color:rgba(232,101,74,0.25); }
        .lang-btn:hover:not(.active) { background:var(--border-subtle); color:var(--charcoal); }

        .error-bar {
          animation:errorShake 0.4s ease;
          background:rgba(220,60,60,0.10); border:1px solid rgba(220,60,60,0.30);
          color:#dc3c3c; border-radius:10px; padding:8px 16px;
          font-size:13px; font-weight:500; text-align:center;
        }
        ::-webkit-scrollbar { display:none; }
      `}</style>

      <div
        className="min-h-screen w-full relative flex flex-col overflow-hidden"
        style={{ background: "var(--frost)", transition: "background 0.45s cubic-bezier(0.22,1,0.36,1)" }}
      >
        {/* Decorative BG */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 opacity-100 decorative-grid" />
          <div className="absolute rounded-full" style={{ width:"500px", height:"500px", background:"radial-gradient(circle,#E8654A 0%,transparent 70%)", top:"-180px", right:"-120px", opacity:"var(--blob-coral-opacity)", animation:"pulseGlow 7s ease-in-out infinite" }} />
          <div className="absolute rounded-full" style={{ width:"400px", height:"400px", background:"radial-gradient(circle,#2B3141 0%,transparent 70%)", bottom:"-140px", left:"-100px", opacity:"var(--blob-charcoal-opacity)", animation:"pulseGlow 8.5s ease-in-out infinite 0.9s" }} />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ width:"620px", height:"620px", background:"radial-gradient(circle,var(--center-glow) 0%,transparent 70%)", animation:"pulseGlow 6.8s ease-in-out infinite" }} />
          <div className="absolute left-[22%] top-[24%] w-2 h-2 rounded-full" style={{ background:"var(--coral)", boxShadow:"0 0 18px rgba(232,101,74,0.55)", animation:"orbitGlow 7.2s linear infinite", opacity:0.72 }} />
          <div className="absolute right-[20%] bottom-[26%] w-1.5 h-1.5 rounded-full" style={{ background:"var(--charcoal)", boxShadow:"0 0 14px rgba(43,49,65,0.45)", animation:"orbitGlow 9.4s linear infinite reverse", opacity:0.45 }} />
          <div className="absolute w-2.5 h-2.5 rounded-full" style={{ background:"var(--coral)", opacity:"var(--dot-opacity)", top:"12%", left:"8%", animation:"floatDot 4s ease-in-out infinite" }} />
          <div className="absolute w-1.5 h-1.5 rounded-full" style={{ background:"var(--coral)", opacity:0.18, top:"28%", right:"12%", animation:"floatDot 5.5s ease-in-out infinite 1s" }} />
          <div className="absolute w-2 h-2 rounded-full" style={{ background:"var(--charcoal)", opacity:0.12, bottom:"22%", left:"14%", animation:"floatDot 6s ease-in-out infinite 0.5s" }} />
          <div className="absolute w-1 h-1 rounded-full" style={{ background:"var(--coral)", opacity:0.3, bottom:"35%", right:"8%", animation:"floatDot 3.5s ease-in-out infinite 2s" }} />
          <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background:"linear-gradient(90deg,transparent 0%,var(--coral) 30%,var(--coral) 70%,transparent 100%)" }} />
          <div className="absolute top-0 left-0 h-[3px] w-[120px]" style={{ background:"linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.9) 48%,transparent 100%)", animation:"shimmerLine 4.5s ease-in-out infinite" }} />
        </div>

        {/* Header */}
        <header className="relative z-10 flex items-center justify-between px-6 pt-6 pb-0 gap-4" style={{ animation:"fadeInDown 0.5s ease forwards" }}>
          <div className="brand-logo text-xl shrink-0">Git<span>Luma</span></div>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} className={`step-dot ${i + 1 === step ? "active" : i + 1 < step ? "done" : ""}`} />
            ))}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Language switcher */}
            <div
              className="flex items-center gap-1 px-1.5 py-1 rounded-xl"
              style={{ background:"var(--white)", border:"1.5px solid var(--border-default)" }}
            >
              {LANGS.map((l) => (
                <button key={l.code} onClick={() => handleLangChange(l.code)} className={`lang-btn ${lang === l.code ? "active" : ""}`}>
                  {l.label}
                </button>
              ))}
            </div>

            {/* Theme toggle */}
            <div
              className={`theme-toggle ${isDark ? "dark-mode" : ""}`}
              onClick={handleThemeToggle}
              title={isDark ? t("ob_theme_light") : t("ob_theme_dark")}
              style={{ background: isDark ? "#1A1F2E" : "#FFFFFF" }}
            >
              <div className="theme-toggle-knob">{isDark ? "🌙" : "☀️"}</div>
            </div>

            <div className="text-xs font-semibold tracking-widest uppercase hidden sm:block" style={{ color:"var(--placeholder)" }}>
              {String(step).padStart(2,"0")} / {String(totalSteps).padStart(2,"0")}
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-10">
          <div className="w-full max-w-3xl" style={{ minHeight:"440px" }}>
            <div key={`content-${step}`} style={getContentStyle()}>
              {isComplete ? (
                <CompleteScreen answers={answers} isDark={isDark} />
              ) : (
                <div className="flex flex-col items-center gap-10">
                  <div className="text-center" style={{ animation:"fadeInDown 0.45s ease forwards" }}>
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-5"
                      style={{ background:"var(--coral-light)", color:"var(--coral)", border:"1px solid rgba(232,101,74,0.2)" }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background:"var(--coral)" }} />
                      {t("ob_step")} {step} {t("ob_of")} {totalSteps}
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-3" style={{ color:"var(--charcoal-dark)", letterSpacing:"-0.02em" }}>
                      {stepData.question}
                    </h1>
                    <p className="text-base max-w-md mx-auto leading-relaxed font-normal" style={{ color:"var(--muted)" }}>
                      {stepData.subtitle}
                    </p>
                  </div>

                  <div className={`grid ${gridCols} gap-3 w-full`}>
                    {stepData.options.map((opt, idx) => (
                      <OptionCard
                        key={opt.id}
                        option={opt}
                        selected={selected === opt.id}
                        onClick={() => handleSelect(opt.id)}
                        index={idx}
                        isDark={isDark}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Bottom Bar */}
        {!isComplete && (
          <div className="relative z-10 px-8 pb-8">
            {submitError && <div className="error-bar mb-4">{submitError}</div>}

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-[3px] rounded-full overflow-hidden" style={{ background:"var(--border-default)" }}>
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width:`${progressPct}%`, background:"linear-gradient(90deg,var(--coral),#F0875F)" }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button onClick={handleBack} disabled={step === 1} className="btn-secondary px-5 py-2.5 rounded-xl text-sm">
                ← {t("ob_back")}
              </button>

              <button
                onClick={handleNext}
                disabled={!selected || isSubmitting}
                className="btn-primary px-8 py-3 rounded-xl text-sm flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" style={{ animation:"spinLoader 0.8s linear infinite" }}>
                      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5"/>
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    {step === totalSteps ? t("ob_finish") : t("ob_continue")}
                    {selected && <span style={{ display:"inline-flex" }}>{icons.arrow_right}</span>}
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
