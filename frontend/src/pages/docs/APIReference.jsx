import { useState } from "react";
import { useTranslation } from "react-i18next";
import DocLayout, { CodeBlock } from "./DocLayout";
import { getDocsContent } from "../../content/docsContent";

const IconCode = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>;

function APIEndpoint({ method, path, desc, example, response, color, labels }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-2xl overflow-hidden mb-4 transition-all duration-300" style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}>
      <button onClick={() => setExpanded(!expanded)} className="w-full flex items-center gap-4 px-6 py-4 hover:opacity-80 transition-opacity">
        <span className="text-xs font-bold font-mono px-3 py-1 rounded-md w-16 text-center" style={{ background: `${color}18`, color }}>
          {method}
        </span>
        <code className="text-sm font-mono flex-1 text-left" style={{ color: "var(--gl-body)" }}>{path}</code>
        <span className="text-xs" style={{ color: "var(--gl-muted)" }}>{expanded ? "▼" : "▶"}</span>
      </button>

      {expanded && (
        <div className="px-6 pb-4 border-t" style={{ borderColor: "var(--gl-border-subtle)" }}>
          <p className="text-sm mb-4" style={{ color: "var(--gl-muted)" }}>{desc}</p>

          <h4 className="text-xs font-bold mb-2" style={{ color: "var(--gl-heading)" }}>{labels.exampleRequest}</h4>
          <CodeBlock language="javascript" code={example} />

          <h4 className="text-xs font-bold mb-2 mt-4" style={{ color: "var(--gl-heading)" }}>{labels.response}</h4>
          <CodeBlock language="json" code={response} />
        </div>
      )}
    </div>
  );
}

export default function APIReferencePage() {
  const { i18n } = useTranslation();
  const copy = getDocsContent(i18n.language).pages.apiReference;

  return (
    <DocLayout title={copy.title} icon={<IconCode />} color="#3A7EE8" description={copy.description} sections={copy.sections}>
      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

      <section id="base-url">
        <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--gl-heading)" }}>{copy.baseUrlTitle}</h2>
        <div className="rounded-2xl p-6 mb-6" style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}>
          <p className="text-sm mb-4" style={{ color: "var(--gl-muted)" }}>{copy.baseUrlIntro}</p>
          <CodeBlock language="bash" code={`https://api.gitluma.io/api`} />
        </div>
      </section>

      <section id="authentication">
        <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--gl-heading)" }}>{copy.authenticationTitle}</h2>
        <div className="rounded-2xl p-6 mb-6" style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}>
          <p className="text-sm mb-4" style={{ color: "var(--gl-muted)" }}>{copy.authenticationIntro}</p>
          <CodeBlock language="bash" code={`curl -H "Authorization: Bearer YOUR_TOKEN" \\\n  https://api.gitluma.io/api/projects`} />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--gl-heading)" }}>{copy.endpointsTitle}</h2>

        <div id="projects">
          <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--gl-heading)" }}>{copy.projectsTitle}</h3>
          {copy.endpoints.projects.map((endpoint, index) => (
            <APIEndpoint
              key={`${endpoint.method}-${index}`}
              {...endpoint}
              labels={copy}
              example={[
                `const res = await fetch("https://api.gitluma.io/api/projects", {`,
                `  ${index === 1 ? 'method: "POST",' : ""}`,
                `  headers: {`,
                "    Authorization: `Bearer ${YOUR_TOKEN}`,",
                '    "Content-Type": "application/json",',
                `  },`,
                index === 1
                  ? `  body: JSON.stringify({\n    repoUrl: "https://github.com/owner/repo",\n    name: "my-repo"\n  })`
                  : "",
                "});",
                index === 1 ? "const { project } = await res.json();" : "const { projects } = await res.json();",
              ].filter(Boolean).join("\n")}
              response={
                index === 0
                  ? `{\n  "projects": [\n    {\n      "id": "proj_123",\n      "name": "gitluma-main",\n      "repoUrl": "https://github.com/...",\n      "createdAt": "2024-01-15T12:00:00Z"\n    }\n  ]\n}`
                  : index === 1
                    ? `{\n  "project": {\n    "id": "proj_124",\n    "name": "my-repo",\n    "repoUrl": "https://github.com/owner/repo",\n    "webhookUrl": "https://api.gitluma.io/webhooks/...",\n    "createdAt": "2024-01-15T13:00:00Z"\n  }\n}`
                    : `{\n  "project": {\n    "id": "proj_123",\n    "name": "gitluma-main",\n    "repoUrl": "https://github.com/...",\n    "members": 5,\n    "commits": 1234,\n    "createdAt": "2024-01-15T12:00:00Z"\n  }\n}`
              }
            />
          ))}
        </div>

        <div id="commits">
          <h3 className="text-lg font-semibold mb-4 mt-8" style={{ color: "var(--gl-heading)" }}>{copy.commitsTitle}</h3>
          <APIEndpoint
            {...copy.endpoints.commits[0]}
            labels={copy}
            example={`const res = await fetch(\n  "https://api.gitluma.io/api/commits/proj_123?page=1&limit=20",\n  {\n    headers: {\n      Authorization: \`Bearer \${YOUR_TOKEN}\`,\n    },\n  }\n);\nconst { commits, total } = await res.json();`}
            response={`{\n  "commits": [\n    {\n      "id": "abc123",\n      "message": "feat: add login page",\n      "author": { "name": "Ali", "email": "ali@email.com" },\n      "timestamp": "2024-01-15T12:00:00Z",\n      "sha": "abc123def456..."\n    }\n  ],\n  "total": 1234,\n  "page": 1\n}`}
          />
        </div>

        <div id="invites">
          <h3 className="text-lg font-semibold mb-4 mt-8" style={{ color: "var(--gl-heading)" }}>{copy.invitesTitle}</h3>
          <APIEndpoint
            {...copy.endpoints.invites[0]}
            labels={copy}
            example={`const res = await fetch("https://api.gitluma.io/api/invites", {\n  method: "POST",\n  headers: {\n    Authorization: \`Bearer \${YOUR_TOKEN}\`,\n    "Content-Type": "application/json",\n  },\n  body: JSON.stringify({\n    projectId: "proj_123",\n    email: "teammate@example.com",\n    role: "developer"\n  })\n});\nconst { invite } = await res.json();`}
            response={`{\n  "invite": {\n    "id": "inv_789",\n    "projectId": "proj_123",\n    "email": "teammate@example.com",\n    "status": "sent",\n    "expiresAt": "2024-02-15T12:00:00Z"\n  }\n}`}
          />
        </div>
      </section>

      <section id="webhooks">
        <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--gl-heading)" }}>{copy.webhooksTitle}</h2>
        <div className="rounded-2xl p-6 mb-4" style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}>
          <p className="text-sm mb-4" style={{ color: "var(--gl-muted)" }}>{copy.webhooksIntro}</p>
          <CodeBlock language="bash" code={`# Payload URL\nhttps://api.gitluma.io/api/webhooks/github\n\n# Content type\napplication/json\n\n# Events\npush, pull_request, create`} />
        </div>
      </section>

      <section id="error-codes">
        <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--gl-heading)" }}>{copy.errorCodesTitle}</h2>
        <div className="rounded-2xl p-6" style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}>
          <p className="text-sm mb-4" style={{ color: "var(--gl-muted)" }}>{copy.errorCodesIntro}</p>
          <CodeBlock language="json" code={`{\n  "error": {\n    "code": "UNAUTHORIZED",\n    "message": "Invalid or missing authentication token",\n    "status": 401\n  }\n}`} />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--gl-heading)" }}>{copy.rateLimitingTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl p-4" style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}>
            <h3 className="font-semibold mb-2" style={{ color: "var(--gl-heading)" }}>{copy.freeTierTitle}</h3>
            <p className="text-sm" style={{ color: "var(--gl-muted)" }}>{copy.freeTierDesc}</p>
          </div>
          <div className="rounded-2xl p-4" style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}>
            <h3 className="font-semibold mb-2" style={{ color: "var(--gl-heading)" }}>{copy.proTierTitle}</h3>
            <p className="text-sm" style={{ color: "var(--gl-muted)" }}>{copy.proTierDesc}</p>
          </div>
        </div>
      </section>
    </DocLayout>
  );
}
