import { useState, useEffect } from "react";
import { icons } from "../components/onboarding/OnBoardIcons.jsx";
import { STEPS_TREE } from "../components/onboarding/OnBoardStepsTree.js";
import OptionCard from "../components/onboarding/OnBoardOptionCard.jsx";
import CompleteScreen from "../components/onboarding/OnBoardCompleteScreen.jsx";

const ONBOARDING_STORAGE_KEY = "gitluma_onboarding";

export default function OnBoardWizard() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [animState, setAnimState] = useState("idle"); 
  const [isComplete, setIsComplete] = useState(false);
  const totalSteps = 5;

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
  };

  const handleNext = () => {
    if (!selected) return;
    const finalAnswers = { ...answers, [step]: selected };
    setAnswers(finalAnswers);

    if (step === totalSteps) {
      try {
        localStorage.setItem(
          ONBOARDING_STORAGE_KEY,
          JSON.stringify({
            answers: finalAnswers,
            completed: true,
            completedAt: new Date().toISOString(),
          })
        );
      } catch (error) {
        console.error("Failed to save onboarding answers", error);
      }
      setAnimState("exit-left");
      setTimeout(() => {
        setIsComplete(true);
        setAnimState("idle");
      }, 480);
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
      case "exit-left": return { animation: "slideOutLeft 0.48s cubic-bezier(0.55,0,1,0.45) forwards" };
      case "exit-right": return { animation: "slideOutRight 0.48s cubic-bezier(0.55,0,1,0.45) forwards" };
      case "enter-right": return { animation: "slideInFromRight 0.55s cubic-bezier(0.22,1,0.36,1) forwards" };
      case "enter-left": return { animation: "slideInFromLeft 0.55s cubic-bezier(0.22,1,0.36,1) forwards" };
      default: return {};
    }
  };

  const progressPct = (step / totalSteps) * 100;
  const gridCols = stepData?.options?.length <= 4 ? "grid-cols-2 sm:grid-cols-4" :
                   stepData?.options?.length === 5 ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-5" :
                   "grid-cols-2 sm:grid-cols-3";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        * { font-family: 'DM Sans', sans-serif; }
        h1, h2, .brand { font-family: 'Syne', sans-serif; }

        @keyframes slideOutLeft {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(-72px); }
        }
        @keyframes slideOutRight {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(72px); }
        }
        @keyframes slideInFromRight {
          from { opacity: 0; transform: translateX(80px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInFromLeft {
          from { opacity: 0; transform: translateX(-80px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatA {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-18px) translateX(10px); }
          66% { transform: translateY(8px) translateX(-8px); }
        }
        @keyframes floatB {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(14px) translateX(-12px); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes progressFill {
          from { width: 0% }
        }
        .brand { letter-spacing: 0.06em; }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      <div
        className="min-h-screen w-full relative flex flex-col overflow-hidden"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, #1e1040 0%, #0d1117 60%, #090d14 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-96 h-96 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)", top: "-80px", left: "20%", animation: "floatA 12s ease-in-out infinite" }} />
          <div className="absolute w-64 h-64 rounded-full opacity-8"
            style={{ background: "radial-gradient(circle, #4f46e5 0%, transparent 70%)", bottom: "10%", right: "15%", animation: "floatB 9s ease-in-out infinite" }} />
          <div className="absolute w-48 h-48 rounded-full opacity-5"
            style={{ background: "radial-gradient(circle, #a78bfa 0%, transparent 70%)", top: "40%", right: "30%", animation: "floatA 15s ease-in-out infinite reverse" }} />
          {/* Grid texture */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        </div>

        {/* ── Main Content ── */}
        <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-16">

          {/* Brand */}
          <p className="brand text-slate-400 text-sm font-semibold tracking-widest mb-8 uppercase"
            style={{ animation: "fadeInDown 0.6s ease forwards" }}>
            GitLuma
          </p>

          {/* Content area */}
          <div className="w-full max-w-3xl" style={{ minHeight: "440px" }}>
            <div key={`content-${step}`} style={getContentStyle()}>
              {isComplete ? (
                <CompleteScreen answers={answers} />
              ) : (
                <div className="flex flex-col items-center gap-8">
                  {/* Heading */}
                  <div className="text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-3">
                      {stepData.question}
                    </h1>
                    <p className="text-slate-400 text-base max-w-md mx-auto leading-relaxed">
                      {stepData.subtitle}
                    </p>
                  </div>

                  {/* Cards Grid */}
                  <div className={`grid ${gridCols} gap-3 w-full`}>
                    {stepData.options.map((opt, idx) => (
                      <OptionCard
                        key={opt.id}
                        option={opt}
                        selected={selected === opt.id}
                        onClick={() => handleSelect(opt.id)}
                        index={idx}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* ── Bottom Bar ── */}
        {!isComplete && (
          <div className="relative z-10 px-8 pb-8">
            {/* Progress bar */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-[3px] bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${progressPct}%`,
                    background: "linear-gradient(90deg, #7c3aed, #a78bfa)",
                    boxShadow: "0 0 10px rgba(139,92,246,0.6)",
                  }}
                />
              </div>
              <span className="text-xs font-mono text-slate-500 tracking-widest whitespace-nowrap">
                STEP {String(step).padStart(2, "0")}/{String(totalSteps).padStart(2, "0")}
              </span>
            </div>

          
            <div className="flex items-center justify-between">
              <button
                onClick={handleBack}
                disabled={step === 1}
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 hover:bg-white/10"
              >
                Back
              </button>

              <button
                onClick={handleNext}
                disabled={!selected}
                className={`
                  px-8 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 flex items-center gap-2
                  ${selected
                    ? "bg-violet-600 hover:bg-violet-500 text-white shadow-[0_0_24px_rgba(139,92,246,0.45)] hover:shadow-[0_0_36px_rgba(139,92,246,0.65)] hover:translate-x-0.5"
                    : "bg-white/10 text-slate-500 cursor-not-allowed"
                  }
                `}
              >
                {step === totalSteps ? "Finish" : "Next"}
                {selected && <span className="transition-transform duration-200 group-hover:translate-x-1">{icons.arrow_right}</span>}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}