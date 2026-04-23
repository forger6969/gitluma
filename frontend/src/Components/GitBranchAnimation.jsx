import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LogIn, FolderGit, Waypoints, Clock, UserKey, FileStack } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ── Layout ────────────────────────────────────────────────────────────────────
const MAIN_Y = 195;
const FEAT_Y = 88;

// SVG path segments
const SEGS = [
  { d: `M 80,${MAIN_Y} L 255,${MAIN_Y}`, color: "#E8654A" },
  { d: `M 255,${MAIN_Y} C 300,${MAIN_Y} 355,${FEAT_Y} 400,${FEAT_Y}`, color: "#3A7EE8" },
  { d: `M 400,${FEAT_Y} L 565,${FEAT_Y}`, color: "#3A7EE8" },
  { d: `M 565,${FEAT_Y} C 620,${FEAT_Y} 665,${MAIN_Y} 710,${MAIN_Y}`, color: "#3A7EE8" },
  { d: `M 710,${MAIN_Y} L 880,${MAIN_Y}`, color: "#E8654A" },
];

// ✅ ICONlarga o‘zgartirildi (emoji yo‘q)
const NODE_META = [
  { x: 80,  y: MAIN_Y, branch: "main", color: "#E8654A", Icon: LogIn },
  { x: 255, y: MAIN_Y, branch: "main", color: "#E8654A", Icon: FolderGit },
  { x: 400, y: FEAT_Y, branch: "feat", color: "#3A7EE8", Icon: Waypoints },
  { x: 565, y: FEAT_Y, branch: "feat", color: "#22B07D", Icon: Clock },
  { x: 710, y: MAIN_Y, branch: "main", color: "#E8654A", Icon: UserKey },
  { x: 880, y: MAIN_Y, branch: "main", color: "#2B3141", Icon: FileStack },
];

const GitBranchAnimation = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);

  const NODES = NODE_META.map((n, i) => ({
    ...n,
    label: t(`git_n${i}`),
    sub: t(`git_n${i}s`),
  }));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const pathEls = Array.from(section.querySelectorAll(".gp"));
    const nodeEls = Array.from(section.querySelectorAll(".gn"));
    const labelEls = Array.from(section.querySelectorAll(".gl"));

    pathEls.forEach((el) => {
      const len = el.getTotalLength();
      gsap.set(el, { attr: { strokeDasharray: len, strokeDashoffset: len } });
    });

    NODE_META.forEach((n, i) => {
      gsap.set(nodeEls[i], {
        svgOrigin: `${n.x} ${n.y}`,
        scale: 0,
        opacity: 0,
      });
    });

    gsap.set(labelEls, { opacity: 0, y: 7 });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: "top 72%", once: true },
    });

    const drawSeg = (i, dur, pos) =>
      tl.to(pathEls[i], {
        attr: { strokeDashoffset: 0 },
        duration: dur,
        ease: "none",
      }, pos);

    const popNode = (i, pos) => {
      tl.to(nodeEls[i], {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "back.out(2.2)",
      }, pos);

      tl.to(labelEls[i], {
        opacity: 1,
        y: 0,
        duration: 0.25,
        ease: "power2.out",
      }, `>-0.15`);
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

    return () => tl.kill();
  }, []);

  return (
    <section ref={sectionRef} className="py-24" style={{ background: "var(--gl-bg-page)" }}>
      <div className="max-w-6xl mx-auto px-6">

        {/* header */}
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-widest px-4 py-1.5 rounded-full"
            style={{ color: "var(--gl-coral)", background: "var(--gl-coral-bg)" }}>
            {t("git_badge")}
          </span>

          <h2 className="text-4xl font-bold mt-5 leading-tight" style={{ color: "var(--gl-heading)" }}>
            {t("git_h1")}{" "}
            <span className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(to right,#E8654A,#D4512F)" }}>
              {t("git_h2")}
            </span>
          </h2>

          <p className="mt-3 max-w-lg mx-auto" style={{ color: "var(--gl-muted)" }}>
            {t("git_sub")}
          </p>
        </div>

        {/* graph */}
        <div className="rounded-2xl overflow-x-auto shadow-sm"
          style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}>

          <svg viewBox="0 0 960 280" className="w-full" style={{ minWidth: 700 }}>

            {SEGS.map((s, i) => (
              <path key={i} className="gp" d={s.d} fill="none"
                stroke={s.color} strokeWidth="2.5" strokeLinecap="round" />
            ))}

            {NODES.map((n, i) => (
              <g key={i} className="gn">
                <circle cx={n.x} cy={n.y} r="20" fill={n.color} opacity="0.10" />
                <circle cx={n.x} cy={n.y} r="13" fill="white" stroke={n.color} strokeWidth="2.5" />
                <circle cx={n.x} cy={n.y} r="5" fill={n.color} />
              </g>
            ))}

            {/* ✅ labels + ICON */}
            {NODES.map((n, i) => {
              const above = n.branch === "feat";
              const iconY  = above ? n.y - 32 : n.y + 34;
              const titleY = above ? n.y - 52 : n.y + 52;
              const subY   = above ? n.y - 39 : n.y + 65;

              return (
                <g key={i} className="">

                  {/* PURE SVG ICON */}
                  <g transform={`translate(${n.x - 8}, ${iconY - 8})`}>
                    <n.Icon size={16} color={n.color} strokeWidth={2.2} />
                  </g>

                  <text cla x={n.x} y={titleY} textAnchor="middle"
                    fontSize="12" fontWeight="700"
                    fill="var(--gl-heading)" dominantBaseline="middle">
                    {n.label}
                  </text>

                  <text x={n.x} y={subY} textAnchor="middle"
                    fontSize="10"
                    fill="var(--gl-muted)" dominantBaseline="middle">
                    {n.sub}
                  </text>

                </g>
              );
            })}

          </svg>
        </div>
      </div>
    </section>
  );
};

export default GitBranchAnimation;