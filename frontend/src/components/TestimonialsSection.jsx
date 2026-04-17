import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    quote:
      "GitLuma changed how our team works. Every developer knows exactly what task their commit belongs to — no more switching between Jira and GitHub.",
    name:    "Alex Chen",
    role:    "Engineering Lead",
    company: "Buildify",
    letter:  "A",
    color:   "#3A7EE8",
  },
  {
    quote:
      "Working with commits is now effortless. I type the task ID, push, and the dashboard updates instantly. It feels like magic for a distributed team.",
    name:    "Maria Garcia",
    role:    "Senior Developer",
    company: "Remoteflow",
    letter:  "M",
    color:   "#22B07D",
  },
  {
    quote:
      "Perfect tool for team collaboration. Real-time notifications mean our PM is always in the loop without pinging developers every hour.",
    name:    "Jake Wilson",
    role:    "CTO",
    company: "Launchpad",
    letter:  "J",
    color:   "#E8654A",
  },
];

const Stars = () => (
  <div className="flex gap-0.5 mb-4">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} viewBox="0 0 16 16" className="w-4 h-4" fill="#F59E0B">
        <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.751.751 0 01-1.088.791L8 11.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.836 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
      </svg>
    ))}
  </div>
);

const TestimonialsSection = () => {
  const ref = useRef(null);
  const [hov, setHov] = useState(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const cards = section.querySelectorAll(".tcard");
    gsap.set(cards, { opacity: 0, y: 35 });
    ScrollTrigger.create({
      trigger: section, start: "top 72%", once: true,
      onEnter: () => gsap.to(cards, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out", stagger: 0.14 }),
    });
    return () => ScrollTrigger.getAll().forEach(st => st.kill());
  }, []);

  return (
    <section
      ref={ref}
      className="py-24 git-no-reveal"
      style={{ background: "var(--gl-bg-card)" }}
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <span
            className="text-xs font-semibold tracking-widest px-4 py-1.5 rounded-full"
            style={{ color: "var(--gl-coral)", background: "var(--gl-coral-bg)" }}
          >
            TESTIMONIALS
          </span>
          <h2 className="text-4xl font-bold mt-5" style={{ color: "var(--gl-heading)" }}>
            What developers say
          </h2>
          <p className="mt-4 max-w-md mx-auto" style={{ color: "var(--gl-muted)" }}>
            Trusted by engineering teams who ship daily
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="tcard rounded-2xl p-7 flex flex-col cursor-default"
              style={{
                background:   "var(--gl-bg-page)",
                border:       `1px solid ${hov === i ? t.color : "var(--gl-border-subtle)"}`,
                transform:    hov === i ? "translateY(-6px)" : "translateY(0)",
                boxShadow:    hov === i ? `0 20px 50px rgba(0,0,0,0.08), 0 0 0 1px ${t.color}` : "none",
                transition:   "all 0.3s ease",
              }}
              onMouseEnter={() => setHov(i)}
              onMouseLeave={() => setHov(null)}
            >
              <Stars />

              {/* Quote */}
              <p className="text-sm leading-relaxed flex-1 mb-6" style={{ color: "var(--gl-body)" }}>
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Divider */}
              <div className="h-px mb-5" style={{ background: "var(--gl-border-subtle)" }} />

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 transition-transform duration-300"
                  style={{
                    background: t.color,
                    transform:  hov === i ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  {t.letter}
                </div>
                <div>
                  <div className="text-sm font-semibold" style={{ color: "var(--gl-heading)" }}>
                    {t.name}
                  </div>
                  <div className="text-xs" style={{ color: "var(--gl-muted)" }}>
                    {t.role} ·{" "}
                    <span style={{ color: t.color }}>{t.company}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social proof bar */}
        <div className="flex items-center justify-center gap-3 mt-10 flex-wrap">
          <div className="flex -space-x-2">
            {["#3A7EE8","#22B07D","#E8654A","#9370DB","#F59E0B","#EC4899"].map((c, i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                style={{ background: c, outline: "2px solid var(--gl-bg-card)" }}
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <p className="text-sm" style={{ color: "var(--gl-muted)" }}>
            Join <span className="font-semibold" style={{ color: "var(--gl-heading)" }}>200+</span> dev teams already using GitLuma
          </p>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
