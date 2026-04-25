import { Link } from "react-router-dom";

const particles = Array.from({ length: 36 }, (_, i) => {
  const angle = (i / 36) * Math.PI * 2;
  const radius = 180 + (i % 6) * 14;
  return {
    id: i,
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
    delay: i * 0.11,
    duration: 3.6,
    scale: 0.8 + (i % 4) * 0.2,
  };
});

export default function PageNotFound404() {
  return (
    <div className="relative min-h-screen overflow-hidden text-white page-404-shell">
      <div className="absolute inset-0 page-404-aura" />
      <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full antigravity-ring page-404-ring-main" />
      <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full antigravity-ring antigravity-ring-reverse page-404-ring-alt" />

      {particles.map((particle) => (
        <span
          key={particle.id}
          className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full antigravity-particle page-404-particle"
          style={{
            transform: `translate(${particle.x}px, ${particle.y}px) scale(${particle.scale})`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="mb-3 text-sm uppercase tracking-[0.38em] page-404-kicker">
          lost in orbit
        </p>
        <h1 className="bg-clip-text text-5xl font-black text-transparent md:text-7xl page-404-title">
          404 page not found
        </h1>
        <p className="mt-5 max-w-xl text-sm page-404-description md:text-base">
          This page has escaped the gravitational pull. Head back to the dashboard
          and continue your mission.
        </p>
        <Link
          to="/dashboard"
          className="mt-8 rounded-full border px-6 py-3 text-sm font-semibold transition page-404-home-link"
        >
          Back to Dashboard
        </Link>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .page-404-shell {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: #EEF1F7;
          color: #2B3141;
        }
        .page-404-aura {
          background: radial-gradient(circle at center, rgba(232, 101, 74, 0.2), transparent 58%);
        }
        .page-404-ring-main {
          border: 1px solid rgba(232, 101, 74, 0.24);
        }
        .page-404-ring-alt {
          border: 1px solid rgba(43, 49, 65, 0.18);
        }
        .page-404-particle {
          background: rgba(232, 101, 74, 0.78);
        }
        .page-404-kicker {
          color: rgba(92, 100, 139, 0.9);
        }
        .page-404-title {
          background-image: linear-gradient(90deg, #2B3141, #E8654A, #2B3141);
        }
        .page-404-description {
          color: #5C648B;
        }
        .page-404-home-link {
          border-color: rgba(232, 101, 74, 0.42);
          color: #E8654A;
          background: rgba(255, 255, 255, 0.66);
        }
        .page-404-home-link:hover {
          background: rgba(232, 101, 74, 0.12);
        }
        .antigravity-ring {
          animation: antiSpin 18s linear infinite;
          box-shadow: 0 0 80px rgba(232, 101, 74, 0.18);
        }
        .antigravity-ring-reverse {
          animation-direction: reverse;
          animation-duration: 13s;
        }
        .antigravity-particle {
          animation-name: antiPulse;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          box-shadow: 0 0 16px rgba(232, 101, 74, 0.52);
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
            opacity: 0.22;
            filter: brightness(0.7);
          }
          14% {
            opacity: 0.22;
            filter: brightness(0.7);
          }
          24% {
            opacity: 1;
            filter: brightness(1.55);
          }
          34% {
            opacity: 1;
            filter: brightness(1.45);
          }
          46% {
            opacity: 0.28;
            filter: brightness(0.75);
          }
        }
      `}</style>
    </div>
  );
}
