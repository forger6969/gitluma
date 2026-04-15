import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GH_PATH =
  "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12";

// ── Step definitions ───────────────────────────────────────────────────────────
const STEPS = [
  { icon: "🔐", label: "Login with GitHub" },
  { icon: "📦", label: "Create project" },
  { icon: "🔗", label: "Connect repository" },
  { icon: "👥", label: "Invite teammates" },
  { icon: "📋", label: "Assign tasks" },
  { icon: "💻", label: "Commit in VS Code" },
  { icon: "⚡", label: "Real-time sync" },
];

// ── Screen 1 — Login ──────────────────────────────────────────────────────────
const LoginScreen = () => (
  <div
    className="demo-screen absolute inset-0 flex flex-col items-center justify-center"
    style={{ background: "var(--gl-bg-page)" }}
  >
    <div
      className="w-72 rounded-2xl p-7 shadow-xl"
      style={{ background: "var(--gl-bg-card)", border: "1px solid var(--gl-border-subtle)" }}
    >
      {/* Logo */}
      <div className="text-center mb-6">
        <div
          className="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-3"
          style={{ background: "rgba(232,101,74,0.12)" }}
        >
          <span className="text-xl">⚡</span>
        </div>
        <div className="font-bold text-base" style={{ color: "var(--gl-heading)" }}>
          GitLuma
        </div>
        <div className="text-xs mt-1" style={{ color: "var(--gl-muted)" }}>
          Sign in to continue
        </div>
      </div>

      {/* GitHub OAuth button */}
      <button
        id="gh-login-btn"
        className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl font-semibold text-sm text-white"
        style={{ background: "#24292e" }}
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
          <path d={GH_PATH} />
        </svg>
        Continue with GitHub
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3 my-4">
        <div className="flex-1 h-px" style={{ background: "var(--gl-border-subtle)" }} />
        <span className="text-[9px] font-semibold tracking-widest" style={{ color: "var(--gl-muted)" }}>
          SECURE OAUTH 2.0
        </span>
        <div className="flex-1 h-px" style={{ background: "var(--gl-border-subtle)" }} />
      </div>
      <div className="text-center text-[10px]" style={{ color: "var(--gl-muted)" }}>
        No password required · Read-only by default
      </div>
    </div>
  </div>
);

// ── Screen 2 — Dashboard + New Project Modal ──────────────────────────────────
const DashboardScreen = () => (
  <div
    className="demo-screen absolute inset-0 flex flex-col opacity-0"
    style={{ background: "var(--gl-bg-page)" }}
  >
    {/* Top bar */}
    <div
      className="flex items-center justify-between px-4 py-2.5 border-b flex-shrink-0"
      style={{ background: "var(--gl-bg-card)", borderColor: "var(--gl-border-subtle)" }}
    >
      <span className="font-bold text-sm" style={{ color: "var(--gl-heading)" }}>
        GitLuma
      </span>
      <div className="flex items-center gap-2">
        <div
          className="w-6 h-6 rounded-full text-white text-[10px] flex items-center justify-center font-bold"
          style={{ background: "#E8654A" }}
        >
          A
        </div>
      </div>
    </div>

    {/* Body */}
    <div className="flex flex-1 overflow-hidden">
      {/* Sidebar */}
      <div
        className="w-36 border-r px-3 py-3 flex flex-col gap-0.5 flex-shrink-0"
        style={{ background: "var(--gl-bg-card)", borderColor: "var(--gl-border-subtle)" }}
      >
        {["Dashboard", "Projects", "Team", "Settings"].map((item, i) => (
          <div
            key={i}
            className="text-xs px-2 py-1.5 rounded-md"
            style={{
              color: i === 1 ? "var(--gl-coral)" : "var(--gl-muted)",
              background: i === 1 ? "var(--gl-coral-bg)" : "transparent",
            }}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Main area */}
      <div className="flex-1 p-4 relative overflow-hidden">
        {/* Header row */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm font-semibold" style={{ color: "var(--gl-heading)" }}>
              Projects
            </div>
            <div className="text-[10px] mt-0.5" style={{ color: "var(--gl-muted)" }}>
              0 active projects
            </div>
          </div>
          <button
            id="new-proj-btn"
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-semibold text-white"
            style={{ background: "#E8654A" }}
          >
            + New Project
          </button>
        </div>

        {/* Empty state */}
        <div
          className="rounded-xl border-dashed border-2 flex flex-col items-center justify-center py-10"
          style={{ borderColor: "var(--gl-border-default)" }}
        >
          <div className="text-3xl mb-2">📦</div>
          <div className="text-xs font-medium" style={{ color: "var(--gl-muted)" }}>
            No projects yet
          </div>
          <div className="text-[10px] mt-1" style={{ color: "var(--gl-muted)" }}>
            Create your first project to get started
          </div>
        </div>

        {/* New project modal */}
        <div
          id="new-proj-modal"
          className="absolute inset-x-0 top-0 mx-0 rounded-xl shadow-2xl p-5 opacity-0 pointer-events-none"
          style={{
            background: "var(--gl-bg-card)",
            border: "1px solid var(--gl-border-subtle)",
            zIndex: 20,
          }}
        >
          <div className="font-semibold text-sm mb-4" style={{ color: "var(--gl-heading)" }}>
            Create New Project
          </div>

          {/* Project name */}
          <div className="mb-3">
            <div
              className="text-[9px] font-bold uppercase tracking-widest mb-1.5"
              style={{ color: "var(--gl-muted)" }}
            >
              Project Name
            </div>
            <div
              id="proj-name-input"
              className="w-full rounded-lg px-3 py-2 text-xs font-mono"
              style={{
                background: "var(--gl-bg-page)",
                border: "1.5px solid var(--gl-border-subtle)",
                color: "var(--gl-heading)",
                minHeight: 32,
              }}
            >
              <span id="proj-name-text" />
              <span
                id="proj-name-caret"
                className="inline-block w-0.5 h-3 align-middle ml-px"
                style={{ background: "var(--gl-coral)", opacity: 0 }}
              />
            </div>
          </div>

          {/* Repository */}
          <div className="mb-3">
            <div
              className="text-[9px] font-bold uppercase tracking-widest mb-1.5"
              style={{ color: "var(--gl-muted)" }}
            >
              Repository
            </div>
            <div
              id="repo-selector"
              className="w-full rounded-lg px-3 py-2 text-xs flex items-center justify-between"
              style={{
                background: "var(--gl-bg-page)",
                border: "1.5px solid var(--gl-border-subtle)",
                color: "var(--gl-muted)",
              }}
            >
              <span id="repo-selector-text">Select repository…</span>
              <span style={{ fontSize: 10 }}>▾</span>
            </div>

            {/* Dropdown */}
            <div
              id="repo-dropdown"
              className="mt-1 rounded-xl overflow-hidden opacity-0"
              style={{ border: "1px solid var(--gl-border-subtle)", background: "var(--gl-bg-card)" }}
            >
              {[
                "forger6969/my-awesome-app",
                "forger6969/backend-api",
                "forger6969/ui-kit",
              ].map((r, i) => (
                <div
                  key={i}
                  id={`repo-opt-${i}`}
                  className="px-3 py-2 text-xs flex items-center gap-2"
                  style={{
                    borderBottom: i < 2 ? "1px solid var(--gl-border-subtle)" : "none",
                    color: "var(--gl-muted)",
                  }}
                >
                  <svg
                    viewBox="0 0 16 16"
                    className="w-3 h-3 flex-shrink-0"
                    fill="currentColor"
                  >
                    <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9z" />
                  </svg>
                  {r}
                </div>
              ))}
            </div>
          </div>

          {/* Create button */}
          <button
            id="create-proj-btn"
            className="w-full py-2 rounded-lg text-xs font-semibold text-white mt-1"
            style={{ background: "#E8654A", opacity: 0.35 }}
          >
            Create Project
          </button>
        </div>
      </div>
    </div>
  </div>
);

// ── Screen 3 — Project (multi-phase: webhook, invite, tasks, toast) ───────────
const ProjectScreen = () => (
  <div
    className="demo-screen absolute inset-0 flex flex-col opacity-0"
    style={{ background: "var(--gl-bg-page)" }}
  >
    {/* Top bar */}
    <div
      className="flex items-center justify-between px-4 py-2.5 border-b flex-shrink-0"
      style={{ background: "var(--gl-bg-card)", borderColor: "var(--gl-border-subtle)" }}
    >
      <div className="flex items-center gap-2">
        <span className="font-bold text-sm" style={{ color: "var(--gl-heading)" }}>
          GitLuma
        </span>
        <span className="text-xs" style={{ color: "var(--gl-muted)" }}>
          /
        </span>
        <span className="text-xs font-medium" style={{ color: "var(--gl-heading)" }}>
          my-awesome-app
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          id="invite-btn"
          className="text-xs px-2.5 py-1 rounded-lg font-semibold text-white"
          style={{ background: "#E8654A" }}
        >
          + Invite
        </button>
        <div
          className="w-6 h-6 rounded-full text-white text-[10px] flex items-center justify-center font-bold"
          style={{ background: "#E8654A" }}
        >
          A
        </div>
      </div>
    </div>

    {/* Body */}
    <div className="flex flex-1 overflow-hidden">
      {/* Sidebar */}
      <div
        className="w-36 border-r px-3 py-3 flex flex-col gap-0.5 flex-shrink-0"
        style={{ background: "var(--gl-bg-card)", borderColor: "var(--gl-border-subtle)" }}
      >
        {["Overview", "Commits", "Tasks", "Team", "Settings"].map((item, i) => (
          <div
            key={i}
            className="text-xs px-2 py-1.5 rounded-md"
            style={{
              color: i === 2 ? "var(--gl-coral)" : "var(--gl-muted)",
              background: i === 2 ? "var(--gl-coral-bg)" : "transparent",
            }}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Main */}
      <div className="flex-1 overflow-hidden relative">
        {/* Webhook status banner */}
        <div
          id="webhook-banner"
          className="mx-4 mt-3 mb-1 rounded-lg px-3 py-2 flex items-center gap-2.5 opacity-0"
          style={{
            background: "rgba(34,176,125,0.07)",
            border: "1px solid rgba(34,176,125,0.2)",
          }}
        >
          <div
            id="webhook-dot"
            className="w-2 h-2 rounded-full flex-shrink-0 transition-all duration-500"
            style={{ background: "#9AA0B4" }}
          />
          <div className="text-[11px]" style={{ color: "var(--gl-muted)" }}>
            <span id="webhook-text">Connecting webhook…</span>
          </div>
          <div
            id="webhook-repo"
            className="ml-auto text-[10px] font-mono opacity-0"
            style={{ color: "var(--gl-muted)" }}
          >
            forger6969/my-awesome-app
          </div>
        </div>

        {/* Task board */}
        <div className="p-3 pt-2">
          <div className="flex items-center justify-between mb-2.5">
            <div className="text-xs font-semibold" style={{ color: "var(--gl-heading)" }}>
              Task Board
            </div>
            <button
              className="text-[10px] px-2 py-1 rounded font-semibold"
              style={{ color: "var(--gl-coral)", background: "var(--gl-coral-bg)" }}
            >
              + Add Task
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {/* Todo column */}
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#5C6480" }} />
                <span
                  className="text-[9px] font-bold uppercase tracking-wider"
                  style={{ color: "var(--gl-muted)" }}
                >
                  Todo
                </span>
              </div>
              <div className="space-y-1.5">
                <div
                  id="task-todo-0"
                  className="rounded-lg p-2 opacity-0"
                  style={{
                    background: "var(--gl-bg-card)",
                    border: "1px solid var(--gl-border-subtle)",
                  }}
                >
                  <div className="text-[10px] font-medium" style={{ color: "var(--gl-body)" }}>
                    Design login UI
                  </div>
                  <div className="text-[9px] mt-1" style={{ color: "var(--gl-muted)" }}>
                    GLM-2
                  </div>
                </div>
                <div
                  id="task-todo-1"
                  className="rounded-lg p-2 opacity-0"
                  style={{
                    background: "var(--gl-bg-card)",
                    border: "1px solid var(--gl-border-subtle)",
                  }}
                >
                  <div className="text-[10px] font-medium" style={{ color: "var(--gl-body)" }}>
                    Write API docs
                  </div>
                  <div className="text-[9px] mt-1" style={{ color: "var(--gl-muted)" }}>
                    GLM-3
                  </div>
                </div>
              </div>
            </div>

            {/* In Progress column */}
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#3A7EE8" }} />
                <span
                  className="text-[9px] font-bold uppercase tracking-wider"
                  style={{ color: "var(--gl-muted)" }}
                >
                  In Progress
                </span>
              </div>
              <div
                id="task-inprog"
                className="rounded-lg p-2 opacity-0"
                style={{
                  background: "rgba(58,126,232,0.07)",
                  border: "1px solid rgba(58,126,232,0.28)",
                }}
              >
                <div className="text-[10px] font-medium" style={{ color: "var(--gl-body)" }}>
                  feat: auth module
                </div>
                <div className="flex items-center gap-1 mt-1.5">
                  <span className="text-[9px]" style={{ color: "#3A7EE8" }}>
                    GLM-1
                  </span>
                  <div
                    className="ml-auto w-4 h-4 rounded-full flex items-center justify-center text-white text-[8px] font-bold"
                    style={{ background: "#3A7EE8" }}
                  >
                    A
                  </div>
                </div>
              </div>
            </div>

            {/* Done column */}
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#22B07D" }} />
                <span
                  className="text-[9px] font-bold uppercase tracking-wider"
                  style={{ color: "var(--gl-muted)" }}
                >
                  Done
                </span>
              </div>
              <div
                id="task-done"
                className="rounded-lg p-2 opacity-0"
                style={{
                  background: "rgba(34,176,125,0.08)",
                  border: "1px solid rgba(34,176,125,0.3)",
                }}
              >
                <div
                  className="text-[10px] font-medium flex items-center justify-between"
                  style={{ color: "#22B07D" }}
                >
                  <span>feat: auth module</span>
                  <span>✓</span>
                </div>
                <div className="text-[9px] mt-1" style={{ color: "rgba(34,176,125,0.65)" }}>
                  GLM-1 · by alex
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Invite modal ── */}
        <div
          id="invite-modal"
          className="absolute inset-x-3 top-2 rounded-xl shadow-2xl p-4 opacity-0"
          style={{
            background: "var(--gl-bg-card)",
            border: "1px solid var(--gl-border-subtle)",
            zIndex: 20,
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold text-xs" style={{ color: "var(--gl-heading)" }}>
              Invite teammates
            </div>
            <span className="text-xs cursor-pointer" style={{ color: "var(--gl-muted)" }}>
              ✕
            </span>
          </div>
          <div className="flex gap-2 mb-3">
            <div
              className="flex-1 rounded-lg px-3 py-2 text-xs font-mono flex items-center"
              style={{
                background: "var(--gl-bg-page)",
                border: "1.5px solid var(--gl-border-subtle)",
                color: "var(--gl-heading)",
                minHeight: 32,
              }}
            >
              <span id="invite-email-text" />
              <span
                id="invite-caret"
                className="inline-block w-0.5 h-3 align-middle ml-px"
                style={{ background: "var(--gl-coral)", opacity: 0 }}
              />
            </div>
            <button
              id="invite-send-btn"
              className="px-3 py-2 rounded-lg text-xs font-semibold text-white flex-shrink-0"
              style={{ background: "#E8654A" }}
            >
              Send
            </button>
          </div>
          <div className="space-y-2">
            {[
              { email: "alex@team.dev", color: "#3A7EE8", letter: "A" },
              { email: "maria@team.dev", color: "#22B07D", letter: "M" },
            ].map((u, i) => (
              <div
                key={i}
                id={`invite-row-${i}`}
                className="flex items-center gap-2 text-xs opacity-0"
                style={{ color: "var(--gl-muted)" }}
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0"
                  style={{ background: u.color }}
                >
                  {u.letter}
                </div>
                {u.email}
                <span
                  className="ml-auto text-[10px] px-1.5 py-0.5 rounded"
                  style={{ background: "rgba(34,176,125,0.12)", color: "#22B07D" }}
                >
                  Invited ✓
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Commit toast ── */}
        <div
          id="commit-toast"
          className="absolute bottom-3 right-3 rounded-xl px-3 py-2.5 shadow-2xl opacity-0 flex items-start gap-2.5"
          style={{
            background: "var(--gl-bg-card)",
            border: "1px solid rgba(34,176,125,0.45)",
            minWidth: 215,
            zIndex: 30,
          }}
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ background: "rgba(34,176,125,0.15)" }}
          >
            <span className="text-xs">⚡</span>
          </div>
          <div>
            <div className="text-[11px] font-semibold" style={{ color: "var(--gl-heading)" }}>
              New commit pushed
            </div>
            <div className="text-[10px] font-mono mt-0.5" style={{ color: "var(--gl-muted)" }}>
              GLM-1: add auth module
            </div>
            <div className="text-[10px] mt-0.5 font-medium" style={{ color: "#22B07D" }}>
              Task auto-moved → Done ✓
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ── Screen 4 — VS Code ────────────────────────────────────────────────────────
const VSCodeScreen = () => (
  <div
    className="demo-screen absolute inset-0 flex flex-col opacity-0"
    style={{ background: "#0d1117" }}
  >
    {/* Title bar */}
    <div
      className="flex items-center px-4 py-2 gap-3 flex-shrink-0"
      style={{ background: "#1c2128", borderBottom: "1px solid #30363d" }}
    >
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FEBC2E" }} />
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28C840" }} />
      </div>
      <div className="flex gap-1 ml-2">
        <span
          className="text-[10px] font-mono px-2.5 py-0.5 rounded"
          style={{ background: "#2d333b", color: "#cdd9e5" }}
        >
          src/auth.js
        </span>
        <span
          className="text-[10px] font-mono px-2.5 py-0.5 rounded"
          style={{ color: "#6e7681" }}
        >
          package.json
        </span>
      </div>
      <span className="ml-auto text-[10px] font-mono" style={{ color: "#6e7681" }}>
        my-awesome-app — VS Code
      </span>
    </div>

    {/* Layout */}
    <div className="flex flex-1 overflow-hidden">
      {/* Activity bar */}
      <div
        className="w-10 flex-shrink-0 flex flex-col items-center py-3 gap-4"
        style={{ background: "#1c2128", borderRight: "1px solid #30363d" }}
      >
        {["📄", "🔍", "🌿", "🐛", "🔌"].map((ic, i) => (
          <div key={i} className="text-sm" style={{ opacity: i === 0 ? 1 : 0.4 }}>
            {ic}
          </div>
        ))}
      </div>

      {/* File explorer */}
      <div
        className="w-32 flex-shrink-0 px-2 py-2 font-mono overflow-hidden"
        style={{ background: "#161b22", borderRight: "1px solid #30363d", color: "#8b949e" }}
      >
        <div
          className="text-[8px] uppercase tracking-widest mb-2 px-1"
          style={{ color: "#6e7681" }}
        >
          Explorer
        </div>
        {[
          { label: "▸ src/",        active: false },
          { label: "  auth.js",     active: true  },
          { label: "  index.js",    active: false },
          { label: "package.json",  active: false },
          { label: ".env",          active: false },
        ].map((f, i) => (
          <div
            key={i}
            className="py-0.5 px-1 rounded text-[10px]"
            style={{
              color: f.active ? "#e6edf3" : "#8b949e",
              background: f.active ? "rgba(58,126,232,0.18)" : "transparent",
            }}
          >
            {f.label}
          </div>
        ))}
      </div>

      {/* Editor + terminal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Editor code */}
        <div
          className="flex-1 px-4 py-3 font-mono overflow-hidden"
          style={{ background: "#0d1117", color: "#e6edf3", fontSize: 10, lineHeight: 1.75 }}
        >
          <div style={{ color: "#6e7681" }}>{"// src/auth.js — GitHub OAuth module"}</div>
          <div>
            <span style={{ color: "#ff7b72" }}>import </span>
            <span style={{ color: "#a5d6ff" }}>{"{ Octokit }"}</span>
            <span style={{ color: "#ff7b72" }}> from </span>
            <span style={{ color: "#a8daab" }}>&apos;@octokit/rest&apos;</span>
          </div>
          <div className="mt-1">
            <span style={{ color: "#ff7b72" }}>export async function </span>
            <span style={{ color: "#d2a8ff" }}>loginWithGitHub</span>
            <span>(code) {"{"}</span>
          </div>
          <div className="ml-4">
            <span style={{ color: "#ff7b72" }}>const </span>
            <span>token = </span>
            <span style={{ color: "#ff7b72" }}>await </span>
            <span style={{ color: "#79c0ff" }}>exchangeCode</span>
            <span>(code)</span>
          </div>
          <div className="ml-4">
            <span style={{ color: "#ff7b72" }}>const </span>
            <span>user = </span>
            <span style={{ color: "#ff7b72" }}>await </span>
            <span style={{ color: "#79c0ff" }}>getUser</span>
            <span>(token)</span>
          </div>
          <div className="ml-4">
            <span style={{ color: "#ff7b72" }}>return </span>
            <span>{"{ token, user }"}</span>
          </div>
          <div>{"}"}</div>
        </div>

        {/* Terminal tab bar */}
        <div
          className="flex items-center px-4 py-1 gap-3"
          style={{
            background: "#1c2128",
            borderTop: "1px solid #30363d",
            borderBottom: "1px solid #30363d",
          }}
        >
          <span
            className="text-[9px] uppercase tracking-widest font-semibold"
            style={{ color: "#3A7EE8", borderBottom: "1px solid #3A7EE8", paddingBottom: 2 }}
          >
            Terminal
          </span>
          <span className="text-[9px]" style={{ color: "#6e7681" }}>
            bash
          </span>
          <span className="ml-auto text-[9px]" style={{ color: "#6e7681" }}>
            ⊕ ×
          </span>
        </div>

        {/* Terminal panel */}
        <div
          id="vscode-terminal"
          className="px-4 py-2.5 font-mono flex-shrink-0 overflow-hidden"
          style={{
            background: "#0d1117",
            minHeight: 120,
            color: "#e6edf3",
            fontSize: 10,
            lineHeight: 1.85,
          }}
        >
          {/* Prompt line 1 — git add */}
          <div className="flex flex-wrap gap-x-0">
            <span style={{ color: "#22B07D" }}>alex@laptop</span>
            <span style={{ color: "#e6edf3" }}>:~/my-awesome-app</span>
            <span style={{ color: "#79c0ff" }}> (main)</span>
            <span style={{ color: "#e6edf3" }}>$ </span>
            <span id="term-cmd1" style={{ color: "#e6edf3" }} />
          </div>
          <div id="term-out1" className="opacity-0" style={{ color: "#6e7681" }} />

          {/* Prompt line 2 — git commit */}
          <div id="term-line2" className="flex flex-wrap gap-x-0 opacity-0">
            <span style={{ color: "#22B07D" }}>alex@laptop</span>
            <span style={{ color: "#e6edf3" }}>:~/my-awesome-app</span>
            <span style={{ color: "#79c0ff" }}> (main)</span>
            <span style={{ color: "#e6edf3" }}>$ </span>
            <span id="term-cmd2" style={{ color: "#e6edf3" }} />
          </div>
          <div id="term-out2" className="opacity-0">
            <div style={{ color: "#6e7681" }}>
              [main a3f91c2] GLM-1: add auth module
            </div>
            <div style={{ color: "#6e7681" }}>
              &nbsp;1 file changed, 18 insertions(+), 2 deletions(-)
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ── Cursor + click ripple ─────────────────────────────────────────────────────
const Cursor = () => (
  <>
    <div
      id="demo-cursor"
      className="absolute pointer-events-none z-50"
      style={{ left: 0, top: 0, transform: "translate(-3px,-3px)" }}
    >
      <svg width="18" height="22" viewBox="0 0 20 24" fill="none">
        <path
          d="M0 0L0 20L5.5 14.5L9 22L11.5 21L8 13.5L15.5 13.5L0 0Z"
          fill="white"
          stroke="#1a1a2e"
          strokeWidth="1.5"
        />
      </svg>
    </div>
    <div
      id="demo-ripple"
      className="absolute pointer-events-none z-50 rounded-full"
      style={{
        width: 22,
        height: 22,
        marginLeft: -11,
        marginTop: -11,
        border: "2px solid #E8654A",
        opacity: 0,
      }}
    />
  </>
);

// ── Main component ────────────────────────────────────────────────────────────
const ProductDemo = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const vp = section.querySelector(".demo-viewport");

    // Element refs
    const cursor = section.querySelector("#demo-cursor");
    const ripple = section.querySelector("#demo-ripple");
    const screens = Array.from(section.querySelectorAll(".demo-screen"));
    const [loginScr, dashScr, projScr, termScr] = screens;

    const q = (id) => section.querySelector(id);

    // ── moveTo: cursor coords relative to viewport ────────────────────────────
    const moveTo = (el) => {
      const r  = el.getBoundingClientRect();
      const vr = vp.getBoundingClientRect();
      return {
        x: r.left - vr.left + r.width  / 2,
        y: r.top  - vr.top  + r.height / 2,
      };
    };

    // ── Initial positions ─────────────────────────────────────────────────────
    gsap.set(cursor, { opacity: 0, x: 100, y: 230 });
    gsap.set(ripple, { opacity: 0 });
    gsap.set([q("#task-todo-0"), q("#task-todo-1")], { y: 8 });
    gsap.set(q("#task-inprog"), { y: 8 });
    gsap.set(q("#task-done"),   { y: 10 });
    gsap.set(q("#new-proj-modal"), { y: -10 });
    gsap.set(q("#commit-toast"), { y: 12 });

    // ── Timeline ──────────────────────────────────────────────────────────────
    const tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: "top 62%", once: true },
      onUpdate() {
        const p = this.progress();
        setActiveStep(
          p < 0.10 ? 0 :
          p < 0.26 ? 1 :
          p < 0.40 ? 2 :
          p < 0.55 ? 3 :
          p < 0.67 ? 4 :
          p < 0.82 ? 5 : 6
        );
      },
    });

    // Helper: animate cursor move
    const move = (el, dur = 0.7, ease = "power2.inOut") =>
      tl.to(cursor, {
        duration: dur, ease,
        x: () => moveTo(el).x,
        y: () => moveTo(el).y,
      });

    // Helper: click animation + ripple
    const click = (el, at = ">") => {
      tl.to(cursor, { scale: 0.72, duration: 0.09 }, at);
      tl.to(cursor, { scale: 1,    duration: 0.10 }, ">");
      tl.add(() => {
        const p = moveTo(el);
        gsap.set(ripple, { left: p.x, top: p.y, scale: 0, opacity: 0.9 });
        gsap.to(ripple, { scale: 3, opacity: 0, duration: 0.55, ease: "power2.out" });
      }, "<");
    };

    // Helper: typewriter effect
    const typeInto = (elId, text, speed = 0.055) => {
      const el = q(`#${elId}`);
      tl.to({}, {
        duration: text.length * speed,
        onUpdate() {
          const n = Math.ceil(this.progress() * text.length);
          el.textContent = text.slice(0, n);
        },
      });
    };

    // ─── Phase 1 — Login ──────────────────────────────────────────────────────
    tl.to(cursor, { opacity: 1, duration: 0.4 });

    // hover GitHub button
    move(q("#gh-login-btn"), 0.9);
    tl.to(q("#gh-login-btn"), { scale: 1.04, boxShadow: "0 0 0 3px rgba(232,101,74,0.3)", duration: 0.2 }, "<0.75");
    click(q("#gh-login-btn"), "<0.15");
    tl.to(q("#gh-login-btn"), { scale: 1, boxShadow: "none", duration: 0.15 }, ">");

    // screen transition
    tl.to(loginScr, { opacity: 0, scale: 0.96, duration: 0.4, ease: "power2.in" }, "+=0.3");
    tl.to(dashScr,  { opacity: 1,               duration: 0.4, ease: "power2.out" }, "<0.15");

    // ─── Phase 2 — Dashboard: click New Project ───────────────────────────────
    tl.to({}, { duration: 0.35 });
    move(q("#new-proj-btn"), 0.65);
    tl.to(q("#new-proj-btn"), { scale: 1.05, duration: 0.15 }, "<0.55");
    click(q("#new-proj-btn"), "<0.1");
    tl.to(q("#new-proj-btn"), { scale: 1, duration: 0.12 }, ">");

    // modal appears
    tl.to(q("#new-proj-modal"), { opacity: 1, y: 0, duration: 0.38, ease: "back.out(1.5)" }, "+=0.12");

    // ─── Phase 3 — Fill project form ──────────────────────────────────────────
    tl.to({}, { duration: 0.2 });

    // click name input
    move(q("#proj-name-input"), 0.5);
    click(q("#proj-name-input"), "<0.42");
    tl.to(q("#proj-name-input"), { borderColor: "#E8654A", duration: 0.2 }, ">");
    tl.to(q("#proj-name-caret"), { opacity: 1, duration: 0.1 }, ">");

    // type project name
    typeInto("proj-name-text", "my-awesome-app", 0.065);
    tl.to(q("#proj-name-caret"), { opacity: 0, duration: 0.1 }, ">");

    // click repo selector
    tl.to({}, { duration: 0.15 });
    move(q("#repo-selector"), 0.48);
    click(q("#repo-selector"), "<0.4");
    tl.to(q("#repo-selector"), { borderColor: "#E8654A", duration: 0.15 }, ">");
    tl.to(q("#repo-dropdown"), { opacity: 1, y: 0, duration: 0.22, ease: "power2.out" }, ">");

    // cursor hovers first option
    tl.to({}, { duration: 0.18 });
    move(q("#repo-opt-0"), 0.38);
    tl.to(q("#repo-opt-0"), { background: "var(--gl-coral-bg)", color: "var(--gl-coral)", duration: 0.15 }, "<0.32");
    click(q("#repo-opt-0"), "<0.06");

    // dropdown closes, selector updates
    tl.to(q("#repo-dropdown"), { opacity: 0, duration: 0.18 }, ">");
    tl.add(() => {
      const txt = q("#repo-selector-text");
      txt.textContent = "forger6969/my-awesome-app";
      txt.style.color = "var(--gl-heading)";
      q("#repo-selector").style.borderColor = "#22B07D";
    });

    // create button activates
    tl.to(q("#create-proj-btn"), { opacity: 1, duration: 0.25 }, ">");

    // cursor moves to Create
    tl.to({}, { duration: 0.15 });
    move(q("#create-proj-btn"), 0.42);
    tl.to(q("#create-proj-btn"), { scale: 1.04, duration: 0.12 }, "<0.38");
    click(q("#create-proj-btn"), "<0.08");
    tl.to(q("#create-proj-btn"), { scale: 1, duration: 0.1 }, ">");
    tl.add(() => { q("#create-proj-btn").textContent = "Creating…"; });

    // transition to project screen
    tl.to(dashScr, { opacity: 0, scale: 0.97, duration: 0.4, ease: "power2.in" }, "+=0.5");
    tl.to(projScr, { opacity: 1,               duration: 0.4, ease: "power2.out" }, "<0.15");

    // ─── Phase 4 — Webhook connects ───────────────────────────────────────────
    tl.to(q("#webhook-banner"), { opacity: 1, duration: 0.3 }, "+=0.2");
    tl.to({}, { duration: 0.8 });
    tl.add(() => {
      q("#webhook-dot").style.background = "#22B07D";
      q("#webhook-dot").style.boxShadow  = "0 0 0 4px rgba(34,176,125,0.25)";
      q("#webhook-text").textContent      = "Webhook connected ✓";
      q("#webhook-text").style.color      = "#22B07D";
    });
    tl.to(q("#webhook-repo"), { opacity: 1, duration: 0.3 }, ">");
    tl.to({}, { duration: 0.4 });

    // task cards appear
    tl.to(q("#task-todo-0"), { opacity: 1, y: 0, duration: 0.28, ease: "back.out(1.6)" });
    tl.to(q("#task-todo-1"), { opacity: 1, y: 0, duration: 0.28, ease: "back.out(1.6)" }, "<0.12");

    // ─── Phase 5 — Invite team ────────────────────────────────────────────────
    tl.to({}, { duration: 0.35 });
    move(q("#invite-btn"), 0.55);
    tl.to(q("#invite-btn"), { scale: 1.06, duration: 0.14 }, "<0.48");
    click(q("#invite-btn"), "<0.08");
    tl.to(q("#invite-btn"), { scale: 1, duration: 0.1 }, ">");

    // invite modal opens
    tl.to(q("#invite-modal"), { opacity: 1, duration: 0.32, ease: "back.out(1.4)" }, "+=0.1");
    tl.to(q("#invite-caret"), { opacity: 1, duration: 0.1 }, ">");

    // cursor moves near invite input area
    tl.to(cursor, {
      duration: 0.4, ease: "power2.inOut",
      x: () => moveTo(q("#invite-modal")).x - 25,
      y: () => moveTo(q("#invite-modal")).y - 5,
    }, ">");

    // type email
    typeInto("invite-email-text", "alex@team.dev", 0.06);
    tl.to(q("#invite-caret"), { opacity: 0, duration: 0.1 }, ">");

    // click Send
    tl.to({}, { duration: 0.1 });
    move(q("#invite-send-btn"), 0.38);
    click(q("#invite-send-btn"), "<0.32");

    // invited rows appear
    tl.to(q("#invite-row-0"), { opacity: 1, duration: 0.22 }, "+=0.1");
    tl.to(q("#invite-row-1"), { opacity: 1, duration: 0.22 }, "<0.1");

    // close modal
    tl.to(q("#invite-modal"), { opacity: 0, scale: 0.97, duration: 0.3 }, "+=0.9");

    // assign task to Alex — card appears in In Progress
    tl.to(q("#task-inprog"), { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.5)" }, "+=0.35");

    // ─── Phase 6 — VS Code terminal ──────────────────────────────────────────
    tl.to({}, { duration: 0.45 });
    tl.to(projScr, { opacity: 0, scale: 0.97, duration: 0.4, ease: "power2.in" });
    tl.to(termScr, { opacity: 1,               duration: 0.4, ease: "power2.out" }, "<0.15");
    tl.to(cursor,  { opacity: 0, duration: 0.2 }, "<");

    // type: git add .
    tl.to({}, { duration: 0.4 });
    typeInto("term-cmd1", "git add .", 0.08);
    tl.to({}, { duration: 0.25 });
    tl.add(() => { q("#term-out1").textContent = ""; });
    tl.to(q("#term-out1"), { opacity: 1, duration: 0.12 }, ">");

    // show second prompt
    tl.to({}, { duration: 0.3 });
    tl.to(q("#term-line2"), { opacity: 1, duration: 0.12 }, ">");

    // type: git commit
    typeInto("term-cmd2", 'git commit -m "GLM-1: add auth module"', 0.048);
    tl.to({}, { duration: 0.35 });
    tl.to(q("#term-out2"), { opacity: 1, duration: 0.2 }, ">");

    // ─── Phase 7 — Real-time sync ─────────────────────────────────────────────
    tl.to({}, { duration: 0.8 });
    tl.to(termScr, { opacity: 0, scale: 0.97, duration: 0.4, ease: "power2.in" });
    tl.to(projScr, { opacity: 1,               duration: 0.4, ease: "power2.out" }, "<0.15");
    tl.to(cursor,  { opacity: 1, duration: 0.2 }, "<0.3");

    // commit toast slides in
    tl.to(q("#commit-toast"), { opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.7)" }, ">");

    // task card: in-progress fades out, done appears
    tl.to(q("#task-inprog"), { opacity: 0.25, duration: 0.3 }, "<0.25");
    tl.to(q("#task-done"),   { opacity: 1, y: 0, duration: 0.38, ease: "back.out(1.8)" }, "<0.1");

    tl.to({}, { duration: 2.2 });

    return () => { tl.kill(); };
  }, []);

  return (
    <section ref={sectionRef} className="py-24" style={{ background: "var(--gl-bg-page)" }}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="text-xs font-semibold tracking-widest px-4 py-1.5 rounded-full"
            style={{ color: "var(--gl-coral)", background: "var(--gl-coral-bg)" }}
          >
            {t("demo_badge", "PRODUCT DEMO")}
          </span>
          <h2
            className="text-4xl font-bold mt-5 leading-tight"
            style={{ color: "var(--gl-heading)" }}
          >
            {t("demo_h1", "From zero to")}{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(to right,#E8654A,#D4512F)" }}
            >
              {t("demo_h2", "full team sync")}
            </span>
          </h2>
          <p className="mt-3 max-w-lg mx-auto" style={{ color: "var(--gl-muted)" }}>
            {t(
              "demo_sub",
              "Watch the full flow — login, create project, invite team, commit and sync in real time."
            )}
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_272px] gap-8 items-start">

          {/* Demo viewport */}
          <div
            className="demo-viewport rounded-2xl overflow-hidden shadow-2xl relative"
            style={{
              height: 470,
              border: "1px solid var(--gl-border-subtle)",
              background: "var(--gl-bg-page)",
            }}
          >
            <LoginScreen />
            <DashboardScreen />
            <ProjectScreen />
            <VSCodeScreen />
            <Cursor />
          </div>

          {/* Step list */}
          <div className="flex flex-col gap-2">
            {STEPS.map((step, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-300"
                style={{
                  background:
                    activeStep === i ? "var(--gl-coral-bg)" : "var(--gl-bg-card)",
                  border: `1px solid ${
                    activeStep === i ? "var(--gl-coral)" : "var(--gl-border-subtle)"
                  }`,
                  opacity: activeStep > i ? 0.5 : 1,
                }}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs flex-shrink-0"
                  style={{
                    background:
                      activeStep === i
                        ? "var(--gl-coral)"
                        : activeStep > i
                        ? "rgba(34,176,125,0.15)"
                        : "var(--gl-bg-page)",
                  }}
                >
                  {activeStep > i ? "✓" : step.icon}
                </div>
                <span
                  className="text-xs font-medium"
                  style={{
                    color:
                      activeStep === i
                        ? "var(--gl-coral)"
                        : activeStep > i
                        ? "#22B07D"
                        : "var(--gl-muted)",
                  }}
                >
                  {step.label}
                </span>
                {activeStep === i && (
                  <div className="ml-auto flex gap-1">
                    {[0, 1, 2].map((d) => (
                      <div
                        key={d}
                        className="w-1 h-1 rounded-full animate-pulse"
                        style={{
                          background: "var(--gl-coral)",
                          animationDelay: `${d * 0.15}s`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProductDemo;
