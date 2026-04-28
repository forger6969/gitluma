import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Layout ────────────────────────────────────────────────────────────────────
const MAIN_Y = 195;   // main branch y
const FEAT_Y = 88;    // feature branch y

// SVG path segments (order = animation order)
const SEGS = [
  { d: `M 80,${MAIN_Y} L 255,${MAIN_Y}`,                              color: "#E8654A" },
  { d: `M 255,${MAIN_Y} C 300,${MAIN_Y} 355,${FEAT_Y} 400,${FEAT_Y}`, color: "#3A7EE8" },
  { d: `M 400,${FEAT_Y} L 565,${FEAT_Y}`,                              color: "#3A7EE8" },
  { d: `M 565,${FEAT_Y} C 620,${FEAT_Y} 665,${MAIN_Y} 710,${MAIN_Y}`, color: "#3A7EE8" },
  { d: `M 710,${MAIN_Y} L 880,${MAIN_Y}`,                              color: "#E8654A" },
];

const NODE_META = [
  { x: 80,  y: MAIN_Y, branch: "main", color: "#E8654A", icon: "🔐" },
  { x: 255, y: MAIN_Y, branch: "main", color: "#E8654A", icon: "📦" },
  { x: 400, y: FEAT_Y, branch: "feat", color: "#3A7EE8", icon: "🔗" },
  { x: 565, y: FEAT_Y, branch: "feat", color: "#22B07D", icon: "⚡" },
  { x: 710, y: MAIN_Y, branch: "main", color: "#E8654A", icon: "👥" },
  { x: 880, y: MAIN_Y, branch: "main", color: "#2B3141", icon: "✅" },
];

// ── Component ─────────────────────────────────────────────────────────────────
const GitBranchAnimation = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);

  // build node labels from translations
  const NODES = NODE_META.map((n, i) => ({
    ...n,
    label: t(`git_n${i}`),
    sub:   t(`git_n${i}s`),
  }));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const pathEls  = Array.from(section.querySelectorAll(".gp"));
    const nodeEls  = Array.from(section.querySelectorAll(".gn"));
    const labelEls = Array.from(section.querySelectorAll(".gl"));

    // init: measure real path lengths → set dash to hide
    pathEls.forEach((el) => {
      const len = el.getTotalLength();
      gsap.set(el, { attr: { strokeDasharray: len, strokeDashoffset: len } });
    });

    // init: nodes hidden, correct origin
    NODE_META.forEach((n, i) => {
      gsap.set(nodeEls[i], { svgOrigin: `${n.x} ${n.y}`, scale: 0, opacity: 0 });
    });
    gsap.set(labelEls, { opacity: 0, y: 7 });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: "top 72%", once: true },
    });

    const drawSeg = (i, dur, pos) =>
      tl.to(pathEls[i], { attr: { strokeDashoffset: 0 }, duration: dur, ease: "none" }, pos);

    const popNode = (i, pos) => {
      tl.to(nodeEls[i],  { scale: 1, opacity: 1, duration: 0.3,  ease: "back.out(2.2)" }, pos);
      tl.to(labelEls[i], { opacity: 1, y: 0,     duration: 0.25, ease: "power2.out"    }, `>-0.15`);
    };

    drawSeg(0, 0.42);
    popNode(0, "<0.05");
    popNode(1, ">");
    drawSeg(1, 0.3, "+=0.06");
    popNode(2, ">");
    drawSeg(2, 0.35);
    popNode(3, ">");
    drawSeg(3, 0.3);
    popNode(4, ">");
    drawSeg(4, 0.3);
    popNode(5, ">");

    return () => { tl.kill(); };
  }, []);

  return (
    <section ref={sectionRef} className="py-24" style={{ background: "var(--gl-bg-page)" }}>
      <div className="max-w-6xl mx-auto px-6">

        {/* header */}
        <div className="text-center mb-14">
          <span
            className="text-xs font-semibold tracking-widest px-4 py-1.5 rounded-full"
            style={{ color: "var(--gl-coral)", background: "var(--gl-coral-bg)" }}
          >
            {t("git_badge")}
          </span>
          <h2 className="text-4xl font-bold mt-5 leading-tight" style={{ color: "var(--gl-heading)" }}>
            {t("git_h1")}{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(to right,#E8654A,#D4512F)" }}
            >
              {t("git_h2")}
            </span>
          </h2>
          <p className="mt-3 max-w-lg mx-auto" style={{ color: "var(--gl-muted)" }}>
            {t("git_sub")}
          </p>
        </div>

        {/* graph card */}
        <div
          className="rounded-2xl overflow-x-auto shadow-sm"
          style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}
        >
          {/* card header bar */}
          <div
            className="flex items-center gap-3 px-5 border-b"
            style={{
              height: 40,
              background: "var(--gl-bg-card-hdr, var(--gl-bg-card))",
              borderColor: "var(--gl-border-subtle)",
            }}
          >
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
            </div>
            <span className="text-xs font-mono" style={{ color: "var(--gl-muted)" }}>
              gitluma — graph
            </span>

            {/* branch legend */}
            <div className="ml-auto flex items-center gap-5">
              {[
                { color: "#E8654A", label: "main" },
                { color: "#3A7EE8", label: "feat/github" },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: b.color }} />
                  <span className="text-xs font-mono" style={{ color: "var(--gl-muted)" }}>
                    {b.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* SVG graph */}
          <svg
            viewBox="0 0 960 280"
            className="w-full"
            style={{ minWidth: 700, display: "block" }}
          >
            {/* ── branch name tags ── */}
            <rect x="124" y={MAIN_Y - 26} width="40" height="16" rx="4"
              fill="rgba(232,101,74,0.12)" />
            <text x="144" y={MAIN_Y - 15} textAnchor="middle"
              fontSize="9" fontWeight="700" fill="#E8654A" fontFamily="monospace">
              main
            </text>

            <rect x="454" y={FEAT_Y - 26} width="74" height="16" rx="4"
              fill="rgba(58,126,232,0.12)" />
            <text x="491" y={FEAT_Y - 15} textAnchor="middle"
              fontSize="9" fontWeight="700" fill="#3A7EE8" fontFamily="monospace">
              feat/github
            </text>

            {/* ── path segments ── */}
            {SEGS.map((s, i) => (
              <path
                key={i}
                className="gp"
                d={s.d}
                fill="none"
                stroke={s.color}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDashoffset="9999"
              />
            ))}

            {/* ── nodes ── */}
            {NODES.map((n, i) => (
              <g key={i} className="gn">
                <circle cx={n.x} cy={n.y} r="20" fill={n.color} opacity="0.10" />
                <circle cx={n.x} cy={n.y} r="13" fill="var(--gl-node-fill, white)"
                  stroke={n.color} strokeWidth="2.5" />
                <circle cx={n.x} cy={n.y} r="5" fill={n.color} />
              </g>
            ))}

            {/* ── labels ── */}
            {NODES.map((n, i) => {
              const above = n.branch === "feat";
              const iconY  = above ? n.y - 32 : n.y + 34;
              const titleY = above ? n.y - 52 : n.y + 52;
              const subY   = above ? n.y - 39 : n.y + 65;
              return (
                <g key={i} className="gl">
                  <text x={n.x} y={iconY}
                    textAnchor="middle" fontSize="16" dominantBaseline="middle">
                    {n.icon}
                  </text>
                  <text x={n.x} y={titleY}
                    textAnchor="middle" fontSize="12" fontWeight="700"
                    fill="var(--gl-heading)" dominantBaseline="middle">
                    {n.label}
                  </text>
                  <text x={n.x} y={subY}
                    textAnchor="middle" fontSize="10"
                    fill="var(--gl-muted)" dominantBaseline="middle">
                    {n.sub}
                  </text>
                </g>
              );
            })}

          </svg>
        </div>

        {/* bottom legend */}
        <div className="flex items-center justify-center gap-8 mt-7 text-sm" style={{ color: "var(--gl-muted)" }}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-px rounded" style={{ background: "#E8654A" }} />
            <span>{t("git_main")}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-px rounded" style={{ background: "#3A7EE8" }} />
            <span>{t("git_feat")}</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default GitBranchAnimation;
