import { useState, useEffect } from "react";

const icons = {
  code: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  server: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
      <rect x="2" y="3" width="20" height="5" rx="1"/><rect x="2" y="10" width="20" height="5" rx="1"/>
      <rect x="2" y="17" width="20" height="5" rx="1"/><circle cx="6" cy="5.5" r="0.5" fill="currentColor"/>
      <circle cx="6" cy="12.5" r="0.5" fill="currentColor"/>
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/>
      <polyline points="2 12 12 17 22 12"/>
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  pen: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
      <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </svg>
  ),
  book: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  ),
  react: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
      <circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="10" ry="4"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>
    </svg>
  ),
  vue: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
      <polyline points="2 4 12 20 22 4"/><polyline points="6 4 12 13 18 4"/>
    </svg>
  ),
  zap: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  node: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
      <path d="M12 2L2 7v10l10 5 10-5V7L12 2z"/>
    </svg>
  ),
  python: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
      <path d="M12 2C8 2 6 4 6 6v4h6v1H4s-3 0-3 5 3 5 3 5h2v-3s0-2 2-2h6s3 0 3-3V7s0-5-5-5z"/>
      <circle cx="9" cy="6" r="1" fill="currentColor"/>
      <path d="M12 22c4 0 6-2 6-4v-4h-6v-1h8s3 0 3-5-3-5-3-5h-2v3s0 2-2 2H10s-3 0-3 3v4s0 5 5 5z"/>
      <circle cx="15" cy="18" r="1" fill="currentColor"/>
    </svg>
  ),
  go: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
      <path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>
    </svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  rocket: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  briefcase: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
      <line x1="12" y1="12" x2="12" y2="12"/>
    </svg>
  ),
  cpu: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
      <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/>
      <line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/>
      <line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/>
      <line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/>
      <line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>
    </svg>
  ),
  figma: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
      <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/>
      <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/>
      <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"/>
      <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"/>
      <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/>
    </svg>
  ),
  solo: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
      <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  ),
  team_sm: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
      <circle cx="9" cy="8" r="3"/><circle cx="17" cy="8" r="3"/>
      <path d="M2 20c0-3 2.7-5.5 7-5.5s7 2.5 7 5.5"/><path d="M17 14.5c2.5.5 5 2.5 5 5.5"/>
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  arrow_right: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  confetti: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
      <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" y1="19" x2="19" y2="13"/>
      <line x1="16" y1="16" x2="20" y2="20"/><line x1="19" y1="21" x2="21" y2="19"/>
    </svg>
  ),
};

const STEPS_TREE = {
  1: {
    question: "Who are you?",
    subtitle: "Help us tailor your workspace by selecting the role that fits you best.",
    options: [
      { id: "frontend", label: "Frontend Dev", sub: "UI / Web", icon: "code" },
      { id: "backend", label: "Backend Dev", sub: "API / Systems", icon: "server" },
      { id: "fullstack", label: "Full Stack", sub: "End-to-End", icon: "layers" },
      { id: "lead", label: "Team Lead", sub: "Project Manager", icon: "users" },
      { id: "designer", label: "Designer", sub: "UI / UX / Brand", icon: "pen" },
      { id: "student", label: "Student", sub: "Early Career / Learner", icon: "book" },
    ],
  },
  2: {
    frontend: {
      question: "What's your primary stack?",
      subtitle: "Choose the framework you work with most. This shapes your dashboard.",
      options: [
        { id: "react", label: "React", sub: "Component-based UI", icon: "react" },
        { id: "vue", label: "Vue.js", sub: "Progressive framework", icon: "vue" },
        { id: "angular", label: "Angular", sub: "Enterprise-grade", icon: "shield" },
        { id: "svelte", label: "Svelte", sub: "Compiler-first", icon: "zap" },
        { id: "vanilla", label: "Vanilla JS", sub: "Pure native web", icon: "globe" },
      ],
    },
    backend: {
      question: "Your main language?",
      subtitle: "Pick the language you breathe. We'll tune your environment.",
      options: [
        { id: "node", label: "Node.js", sub: "JavaScript runtime", icon: "node" },
        { id: "python", label: "Python", sub: "Versatile & popular", icon: "python" },
        { id: "go", label: "Go", sub: "Fast & concurrent", icon: "go" },
        { id: "java", label: "Java / Kotlin", sub: "JVM ecosystem", icon: "cpu" },
        { id: "rust", label: "Rust", sub: "Systems & safety", icon: "shield" },
      ],
    },
    fullstack: {
      question: "Your go-to architecture?",
      subtitle: "We'll pre-configure templates and resources around your stack.",
      options: [
        { id: "mern", label: "MERN", sub: "Mongo · Express · React · Node", icon: "layers" },
        { id: "nextjs", label: "Next.js", sub: "Full-stack React", icon: "react" },
        { id: "trpc", label: "tRPC + React", sub: "End-to-end typesafe", icon: "zap" },
        { id: "django", label: "Django + React", sub: "Python full stack", icon: "python" },
        { id: "rails", label: "Rails", sub: "Convention-driven", icon: "go" },
      ],
    },
    lead: {
      question: "How big is your team?",
      subtitle: "Team size shapes how we organize your projects and permissions.",
      options: [
        { id: "solo", label: "Just me", sub: "Solo contributor", icon: "solo" },
        { id: "small", label: "2 – 5 people", sub: "Small squad", icon: "team_sm" },
        { id: "medium", label: "6 – 20 people", sub: "Growing team", icon: "users" },
        { id: "large", label: "20 + people", sub: "Scaled org", icon: "briefcase" },
      ],
    },
    designer: {
      question: "Your design specialty?",
      subtitle: "Tell us what tools and workflows to surface for you.",
      options: [
        { id: "uiux", label: "UI / UX", sub: "Figma, Prototyping", icon: "figma" },
        { id: "motion", label: "Motion", sub: "Animation, Lottie", icon: "zap" },
        { id: "brand", label: "Brand", sub: "Identity, Systems", icon: "star" },
        { id: "threeD", label: "3D / Illustration", sub: "Blender, Spline", icon: "globe" },
      ],
    },
    student: {
      question: "What are you learning?",
      subtitle: "Pick your current focus so we surface the right resources.",
      options: [
        { id: "webdev", label: "Web Dev", sub: "HTML, CSS, JS", icon: "globe" },
        { id: "mobile", label: "Mobile", sub: "React Native, Swift", icon: "zap" },
        { id: "aiml", label: "AI / ML", sub: "Python, PyTorch", icon: "cpu" },
        { id: "gamedev", label: "Game Dev", sub: "Unity, Godot", icon: "star" },
        { id: "systems", label: "Systems", sub: "C, Rust, OS", icon: "shield" },
      ],
    },
  },
  3: {
    question: "Your experience level?",
    subtitle: "This helps us calibrate the complexity of content and suggestions.",
    options: [
      { id: "junior", label: "Junior", sub: "0 – 2 years", icon: "book" },
      { id: "mid", label: "Mid-Level", sub: "2 – 5 years", icon: "code" },
      { id: "senior", label: "Senior", sub: "5 – 10 years", icon: "star" },
      { id: "staff", label: "Staff / Principal", sub: "10+ years", icon: "shield" },
    ],
  },
  4: {
    question: "What's your main goal?",
    subtitle: "We'll highlight the features and workflows most relevant to you.",
    options: [
      { id: "ship", label: "Ship faster", sub: "Productivity & automation", icon: "rocket" },
      { id: "collab", label: "Collaborate better", sub: "Team sync & review", icon: "users" },
      { id: "learn", label: "Level up skills", sub: "Courses & resources", icon: "book" },
      { id: "manage", label: "Manage projects", sub: "Roadmaps & tracking", icon: "target" },
    ],
  },
  5: {
    question: "Preferred workspace style?",
    subtitle: "Choose the interface density and flow that suits how you think.",
    options: [
      { id: "focused", label: "Focused", sub: "Minimal · one thing at a time", icon: "target" },
      { id: "power", label: "Power User", sub: "Dense · keyboard-first", icon: "cpu" },
      { id: "visual", label: "Visual Thinker", sub: "Kanban · drag & drop", icon: "layers" },
      { id: "social", label: "Collaborative", sub: "Shared · real-time", icon: "users" },
    ],
  },
};

function Particle({ style }) {
  return (
    <div
      className="absolute rounded-full opacity-20 animate-pulse"
      style={style}
    />
  );
}

function OptionCard({ option, selected, onClick, index }) {
  return (
    <button
      onClick={onClick}
      className={`
        group relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl
        border transition-all duration-300 cursor-pointer text-center
        ${selected
          ? "border-violet-500 bg-violet-500/20 shadow-[0_0_30px_rgba(139,92,246,0.3)]"
          : "border-white/10 bg-white/5 hover:border-violet-400/50 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]"
        }
      `}
      style={{
        animationDelay: `${index * 60}ms`,
        animation: "cardReveal 0.5s ease forwards",
        opacity: 0,
        transform: "translateY(16px)",
      }}
    >
      {/* Selected dot */}
      {selected && (
        <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
      )}

      {/* Icon */}
      <div
        className={`
          w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300
          ${selected
            ? "bg-violet-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.5)]"
            : "bg-white/10 text-slate-400 group-hover:bg-violet-500/20 group-hover:text-violet-300"
          }
        `}
      >
        {icons[option.icon] || icons.code}
      </div>

      {/* Label */}
      <div>
        <p className={`font-semibold text-sm tracking-wide transition-colors duration-300 ${selected ? "text-white" : "text-slate-200 group-hover:text-white"}`}>
          {option.label}
        </p>
        <p className="text-[11px] tracking-widest uppercase mt-0.5 text-slate-500 group-hover:text-slate-400 transition-colors duration-300">
          {option.sub}
        </p>
      </div>
    </button>
  );
}

function CompleteScreen({ answers }) {
  return (
    <div className="flex flex-col items-center justify-center gap-8 text-center"
      style={{ animation: "slideInFromRight 0.55s cubic-bezier(0.22,1,0.36,1) forwards" }}>
      <div className="w-20 h-20 rounded-full bg-violet-600/30 border border-violet-500/50 flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.4)]">
        {icons.confetti}
      </div>
      <div>
        <h2 className="text-4xl font-bold text-white tracking-tight mb-3">You're all set!</h2>
        <p className="text-slate-400 text-base max-w-sm">
          Your workspace is being configured. We'll redirect you momentarily.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-2 max-w-md">
        {Object.entries(answers).map(([step, val]) => (
          <span key={step} className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs text-slate-300 font-mono">
            {val}
          </span>
        ))}
      </div>
      <button className="px-8 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm tracking-wide transition-all duration-200 shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] flex items-center gap-2">
        Launch Dashboard
        <span>{icons.arrow_right}</span>
      </button>
    </div>
  );
}

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
    const newAnswers = { ...answers, [step]: selected };
    setAnswers(newAnswers);

    if (step === totalSteps) {
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

            {/* Navigation */}
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