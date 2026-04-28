import { useTranslation } from "react-i18next";
import DocLayout, { CodeBlock } from "./DocLayout";
import { getDocsContent } from "../../content/docsContent";

const IconKey = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4" /></svg>;

export default function AuthenticationPage() {
  const { i18n } = useTranslation();
  const copy = getDocsContent(i18n.language).pages.authentication;

  return (
    <DocLayout title={copy.title} icon={<IconKey />} color="#F39C12" description={copy.description} sections={copy.sections}>
      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

      <section id="overview">
        <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--gl-heading)" }}>{copy.overviewTitle}</h2>
        <div className="rounded-2xl p-6 mb-4" style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}>
          <p className="text-sm" style={{ color: "var(--gl-muted)" }}>{copy.overviewIntro}</p>
        </div>
      </section>

      <section id="jwt-tokens">
        <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--gl-heading)" }}>{copy.jwtTitle}</h2>
        <div className="rounded-2xl p-6 mb-4" style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}>
          <p className="text-sm mb-4" style={{ color: "var(--gl-muted)" }}>{copy.jwtIntro}</p>
          <CodeBlock language="json" code={`{\n  "accessToken": "glta_xxxxx",\n  "refreshToken": "gltr_xxxxx",\n  "expiresIn": "6h"\n}`} />
        </div>
      </section>

      <section id="oauth-flow">
        <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--gl-heading)" }}>{copy.oauthTitle}</h2>
        <div className="rounded-2xl p-6 mb-4" style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}>
          <p className="text-sm mb-4" style={{ color: "var(--gl-muted)" }}>{copy.oauthIntro}</p>

          <div className="space-y-3">
            {copy.oauthSteps.map((step, index) => (
              <div key={step.title} className="flex gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(232,101,74,0.12)", color: "var(--gl-coral)" }}>
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1" style={{ color: "var(--gl-heading)" }}>{step.title}</h3>
                  <p className="text-sm" style={{ color: "var(--gl-muted)" }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <CodeBlock language="javascript" code={`// OAuth Flow Example\nconst response = await fetch('https://api.gitluma.io/auth/github', {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({\n    code: authorizationCode,\n    redirectUri: 'https://app.gitluma.io/callback'\n  })\n});\n\nconst { accessToken, user } = await response.json();`} />
          </div>
        </div>
      </section>

      <section id="api-keys">
        <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--gl-heading)" }}>{copy.apiKeysTitle}</h2>
        <div className="rounded-2xl p-6 mb-4" style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}>
          <p className="text-sm mb-4" style={{ color: "var(--gl-muted)" }}>{copy.apiKeysIntro}</p>

          <h3 className="font-semibold mb-3 text-sm" style={{ color: "var(--gl-heading)" }}>{copy.generatingTitle}</h3>
          <ol className="space-y-2 text-sm" style={{ color: "var(--gl-body)" }}>
            {copy.generatingSteps.map((step) => <li key={step}>{step}</li>)}
          </ol>

          <div className="mt-6">
            <h3 className="font-semibold mb-3 text-sm" style={{ color: "var(--gl-heading)" }}>{copy.usingTitle}</h3>
            <CodeBlock language="bash" code={`# Via CLI\ngitluma auth login --token glta_xxxxxxxxxxxx\n\n# Via API\ncurl -H "Authorization: Bearer glta_xxxxxxxxxxxx" \\\n  https://api.gitluma.io/api/projects`} />
          </div>
        </div>
      </section>

      <section id="refresh-tokens">
        <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--gl-heading)" }}>{copy.refreshTitle}</h2>
        <div className="rounded-2xl p-6 mb-4" style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}>
          <p className="text-sm mb-4" style={{ color: "var(--gl-muted)" }}>{copy.refreshIntro}</p>
          <CodeBlock language="javascript" code={`const response = await fetch("https://api.gitluma.io/api/auth/refresh", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({ refresh_token: storedRefreshToken })\n});\n\nconst { token } = await response.json();`} />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--gl-heading)" }}>{copy.tokenScopesTitle}</h2>
        <div className="space-y-3">
          {copy.scopes.map((scope) => (
            <div key={scope.code} className="rounded-lg p-4" style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}>
              <h3 className="font-semibold text-sm mb-2" style={{ color: "var(--gl-heading)" }}>{scope.code}</h3>
              <p className="text-xs" style={{ color: "var(--gl-muted)" }}>{scope.meaning}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--gl-heading)" }}>{copy.bestPracticesTitle}</h2>
        <div className="space-y-3">
          {copy.bestPractices.map((item) => (
            <div key={item.title} className="rounded-2xl p-4" style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}>
              <h3 className="font-semibold text-sm mb-2" style={{ color: "var(--gl-heading)" }}>{item.title}</h3>
              <p className="text-sm" style={{ color: "var(--gl-muted)" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--gl-heading)" }}>{copy.revokeTitle}</h2>
        <div className="rounded-2xl p-6" style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}>
          <p className="text-sm mb-4" style={{ color: "var(--gl-muted)" }}>{copy.revokeIntro}</p>
          <ol className="space-y-2 text-sm mb-4" style={{ color: "var(--gl-body)" }}>
            {copy.revokeSteps.map((step) => <li key={step}>{step}</li>)}
          </ol>

          <p className="text-sm font-semibold" style={{ color: "var(--gl-coral)" }}>{copy.revokeWarning}</p>
        </div>
      </section>
    </DocLayout>
  );
}
