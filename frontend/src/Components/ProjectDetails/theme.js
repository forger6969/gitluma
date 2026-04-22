// ─── Theme-aware Design Tokens ────────────────────────────────────────────────
export const getColors = (isDark) => ({
  coral:        "#E8654A",
  coralHover:   "#D4512F",
  coralActive:  "#C04020",
  coralBg:      isDark ? "rgba(232,101,74,0.15)" : "#FCEDE9",
  coralSubtle:  "rgba(232,101,74,0.1)",
  charcoal:     isDark ? "#0D1017" : "#2B3141",
  pageBg:       isDark ? "#0D1117" : "#EEF1F7",
  cardBg:       isDark ? "#12151E" : "#FFFFFF",
  inputBg:      isDark ? "#1A1F2E" : "#F4F6FB",
  heading:      isDark ? "#F0F2F8" : "#181D2A",
  body:         isDark ? "#C8CFDF" : "#2B3141",
  muted:        isDark ? "#7D87A0" : "#5C6480",
  placeholder:  isDark ? "#4E566A" : "#9AA0B4",
  borderSubtle: isDark ? "#1F2535" : "#E2E5EE",
  borderDef:    isDark ? "#2B3141" : "#C8CDD9",
  success:      "#22B07D",
  successBg:    "rgba(34,176,125,0.1)",
  warning:      "#D4890A",
  warningBg:    "rgba(245,166,35,0.1)",
  danger:       "#E03D3D",
  dangerBg:     "rgba(224,61,61,0.1)",
  info:         "#3A7EE8",
  infoBg:       "rgba(58,126,232,0.1)",
});

export const getInputBase = (C) => ({
  backgroundColor: C.inputBg,
  border: `1.5px solid ${C.borderDef}`,
  color: C.heading,
  borderRadius: "12px",
  fontFamily: "inherit",
});

export const handleFocus = (e) => {
  e.target.style.borderColor = "#E8654A";
  e.target.style.boxShadow = "0 0 0 3px rgba(232,101,74,0.12)";
};

export const handleBlur = (C) => (e) => {
  e.target.style.borderColor = C.borderDef;
  e.target.style.boxShadow = "none";
};

export const KANBAN_COLUMNS_CONFIG = (C) => [
  {
    key: "todo", label: "To Do",
    color: C.muted, bgColor: C.inputBg, borderColor: C.borderDef,
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    key: "in_progress", label: "In Progress",
    color: "#3A7EE8", bgColor: "rgba(58,126,232,0.07)", borderColor: "rgba(58,126,232,0.2)",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-.49-4.5" />
      </svg>
    ),
  },
  {
    key: "done", label: "Done",
    color: "#22B07D", bgColor: "rgba(34,176,125,0.07)", borderColor: "rgba(34,176,125,0.2)",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  {
    key: "verified", label: "Verified",
    color: "#E8654A", bgColor: "rgba(232,101,74,0.07)", borderColor: "rgba(232,101,74,0.2)",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    key: "overdue", label: "Overdue",
    color: "#E03D3D", bgColor: "rgba(224,61,61,0.07)", borderColor: "rgba(224,61,61,0.2)",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
];

export const PRIORITY_CONFIG = (C) => ({
  high:   { color: C.danger,  bg: C.dangerBg,  label: "High" },
  medium: { color: C.warning, bg: C.warningBg, label: "Med"  },
  low:    { color: C.success, bg: C.successBg, label: "Low"  },
});

export const PRIORITIES = ["low", "medium", "high"];
export const COMPLETION_STATUSES = ["done", "verified"];

export const STATUS_FILTERS = [
  { key: "all",         label: "All"         },
  { key: "todo",        label: "To Do"       },
  { key: "in_progress", label: "In Progress" },
  { key: "done",        label: "Done"        },
  { key: "verified",    label: "Verified"    },
  { key: "overdue",     label: "Overdue"     },
];
