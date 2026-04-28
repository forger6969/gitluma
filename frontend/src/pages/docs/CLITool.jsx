import { useTranslation } from "react-i18next";
import DocLayout, { CodeBlock } from "./DocLayout";
import { getDocsContent } from "../../content/docsContent";

const IconZap = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>;

function CLICommand({ command, description, example, output, outputLabel }) {
  return (
    <div className="rounded-2xl p-6 mb-4" style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}>
      <h3 className="font-semibold mb-2 text-sm" style={{ color: "var(--gl-heading)" }}>
        <code style={{ color: "var(--gl-coral)" }}>{command}</code>
      </h3>
      <p className="text-sm mb-3" style={{ color: "var(--gl-muted)" }}>{description}</p>
      <CodeBlock language="bash" code={example} />
      {output ? (
        <>
          <p className="text-xs font-semibold mt-3 mb-2" style={{ color: "var(--gl-muted)" }}>{outputLabel}</p>
          <CodeBlock language="bash" code={output} />
        </>
      ) : null}
    </div>
  );
}

export default function CLIToolPage() {
  const { i18n } = useTranslation();
  const copy = getDocsContent(i18n.language).pages.cliTool;

  return (
    <DocLayout title={copy.title} icon={<IconZap />} color="#9B59B6" description={copy.description} sections={copy.sections}>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>

      <section id="installation">
        <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--gl-heading)" }}>{copy.installationTitle}</h2>
        <CodeBlock language="bash" code={`npm install -g @gitluma/cli\n# or\ncurl -fsSL https://cli.gitluma.io/install.sh | bash`} />
      </section>

      <section id="core-commands">
        <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--gl-heading)" }}>{copy.coreCommandsTitle}</h2>

        <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--gl-heading)" }}>{copy.authenticationTitle}</h3>
        <CLICommand
          command="gitluma auth login"
          description={copy.commands.authLogin}
          example={`gitluma auth login\n# -> Opening browser for GitHub OAuth...\n# -> Click "Authorize" to continue`}
          output={`Successfully authenticated as @username\nToken stored in ~/.gitluma/config`}
          outputLabel={copy.output}
        />
        <CLICommand
          command="gitluma auth logout"
          description={copy.commands.authLogout}
          example={`gitluma auth logout\n# -> Are you sure? (y/n)`}
          output={`Successfully logged out\nCredentials removed`}
          outputLabel={copy.output}
        />
        <CLICommand
          command="gitluma auth status"
          description={copy.commands.authStatus}
          example={`gitluma auth status`}
          output={`Authenticated as @username\nEmail: user@example.com\nOrganizations: 3`}
          outputLabel={copy.output}
        />

        <h3 id="project-management" className="text-lg font-semibold mb-4 mt-8" style={{ color: "var(--gl-heading)" }}>{copy.projectManagementTitle}</h3>
        <CLICommand
          command="gitluma init"
          description={copy.commands.init}
          example={`cd my-repo\ngitluma init`}
          output={`Initializing GitLuma project...\nProject created: my-repo\nWebhook configured: https://api.gitluma.io/webhooks/...`}
          outputLabel={copy.output}
        />
        <CLICommand
          command="gitluma projects list"
          description={copy.commands.projectsList}
          example={`gitluma projects list`}
          output={`Your Projects:\n  1. my-repo (15 commits)\n  2. gitluma-core (142 commits)\n  3. web-app (89 commits)`}
          outputLabel={copy.output}
        />
        <CLICommand
          command="gitluma projects info [name]"
          description={copy.commands.projectsInfo}
          example={`gitluma projects info my-repo`}
          output={`Project: my-repo\nRepository: https://github.com/owner/my-repo\nMembers: 5\nCommits: 15\nCreated: 2024-01-15\nWebhook: Active`}
          outputLabel={copy.output}
        />

        <h3 className="text-lg font-semibold mb-4 mt-8" style={{ color: "var(--gl-heading)" }}>{copy.teamManagementTitle}</h3>
        <CLICommand
          command="gitluma invite [email]"
          description={copy.commands.invite}
          example={`gitluma invite teammate@example.com --project my-repo --role developer`}
          output={`Invitation sent to teammate@example.com\nThey will receive an email to join the project`}
          outputLabel={copy.output}
        />
        <CLICommand
          command="gitluma members list"
          description={copy.commands.membersList}
          example={`gitluma members list --project my-repo`}
          output={`Project Members:\n  • Ali (Owner)\n  • John (Developer)\n  • Jane (Developer)`}
          outputLabel={copy.output}
        />

        <h3 className="text-lg font-semibold mb-4 mt-8" style={{ color: "var(--gl-heading)" }}>{copy.commitsTrackingTitle}</h3>
        <CLICommand
          command="gitluma commits list"
          description={copy.commands.commitsList}
          example={`gitluma commits list --project my-repo --limit 10`}
          output={`Recent Commits:\n  1. abc123 - feat: add login page (Ali - 2024-01-15)\n  2. def456 - fix: resolve auth issue (John - 2024-01-14)\n  3. ghi789 - docs: update README (Jane - 2024-01-13)`}
          outputLabel={copy.output}
        />
        <CLICommand
          command="gitluma commits stats"
          description={copy.commands.commitsStats}
          example={`gitluma commits stats --project my-repo`}
          output={`Commit Statistics:\n  Total Commits: 142\n  This Month: 15\n  This Week: 3\n  Today: 1`}
          outputLabel={copy.output}
        />
      </section>

      <section id="configuration">
        <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--gl-heading)" }}>{copy.configurationTitle}</h2>
        <div className="rounded-2xl p-6 mb-4" style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}>
          <h3 className="font-semibold mb-3" style={{ color: "var(--gl-heading)" }}>{copy.configFileTitle}</h3>
          <p className="text-sm mb-3" style={{ color: "var(--gl-muted)" }}>{copy.configFileIntro}</p>
          <CodeBlock language="bash" code={`~/.gitluma/config\n\n# View current config:\ngitluma config show\n\n# Set values:\ngitluma config set defaultProject my-repo\ngitluma config set outputFormat json`} />
        </div>
      </section>

      <section id="flags-options">
        <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--gl-heading)" }}>{copy.flagsTitle}</h2>
        <div className="space-y-3">
          {copy.flags.map((item) => (
            <div key={item.flag} className="rounded-lg p-3" style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}>
              <code style={{ color: "var(--gl-coral)" }}>{item.flag}</code>
              <p className="text-sm mt-1" style={{ color: "var(--gl-muted)" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-5" style={{ color: "var(--gl-heading)" }}>{copy.tipsTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl p-4" style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}>
            <h3 className="font-semibold mb-2 text-sm" style={{ color: "var(--gl-heading)" }}>{copy.useAliasesTitle}</h3>
            <CodeBlock language="bash" code={`alias gl="gitluma"\nalias glp="gitluma projects list"\nalias glc="gitluma commits list"`} />
          </div>
          <div className="rounded-2xl p-4" style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}>
            <h3 className="font-semibold mb-2 text-sm" style={{ color: "var(--gl-heading)" }}>{copy.automatedSetupTitle}</h3>
            <CodeBlock language="bash" code={`# Setup in CI/CD:\ngitluma auth login --token $GITLUMA_TOKEN\ngitluma init --auto`} />
          </div>
        </div>
      </section>
    </DocLayout>
  );
}
