import { useEffect, useState } from "react";
import TodoItem from "./components/TodoItem";
import { Construction } from "lucide-react";

type Priority = "Urgente" | "Moyenne" | "Basse";

export type Todo = {
  id: number;
  text: string;
  priority: Priority;
  completed: boolean;
};

const PRIORITY_ORDER: Record<Priority, number> = {
  Urgente: 0,
  Moyenne: 1,
  Basse: 2,
};

function App() {
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState<Priority>("Moyenne");

  const savedTodos = localStorage.getItem("todos");
  const initialTodos: Todo[] = savedTodos ? JSON.parse(savedTodos) : [];
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [filter, setFilter] = useState<Priority | "Tous">("Tous");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo() {
    if (input.trim() === "") return;

    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
      priority,
      completed: false,
    };

    setTodos((prev) =>
      [newTodo, ...prev].sort(
        (a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
      )
    );
    setInput("");
    setPriority("Moyenne");
  }

  function deleteTodo(id: number) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function toggleCompleted(id: number) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteCompleted() {
    setTodos((prev) => prev.filter((t) => !t.completed));
  }

  function editTodo(id: number, newText: string) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: newText } : t))
    );
  }

  const filteredTodos =
    filter === "Tous" ? todos : todos.filter((t) => t.priority === filter);

  const urgentCount = todos.filter((t) => t.priority === "Urgente").length;
  const mediumCount = todos.filter((t) => t.priority === "Moyenne").length;
  const lowCount = todos.filter((t) => t.priority === "Basse").length;
  const completedCount = todos.filter((t) => t.completed).length;

  const stats = [
    { label: "Total", value: todos.length, color: "" },
    { label: "Urgentes", value: urgentCount, color: "text-error" },
    { label: "Moyennes", value: mediumCount, color: "text-warning" },
    { label: "Terminées", value: completedCount, color: "text-success" },
  ];

  const filters: (Priority | "Tous")[] = [
    "Tous",
    "Urgente",
    "Moyenne",
    "Basse",
  ];
  const filterCounts: Record<Priority | "Tous", number> = {
    Tous: todos.length,
    Urgente: urgentCount,
    Moyenne: mediumCount,
    Basse: lowCount,
  };

  return (
    <div className="flex justify-center px-4">
      <div className="w-full max-w-2xl flex flex-col gap-5 my-12 bg-base-300 p-6 rounded-2xl">
        {/* Stat cards */}
        <div className="grid grid-cols-4 gap-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-base-100 rounded-xl p-3 text-center flex flex-col items-center gap-1"
            >
              <span className={`text-2xl font-black ${s.color}`}>
                {s.value}
              </span>
              <span className="text-xs text-base-content/50">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Input row */}
        <div className="flex gap-3">
          <input
            type="text"
            className="input w-full"
            placeholder="Nouvelle tâche..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
          />
          <select
            className="select"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            <option value="Urgente">🔴 Urgente</option>
            <option value="Moyenne">🟡 Moyenne</option>
            <option value="Basse">🟢 Basse</option>
          </select>
          <button onClick={addTodo} className="btn btn-primary">
            Ajouter
          </button>
        </div>

        {/* Filters + delete completed */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                className={`btn btn-sm btn-soft ${
                  filter === f ? "btn-primary" : ""
                }`}
                onClick={() => setFilter(f)}
              >
                {f} ({filterCounts[f]})
              </button>
            ))}
          </div>
          <button
            onClick={deleteCompleted}
            className="btn btn-sm btn-error btn-soft"
            disabled={completedCount === 0}
          >
            Supprimer les terminées ({completedCount})
          </button>
        </div>

        {/* Todo list */}
        <div className="space-y-1">
          {filteredTodos.length > 0 ? (
            <ul className="flex flex-col gap-1">
              {filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onDelete={() => deleteTodo(todo.id)}
                  onToggleCompleted={() => toggleCompleted(todo.id)}
                  onEdit={editTodo}
                />
              ))}
            </ul>
          ) : (
            <div className="flex justify-center items-center flex-col py-12 gap-2 text-base-content/30">
              <Construction strokeWidth={1} className="w-16 h-16" />
              <p className="text-sm">Aucune tâche pour ce filtre</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
