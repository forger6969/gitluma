import { useTranslation } from "react-i18next";
import DocLayout, { CodeBlock } from "./DocLayout";
import { getDocsContent } from "../../content/docsContent";

const IconZap = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>;

function AnimatedCard({ title, desc, delay = 0 }) {
  return (
    <div
      className="p-5 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105"
      style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)", animation: `slideInUp 0.6s ease ${delay}ms both` }}
    >
      <h3 className="font-semibold mb-2" style={{ color: "var(--gl-heading)" }}>{title}</h3>
      <p className="text-sm" style={{ color: "var(--gl-muted)" }}>{desc}</p>
    </div>
  );
}

export default function GettingStartedPage() {
  const { i18n } = useTranslation();
  const copy = getDocsContent(i18n.language).pages.gettingStarted;

  return (
    <DocLayout title={copy.title} icon={<IconZap />} color="#E8654A" description={copy.description} sections={copy.sections}>
      <style>{`
        @keyframes slideInUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      <section id="installation">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(232,101,74,0.12)", color: "var(--gl-coral)" }}>
            <IconZap />
          </div>
          <h2 className="text-2xl font-bold" style={{ color: "var(--gl-heading)" }}>{copy.installationTitle}</h2>
        </div>
        <div className="rounded-2xl p-6 mb-4" style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}>
          <p className="text-sm mb-4" style={{ color: "var(--gl-muted)" }}>{copy.installationIntro}</p>
          <CodeBlock language="bash" code={`npm install -g @gitluma/cli\n# or\nyarn global add @gitluma/cli`} />
          <CodeBlock language="bash" code={`# Verify installation\ngitluma --version\n# -> GitLuma CLI v2.0.0`} />
        </div>
      </section>

      <section id="quick-start-in-3-steps">
        <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--gl-heading)" }}>{copy.quickStartTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {copy.quickStartSteps.map((step, index) => (
            <AnimatedCard key={step.title} title={step.title} desc={step.desc} delay={index * 100} />
          ))}
        </div>
        <div className="rounded-2xl p-6" style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}>
          <h3 className="text-sm font-bold mb-3" style={{ color: "var(--gl-heading)" }}>{copy.authenticateTitle}</h3>
          <CodeBlock language="bash" code={`gitluma auth login\n# Opens browser for GitHub OAuth\n# -> Authenticated as @username`} />
        </div>
      </section>

      <section id="system-requirements">
        <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--gl-heading)" }}>{copy.systemRequirementsTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl p-6" style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}>
            <h3 className="font-semibold mb-3" style={{ color: "var(--gl-heading)" }}>{copy.minimumTitle}</h3>
            <ul className="space-y-2 text-sm" style={{ color: "var(--gl-muted)" }}>
              {copy.minimumItems.map((item) => <li key={item}>• {item}</li>)}
            </ul>
          </div>
          <div className="rounded-2xl p-6" style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}>
            <h3 className="font-semibold mb-3" style={{ color: "var(--gl-heading)" }}>{copy.recommendedTitle}</h3>
            <ul className="space-y-2 text-sm" style={{ color: "var(--gl-muted)" }}>
              {copy.recommendedItems.map((item) => <li key={item}>• {item}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section id="troubleshooting">
        <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--gl-heading)" }}>{copy.troubleshootingTitle}</h2>
        <div className="space-y-3">
          <div className="rounded-2xl p-4" style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}>
            <h3 className="font-semibold text-sm mb-2" style={{ color: "var(--gl-heading)" }}>{copy.commandNotFoundTitle}</h3>
            <CodeBlock language="bash" code={`npm list -g @gitluma/cli\n# If not installed globally, try:\nnpm install -g @gitluma/cli`} />
          </div>
          <div className="rounded-2xl p-4" style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}>
            <h3 className="font-semibold text-sm mb-2" style={{ color: "var(--gl-heading)" }}>{copy.authFailedTitle}</h3>
            <p className="text-sm mb-2" style={{ color: "var(--gl-muted)" }}>{copy.authFailedIntro}</p>
            <CodeBlock language="bash" code={`gitluma auth logout\ngitluma auth login`} />
          </div>
        </div>
      </section>
    </DocLayout>
  );
}
