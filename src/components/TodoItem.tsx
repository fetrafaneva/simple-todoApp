import { Trash2, Pencil } from "lucide-react";
import { useRef, useState } from "react";
import type { Todo } from "../App";

type Props = {
  todo: Todo;
  onDelete: () => void;
  onToggleCompleted: () => void;
  onEdit: (id: number, newText: string) => void;
};

const priorityConfig: Record<
  Todo["priority"],
  { accent: string; bg: string; label: string; dot: string }
> = {
  Urgente: {
    accent: "#EF4444",
    bg: "#FEE2E2",
    label: "#EF4444",
    dot: "#EF4444",
  },
  Moyenne: {
    accent: "#F59E0B",
    bg: "#FEF3C7",
    label: "#D97706",
    dot: "#F59E0B",
  },
  Basse: { accent: "#10B981", bg: "#D1FAE5", label: "#059669", dot: "#10B981" },
};

const TodoItem = ({ todo, onDelete, onToggleCompleted, onEdit }: Props) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const [hovered, setHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const cfg = priorityConfig[todo.priority];

  function startEdit() {
    if (todo.completed) return;
    setDraft(todo.text);
    setEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 0);
  }

  function commitEdit() {
    const trimmed = draft.trim();
    if (trimmed && trimmed !== todo.text) {
      onEdit(todo.id, trimmed);
    }
    setEditing(false);
  }

  function cancelEdit() {
    setDraft(todo.text);
    setEditing(false);
  }

  return (
    <li
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        border: `1.5px solid ${
          hovered && !todo.completed ? "#CCFBF1" : "#F0FDFA"
        }`,
        borderLeft: `3px solid ${cfg.accent}`,
        borderRadius: 12,
        padding: "10px 14px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        opacity: todo.completed ? 0.55 : 1,
        transition: "all 150ms ease",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* Checkbox custom */}
      <button
        onClick={onToggleCompleted}
        aria-label="Marquer comme terminée"
        style={{
          width: 20,
          height: 20,
          borderRadius: 6,
          border: todo.completed
            ? `2px solid ${cfg.accent}`
            : "2px solid #CCFBF1",
          background: todo.completed ? cfg.accent : "transparent",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "all 150ms ease",
        }}
      >
        {todo.completed && (
          <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
            <path
              d="M1 4L4 7L10 1"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {/* Text / Edit input */}
      {editing ? (
        <input
          ref={inputRef}
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={(e) => {
            if (e.key === "Enter") commitEdit();
            if (e.key === "Escape") cancelEdit();
          }}
          style={{
            flex: 1,
            border: "1.5px solid #0D9488",
            borderRadius: 8,
            padding: "4px 10px",
            fontSize: "0.88rem",
            fontFamily: "inherit",
            color: "#134E4A",
            fontWeight: 500,
            outline: "none",
            background: "#F0FDFA",
          }}
        />
      ) : (
        <span
          onDoubleClick={startEdit}
          title={todo.completed ? "" : "Double-clic pour modifier"}
          style={{
            flex: 1,
            fontSize: "0.88rem",
            fontWeight: 600,
            color: todo.completed ? "#9CA3AF" : "#134E4A",
            textDecoration: todo.completed ? "line-through" : "none",
            cursor: todo.completed ? "default" : "text",
            transition: "color 150ms ease",
            userSelect: "none",
            lineHeight: 1.5,
          }}
        >
          {todo.text}
        </span>
      )}

      {/* Priority badge */}
      <span
        style={{
          background: cfg.bg,
          color: cfg.label,
          border: `1px solid ${cfg.accent}20`,
          borderRadius: 6,
          padding: "2px 8px",
          fontSize: "0.7rem",
          fontWeight: 700,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: cfg.dot,
            display: "inline-block",
            flexShrink: 0,
          }}
        />
        {todo.priority}
      </span>

      {/* Edit button */}
      {!todo.completed && (
        <button
          onClick={startEdit}
          aria-label="Modifier la tâche"
          style={{
            background: hovered ? "#F0FDFA" : "transparent",
            border: "1.5px solid",
            borderColor: hovered ? "#CCFBF1" : "transparent",
            borderRadius: 7,
            padding: "4px 6px",
            cursor: "pointer",
            color: "#5EAFA8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all 150ms ease",
          }}
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Delete button */}
      <button
        onClick={onDelete}
        aria-label="Supprimer la tâche"
        style={{
          background: hovered ? "#FEE2E2" : "transparent",
          border: "1.5px solid",
          borderColor: hovered ? "#FECACA" : "transparent",
          borderRadius: 7,
          padding: "4px 6px",
          cursor: "pointer",
          color: "#EF4444",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "all 150ms ease",
        }}
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </li>
  );
};

export default TodoItem;
