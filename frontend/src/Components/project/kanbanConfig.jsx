import { getC } from "./theme";

const _CL = getC(false);

export const PRIORITIES = ["low", "medium", "high"];

export const PRIORITY_CONFIG = {
  high:   { color: _CL.danger,   bg: _CL.dangerBg,   label: "High" },
  medium: { color: _CL.warning,  bg: _CL.warningBg,  label: "Med" },
  low:    { color: _CL.success,  bg: _CL.successBg,  label: "Low" },
};

export const KANBAN_COLUMNS = [
  {
    key: "todo", label: "To Do",
    color: _CL.muted, bgColor: "#F0F2F7", borderColor: _CL.borderDef,
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    key: "in_progress", label: "In Progress",
    color: _CL.info, bgColor: "rgba(58,126,232,0.05)", borderColor: "rgba(58,126,232,0.2)",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-.49-4.5" />
      </svg>
    ),
  },
  {
    key: "done", label: "Done",
    color: _CL.success, bgColor: "rgba(34,176,125,0.05)", borderColor: "rgba(34,176,125,0.2)",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  {
    key: "verified", label: "Verified",
    color: _CL.coral, bgColor: "rgba(232,101,74,0.05)", borderColor: "rgba(232,101,74,0.2)",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    key: "overdue", label: "Overdue",
    color: _CL.danger, bgColor: "rgba(224,61,61,0.05)", borderColor: "rgba(224,61,61,0.2)",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
];

export const COMPLETION_STATUSES = ["done", "verified"];

export const STATUS_FILTERS = [
  { key: "all",         label: "All" },
  { key: "todo",        label: "To Do" },
  { key: "in_progress", label: "In Progress" },
  { key: "done",        label: "Done" },
  { key: "verified",    label: "Verified" },
  { key: "overdue",     label: "Overdue" },
];

export const isColumnKey = (value) =>
  KANBAN_COLUMNS.some((column) => column.key === value);

export const getTaskColumnKey = (overId, tasks) => {
  if (!overId) return null;
  if (isColumnKey(overId)) return overId;
  const task = tasks.find((item) => item._id === overId);
  return task?.status || null;
};
