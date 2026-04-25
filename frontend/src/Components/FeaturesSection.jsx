import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Mini visuals (decorative mockups inside each card) ────────────────────────

const CommitFeedMini = () => (
  <div
    className="rounded-xl overflow-hidden"
    style={{ background: "rgba(232,101,74,0.05)", border: "1px solid rgba(232,101,74,0.18)" }}
  >
    {[
      { user: "A", color: "#3A7EE8", msg: "GLM-1: auth module",  time: "now" },
      { user: "M", color: "#22B07D", msg: "GLM-3: token fix",     time: "3m"  },
      { user: "J", color: "#E8654A", msg: "GLM-5: update tests",  time: "7m"  },
    ].map((c, i) => (
      <div
        key={i}
        className="flex items-center gap-2 px-3 py-2"
        style={{ borderBottom: i < 2 ? "1px solid rgba(232,101,74,0.1)" : "none" }}
      >
        <div
          className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-bold shrink-0"
          style={{ background: c.color }}
        >
          {c.user}
        </div>
        <span className="text-[10px] font-mono flex-1 truncate" style={{ color: "var(--gl-body)" }}>
          {c.msg}
        </span>
        <span className="text-[9px] shrink-0" style={{ color: "var(--gl-muted)" }}>
          {c.time}
        </span>
      </div>
    ))}
  </div>
);

const GitHubConnectMini = () => (
  <div
    className="rounded-xl overflow-hidden"
    style={{ border: "1px solid var(--gl-border-subtle)" }}
  >
    <div
      className="flex items-center gap-2 px-3 py-2 border-b"
      style={{ background: "var(--gl-bg-page)", borderColor: "var(--gl-border-subtle)" }}
    >
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" style={{ color: "var(--gl-body)" }}>
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
      <span className="text-[10px] font-mono" style={{ color: "var(--gl-muted)" }}>
        github.com/forger6969
      </span>
    </div>
    {["my-awesome-app", "backend-api"].map((r, i) => (
      <div
        key={i}
        className="flex items-center gap-2 px-3 py-2 text-[10px]"
        style={{
          borderBottom: i === 0 ? "1px solid var(--gl-border-subtle)" : "none",
          background:   i === 0 ? "var(--gl-coral-bg)" : "transparent",
          color:        i === 0 ? "var(--gl-coral)"    : "var(--gl-muted)",
        }}
      >
        <svg viewBox="0 0 16 16" className="w-3 h-3 fill-current shrink-0">
          <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9z" />
        </svg>
        {r}
        {i === 0 && (
          <span className="ml-auto text-[9px] font-semibold" style={{ color: "#22B07D" }}>
            ✓ Webhook active
          </span>
        )}
      </div>
    ))}
  </div>
);

const TeamBoardMini = () => (
  <div
    className="rounded-xl overflow-hidden"
    style={{ border: "1px solid rgba(34,176,125,0.22)" }}
  >
    <div
      className="flex items-center gap-1.5 px-3 py-2 border-b"
      style={{ background: "rgba(34,176,125,0.07)", borderColor: "rgba(34,176,125,0.15)" }}
    >
      <div className="flex -space-x-1.5">
        {[
          { l: "A", c: "#3A7EE8" }, { l: "M", c: "#22B07D" }, { l: "J", c: "#E8654A" },
        ].map((av, i) => (
          <div
            key={i}
            className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[8px] font-bold"
            style={{ background: av.c, outline: "2px solid var(--gl-bg-card)" }}
          >
            {av.l}
          </div>
        ))}
      </div>
      <span className="ml-auto text-[9px] font-semibold" style={{ color: "#22B07D" }}>
        3 online
      </span>
    </div>
    {[
      { task: "feat: auth module", user: "A", color: "#3A7EE8", done: false },
      { task: "design: login UI",  user: "M", color: "#22B07D", done: true  },
    ].map((t, i) => (
      <div
        key={i}
        className="flex items-center gap-2 px-3 py-2 text-[10px]"
        style={{ borderBottom: i === 0 ? "1px solid rgba(34,176,125,0.1)" : "none" }}
      >
        <div
          className="w-3.5 h-3.5 rounded flex items-center justify-center text-white text-[8px] font-bold shrink-0"
          style={{ background: t.color }}
        >
          {t.done ? "✓" : "→"}
        </div>
        <span className="flex-1 truncate" style={{ color: "var(--gl-body)" }}>
          {t.task}
        </span>
        <div
          className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[8px] font-bold shrink-0"
          style={{ background: t.color }}
        >
          {t.user}
        </div>
      </div>
    ))}
  </div>
);

const EmailMini = () => (
  <div
    className="rounded-xl overflow-hidden"
    style={{ border: "1px solid rgba(58,126,232,0.22)" }}
  >
    <div
      className="px-3 py-2 space-y-0.5 border-b"
      style={{ background: "rgba(58,126,232,0.07)", borderColor: "rgba(58,126,232,0.15)" }}
    >
      <div className="text-[10px]" style={{ color: "var(--gl-muted)" }}>
        <span className="font-semibold" style={{ color: "var(--gl-heading)" }}>To: </span>
        alex@team.dev
      </div>
      <div className="text-[10px]" style={{ color: "var(--gl-muted)" }}>
        <span className="font-semibold" style={{ color: "var(--gl-heading)" }}>Re: </span>
        You&apos;re invited to GitLuma
      </div>
    </div>
    <div className="px-3 py-2">
      <div className="text-[10px] mb-2" style={{ color: "var(--gl-muted)" }}>
        Hi Alex, join <span style={{ color: "var(--gl-coral)" }}>my-awesome-app</span> on GitLuma
      </div>
      <div
        className="rounded-lg py-1.5 text-center text-[10px] font-semibold text-white"
        style={{ background: "#3A7EE8" }}
      >
        Accept Invite →
      </div>
    </div>
  </div>
);

// ── Feature card data ─────────────────────────────────────────────────────────
const FEATURE_META = [
  {
    icon: "⚡",
    accentColor: "#E8654A",
    border:       "rgba(232,101,74,0.25)",
    hoverBorder:  "#E8654A",
    iconBg:       "rgba(232,101,74,0.15)",
    cardBg:       "var(--gl-feat1-bg)",
    glowColor:    "rgba(232,101,74,0.12)",
    tag:          "WebSocket",
    bullets: [
      "Push events streamed in < 100 ms",
      "No polling — pure event-driven",
      "Works across all team members",
    ],
    Visual: CommitFeedMini,
  },
  {
    icon: "🔗",
    accentColor: "var(--gl-body)",
    border:       "var(--gl-border-default)",
    hoverBorder:  "#2B3141",
    iconBg:       "rgba(43,49,65,0.10)",
    cardBg:       "var(--gl-feat2-bg)",
    glowColor:    "rgba(43,49,65,0.08)",
    tag:          "GitHub API",
    bullets: [
      "Auto-configures webhooks for you",
      "Reads repos, branches & PRs",
      "One-click connect — no tokens needed",
    ],
    Visual: GitHubConnectMini,
  },
  {
    icon: "👥",
    accentColor: "#22B07D",
    border:       "rgba(34,176,125,0.22)",
    hoverBorder:  "#22B07D",
    iconBg:       "rgba(34,176,125,0.15)",
    cardBg:       "var(--gl-feat3-bg)",
    glowColor:    "rgba(34,176,125,0.10)",
    tag:          "Real-time",
    bullets: [
      "Unlimited team members per project",
      "Role-based access (owner / member)",
      "See who's working on what, live",
    ],
    Visual: TeamBoardMini,
  },
  {
    icon: "📬",
    accentColor: "#3A7EE8",
    border:       "rgba(58,126,232,0.22)",
    hoverBorder:  "#3A7EE8",
    iconBg:       "rgba(58,126,232,0.15)",
    cardBg:       "var(--gl-feat4-bg)",
    glowColor:    "rgba(58,126,232,0.10)",
    tag:          "Email",
    bullets: [
      "Send invites with one click",
      "Members auto-added on accept",
      "Re-invite or remove anytime",
    ],
    Visual: EmailMini,
  },
];

// ── Component ─────────────────────────────────────────────────────────────────
const FeaturesSection = () => {
  const { t }            = useTranslation();
  const sectionRef       = useRef(null);
  const [hovered, setHovered] = useState(null);

  const CARDS = FEATURE_META.map((m, i) => ({
    ...m,
    title: t(`feat${i + 1}_t`),
    desc:  t(`feat${i + 1}_d`),
  }));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = Array.from(section.querySelectorAll(".feat-card"));
    gsap.set(cards, { opacity: 0, y: 40 });

    ScrollTrigger.create({
      trigger: section,
      start:   "top 72%",
      once:    true,
      onEnter: () => {
        gsap.to(cards, {
          opacity:  1,
          y:        0,
          duration: 0.6,
          ease:     "power3.out",
          stagger:  0.12,
        });
      },
    });

    return () => ScrollTrigger.getAll().forEach(st => st.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 git-no-reveal"
      style={{ background: "var(--gl-bg-card)" }}
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="text-xs font-semibold tracking-widest px-4 py-1.5 rounded-full"
            style={{ color: "var(--gl-coral)", background: "var(--gl-coral-bg)" }}
          >
            {t("feat_badge")}
          </span>
          <h2 className="text-4xl font-bold mt-5" style={{ color: "var(--gl-heading)" }}>
            {t("feat_h2")}
          </h2>
          <p className="mt-4 max-w-md mx-auto" style={{ color: "var(--gl-muted)" }}>
            {t("feat_sub")}
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {CARDS.map((f, i) => {
            const isHov = hovered === i;
            return (
              <div
                key={i}
                className="feat-card rounded-2xl border p-7 relative overflow-hidden cursor-default"
                style={{
                  background:   f.cardBg,
                  borderColor:  isHov ? f.hoverBorder : f.border,
                  transform:    isHov ? "translateY(-6px)" : "translateY(0)",
                  boxShadow:    isHov ? `0 20px 50px ${f.glowColor}, 0 0 0 1px ${f.hoverBorder}` : "none",
                  transition:   "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Glow blob on hover */}
                <div
                  className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl pointer-events-none transition-opacity duration-500"
                  style={{ background: f.glowColor, opacity: isHov ? 1 : 0 }}
                />

                {/* Top row: icon + title + tag */}
                <div className="flex items-start gap-4 mb-4 relative z-10">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 transition-transform duration-300"
                    style={{
                      background: f.iconBg,
                      transform:  isHov ? "scale(1.12) rotate(-6deg)" : "scale(1) rotate(0deg)",
                    }}
                  >
                    {f.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-lg font-semibold"
                      style={{ color: "var(--gl-heading)" }}
                    >
                      {f.title}
                    </h3>
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full mt-0.5 inline-block"
                      style={{ background: f.iconBg, color: f.accentColor }}
                    >
                      {f.tag}
                    </span>
                  </div>
                </div>

                {/* Mini visual */}
                <div className="mb-4 relative z-10">
                  <f.Visual />
                </div>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed mb-3 relative z-10"
                  style={{ color: "var(--gl-muted)" }}
                >
                  {f.desc}
                </p>

                {/* Bullet points */}
                <ul className="space-y-1.5 mb-4 relative z-10">
                  {f.bullets.map((b, bi) => (
                    <li key={bi} className="flex items-start gap-2 text-xs" style={{ color: "var(--gl-muted)" }}>
                      <span
                        className="mt-0.5 shrink-0 text-[10px]"
                        style={{ color: f.accentColor }}
                      >
                        ✓
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Learn more */}
                <div
                  className="flex items-center gap-1 text-xs font-semibold relative z-10 transition-all duration-200"
                  style={{
                    color:     f.accentColor,
                    transform: isHov ? "translateX(4px)" : "translateX(0)",
                  }}
                >
                  Learn more
                  <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
