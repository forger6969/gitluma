import { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DocsNavbarControls from "../Components/DocsNavbarControls";
import { CodeBlock } from "./docs/DocLayout";
import { getDocsContent } from "../content/docsContent";

const IconBook = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>;
const IconCode = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>;
const IconZap = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>;
const IconGit = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><circle cx="18" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><path d="M6 21V9a9 9 0 0 0 9 9" /></svg>;
const IconKey = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4" /></svg>;
const IconLayers = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>;
const IconArrowRight = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M5 12h14M12 5l7 7-7 7" /></svg>;
const IconArrowLeft = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>;
const IconGithub = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>;
const IconSearch = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>;
const IconX = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M18 6 6 18M6 6l12 12" /></svg>;
const IconUsers = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" /><circle cx="9.5" cy="7" r="3" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 4.13a3 3 0 0 1 0 5.74" /></svg>;
const IconMail = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>;

const NAV_ICON_MAP = {
  "getting-started": <IconBook />,
  "api-reference": <IconCode />,
  cli: <IconZap />,
  integrations: <IconGit />,
  auth: <IconKey />,
  sdk: <IconLayers />,
};

const QUICK_CARD_ICON_MAP = {
  "install-cli": <IconZap />,
  "connect-github": <IconGit />,
  "api-keys": <IconKey />,
  "sdk-reference": <IconLayers />,
  guides: <IconBook />,
  "rest-api": <IconCode />,
};

const GUIDE_ICON_MAP = {
  "real-time-notifications": <IconZap />,
  "github-integration": <IconGit />,
  "team-collaboration": <IconUsers />,
  "email-invitations": <IconMail />,
};

const GUIDE_COLOR_MAP = {
  "real-time-notifications": "#E8654A",
  "github-integration": "#3A7EE8",
  "team-collaboration": "#22B07D",
  "email-invitations": "#3A7EE8",
};

function GlowCard({ icon, title, desc, color = "#E8654A", delay = 0, href = "#" }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={href}
      className="relative rounded-2xl p-5 cursor-pointer transition-all duration-300 block no-underline"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--gl-bg-card)",
        border: `1px solid ${hovered ? `${color}60` : "var(--gl-border-subtle)"}`,
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? `0 8px 32px ${color}22` : "var(--gl-shadow)",
        transitionDelay: `${delay}ms`,
        textDecoration: "none",
      }}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${color}18`, color }}>
        {icon}
      </div>
      <div className="text-sm font-semibold mb-1" style={{ color: "var(--gl-heading)" }}>{title}</div>
      <div className="text-xs leading-relaxed" style={{ color: "var(--gl-muted)" }}>{desc}</div>
    </Link>
  );
}

function StatCounter({ end, label, suffix = "" }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        return;
      }

      let current = 0;

      const step = () => {
        current += Math.ceil(end / 40);
        if (current >= end) {
          setValue(end);
          return;
        }

        setValue(current);
        requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
      observer.disconnect();
    }, { threshold: 0.5 });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl font-black mb-1" style={{ color: "var(--gl-coral)" }}>{value}{suffix}</div>
      <div className="text-xs" style={{ color: "var(--gl-muted)" }}>{label}</div>
    </div>
  );
}

function DocsNavList({ items, activeId, onNavigate, showIcons = true }) {
  return items.map((item) => (
    <Link
      key={item.id}
      to={item.path}
      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-sm font-medium transition-all duration-150 mb-1"
      style={{
        color: activeId === item.id ? "var(--gl-coral)" : "var(--gl-muted)",
        background: activeId === item.id ? "rgba(232,101,74,0.10)" : "transparent",
      }}
      onClick={() => onNavigate?.(item.id)}
      onMouseEnter={(event) => {
        if (activeId !== item.id) {
          event.currentTarget.style.background = "rgba(232,101,74,0.08)";
        }
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.background = activeId === item.id ? "rgba(232,101,74,0.10)" : "transparent";
      }}
    >
      {showIcons ? <span style={{ color: activeId === item.id ? "var(--gl-coral)" : "var(--gl-muted)" }}>{item.icon}</span> : null}
      {item.label}
    </Link>
  ));
}

export default function Documentation() {
  const { i18n } = useTranslation();
  const docs = getDocsContent(i18n.language);
  const [active, setActive] = useState("getting-started");
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navItems = useMemo(() => docs.nav.map((item) => ({
    ...item,
    icon: NAV_ICON_MAP[item.id] || <IconBook />,
  })), [docs]);

  const filtered = navItems.filter((item) => search === "" || item.label.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ background: "var(--gl-bg-page)", minHeight: "100vh", color: "var(--gl-body)" }}>
      <nav className="sticky top-0 z-50 backdrop-blur-md" style={{ background: "var(--gl-bg-card)cc", borderBottom: "1px solid var(--gl-border-subtle)" }}>
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-110" style={{ background: "rgba(232,101,74,0.15)" }}>
              <span className="text-sm">GL</span>
            </div>
            <span className="font-bold text-sm tracking-tight" style={{ color: "var(--gl-heading)" }}>GitLuma</span>
            <span className="text-xs px-2 py-0.5 rounded-full font-mono" style={{ background: "rgba(232,101,74,0.12)", color: "var(--gl-coral)" }}>{docs.common.docsBadge}</span>
          </Link>

          <div className="flex items-center gap-2">
            <DocsNavbarControls showDivider />

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex lg:hidden items-center justify-center w-8 h-8 rounded-xl transition-all"
              style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5" style={{ color: "var(--gl-body)" }}>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

            <a href="https://github.com" className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl font-medium transition-all duration-150 hover:opacity-80" style={{ background: "var(--gl-body)", color: "#fff" }}>
              <IconGithub />
            </a>

            <Link
              to="/"
              className="hidden sm:flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl font-semibold transition-all duration-150 hover:scale-105"
              style={{ background: "rgba(232,101,74,0.2)", color: "var(--gl-coral)", border: "1.5px solid var(--gl-coral)", textDecoration: "none" }}
            >
              <IconArrowLeft />
              {docs.common.home}
            </Link>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden">
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            aria-label={docs.common.closeDocsNavigation}
            onClick={() => setMobileMenuOpen(false)}
          />

          <aside className="fixed inset-y-0 left-0 z-50 w-[280px] max-w-[84vw] px-5 py-5 overflow-y-auto shadow-2xl" style={{ background: "var(--gl-bg-card)", borderRight: "1px solid var(--gl-border-subtle)" }}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: "var(--gl-coral)" }}>{docs.common.documentation}</div>
                <div className="text-sm font-semibold mt-1" style={{ color: "var(--gl-heading)" }}>{docs.common.gitLumaDocs}</div>
              </div>

              <button
                type="button"
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: "var(--gl-bg-page)", color: "var(--gl-body)", border: "1px solid var(--gl-border-subtle)" }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <IconX />
              </button>
            </div>

            <div className="mb-4">
              <DocsNavbarControls />
            </div>

            <div className="flex items-center gap-2 px-3 py-2 rounded-xl mb-5 text-sm" style={{ background: "var(--gl-bg-input)", border: "1px solid var(--gl-border-subtle)" }}>
              <IconSearch />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={docs.common.searchDocs} className="bg-transparent outline-none flex-1 text-xs" style={{ color: "var(--gl-body)" }} />
            </div>

            <div className="mb-5 pb-4 border-b" style={{ borderColor: "var(--gl-border-subtle)" }}>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium"
                style={{ color: "var(--gl-coral)", background: "rgba(232,101,74,0.10)", textDecoration: "none" }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <IconArrowLeft />
                {docs.common.backToHome}
              </Link>
            </div>

            <DocsNavList
              items={filtered}
              activeId={active}
              showIcons={false}
              onNavigate={(id) => {
                setActive(id);
                setMobileMenuOpen(false);
              }}
            />
          </aside>
        </div>
      )}

      <div className="max-w-7xl mx-auto flex relative">
        <aside className="w-64 shrink-0 sticky top-14 h-[calc(100vh-56px)] overflow-y-auto py-6 pr-4 pl-6 hidden lg:block custom-scroll">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl mb-5 text-sm" style={{ background: "var(--gl-bg-input)", border: "1px solid var(--gl-border-subtle)" }}>
            <IconSearch />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={docs.common.searchDocs} className="bg-transparent outline-none flex-1 text-xs" style={{ color: "var(--gl-body)" }} />
          </div>

          <div className="mb-6 pb-4 border-b" style={{ borderColor: "var(--gl-border-subtle)" }}>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl font-semibold text-xs transition-all duration-150 hover:scale-105"
              style={{ color: "var(--gl-coral)", textDecoration: "none", background: "rgba(232,101,74,0.1)" }}
            >
              <IconArrowLeft />
              {docs.common.backToHome}
            </Link>
          </div>

          <DocsNavList items={filtered} activeId={active} onNavigate={(id) => setActive(id)} />
        </aside>

        <main className="flex-1 min-w-0 px-8 py-10" style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(16px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}>
          <div className="relative rounded-3xl overflow-hidden mb-10 p-8" style={{ background: "linear-gradient(135deg, var(--gl-body) 0%, #1a2035 100%)" }}>
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, #E8654A 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
            <div className="absolute bottom-0 left-20 w-48 h-48 rounded-full opacity-10 blur-2xl pointer-events-none" style={{ background: "radial-gradient(circle, #3A7EE8 0%, transparent 70%)", transform: "translateY(50%)" }} />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4" style={{ background: "rgba(232,101,74,0.2)", color: "#E8654A", border: "1px solid rgba(232,101,74,0.3)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                {docs.common.statusLive}
              </div>
              <h1 className="text-3xl font-black text-white mb-3 leading-tight">{docs.hub.title}</h1>
              <p className="text-sm leading-relaxed max-w-lg mb-6" style={{ color: "#8b95ad" }}>{docs.hub.description}</p>
              <div className="flex items-center gap-3 flex-wrap">
                <Link to="/docs/getting-started" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-150 hover:opacity-90 active:scale-95" style={{ background: "var(--gl-coral)", textDecoration: "none" }}>
                  {docs.hub.primaryCta}
                  <IconArrowRight />
                </Link>
                <Link to="/docs/api-reference" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150 hover:opacity-90" style={{ background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.12)", textDecoration: "none" }}>
                  <IconCode />
                  {docs.hub.secondaryCta}
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-10">
            {docs.hub.stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl p-5 text-center" style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}>
                <StatCounter {...stat} />
              </div>
            ))}
          </div>

          <h2 className="text-lg font-bold mb-4" style={{ color: "var(--gl-heading)" }}>{docs.hub.quickStartTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-10">
            {docs.hub.quickCards.map((card, index) => (
              <GlowCard
                key={card.id}
                color={card.color}
                icon={QUICK_CARD_ICON_MAP[card.id] || <IconBook />}
                title={card.title}
                desc={card.desc}
                delay={index * 50}
                href={card.href}
              />
            ))}
          </div>

          <h2 className="text-lg font-bold mb-4" style={{ color: "var(--gl-heading)" }}>{docs.hub.featureGuidesTitle}</h2>
          <div className="space-y-5 mb-10">
            {docs.hub.featureGuides.map((guide) => {
              const color = GUIDE_COLOR_MAP[guide.id] || "#E8654A";

              return (
                <section
                  key={guide.id}
                  id={guide.id}
                  className="rounded-2xl p-6"
                  style={{ background: "var(--gl-bg-card)", border: `1px solid ${color}33`, scrollMarginTop: "90px" }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}18`, color }}>
                      {GUIDE_ICON_MAP[guide.id] || <IconBook />}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold" style={{ color: "var(--gl-heading)" }}>{guide.title}</h3>
                      <p className="text-xs" style={{ color: "var(--gl-muted)" }}>{docs.common.linkedTopic}</p>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--gl-muted)" }}>{guide.summary}</p>

                  <ul className="space-y-2 mb-4">
                    {guide.bullets.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "var(--gl-body)" }}>
                        <span style={{ color }}>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <CodeBlock language={guide.language} code={guide.code} />
                </section>
              );
            })}
          </div>

          <section id="getting-started" className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(232,101,74,0.12)", color: "var(--gl-coral)" }}>
                <IconZap />
              </div>
              <h2 className="text-xl font-bold" style={{ color: "var(--gl-heading)" }}>{docs.hub.installation.title}</h2>
            </div>

            <div className="rounded-2xl p-6 mb-4" style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}>
              <p className="text-sm mb-4" style={{ color: "var(--gl-muted)" }}>{docs.hub.installation.intro}</p>
              <CodeBlock language="bash" code={`npm install -g @gitluma/cli\n# or\nyarn global add @gitluma/cli`} />
              <CodeBlock language="bash" code={`# Verify installation\ngitluma --version\n# -> GitLuma CLI v2.0.0`} />
            </div>

            <div className="rounded-2xl p-6 mb-4" style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}>
              <h3 className="text-sm font-bold mb-3" style={{ color: "var(--gl-heading)" }}>{docs.hub.installation.authTitle}</h3>
              <CodeBlock language="bash" code={`gitluma auth login\n# Opens browser for GitHub OAuth\n# -> Authenticated as @username`} />
            </div>

            <div className="rounded-2xl p-6" style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}>
              <h3 className="text-sm font-bold mb-3" style={{ color: "var(--gl-heading)" }}>{docs.hub.installation.projectTitle}</h3>
              <CodeBlock language="bash" code={`cd my-repo\ngitluma init\n# -> Project linked: my-repo\n# -> Webhook configured automatically`} />
            </div>
          </section>

          <section id="api-reference" className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(58,126,232,0.12)", color: "#3A7EE8" }}>
                <IconCode />
              </div>
              <h2 className="text-xl font-bold" style={{ color: "var(--gl-heading)" }}>{docs.hub.apiReference.title}</h2>
            </div>

            {docs.hub.apiReference.endpoints.map((endpoint) => (
              <div
                key={`${endpoint.method}-${endpoint.path}`}
                className="flex items-center gap-4 px-5 py-4 rounded-xl mb-2 transition-all duration-150"
                style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.borderColor = `${endpoint.color}55`;
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.borderColor = "var(--gl-border-subtle)";
                }}
              >
                <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-md w-16 text-center" style={{ background: `${endpoint.color}18`, color: endpoint.color }}>{endpoint.method}</span>
                <code className="text-xs font-mono flex-1" style={{ color: "var(--gl-body)" }}>{endpoint.path}</code>
                <span className="text-xs hidden md:block" style={{ color: "var(--gl-muted)" }}>{endpoint.desc}</span>
              </div>
            ))}

            <div className="mt-4 rounded-2xl p-6" style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}>
              <h3 className="text-sm font-bold mb-3" style={{ color: "var(--gl-heading)" }}>{docs.hub.apiReference.exampleTitle}</h3>
              <CodeBlock language="javascript" code={`const res = await fetch("https://api.gitluma.io/api/projects", {\n  headers: {\n    Authorization: \`Bearer \${YOUR_TOKEN}\`,\n    "Content-Type": "application/json",\n  },\n});\nconst { projects } = await res.json();`} />
            </div>
          </section>

          <section id="webhooks" className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(34,176,125,0.12)", color: "#22B07D" }}>
                <IconGit />
              </div>
              <h2 className="text-xl font-bold" style={{ color: "var(--gl-heading)" }}>{docs.hub.webhooks.title}</h2>
            </div>

            <div className="rounded-2xl p-6" style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}>
              <p className="text-sm mb-4" style={{ color: "var(--gl-muted)" }}>{docs.hub.webhooks.intro}</p>
              <CodeBlock language="bash" code={`# Payload URL\nhttps://api.gitluma.io/api/webhooks/github\n\n# Content type\napplication/json\n\n# Events\npush, pull_request, create`} />
              <CodeBlock language="javascript" code={`// Webhook payload shape\n{\n  "ref": "refs/heads/main",\n  "commits": [\n    {\n      "id": "abc123",\n      "message": "feat: add login page",\n      "author": { "name": "Ali", "email": "ali@email.com" },\n      "timestamp": "2024-01-15T12:00:00Z"\n    }\n  ]\n}`} />
            </div>
          </section>

          <div className="flex items-center justify-between pt-6 mt-6" style={{ borderTop: "1px solid var(--gl-border-subtle)" }}>
            <div className="text-xs" style={{ color: "var(--gl-muted)" }}>
              {docs.common.lastUpdated} - <span style={{ color: "var(--gl-coral)" }}>GitLuma v2.0</span>
            </div>
            <Link
              to="/"
              className="text-xs flex items-center gap-1.5 transition-colors duration-150"
              style={{ color: "var(--gl-muted)", textDecoration: "none" }}
              onMouseEnter={(event) => {
                event.currentTarget.style.color = "var(--gl-coral)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.color = "var(--gl-muted)";
              }}
            >
              <IconArrowLeft />
              {docs.common.backToHome}
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
