import { Link } from "react-router-dom";

const particles = Array.from({ length: 36 }, (_, i) => {
  const angle = (i / 36) * Math.PI * 2;
  const radius = 180 + (i % 6) * 14;
  return {
    id: i,
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
    delay: (i % 12) * 0.2,
    duration: 4 + (i % 5) * 0.7,
    scale: 0.8 + (i % 4) * 0.2,
  };
});

export default function PageNotFound404() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#06070f] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(136,92,255,0.24),_transparent_55%)]" />
      <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-300/20 antigravity-ring" />
      <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-fuchsia-300/20 antigravity-ring antigravity-ring-reverse" />

      {particles.map((particle) => (
        <span
          key={particle.id}
          className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-fuchsia-200/80 antigravity-particle"
          style={{
            transform: `translate(${particle.x}px, ${particle.y}px) scale(${particle.scale})`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="mb-3 text-sm uppercase tracking-[0.38em] text-violet-200/80">
          lost in orbit
        </p>
        <h1 className="bg-gradient-to-r from-violet-200 via-fuchsia-100 to-cyan-200 bg-clip-text text-5xl font-black text-transparent md:text-7xl">
          404 page not found
        </h1>
        <p className="mt-5 max-w-xl text-sm text-slate-300 md:text-base">
          Эта страница улетела за пределы гравитации. Возвращайся на главную и
          продолжай миссию.
        </p>
        <Link
          to="/"
          className="mt-8 rounded-full border border-violet-300/40 px-6 py-3 text-sm font-semibold text-violet-100 transition hover:bg-violet-300/10"
        >
          Вернуться на главную
        </Link>
      </div>

      <style>{`
        .antigravity-ring {
          animation: antiSpin 18s linear infinite;
          box-shadow: 0 0 80px rgba(182, 114, 255, 0.22);
        }
        .antigravity-ring-reverse {
          animation-direction: reverse;
          animation-duration: 13s;
        }
        .antigravity-particle {
          animation-name: antiPulse;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          box-shadow: 0 0 16px rgba(238, 130, 255, 0.72);
        }
        @keyframes antiSpin {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        @keyframes antiPulse {
          0%, 100% {
            opacity: 0.35;
            filter: brightness(0.7);
          }
          50% {
            opacity: 1;
            filter: brightness(1.35);
          }
        }
      `}</style>
    </div>
  );
}
