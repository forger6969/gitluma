import React, { useState, useEffect, useRef, useCallback } from "react";

const testimonials = [
  {
    text: "Just discovered reactbits.dev — a sleek, minimal, and super dev-friendly React component library. Clean UI, easy to use, and perfect for modern projects.",
    author: "@syskey_dmg",
    avatar: "S",
    color: "#6366f1",
  },
  {
    text: "Everything about this is next level: the components, the registry, dynamic items.",
    author: "@shadcn",
    avatar: "🐸",
    color: "#8b5cf6",
  },
  {
    text: "React Bits: A stellar collection of React components to make your landing pages shine ✨",
    author: "@gregberge_",
    avatar: "G",
    color: "#ec4899",
  },
  {
    text: "Literally the coolest react library in react —",
    author: "@Logreg_n_coffee",
    avatar: "☕",
    color: "#10b981",
  },
  {
    text: "Have you heard of react bits? David Haz has lovingly put together a collection of animated and fully customizable React components.",
    author: "@DIYDevs",
    avatar: "🌍",
    color: "#3b82f6",
  },
  {
    text: "React Bits has grown into the ultimate visual animation library for React. This level of flexibility doesn't exist anywhere else.",
    author: "@orcdev",
    avatar: "O",
    color: "#f59e0b",
  },
  {
    text: "The next shadcn is emerging this year 💀",
    author: "ajaypatel_aj",
    avatar: "A",
    color: "#ef4444",
  },
  {
    text: "Got to know about React Bits and its just wow, the components are incredibly well designed. Really loved the overall feel and quality.",
    author: "@irohandev",
    avatar: "I",
    color: "#14b8a6",
  },
  {
    text: "This has to be the most artistic UI library we've seen in a while 🔥",
    author: "@Murray",
    avatar: "M",
    color: "#f97316",
  },
  {
    text: "React Bits has grown into an amazing component library with beautiful animations.",
    author: "@Gibson",
    avatar: "G",
    color: "#a855f7",
  },
];

const row1 = testimonials.slice(0, 5);
const row2 = testimonials.slice(5, 10);

function Card({ item }) {
  return (
    <div className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[340px] p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm flex flex-col justify-between gap-4 sm:gap-5 transition-all duration-300 cursor-default hover:border-white/[0.12] hover:bg-white/[0.05]">
      <p className="text-[14.5px] leading-relaxed text-[#c8cdd5] font-normal">
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
        <span className="text-[13.5px] text-slate-400 font-medium">
          {item.author}
        </span>
      </div>
    </div>
  );
}

function MarqueeRow({ items, direction = "left", speed = 35 }) {
  const trackRef = useRef(null);
  const animRef = useRef(null);
  const offsetRef = useRef(0);
  const lastTimeRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const hoveredRef = useRef(false);
  const singleSetWidthRef = useRef(0);

  // items ni 3 marta duplicate qilamiz — seamless loop uchun
  const duplicated = [...items, ...items, ...items];

  // Birinchi set kengligini o'lchaymiz
  const measureWidth = useCallback(() => {
    if (!trackRef.current) return;
    const children = trackRef.current.children;
    const count = items.length;
    let width = 0;
    for (let i = 0; i < count && i < children.length; i++) {
      width += children[i].offsetWidth + 16; // 16px = gap-4
    }
    singleSetWidthRef.current = width;
  }, [items.length]);

  useEffect(() => {
    hoveredRef.current = hovered;
  }, [hovered]);

  useEffect(() => {
    // Kenglikni o'lchaymiz
    measureWidth();
    window.addEventListener("resize", measureWidth);

    const step = (timestamp) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      if (!hoveredRef.current && singleSetWidthRef.current > 0) {
        const move = (delta / 1000) * speed * (direction === "left" ? -1 : 1);
        offsetRef.current += move;

        // Offset bitta set kengligidan oshsa, reset qilamiz
        const setW = singleSetWidthRef.current;
        if (direction === "left" && offsetRef.current <= -setW) {
          offsetRef.current += setW;
        } else if (direction === "right" && offsetRef.current >= setW) {
          offsetRef.current -= setW;
        }

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
  }, [direction, speed, measureWidth]);

  return (
    <div
      className="relative w-full overflow-hidden py-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute top-0 left-0 w-16 sm:w-32 h-full bg-gradient-to-r from-[#0e1117] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-16 sm:w-32 h-full bg-gradient-to-l from-[#0e1117] to-transparent z-10 pointer-events-none" />

      <div
        ref={trackRef}
        className="flex gap-4 w-max"
        style={{ willChange: "transform" }}
      >
        {duplicated.map((item, i) => (
          <Card key={`${item.author}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function LoginComments() {
  return (
    <div className="relative w-full min-h-screen bg-[#0e1117] overflow-hidden flex flex-col items-center justify-center font-sans">
      <div className="absolute -top-[20%] left-[30%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute -bottom-[10%] right-[20%] w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="text-center mb-8 sm:mb-12 relative z-50 px-4">
        <p className="text-xs font-semibold tracking-[3px] text-indigo-500 mb-3">
          WALL OF LOVE
        </p>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-200 mb-3 leading-tight">
          What developers are saying
        </h1>
        <p className="text-sm sm:text-base text-slate-500 font-normal">
          Join thousands of developers building beautiful interfaces
        </p>
      </div>

      <div className="w-full flex flex-col gap-3 sm:gap-5 relative z-10">
        <MarqueeRow items={row1} direction="left" speed={30} />
        <MarqueeRow items={row2} direction="right" speed={25} />
      </div>
    </div>
  );
}