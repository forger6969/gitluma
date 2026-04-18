import { useEffect, useRef } from "react";

const Step = () => {
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const cardsRef = useRef([]);

  const steps = [
    {
      badge: "01 — boshlash",
      title: "GitHub OAuth ulash",
      desc: "GitHub orqali ro'yxatdan o'tish va repozitoriyalarni bog'lash",
      color: "bg-purple-100 text-purple-800",
    },
    {
      badge: "02 — kuzatish",
      title: "Commit va branch monitoring",
      desc: "Commitlar va PR larni real vaqtda kuzatish",
      color: "bg-teal-100 text-teal-800",
    },
    {
      badge: "03 — avtomatik",
      title: "CI/CD va workflow",
      desc: "Testlar avtomatik ishlaydi va loglar chiqadi",
      color: "bg-orange-100 text-orange-800",
    },
    {
      badge: "04 — tahlil",
      title: "Jamoa analitikasi",
      desc: "Faoliyat grafik va hisobotlarda ko‘rinadi",
      color: "bg-blue-100 text-blue-800",
    },
  ];

  useEffect(() => {
    const W = 800;
    const SH = 460;

    const WAVE_Y = SH * 0.55;
    const AMP = 40;
    const FREQ = 1.1;
    const SPEED = 1;

    const xPositions = [0.15, 0.38, 0.62, 0.85];

    let t = 0;

    function waveY(xNorm, time) {
      return WAVE_Y + AMP * Math.sin(FREQ * xNorm * Math.PI * 2 - time);
    }

    function buildPath(time) {
      let d = `M 0 ${waveY(0, time)}`;

      for (let x = 0; x <= W; x += 3) {
        d += ` L ${x} ${waveY(x / W, time)}`;
      }

      return d;
    }

    function loop() {
      t += SPEED * 0.016;

      if (pathRef.current) {
        pathRef.current.setAttribute("d", buildPath(t));
      }

      const stageW = svgRef.current?.clientWidth || 800;

      xPositions.forEach((xn, i) => {
        const y = waveY(xn, t);
        const xPx = xn * stageW;

        if (cardsRef.current[i]) {
          cardsRef.current[i].style.left = `${xPx}px`;
          cardsRef.current[i].style.top = `${y}px`;
          cardsRef.current[i].style.transform =
            "translate(-50%, -50%)";
        }
      });

      requestAnimationFrame(loop);
    }

    loop();
  }, []);

  return (
    <div className="w-full h-[460px] relative overflow-hidden bg-white">

      {/* Title */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 text-black text-xl font-semibold">
        GitLuma
      </div>

      {/* Wave */}
      <svg
        ref={svgRef}
        viewBox="0 0 800 460"
        className="absolute w-full h-full"
      >
        <path
          ref={pathRef}
          fill="none"
          stroke="#d1d5db"
          strokeWidth="1.5"
        />
      </svg>

      {/* Cards */}
      {steps.map((item, i) => (
        <div
          key={i}
          ref={(el) => (cardsRef.current[i] = el)}
          className="absolute w-[170px] bg-white border border-gray-200 rounded-xl p-3 shadow-sm"
        >
          <div
            className={`text-[11px] px-2 py-1 rounded-full mb-2 inline-block ${item.color}`}
          >
            {item.badge}
          </div>

          <div className="text-sm font-semibold mb-1 text-gray-800">
            {item.title}
          </div>

          <div className="text-xs text-gray-500">
            {item.desc}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Step;