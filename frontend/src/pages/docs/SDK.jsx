import { useTranslation } from "react-i18next";
import DocLayout, { CodeBlock } from "./DocLayout";
import { getDocsContent } from "../../content/docsContent";

const IconLayers = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>;

export default function SDKPage() {
  const { i18n } = useTranslation();
  const copy = getDocsContent(i18n.language).pages.sdk;

  return (
    <DocLayout title={copy.title} icon={<IconLayers />} color="#E84A7A" description={copy.description} sections={copy.sections}>
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>

      <section>
        <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--gl-heading)" }}>{copy.javascriptSdkTitle}</h2>

        <h3 id="installation" className="text-lg font-semibold mb-3" style={{ color: "var(--gl-heading)" }}>{copy.installationTitle}</h3>
        <CodeBlock language="bash" code={`npm install @gitluma/js\n# or\nyarn add @gitluma/js`} />

        <h3 id="quick-start" className="text-lg font-semibold mb-3 mt-6" style={{ color: "var(--gl-heading)" }}>{copy.quickStartTitle}</h3>
        <CodeBlock language="javascript" code={`import GitLuma from '@gitluma/js';\n\nconst client = new GitLuma({\n  token: 'your_access_token',\n  baseUrl: 'https://api.gitluma.io'\n});\n\n// List projects\nconst projects = await client.projects.list();\nconsole.log(projects);`} />

        <h3 id="projects-api" className="text-lg font-semibold mb-3 mt-6" style={{ color: "var(--gl-heading)" }}>{copy.projectsApiTitle}</h3>
        <CodeBlock language="javascript" code={`// List all projects\nconst projects = await client.projects.list();\n\n// Get project by ID\nconst project = await client.projects.get('proj_123');\n\n// Create new project\nconst newProject = await client.projects.create({\n  name: 'my-app',\n  repoUrl: 'https://github.com/owner/my-app'\n});\n\n// Update project\nawait client.projects.update('proj_123', {\n  name: 'updated-name'\n});\n\n// Delete project\nawait client.projects.delete('proj_123');`} />

        <h3 id="commits-api" className="text-lg font-semibold mb-3 mt-6" style={{ color: "var(--gl-heading)" }}>{copy.commitsApiTitle}</h3>
        <CodeBlock language="javascript" code={`// Get commits for a project\nconst commits = await client.commits.list('proj_123', {\n  limit: 20,\n  page: 1\n});\n\n// Get commit details\nconst commit = await client.commits.get('proj_123', 'commit_id');\n\n// Get commit statistics\nconst stats = await client.commits.getStats('proj_123', {\n  period: '7days' // '1day', '7days', '30days', 'all'\n});`} />

        <h3 className="text-lg font-semibold mb-3 mt-6" style={{ color: "var(--gl-heading)" }}>{copy.membersApiTitle}</h3>
        <CodeBlock language="javascript" code={`// List project members\nconst members = await client.members.list('proj_123');\n\n// Send invite\nconst invite = await client.members.invite('proj_123', {\n  email: 'teammate@example.com',\n  role: 'developer'\n});\n\n// Remove member\nawait client.members.remove('proj_123', 'member_id');`} />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--gl-heading)" }}>{copy.reactHooksTitle}</h2>
        <p className="text-sm mb-4" style={{ color: "var(--gl-muted)" }}>{copy.reactHooksIntro}</p>
        <CodeBlock language="bash" code={`npm install @gitluma/react`} />

        <h3 className="text-lg font-semibold mb-3 mt-6" style={{ color: "var(--gl-heading)" }}>{copy.useProjectsTitle}</h3>
        <CodeBlock language="jsx" code={`import { useProjects } from '@gitluma/react';\n\nfunction ProjectsList() {\n  const { projects, loading, error } = useProjects();\n\n  if (loading) return <div>Loading...</div>;\n  if (error) return <div>Error: {error.message}</div>;\n\n  return (\n    <ul>\n      {projects.map(project => (\n        <li key={project.id}>{project.name}</li>\n      ))}\n    </ul>\n  );\n}`} />

        <h3 className="text-lg font-semibold mb-3 mt-6" style={{ color: "var(--gl-heading)" }}>{copy.useCommitsTitle}</h3>
        <CodeBlock language="jsx" code={`import { useCommits } from '@gitluma/react';\n\nfunction CommitsViewer({ projectId }) {\n  const { commits, loading } = useCommits(projectId, {\n    limit: 10\n  });\n\n  return (\n    <div>\n      {commits?.map(commit => (\n        <div key={commit.id}>\n          <h3>{commit.message}</h3>\n          <p>by {commit.author.name}</p>\n        </div>\n      ))}\n    </div>\n  );\n}`} />

        <h3 className="text-lg font-semibold mb-3 mt-6" style={{ color: "var(--gl-heading)" }}>{copy.providerTitle}</h3>
        <CodeBlock language="jsx" code={`import { GitLumaProvider } from '@gitluma/react';\n\nfunction App() {\n  return (\n    <GitLumaProvider token="your_token">\n      <YourComponents />\n    </GitLumaProvider>\n  );\n}`} />
      </section>

      <section id="typescript-types">
        <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--gl-heading)" }}>{copy.typescriptTitle}</h2>
        <p className="text-sm mb-4" style={{ color: "var(--gl-muted)" }}>{copy.typescriptIntro}</p>
        <CodeBlock language="typescript" code={`import GitLuma, { Project, Commit } from '@gitluma/js';\n\nconst client = new GitLuma({ token: 'token' });\n\n// Types are automatically inferred\nconst projects: Project[] = await client.projects.list();\nconst commits: Commit[] = await client.commits.list('proj_123');\n\n// Create project with type safety\nconst newProject: Project = await client.projects.create({\n  name: 'my-project',\n  repoUrl: 'https://github.com/...'\n});`} />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--gl-heading)" }}>{copy.errorHandlingTitle}</h2>
        <CodeBlock language="javascript" code={`import { GitLumaError } from '@gitluma/js';\n\ntry {\n  const project = await client.projects.get('invalid_id');\n} catch (error) {\n  if (error instanceof GitLumaError) {\n    console.error('Code:', error.code);\n    console.error('Status:', error.status);\n    console.error('Message:', error.message);\n  }\n}`} />

        <h3 className="text-lg font-semibold mb-3 mt-6" style={{ color: "var(--gl-heading)" }}>{copy.commonErrorCodesTitle}</h3>
        <div className="space-y-2">
          {copy.errorCodes.map((item) => (
            <div key={item.code} className="rounded-lg p-3" style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}>
              <code style={{ color: "var(--gl-coral)" }}>{item.code}</code>
              <p className="text-sm mt-1" style={{ color: "var(--gl-muted)" }}>{item.meaning}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--gl-heading)" }}>{copy.cachingTitle}</h2>
        <CodeBlock language="javascript" code={`const client = new GitLuma({\n  token: 'token',\n  cache: {\n    enabled: true,\n    ttl: 300,\n    maxSize: 100\n  }\n});\n\nconst projects1 = await client.projects.list();\nconst projects2 = await client.projects.list();\nconst projects3 = await client.projects.list({ cache: false });`} />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--gl-heading)" }}>{copy.paginationTitle}</h2>
        <CodeBlock language="javascript" code={`const result = await client.commits.list('proj_123', {\n  page: 1,\n  limit: 20,\n  sort: 'date',\n  order: 'desc'\n});\n\nconsole.log(result.commits);\nconsole.log(result.total);\nconsole.log(result.page);\nconsole.log(result.hasMore);\n\nconst nextPage = await client.commits.list('proj_123', {\n  page: result.page + 1,\n  limit: 20\n});`} />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--gl-heading)" }}>{copy.examplesTitle}</h2>

        <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--gl-heading)" }}>{copy.dashboardTitle}</h3>
        <CodeBlock language="jsx" code={`import React from 'react';\nimport { useCommits } from '@gitluma/react';\n\nexport function CommitDashboard({ projectId }) {\n  const { commits, loading } = useCommits(projectId);\n\n  if (loading) return <div>Loading commits...</div>;\n\n  return (\n    <div>\n      <h2>Recent Commits</h2>\n      {commits.map(commit => (\n        <div key={commit.id}>\n          <h3>{commit.message}</h3>\n          <p>{commit.author.name} - {new Date(commit.timestamp).toLocaleDateString()}</p>\n        </div>\n      ))}\n    </div>\n  );\n}`} />

        <h3 className="text-lg font-semibold mb-3 mt-6" style={{ color: "var(--gl-heading)" }}>{copy.reportTitle}</h3>
        <CodeBlock language="javascript" code={`async function generateTeamReport(projectId) {\n  const members = await client.members.list(projectId);\n  const commits = await client.commits.list(projectId, { limit: 100 });\n\n  const report = members.map(member => ({\n    name: member.name,\n    commits: commits.filter(c => c.author.id === member.id).length,\n    joinedAt: member.joinedAt\n  }));\n\n  return report.sort((a, b) => b.commits - a.commits);\n}`} />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--gl-heading)" }}>{copy.supportTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {copy.supportLinks.map((item) => (
            <a key={item.title} href="#" className="rounded-2xl p-6 border-2 border-dashed transition-all duration-200 hover:border-solid" style={{ borderColor: "var(--gl-border-subtle)" }}>
              <h3 className="font-semibold mb-2" style={{ color: "var(--gl-heading)" }}>{item.title}</h3>
              <p className="text-sm" style={{ color: "var(--gl-muted)" }}>{item.desc}</p>
            </a>
          ))}
        </div>
      </section>
    </DocLayout>
  );
}
