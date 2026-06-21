import { Trash } from "lucide-react";
import type { Todo } from "../App";

type Props = {
  todo: Todo;
  onDelete: () => void;
  onToggleCompleted: () => void;
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

const TodoItem = ({ todo, onDelete, onToggleCompleted }: Props) => {
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

      <span
        className={`flex-1 text-sm font-medium transition-all ${
          todo.completed ? "line-through text-base-content/40" : ""
        }`}
      >
        {todo.text}
      </span>

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
