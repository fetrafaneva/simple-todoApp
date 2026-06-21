import { Trash } from "lucide-react";
import { useRef, useState } from "react";
import type { Todo } from "../App";

type Props = {
  todo: Todo;
  onDelete: () => void;
  onToggleCompleted: () => void;
  onEdit: (id: number, newText: string) => void;
};

const priorityBorder: Record<Todo["priority"], string> = {
  Urgente: "border-l-4 border-l-error",
  Moyenne: "border-l-4 border-l-warning",
  Basse: "border-l-4 border-l-success",
};

const priorityBadge: Record<Todo["priority"], string> = {
  Urgente: "badge-error",
  Moyenne: "badge-warning",
  Basse: "badge-success",
};

const TodoItem = ({ todo, onDelete, onToggleCompleted, onEdit }: Props) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

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
      className={`flex items-center gap-3 px-4 py-3 bg-base-100 rounded-xl transition-opacity ${
        priorityBorder[todo.priority]
      } ${todo.completed ? "opacity-50" : "opacity-100"}`}
    >
      <input
        type="checkbox"
        className="checkbox checkbox-primary checkbox-sm flex-shrink-0"
        checked={todo.completed}
        onChange={onToggleCompleted}
      />

      {editing ? (
        <input
          ref={inputRef}
          type="text"
          className="input input-sm flex-1"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={(e) => {
            if (e.key === "Enter") commitEdit();
            if (e.key === "Escape") cancelEdit();
          }}
        />
      ) : (
        <span
          onDoubleClick={startEdit}
          title={todo.completed ? "" : "Double-clic pour modifier"}
          className={`flex-1 text-sm font-medium transition-all select-none ${
            todo.completed
              ? "line-through text-base-content/40"
              : "cursor-text hover:text-primary"
          }`}
        >
          {todo.text}
        </span>
      )}

      <span
        className={`badge badge-sm badge-soft flex-shrink-0 ${
          priorityBadge[todo.priority]
        }`}
      >
        {todo.priority}
      </span>

      <button
        onClick={onDelete}
        className="btn btn-xs btn-error btn-soft flex-shrink-0"
        aria-label="Supprimer la tâche"
      >
        <Trash className="w-3 h-3" />
      </button>
    </li>
  );
};

export default TodoItem;
