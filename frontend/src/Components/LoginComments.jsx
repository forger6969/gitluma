import React, { useEffect, useRef, useCallback } from "react";

const testimonials = [
  {
    text: "GitLuma completely changed how our team manages repositories. The dashboard gives us instant visibility into every project's health and activity.",
    author: "@alex_devops",
    avatar: "A",
    color: "#6366f1",
  },
  {
    text: "Finally a tool that makes Git collaboration feel effortless. We onboarded 20 developers in a day and everyone loved it from the start.",
    author: "@sarah_codes",
    avatar: "S",
    color: "#8b5cf6",
  },
  {
    text: "The project analytics in GitLuma are incredible. I can see commit trends, contributor stats, and bottlenecks at a glance. A must-have for any team lead.",
    author: "@mkevin_eng",
    avatar: "M",
    color: "#ec4899",
  },
  {
    text: "We migrated from three different tools to just GitLuma. It handles everything — repos, reviews, and deployment tracking — all in one beautiful interface.",
    author: "@devcraft_io",
    avatar: "D",
    color: "#10b981",
  },
  {
    text: "GitLuma's GitHub integration is seamless. Linked my repos in seconds and the real-time sync is flawless. This is how developer tools should work.",
    author: "@julia_tech",
    avatar: "J",
    color: "#3b82f6",
  },
  {
    text: "As a freelancer juggling multiple clients, GitLuma keeps all my projects organized. The clean UI makes it a joy to use every single day.",
    author: "@nomad_dev",
    avatar: "N",
    color: "#f59e0b",
  },
  {
    text: "Our open source community grew 3x after we started using GitLuma to showcase our projects. The public dashboard feature is a game changer.",
    author: "@oss_collective",
    avatar: "O",
    color: "#ef4444",
  },
  {
    text: "I've tried dozens of project management tools but GitLuma is the only one that truly understands the developer workflow. Simple, fast, and powerful.",
    author: "@ryanbuilds",
    avatar: "R",
    color: "#14b8a6",
  },
  {
    text: "The commit history visualization alone is worth it. GitLuma turns raw Git data into beautiful, actionable insights for the whole team.",
    author: "@data_nina",
    avatar: "D",
    color: "#f97316",
  },
  {
    text: "GitLuma made code reviews so much smoother for our remote team. Everything is in one place, and the notification system is perfect.",
    author: "@teamlead_max",
    avatar: "T",
    color: "#a855f7",
  },
];

const row1 = testimonials.slice(0, 5);
const row2 = testimonials.slice(5, 10);

function Card({ item, isDark }) {
  return (
    <div className={`flex-shrink-0 w-[280px] sm:w-[320px] md:w-[340px] p-5 sm:p-6 rounded-2xl backdrop-blur-sm flex flex-col justify-between gap-4 sm:gap-5 transition-all duration-300 cursor-default ${
      isDark
        ? "bg-[#FFFFFF]/[0.04] border border-[#FFFFFF]/[0.08] hover:border-[#E8654A]/30 hover:bg-[#FFFFFF]/[0.07]"
        : "bg-white border border-[#2B3141]/[0.08] hover:border-[#E8654A]/40 hover:bg-white shadow-sm"
    }`}>
      <p className={`text-[14.5px] leading-relaxed font-normal transition-colors duration-300 ${
        isDark ? "text-[#EEF1F7]/70" : "text-[#2B3141]/70"
      }`}>
        {item.text}
      </p>
      <div className="flex items-center gap-2.5">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${item.color}, ${item.color}88)`,
          }}
        >
          <span className="text-sm text-white font-semibold">{item.avatar}</span>
        </div>
        <span className={`text-[13.5px] font-medium transition-colors duration-300 ${
          isDark ? "text-[#EEF1F7]/50" : "text-[#2B3141]/50"
        }`}>
          {item.author}
        </span>
      </div>
    </div>
  );
}

function MarqueeRow({ items, direction = "left", speed = 35, isDark }) {
  const trackRef = useRef(null);
  const animRef = useRef(null);
  const offsetRef = useRef(0);
  const lastTimeRef = useRef(null);
  const hoveredRef = useRef(false);
  const singleSetWidthRef = useRef(0);

  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);

  const duplicated = [...items, ...items, ...items];

  const measureWidth = useCallback(() => {
    if (!trackRef.current) return;
    const children = trackRef.current.children;
    const count = items.length;
    let width = 0;
    for (let i = 0; i < count && i < children.length; i++) {
      width += children[i].offsetWidth + 16;
    }
    singleSetWidthRef.current = width;
  }, [items.length]);

  const wrapOffset = useCallback(() => {
    const setW = singleSetWidthRef.current;
    if (setW <= 0) return;
    while (offsetRef.current < -setW) offsetRef.current += setW;
    while (offsetRef.current > 0) offsetRef.current -= setW;
  }, []);

  const handlePointerDown = useCallback((e) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartOffset.current = offsetRef.current;
    hoveredRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e) => {
    if (!isDragging.current) return;
    const delta = e.clientX - dragStartX.current;
    offsetRef.current = dragStartOffset.current + delta;
    wrapOffset();
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
    }
  }, [wrapOffset]);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
    hoveredRef.current = false;
    lastTimeRef.current = null;
  }, []);

  const initializedRef = useRef(false);

  useEffect(() => {
    measureWidth();
    window.addEventListener("resize", measureWidth);

    const step = (timestamp) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      if (!initializedRef.current && singleSetWidthRef.current > 0) {
        if (direction === "right") {
          offsetRef.current = -singleSetWidthRef.current;
        }
        initializedRef.current = true;
      }

      if (!hoveredRef.current && !isDragging.current && singleSetWidthRef.current > 0) {
        const move = (delta / 1000) * speed * (direction === "left" ? -1 : 1);
        offsetRef.current += move;
        wrapOffset();

        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
        }
      }

      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", measureWidth);
    };
  }, [direction, speed, measureWidth, wrapOffset]);

  return (
    <div
      className="relative w-full overflow-hidden py-1 select-none"
      style={{ cursor: isDragging.current ? "grabbing" : "grab" }}
      onMouseEnter={() => { hoveredRef.current = true; }}
      onMouseLeave={() => {
        if (!isDragging.current) {
          hoveredRef.current = false;
          lastTimeRef.current = null;
        }
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div className={`absolute top-0 left-0 w-16 sm:w-32 h-full z-10 pointer-events-none bg-gradient-to-r ${
        isDark ? "from-[#2B3141]" : "from-[#F0F2F7]"
      } to-transparent`} />
      <div className={`absolute top-0 right-0 w-16 sm:w-32 h-full z-10 pointer-events-none bg-gradient-to-l ${
        isDark ? "from-[#2B3141]" : "from-[#F0F2F7]"
      } to-transparent`} />

      <div
        ref={trackRef}
        className="flex gap-4 w-max pointer-events-none"
        style={{ willChange: "transform" }}
      >
        {duplicated.map((item, i) => (
          <Card key={`${item.author}-${i}`} item={item} isDark={isDark} />
        ))}
      </div>
    </div>
  );
}

export default function LoginComments({ isDark = true }) {
  return (
    <div
      className={`relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center font-sans transition-colors duration-300 ${
        isDark ? "bg-[#2B3141]" : "bg-[#F0F2F7]"
      }`}
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <div className="absolute -top-[20%] left-[30%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-[radial-gradient(circle,rgba(232,101,74,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute -bottom-[10%] right-[20%] w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full bg-[radial-gradient(circle,rgba(232,101,74,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="text-center mb-8 sm:mb-12 relative z-50 px-4">
        <p className="text-xs font-semibold tracking-[3px] text-[#E8654A] mb-3">
          WALL OF LOVE
        </p>
        <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 leading-tight transition-colors duration-300 ${
          isDark ? "text-[#EEF1F7]" : "text-[#2B3141]"
        }`}>
          Loved by developers worldwide
        </h1>
        <p className={`text-sm sm:text-base font-normal transition-colors duration-300 ${
          isDark ? "text-[#EEF1F7]/50" : "text-[#2B3141]/50"
        }`}>
          Join thousands of developers managing projects with GitLuma
        </p>
      </div>

      <div className="w-full flex flex-col gap-3 sm:gap-5 relative z-10">
        <MarqueeRow items={row1} direction="left" speed={30} isDark={isDark} />
        <MarqueeRow items={row2} direction="right" speed={25} isDark={isDark} />
      </div>
    </div>
  );
}
