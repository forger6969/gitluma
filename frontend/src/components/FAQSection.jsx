import { useRef, useState } from "react";
import { gsap } from "gsap";

const FAQS = [
  {
    q: "How does GitLuma connect to GitHub?",
    a: "GitLuma uses GitHub OAuth 2.0 for authentication — one click and you're in. We automatically discover your repositories and configure webhooks without any manual setup. You stay in full control of which repos are tracked.",
  },
  {
    q: "What happens when I push a commit?",
    a: "GitHub sends a webhook event to GitLuma instantly. We parse the commit message for task IDs (e.g. GLM-1), update the linked task's status in real time, and push a WebSocket notification to all team members who have the dashboard open.",
  },
  {
    q: "Is my code or repository content stored?",
    a: "No. GitLuma only processes commit metadata — author, message, timestamp and branch name. Your actual source code never touches our servers. We store only what's needed to track tasks and team activity.",
  },
  {
    q: "Can I use GitLuma with private repositories?",
    a: "Yes. Private repositories are fully supported on all plans. GitLuma requests the minimum GitHub OAuth scopes needed — read access to repos and webhook management — nothing more.",
  },
  {
    q: "How do task IDs work in commit messages?",
    a: "Prefix your commit with a task ID like: git commit -m \"GLM-1: add login flow\". GitLuma matches the pattern, moves the task to 'In Progress' on first commit and 'Done' when you merge to main. Custom patterns are supported on Pro and Team plans.",
  },
  {
    q: "Can I invite teammates who don't have a GitHub account?",
    a: "Teammates join GitLuma via an email invitation link. Once they sign in with their own GitHub account, they're auto-added to your project. GitHub is required for all members since commits are the core data source.",
  },
  {
    q: "What is the difference between Pro and Team plans?",
    a: "Pro is great for growing teams up to 15 people with full analytics, unlimited projects and 30-day history. Team adds unlimited seats, custom webhooks, full API access, SSO, audit logs and a dedicated support channel.",
  },
  {
    q: "Is there a self-hosted option?",
    a: "Self-hosted GitLuma is on our roadmap for Team plan customers. Sign up to the waitlist in your dashboard and we'll notify you when the Docker image is ready.",
  },
];

const FAQItem = ({ faq, index }) => {
  const [open,    setOpen]    = useState(false);
  const [hovered, setHovered] = useState(false);
  const bodyRef = useRef(null);

  const toggle = () => {
    const el = bodyRef.current;
    if (!el) return;
    if (!open) {
      gsap.fromTo(el, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: 0.35, ease: "power3.out" });
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.25, ease: "power3.in" });
    }
    setOpen(o => !o);
  };

  return (
    <div
      className="border-b last:border-0 transition-all duration-200"
      style={{ borderColor: "var(--gl-border-subtle)" }}
    >
      <button
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
        style={{ cursor: "pointer" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={toggle}
      >
        {/* Number + question */}
        <div className="flex items-start gap-3.5 flex-1 min-w-0">
          <span
            className="text-xs font-bold mt-0.5 shrink-0 tabular-nums transition-colors duration-200"
            style={{ color: open || hovered ? "var(--gl-coral)" : "var(--gl-muted)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="text-sm font-semibold leading-snug transition-colors duration-200"
            style={{ color: open || hovered ? "var(--gl-heading)" : "var(--gl-body)" }}
          >
            {faq.q}
          </span>
        </div>

        {/* Icon */}
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300"
          style={{
            background: open ? "var(--gl-coral)" : "var(--gl-bg-page)",
            border:     `1px solid ${open ? "var(--gl-coral)" : "var(--gl-border-subtle)"}`,
          }}
        >
          <svg
            viewBox="0 0 16 16"
            className="w-3.5 h-3.5 transition-transform duration-300"
            fill="none"
            style={{
              stroke:    open ? "white" : "var(--gl-muted)",
              transform: open ? "rotate(45deg)" : "rotate(0deg)",
            }}
          >
            <path d="M8 3v10M3 8h10" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
      </button>

      {/* Answer */}
      <div ref={bodyRef} style={{ height: 0, overflow: "hidden", opacity: 0 }}>
        <p
          className="text-sm leading-relaxed pb-5 pl-8"
          style={{ color: "var(--gl-muted)" }}
        >
          {faq.a}
        </p>
      </div>
    </div>
  );
};

const FAQSection = () => (
  <section
    className="py-24 git-no-reveal"
    style={{ background: "var(--gl-bg-card)" }}
  >
    <div className="max-w-3xl mx-auto px-6">

      {/* Header */}
      <div className="text-center mb-12">
        <span
          className="text-xs font-semibold tracking-widest px-4 py-1.5 rounded-full"
          style={{ color: "var(--gl-coral)", background: "var(--gl-coral-bg)" }}
        >
          FAQ
        </span>
        <h2 className="text-4xl font-bold mt-5" style={{ color: "var(--gl-heading)" }}>
          Frequently asked questions
        </h2>
        <p className="mt-4" style={{ color: "var(--gl-muted)" }}>
          Everything you need to know about GitLuma. Can&apos;t find an answer?{" "}
          <span
            className="cursor-pointer font-medium transition-colors duration-150"
            style={{ color: "var(--gl-coral)" }}
            onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
            onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}
          >
            Contact us
          </span>
        </p>
      </div>

      {/* FAQ list */}
      <div
        className="rounded-2xl px-8"
        style={{
          background: "var(--gl-bg-page)",
          border:     "1px solid var(--gl-border-subtle)",
        }}
      >
        {FAQS.map((faq, i) => (
          <FAQItem key={i} faq={faq} index={i} />
        ))}
      </div>

    </div>
  </section>
);

export default FAQSection;
