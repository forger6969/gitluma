import React, { useState } from "react";
import {
  closestCorners, DndContext, DragOverlay,
  PointerSensor, useDroppable, useSensor, useSensors,
} from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useC } from "./theme";
import { KANBAN_COLUMNS, PRIORITY_CONFIG, getTaskColumnKey } from "./kanbanConfig";

/* ── KanbanCard ── */
export const KanbanCard = ({ task, onClick, dragHandleProps = {}, isDragging = false }) => {
  const C = useC();
  const pri = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.medium;
  const isOverdue = task.status === "overdue";
  const deadline = task.task_deadline ? new Date(task.task_deadline) : null;
  const deadlineStr = deadline
    ? deadline.toLocaleDateString(undefined, { month: "short", day: "numeric" })
    : null;
  const completedBy = task.completedAt_user?.user?.username || task.completedAt_user?.github_username;

  return (
    <div className="rounded-xl p-3" onClick={onClick}
      style={{
        backgroundColor: C.cardBg,
        border: `1px solid ${isOverdue ? "rgba(224,61,61,0.25)" : C.borderSubtle}`,
        boxShadow: isDragging ? "0 10px 24px rgba(43,49,65,0.18)" : "0 1px 3px rgba(43,49,65,0.05)",
        transition: "box-shadow 0.15s, transform 0.15s, opacity 0.15s",
        cursor: "pointer",
        opacity: isDragging ? 0.78 : 1,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 14px rgba(43,49,65,0.12)";
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 1px 3px rgba(43,49,65,0.05)";
        e.currentTarget.style.transform = "none";
      }}
    >
      <div className="flex items-center justify-between mb-2 gap-1">
        <span className="text-xs font-mono font-semibold px-1.5 py-0.5 rounded shrink-0"
          style={{ backgroundColor: C.inputBg, color: C.placeholder }}>
          {task.key}
        </span>
        <div className="flex items-center gap-1">
          <span className="text-xs font-bold px-1.5 py-0.5 rounded-full"
            style={{ backgroundColor: pri.bg, color: pri.color }}>
            {pri.label}
          </span>
          <button type="button" {...dragHandleProps} onClick={(e) => e.stopPropagation()}
            className="w-6 h-6 rounded-md flex items-center justify-center cursor-grab active:cursor-grabbing"
            style={{ backgroundColor: C.inputBg, color: C.placeholder, touchAction: "none" }}
            aria-label="Drag task">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="6" r="1" /><circle cx="9" cy="12" r="1" /><circle cx="9" cy="18" r="1" />
              <circle cx="15" cy="6" r="1" /><circle cx="15" cy="12" r="1" /><circle cx="15" cy="18" r="1" />
            </svg>
          </button>
        </div>
      </div>
      <p className="text-sm font-semibold leading-snug mb-1" style={{ color: C.heading }}>{task.task_name}</p>
      {task.task_describe && (
        <p className="text-xs leading-relaxed line-clamp-2 mb-2" style={{ color: C.muted }}>{task.task_describe}</p>
      )}
      {deadlineStr && (
        <div className="flex items-center gap-1 pt-2" style={{ borderTop: `1px solid ${C.borderSubtle}` }}>
          <svg className="w-3 h-3 shrink-0" style={{ color: isOverdue ? C.danger : C.placeholder }}
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span className="text-xs" style={{ color: isOverdue ? C.danger : C.placeholder }}>{deadlineStr}</span>
        </div>
      )}
      {(completedBy || task.linked_commit?.commit_message) && (
        <div className="pt-2 mt-2 space-y-1" style={{ borderTop: `1px solid ${C.borderSubtle}` }}>
          {completedBy && <p className="text-[11px] truncate" style={{ color: C.muted }}>Done by {completedBy}</p>}
          {task.linked_commit?.commit_message && (
            <p className="text-[11px] truncate" style={{ color: C.placeholder }}>{task.linked_commit.commit_message}</p>
          )}
        </div>
      )}
    </div>
  );
};

/* ── DraggableTask ── */
const DraggableTask = ({ task, onClick }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task._id,
    data: { type: "task", task },
  });

  return (
    <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }}>
      <KanbanCard
        task={task}
        onClick={onClick}
        isDragging={isDragging}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
};

/* ── DroppableColumn ── */
const DroppableColumn = ({ column, tasks, onTaskClick }) => {
  const C = useC();
  const { setNodeRef, isOver } = useDroppable({
    id: column.key,
    data: { type: "column", columnKey: column.key },
  });

  return (
    <div ref={setNodeRef} className="flex flex-col rounded-xl overflow-hidden"
      style={{
        border: `1px solid ${column.borderColor}`,
        backgroundColor: isOver ? C.cardBg : column.bgColor,
        minHeight: "300px",
        boxShadow: isOver ? "inset 0 0 0 2px rgba(232,101,74,0.18)" : "none",
        transition: "background-color 0.15s, box-shadow 0.15s",
      }}>
      <div className="flex items-center gap-2 px-3 py-2.5 shrink-0"
        style={{ borderBottom: `1px solid ${column.borderColor}` }}>
        <div className="flex items-center justify-center shrink-0" style={{ color: column.color }}>
          {column.icon}
        </div>
        <span className="text-xs font-bold flex-1 truncate" style={{ color: column.color }}>{column.label}</span>
        <span className="text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: "rgba(255,255,255,0.8)", color: column.color }}>
          {tasks.length}
        </span>
      </div>

      <SortableContext items={tasks.map((task) => task._id)} strategy={verticalListSortingStrategy}>
        <div className="flex-1 p-2 space-y-2 overflow-y-auto" style={{ maxHeight: "400px" }}>
          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-8 opacity-50">
              <div style={{ color: column.color }}>{column.icon}</div>
              <p className="text-xs mt-2 font-medium" style={{ color: column.color }}>Empty</p>
            </div>
          ) : (
            tasks.map((task) => (
              <DraggableTask key={task._id} task={task} onClick={() => onTaskClick(task)} />
            ))
          )}
        </div>
      </SortableContext>
    </div>
  );
};

/* ── KanbanContext (DnD wrapper) ── */
const KanbanContext = ({ tasks, onTaskClick, onTaskMove }) => {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));
  const [activeTaskId, setActiveTaskId] = useState(null);
  const grouped = KANBAN_COLUMNS.reduce((acc, col) => {
    acc[col.key] = tasks.filter((task) => task.status === col.key);
    return acc;
  }, {});
  const activeTask = tasks.find((task) => task._id === activeTaskId) || null;

  const handleDragStart = (event) => setActiveTaskId(event.active.id);
  const handleDragCancel = () => setActiveTaskId(null);
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    setActiveTaskId(null);
    if (!over) return;
    const task = tasks.find((item) => item._id === active.id);
    if (!task) return;
    const nextStatus = getTaskColumnKey(over.id, tasks);
    if (!nextStatus || nextStatus === task.status) return;
    await onTaskMove(task, nextStatus);
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCorners}
      onDragStart={handleDragStart} onDragCancel={handleDragCancel} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-5 gap-3">
        {KANBAN_COLUMNS.map((column) => (
          <DroppableColumn key={column.key} column={column}
            tasks={grouped[column.key] || []} onTaskClick={onTaskClick} />
        ))}
      </div>
      <DragOverlay>
        {activeTask ? <KanbanCard task={activeTask} isDragging /> : null}
      </DragOverlay>
    </DndContext>
  );
};

/* ── KanbanBoard (public export) ── */
const KanbanBoard = ({ tasks, onAssign, isCurrOwner, onTaskClick, onTaskMove }) => {
  const C = useC();
  return (
    <div className="rounded-2xl p-6"
      style={{ backgroundColor: C.cardBg, border: `1px solid ${C.borderSubtle}`, boxShadow: "0 1px 3px rgba(43,49,65,0.06)" }}>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: C.coralBg }}>
            <svg className="w-3.5 h-3.5" style={{ color: C.coral }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="18" rx="1" /><rect x="14" y="3" width="7" height="11" rx="1" />
            </svg>
          </div>
          <h2 className="text-base font-semibold" style={{ color: C.heading }}>Kanban Board</h2>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: C.inputBg, color: C.muted }}>{tasks.length} tasks</span>
        </div>
        {isCurrOwner && (
          <button onClick={onAssign}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
            style={{ backgroundColor: C.coral, color: "#fff" }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = C.coralHover}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = C.coral}>
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Assign Task
          </button>
        )}
      </div>
      <KanbanContext tasks={tasks} onTaskClick={onTaskClick} onTaskMove={onTaskMove} />
    </div>
  );
};

export default KanbanBoard;
