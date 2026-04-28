import { useState } from "react";
import { useTranslation } from "react-i18next";
import DocLayout, { CodeBlock } from "./DocLayout";
import { getDocsContent } from "../../content/docsContent";

const IconGit = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><circle cx="18" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><path d="M6 21V9a9 9 0 0 0 9 9" /></svg>;

function IntegrationCard({ name, description, features, color, status, featuresLabel }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg"
      style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)", transform: expanded ? "scale(1.02)" : "scale(1)" }}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold" style={{ color: "var(--gl-heading)" }}>{name}</h3>
        <span className="text-xs px-2 py-1 rounded-full font-mono" style={{ background: `${color}20`, color }}>{status}</span>
      </div>
      <p className="text-sm mb-3" style={{ color: "var(--gl-muted)" }}>{description}</p>

      {expanded ? (
        <div className="mt-4 pt-4 border-t" style={{ borderColor: "var(--gl-border-subtle)" }}>
          <p className="text-xs font-semibold mb-2" style={{ color: "var(--gl-muted)" }}>{featuresLabel}</p>
          <ul className="space-y-1">
            {features.map((feature) => (
              <li key={feature} className="text-xs" style={{ color: "var(--gl-body)" }}>• {feature}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default function IntegrationsPage() {
  const { i18n } = useTranslation();
  const copy = getDocsContent(i18n.language).pages.integrations;

  return (
    <DocLayout title={copy.title} icon={<IconGit />} color="#22B07D" description={copy.description} sections={copy.sections}>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
      `}</style>

      <section id="github-oauth">
        <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--gl-heading)" }}>{copy.githubOAuthTitle}</h2>
        <div className="rounded-2xl p-6 mb-4" style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}>
          <p className="text-sm mb-4" style={{ color: "var(--gl-muted)" }}>{copy.githubOAuthIntro}</p>

          <h3 className="font-semibold mb-3 text-sm" style={{ color: "var(--gl-heading)" }}>{copy.featuresLabel}</h3>
          <ul className="space-y-2 text-sm" style={{ color: "var(--gl-body)" }}>
            {copy.githubFeatures.map((feature) => <li key={feature}>• {feature}</li>)}
          </ul>

          <div className="mt-6">
            <h3 className="font-semibold mb-3 text-sm" style={{ color: "var(--gl-heading)" }}>{copy.setupInstructionsTitle}</h3>
            <CodeBlock language="bash" code={`gitluma auth login\n# Follow browser prompt to authorize GitHub\n\ngitluma init\n# Webhook automatically created on your repo`} />
          </div>
        </div>
      </section>

      <section id="webhook-setup">
        <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--gl-heading)" }}>{copy.webhookSetupTitle}</h2>
        <div className="rounded-2xl p-6 mb-4" style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}>
          <p className="text-sm mb-4" style={{ color: "var(--gl-muted)" }}>{copy.webhookSetupIntro}</p>
          <CodeBlock language="bash" code={`# Payload URL\nhttps://api.gitluma.io/api/webhooks/github\n\n# Content type\napplication/json\n\n# Events to trigger on\npush\npull_request\ncreate\n\n# Active: Yes\n# SSL verification: Enable`} />

          <h3 className="font-semibold mb-3 mt-4 text-sm" style={{ color: "var(--gl-heading)" }}>{copy.webhookPayloadTitle}</h3>
          <CodeBlock language="json" code={`{\n  "ref": "refs/heads/main",\n  "commits": [\n    {\n      "id": "abc123def456",\n      "message": "feat: add user authentication",\n      "author": {\n        "name": "Ali",\n        "email": "ali@example.com",\n        "username": "ali_dev"\n      },\n      "timestamp": "2024-01-15T12:00:00Z",\n      "url": "https://github.com/owner/repo/commit/abc123"\n    }\n  ],\n  "repository": {\n    "name": "my-repo",\n    "url": "https://github.com/owner/my-repo",\n    "full_name": "owner/my-repo"\n  }\n}`} />
        </div>
      </section>

      <section id="socket-events">
        <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--gl-heading)" }}>{copy.socketEventsTitle}</h2>
        <div className="rounded-2xl p-6 mb-4" style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}>
          <p className="text-sm mb-4" style={{ color: "var(--gl-muted)" }}>{copy.socketEventsIntro}</p>
          <CodeBlock language="javascript" code={`const socket = io("https://api.gitluma.io", {\n  query: { userId: "user_123" }\n});\n\nsocket.on("notification:new", (payload) => {\n  console.log(payload.title, payload.text);\n});\n\nsocket.on("commit:created", (commit) => {\n  console.log(commit.message);\n});`} />
        </div>
      </section>

      <section id="cicd-integration">
        <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--gl-heading)" }}>{copy.cicdTitle}</h2>
        <div className="rounded-2xl p-6 mb-4" style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}>
          <p className="text-sm mb-4" style={{ color: "var(--gl-muted)" }}>{copy.cicdIntro}</p>
          <CodeBlock language="bash" code={`# Example CI step\ngitluma auth login --token $GITLUMA_TOKEN\ngitluma init --auto\ngitluma commits list --project my-repo --limit 5`} />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--gl-heading)" }}>{copy.availableIntegrationsTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {copy.integrationCards.map((item) => (
            <IntegrationCard
              key={item.name}
              {...item}
              status={copy.activeStatus}
              featuresLabel={copy.featuresLabel}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--gl-heading)" }}>{copy.comingSoonTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {copy.comingSoonItems.map((name) => (
            <div key={name} className="rounded-lg p-3 text-center" style={{ background: "var(--gl-bg-card)", border: "1px dashed var(--gl-border-subtle)" }}>
              <p className="text-sm" style={{ color: "var(--gl-muted)" }}>{name}</p>
              <p className="text-xs mt-1" style={{ color: "var(--gl-coral)" }}>{copy.comingSoonLabel}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--gl-heading)" }}>{copy.envTitle}</h2>
        <div className="rounded-2xl p-6" style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}>
          <p className="text-sm mb-4" style={{ color: "var(--gl-muted)" }}>{copy.envIntro}</p>
          <CodeBlock language="bash" code={`GITLUMA_SLACK_TOKEN=xoxb-xxxxx\nGITLUMA_DISCORD_WEBHOOK=https://discord.com/api/webhooks/...\nGITLUMA_TEAMS_WEBHOOK=https://outlook.webhook.office.com/...\nGITLUMA_JIRA_URL=https://your-domain.atlassian.net\nGITLUMA_JIRA_TOKEN=xxxxxxxx`} />
        </div>
      </section>
    </DocLayout>
  );
}
