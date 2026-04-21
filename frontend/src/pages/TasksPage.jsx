// import React, { useEffect, useState } from "react";

// import api from "../api/api";


// const C = {
//   coral: "#E8654A",
//   coralHover: "#D4512F",
//   pageBg: "#EEF1F7",
//   cardBg: "#FFFFFF",
//   heading: "#181D2A",
//   muted: "#5C6480",
//   borderSubtle: "#E2E5EE",
//   inputBg: "#F4F6FB",
// };


// const COLUMNS = [
//   { key: "todo", label: "To Do", color: C.muted },
//   { key: "in_progress", label: "In Progress", color: "#3A7EE8" },
//   { key: "done", label: "Done", color: "#22B07D" },
//   { key: "verified", label: "Verified", color: "#E8654A" },
//   { key: "overdue", label: "Overdue", color: "#E03D3D" },
// ];


// const TaskCard = ({ task }) => {
//   return (
//     <div
//       className="p-3 rounded-xl"
//       style={{
//         background: C.cardBg,
//         border: `1px solid ${C.borderSubtle}`,
//       }}
//     >
//       <p className="text-sm font-semibold" style={{ color: C.heading }}>
//         {task.task_name}
//       </p>

//       <p className="text-xs mt-1" style={{ color: C.muted }}>
//         {task.task_describe}
//       </p>

//       <div className="flex justify-between mt-2">
//         <span className="text-xs font-mono" style={{ color: C.muted }}>
//           {task.key}
//         </span>

//         <span className="text-xs px-2 py-0.5 rounded"
//           style={{
//             background: C.inputBg,
//             color: C.muted,
//           }}>
//           {task.priority}
//         </span>
//       </div>
//     </div>
//   );
// };


// const Column = ({ title, tasks, color }) => {
//   return (
//     <div
//       className="rounded-xl p-3 flex flex-col"
//       style={{
//         background: "#fff",
//         border: `1px solid ${C.borderSubtle}`,
//         minHeight: "500px",
//       }}
//     >
//       <h3 className="text-sm font-bold mb-3" style={{ color }}>
//         {title} ({tasks.length})
//       </h3>

//       <div className="space-y-2 overflow-auto">
//         {tasks.length === 0 ? (
//           <p className="text-xs" style={{ color: C.muted }}>
//             Empty
//           </p>
//         ) : (
//           tasks.map((t) => <TaskCard key={t._id} task={t} />)
//         )}
//       </div>
//     </div>
//   );
// };


// const TasksPage = () => {
//   const [kanban, setKanban] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchTasks = async () => {
//     try {
//       const res = await api.get("/api/task/my");
//       setKanban(res.data.kanban);
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
//       <div className="flex items-center justify-center h-screen"
//         style={{ background: C.pageBg }}>
//         <p style={{ color: C.muted }}>Loading tasks...</p>
//       </div>
//     );
//   }

//   if (!kanban) {
//     return (
//       <div className="flex items-center justify-center h-screen"
//         style={{ background: C.pageBg }}>
//         <p style={{ color: C.muted }}>No tasks found</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen p-6" style={{ background: C.pageBg }}>
//       <div className="max-w-7xl mx-auto">

     
//         <div className="mb-6">
//           <h1 className="text-xl font-bold" style={{ color: C.heading }}>
//             My Tasks (Kanban)
//           </h1>
//           <p className="text-sm" style={{ color: C.muted }}>
//             All your assigned tasks in one board
//           </p>
//         </div>

        
//         <div className="grid grid-cols-5 gap-3">
//           {COLUMNS.map((col) => (
//             <Column
//               key={col.key}
//               title={col.label}
//               color={col.color}
//               tasks={kanban[col.key] || []}
//             />
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default TasksPage;






import React, { useEffect, useState } from "react";
import api from "../api/api";

/* ─── Colors ─── */
const C = {
  coral: "#E8654A",
  coralHover: "#D4512F",
  pageBg: "#EEF1F7",
  cardBg: "#FFFFFF",
  heading: "#181D2A",
  muted: "#5C6480",
  borderSubtle: "#E2E5EE",
  inputBg: "#F4F6FB",
};

/* ─── Columns ─── */
const COLUMNS = [
  { key: "todo", label: "To Do", color: "#6B7280" },
  { key: "in_progress", label: "In Progress", color: "#3A7EE8" },
  { key: "done", label: "Done", color: "#22B07D" },
  { key: "verified", label: "Verified", color: "#E8654A" },
  { key: "overdue", label: "Overdue", color: "#E03D3D" },
];

/* ─── Task Card ─── */
const TaskCard = ({ task }) => {
  return (
    <div
      className="p-3 rounded-xl transition-all duration-200 hover:scale-[1.02]"
      style={{
        background: "#fff",
        border: `1px solid ${C.borderSubtle}`,
        boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
      }}
    >
      <p className="text-sm font-semibold" style={{ color: C.heading }}>
        {task.task_name}
      </p>

      <p className="text-xs mt-1 line-clamp-2" style={{ color: C.muted }}>
        {task.task_describe}
      </p>

      <div className="flex justify-between items-center mt-3">
        <span
          className="text-xs font-mono px-2 py-0.5 rounded"
          style={{
            background: C.inputBg,
            color: C.muted,
          }}
        >
          {task.key}
        </span>

        <span
          className="text-xs font-semibold px-2 py-0.5 rounded"
          style={{
            background:
              task.priority === "high"
                ? "#FFE5E0"
                : task.priority === "medium"
                ? "#FFF3D6"
                : "#E6F7EE",
            color:
              task.priority === "high"
                ? "#E03D3D"
                : task.priority === "medium"
                ? "#D4890A"
                : "#22B07D",
          }}
        >
          {task.priority}
        </span>
      </div>
    </div>
  );
};

/* ─── Column ─── */
const Column = ({ title, tasks, color }) => {
  return (
    <div
      className="rounded-2xl p-3 flex flex-col"
      style={{
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(10px)",
        border: `1px solid ${C.borderSubtle}`,
        minHeight: "520px",
        boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
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
            background: C.inputBg,
            color,
          }}
        >
          {tasks.length}
        </span>
      </div>

      {/* Tasks */}
      <div className="space-y-2 overflow-auto">
        {tasks.length === 0 ? (
          <p className="text-xs opacity-60" style={{ color: C.muted }}>
            No tasks
          </p>
        ) : (
          tasks.map((t) => <TaskCard key={t._id} task={t} />)
        )}
      </div>
    </div>
  );
};

/* ─── Page ─── */
const TasksPage = () => {
  const [kanban, setKanban] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/api/task/my");
      setKanban(res.data.kanban || {});
    } catch (err) {
      console.error(err);
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
        style={{ background: C.pageBg }}
      >
        <p style={{ color: C.muted }}>Loading tasks...</p>
      </div>
    );
  }

  if (!kanban) {
    return (
      <div
        className="flex items-center justify-center h-screen"
        style={{ background: C.pageBg }}
      >
        <p style={{ color: C.muted }}>No tasks found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6" style={{ background: C.pageBg }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold" style={{ color: C.heading }}>
            My Tasks (Kanban)
          </h1>
          <p className="text-sm" style={{ color: C.muted }}>
            All your assigned tasks in one board
          </p>
        </div>

        {/* Kanban */}
        <div className="grid grid-cols-5 gap-4 items-start">
          {COLUMNS.map((col) => (
            <Column
              key={col.key}
              title={col.label}
              color={col.color}
              tasks={kanban[col.key] || []}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default TasksPage;