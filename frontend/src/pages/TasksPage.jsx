// // import React, { useEffect, useState } from "react";
// // import { useTranslation } from "react-i18next";
// // import api from "../api/api";

// // /* ─── Colors ─── */
// // const C = {
// //   coral: "#E8654A",
// //   coralHover: "#D4512F",
// //   pageBg: "#EEF1F7",
// //   cardBg: "#FFFFFF",
// //   heading: "#181D2A",
// //   muted: "#5C6480",
// //   borderSubtle: "#E2E5EE",
// //   inputBg: "#F4F6FB",
// // };

// // /* ─── Columns ─── */
// // const COLUMNS = [
// //   { key: "todo", color: "#6B7280" },
// //   { key: "in_progress", color: "#3A7EE8" },
// //   { key: "done", color: "#22B07D" },
// //   { key: "verified", color: "#E8654A" },
// //   { key: "overdue", color: "#E03D3D" },
// // ];

// // /* ─── Task Card ─── */
// // const TaskCard = ({ task }) => {
// //   const { t } = useTranslation();

// //   return (
// //     <div
// //       className="p-3 rounded-xl transition-all duration-200 hover:scale-[1.02]"
// //       style={{
// //         background: "#fff",
// //         border: `1px solid ${C.borderSubtle}`,
// //         boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
// //       }}
// //     >
// //       <p className="text-sm font-semibold" style={{ color: C.heading }}>
// //         {task.task_name}
// //       </p>

// //       <p className="text-xs mt-1 line-clamp-2" style={{ color: C.muted }}>
// //         {task.task_describe}
// //       </p>

// //       <div className="flex justify-between items-center mt-3">
// //         <span
// //           className="text-xs font-mono px-2 py-0.5 rounded"
// //           style={{
// //             background: C.inputBg,
// //             color: C.muted,
// //           }}
// //         >
// //           {task.key}
// //         </span>

// //         <span
// //           className="text-xs font-semibold px-2 py-0.5 rounded"
// //           style={{
// //             background:
// //               task.priority === "high"
// //                 ? "#FFE5E0"
// //                 : task.priority === "medium"
// //                 ? "#FFF3D6"
// //                 : "#E6F7EE",
// //             color:
// //               task.priority === "high"
// //                 ? "#E03D3D"
// //                 : task.priority === "medium"
// //                 ? "#D4890A"
// //                 : "#22B07D",
// //           }}
// //         >
// //           {t(`priority.${task.priority}`)}
// //         </span>
// //       </div>
// //     </div>
// //   );
// // };

// // /* ─── Column ─── */
// // const Column = ({ title, tasks, color }) => {
// //   const { t } = useTranslation();

// //   return (
// //     <div
// //       className="rounded-2xl p-3 flex flex-col"
// //       style={{
// //         background: "rgba(255,255,255,0.9)",
// //         backdropFilter: "blur(10px)",
// //         border: `1px solid ${C.borderSubtle}`,
// //         minHeight: "520px",
// //         boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
// //       }}
// //     >
// //       <div className="flex items-center justify-between mb-3">
// //         <h3 className="text-sm font-bold" style={{ color }}>
// //           {title}
// //         </h3>

// //         <span
// //           className="text-xs px-2 py-0.5 rounded-full font-semibold"
// //           style={{
// //             background: C.inputBg,
// //             color,
// //           }}
// //         >
// //           {tasks.length}
// //         </span>
// //       </div>

// //       <div className="space-y-2 overflow-auto">
// //         {tasks.length === 0 ? (
// //           <p className="text-xs opacity-60" style={{ color: C.muted }}>
// //             {t("noTasks")}
// //           </p>
// //         ) : (
// //           tasks.map((tks) => <TaskCard key={tks._id} task={tks} />)
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // /* ─── Page ─── */
// // const TasksPage = () => {
// //   const { t } = useTranslation();

// //   const [kanban, setKanban] = useState({
// //     todo: [],
// //     in_progress: [],
// //     done: [],
// //     verified: [],
// //     overdue: [],
// //   });

// //   const [loading, setLoading] = useState(true);

// //   const fetchTasks = async () => {
// //     try {
// //       const token = localStorage.getItem("token");
// //       const res = await api.get("/api/task/my", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });

// //       setKanban(res.data.kanban || {});
// //     } catch (err) {
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchTasks();
// //   }, []);

// //   if (loading) {
// //     return (
// //       <div className="flex items-center justify-center h-screen">
// //         <p>{t("loading")}</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen p-6" style={{ background: C.pageBg }}>
// //       <div className="max-w-7xl mx-auto">
// //         <div className="mb-6">
// //           <h1 className="text-xl font-bold">{t("title")}</h1>
// //           <p className="text-sm">{t("subtitle")}</p>
// //         </div>

// //         <div className="grid grid-cols-5 gap-4 items-start">
// //           {COLUMNS.map((col) => (
// //             <Column
// //               key={col.key}
// //               title={t(`columns.${col.key}`)}
// //               color={col.color}
// //               tasks={kanban[col.key] || []}
// //             />
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default TasksPage;

// import React, { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { useSelector } from "react-redux";
// import api from "../api/api";

// /* ─── Colors ─── */
// const C = {
//   pageBg: "#EEF1F7",
//   heading: "#181D2A",
//   muted: "#5C6480",
//   borderSubtle: "#E2E5EE",
//   inputBg: "#F4F6FB",
// };

// /* ─── Columns ─── */
// const COLUMNS = [
//   { key: "todo", color: "#6B7280" },
//   { key: "in_progress", color: "#3A7EE8" },
//   { key: "done", color: "#22B07D" },
//   { key: "verified", color: "#E8654A" },
//   { key: "overdue", color: "#E03D3D" },
// ];

// /* ─── Task Card ─── */
// const TaskCard = ({ task, isDark }) => {
//   const { t } = useTranslation();

//   return (
//     <div
//       className="p-3 rounded-xl transition-all duration-200 hover:scale-[1.02]"
//       style={{
//         background: isDark ? "#1E293B" : "#fff",
//         border: `1px solid ${isDark ? "#2B3141" : C.borderSubtle}`,
//         boxShadow: isDark
//           ? "0 2px 10px rgba(0,0,0,0.5)"
//           : "0 2px 10px rgba(0,0,0,0.04)",
//       }}
//     >
//       <p
//         className="text-sm font-semibold"
//         style={{ color: isDark ? "#F1F5F9" : C.heading }}
//       >
//         {task.task_name}
//       </p>

//       <p
//         className="text-xs mt-1 line-clamp-2"
//         style={{ color: isDark ? "#94A3B8" : C.muted }}
//       >
//         {task.task_describe}
//       </p>

//       <div className="flex justify-between items-center mt-3">
//         <span
//           className="text-xs font-mono px-2 py-0.5 rounded"
//           style={{
//             background: isDark ? "#334155" : C.inputBg,
//             color: isDark ? "#CBD5F5" : C.muted,
//           }}
//         >
//           {task.key}
//         </span>

//         <span
//           className="text-xs font-semibold px-2 py-0.5 rounded"
//           style={{
//             background:
//               task.priority === "high"
//                 ? "#FFE5E0"
//                 : task.priority === "medium"
//                 ? "#FFF3D6"
//                 : "#E6F7EE",
//             color:
//               task.priority === "high"
//                 ? "#E03D3D"
//                 : task.priority === "medium"
//                 ? "#D4890A"
//                 : "#22B07D",
//           }}
//         >
//           {t(`priority.${task.priority}`)}
//         </span>
//       </div>
//     </div>
//   );
// };

// /* ─── Column ─── */
// const Column = ({ title, tasks, color, isDark }) => {
//   const { t } = useTranslation();

//   return (
//     <div
//       className="rounded-2xl p-3 flex flex-col"
//       style={{
//         background: isDark
//           ? "rgba(18,21,30,0.95)"
//           : "rgba(255,255,255,0.9)",
//         border: `1px solid ${isDark ? "#2B3141" : C.borderSubtle}`,
//         minHeight: "520px",
//         boxShadow: isDark
//           ? "0 6px 20px rgba(0,0,0,0.6)"
//           : "0 6px 20px rgba(0,0,0,0.05)",
//       }}
//     >
//       <div className="flex items-center justify-between mb-3">
//         <h3 className="text-sm font-bold" style={{ color }}>
//           {title}
//         </h3>

//         <span
//           className="text-xs px-2 py-0.5 rounded-full font-semibold"
//           style={{
//             background: isDark ? "#334155" : C.inputBg,
//             color,
//           }}
//         >
//           {tasks.length}
//         </span>
//       </div>

//       <div className="space-y-2 overflow-auto">
//         {tasks.length === 0 ? (
//           <p
//             className="text-xs opacity-60"
//             style={{ color: isDark ? "#9CA3AF" : C.muted }}
//           >
//             {t("noTasks")}
//           </p>
//         ) : (
//           tasks.map((tks) => (
//             <TaskCard key={tks._id} task={tks} isDark={isDark} />
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// /* ─── Page ─── */
// const TasksPage = () => {
//   const { t } = useTranslation();
//   const mode = useSelector((state) => state.theme.mode);
//   const isDark = mode === "dark";

//   const [kanban, setKanban] = useState({
//     todo: [],
//     in_progress: [],
//     done: [],
//     verified: [],
//     overdue: [],
//   });

//   const [loading, setLoading] = useState(true);

//   const fetchTasks = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await api.get("/api/task/my", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setKanban(res.data.kanban || {});
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   if (loading) {
//     return (
//       <div
//         className="flex items-center justify-center h-screen"
//         style={{ background: isDark ? "#0F172A" : C.pageBg }}
//       >
//         <p style={{ color: isDark ? "#9CA3AF" : C.muted }}>
//           {t("loading")}
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="min-h-screen p-6"
//       style={{ background: isDark ? "#0F172A" : C.pageBg }}
//     >
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-6">
//           <h1
//             className="text-xl font-bold"
//             style={{ color: isDark ? "#fff" : C.heading }}
//           >
//             {t("title")}
//           </h1>
//           <p
//             className="text-sm"
//             style={{ color: isDark ? "#9CA3AF" : C.muted }}
//           >
//             {t("subtitle")}
//           </p>
//         </div>

//         <div className="grid grid-cols-5 gap-4 items-start">
//           {COLUMNS.map((col) => (
//             <Column
//               key={col.key}
//               title={t(`columns.${col.key}`)}
//               color={col.color}
//               tasks={kanban[col.key] || []}
//               isDark={isDark}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TasksPage; 



import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import api from "../api/api";

/* ─── Columns ─── */
const COLUMNS = [
  { key: "todo", color: "#6B7280" },
  { key: "in_progress", color: "#3A7EE8" },
  { key: "done", color: "#22B07D" },
  { key: "verified", color: "#E8654A" },
  { key: "overdue", color: "#E03D3D" },
];

/* ─── Task Card ─── */
const TaskCard = ({ task, isDark }) => {
  const { t } = useTranslation();

  return (
    <div
      className="p-3 rounded-xl transition-all duration-200 hover:scale-[1.02]"
      style={{
        background: isDark ? "#1E293B" : "#fff",
        border: `1px solid ${isDark ? "#2B3141" : "#E2E5EE"}`,
        boxShadow: isDark
          ? "0 2px 10px rgba(0,0,0,0.5)"
          : "0 2px 10px rgba(0,0,0,0.04)",
      }}
    >
      <p
        className="text-sm font-semibold"
        style={{ color: isDark ? "#F1F5F9" : "#181D2A" }}
      >
        {task?.task_name ?? "No name"}
      </p>

      <p
        className="text-xs mt-1 line-clamp-2"
        style={{ color: isDark ? "#94A3B8" : "#5C6480" }}
      >
        {task?.task_describe ?? "No description"}
      </p>

      <div className="flex justify-between items-center mt-3">
        <span
          className="text-xs font-mono px-2 py-0.5 rounded"
          style={{
            background: isDark ? "#334155" : "#F4F6FB",
            color: isDark ? "#CBD5E1" : "#5C6480",
          }}
        >
          {task?.key ?? "-"}
        </span>

        <span
          className="text-xs font-semibold px-2 py-0.5 rounded"
          style={{
            background:
              task?.priority === "high"
                ? "#FFE5E0"
                : task?.priority === "medium"
                ? "#FFF3D6"
                : "#E6F7EE",
            color:
              task?.priority === "high"
                ? "#E03D3D"
                : task?.priority === "medium"
                ? "#D4890A"
                : "#22B07D",
          }}
        >
          {t(`priority.${task?.priority ?? "low"}`)}
        </span>
      </div>
    </div>
  );
};

/* ─── Column ─── */
const Column = ({ title, tasks, color, isDark }) => {
  const { t } = useTranslation();

  const safeTasks = Array.isArray(tasks) ? tasks : [];

  return (
    <div
      className="rounded-2xl p-3 flex flex-col"
      style={{
        background: isDark
          ? "rgba(18,21,30,0.95)"
          : "rgba(255,255,255,0.9)",
        border: `1px solid ${isDark ? "#2B3141" : "#E2E5EE"}`,
        minHeight: "520px",
        boxShadow: isDark
          ? "0 6px 20px rgba(0,0,0,0.6)"
          : "0 6px 20px rgba(0,0,0,0.05)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold" style={{ color }}>
          {title}
        </h3>

        <span
          className="text-xs px-2 py-0.5 rounded-full font-semibold"
          style={{
            background: isDark ? "#334155" : "#F4F6FB",
            color,
          }}
        >
          {safeTasks.length}
        </span>
      </div>

      {/* Tasks */}
      <div className="space-y-2 overflow-auto">
        {safeTasks.length === 0 ? (
          <p
            className="text-xs opacity-60"
            style={{ color: isDark ? "#9CA3AF" : "#5C6480" }}
          >
            {t("noTasks")}
          </p>
        ) : (
          safeTasks.map((tks) => (
            <TaskCard key={tks?._id ?? tks?.id} task={tks} isDark={isDark} />
          ))
        )}
      </div>
    </div>
  );
};

/* ─── PAGE ─── */
const TasksPage = () => {
  const { t } = useTranslation();
  const mode = useSelector((state) => state.theme.mode);
  const isDark = mode === "dark";

  const [kanban, setKanban] = useState({
    todo: [],
    in_progress: [],
    done: [],
    verified: [],
    overdue: [],
  });

  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/api/task/my", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data?.kanban;

      setKanban({
        todo: data?.todo ?? [],
        in_progress: data?.in_progress ?? [],
        done: data?.done ?? [],
        verified: data?.verified ?? [],
        overdue: data?.overdue ?? [],
      });
    } catch (err) {
      console.log("API ERROR:", err.message);
      setKanban({
        todo: [],
        in_progress: [],
        done: [],
        verified: [],
        overdue: [],
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div
        className="flex items-center justify-center h-screen"
        style={{ background: isDark ? "#0F172A" : "#EEF1F7" }}
      >
        <p style={{ color: isDark ? "#9CA3AF" : "#5C6480" }}>
          {t("loading")}
        </p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen p-6"
      style={{ background: isDark ? "#0F172A" : "#EEF1F7" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1
            className="text-xl font-bold"
            style={{ color: isDark ? "#fff" : "#181D2A" }}
          >
            {t("tasksTitle")}
          </h1>
          <p
            className="text-sm"
            style={{ color: isDark ? "#9CA3AF" : "#5C6480" }}
          >
            {t("tasksSubtitle")}
          </p>
        </div>

        <div className="grid grid-cols-5 gap-4 items-start">
          {COLUMNS.map((col) => (
            <Column
              key={col.key}
              title={t(`columns.${col.key}`)}
              color={col.color}
              tasks={kanban[col.key]}
              isDark={isDark}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TasksPage;