import api from "./api";

const EDITABLE_TASK_FIELDS = ["task_name", "task_describe", "priority", "task_deadline", "status"];

const normalizeTaskDeadline = (value) => {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toISOString().slice(0, 10);
};

export const buildTaskPatchPayload = (initialTask, nextValues) => {
  const payload = {};

  EDITABLE_TASK_FIELDS.forEach((field) => {
    const prevValue = field === "task_deadline"
      ? normalizeTaskDeadline(initialTask?.[field])
      : (initialTask?.[field] ?? "");
    const nextValue = field === "task_deadline"
      ? normalizeTaskDeadline(nextValues?.[field])
      : (nextValues?.[field] ?? "");

    if (prevValue !== nextValue) {
      payload[field] = field === "task_deadline" && nextValue
        ? new Date(nextValue).toISOString()
        : nextValue;
    }
  });

  return payload;
};

export const updateTaskRequest = async (taskId, initialTask, nextValues, extraPayload = {}) => {
  const payload = { ...buildTaskPatchPayload(initialTask, nextValues), ...extraPayload };

  if (Object.keys(payload).length === 0) {
    return { success: true, task: initialTask, skipped: true };
  }

  const res = await api.patch(`/api/task/${taskId}`, payload);
  return { ...res.data, skipped: false };
};

export const updateTaskStatusRequest = async (taskId, status, extraPayload = {}) => {
  const res = await api.patch(`/api/task/${taskId}`, { status, ...extraPayload });
  return res.data;
};

export const getProjectTaskCommits = async (projectId) => {
  const res = await api.get(`/api/task/project/${projectId}/commits`);
  return res.data;
};

export const getCompletionDefaultOwnerId = (project) => {
  const ownerMember = project?.members?.find((member) => member.role === "owner");
  return ownerMember?.user?._id || project?.repo_owner_user?._id || project?.repo_owner_user || "";
};

export const getTaskEditErrorMessage = (error) => {
  const status = error?.response?.status;
  const message = error?.response?.data?.message;

  if (status === 403) return "Faqat project owner tahrirlay oladi";
  if (status === 404) return message || "Task topilmadi";
  if (status === 400) return message || "Yuborilgan ma'lumot noto'g'ri";

  return message || "Taskni tahrirlashda xatolik yuz berdi";
};

export { normalizeTaskDeadline };
