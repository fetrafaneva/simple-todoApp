import { useEffect, useState } from "react";
import TodoItem from "./components/TodoItem";
import { CheckSquare, Plus, Trash2, SlidersHorizontal } from "lucide-react";
import FloatingOrbs from "./components/FloatingOrbs";

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

  const progress =
    todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0;

  return (
    <div
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        background: "#F0FDFA",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      {/* Animated background */}
      <FloatingOrbs />

      {/* Main content */}
      <div
        className="flex justify-center px-4 py-12"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="w-full max-w-2xl flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div
              style={{ background: "#0D9488" }}
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            >
              <CheckSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1
                style={{
                  color: "#134E4A",
                  fontWeight: 800,
                  fontSize: "1.4rem",
                  lineHeight: 1.2,
                }}
              >
                Mes Tâches
              </h1>
              <p
                style={{
                  color: "#5EAFA8",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                }}
              >
                {completedCount} sur {todos.length} terminées
              </p>
            </div>
          </div>

          {/* Progress bar */}
          {todos.length > 0 && (
            <div>
              <div
                style={{ background: "#CCFBF1", borderRadius: 999, height: 6 }}
                className="w-full overflow-hidden"
              >
                <div
                  style={{
                    background: "#0D9488",
                    width: `${progress}%`,
                    height: "100%",
                    borderRadius: 999,
                    transition: "width 300ms ease",
                  }}
                />
              </div>
              <p
                style={{
                  color: "#5EAFA8",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  marginTop: 4,
                }}
              >
                {progress}% accompli
              </p>
            </div>
          )}

          {/* Stat cards */}
          <div className="grid grid-cols-4 gap-3">
            {[
              {
                label: "Total",
                value: todos.length,
                accent: "#0D9488",
                bg: "#CCFBF1",
              },
              {
                label: "Urgentes",
                value: urgentCount,
                accent: "#EF4444",
                bg: "#FEE2E2",
              },
              {
                label: "Moyennes",
                value: mediumCount,
                accent: "#F59E0B",
                bg: "#FEF3C7",
              },
              {
                label: "Terminées",
                value: completedCount,
                accent: "#10B981",
                bg: "#D1FAE5",
              },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  background: "#fff",
                  border: "1.5px solid #E4FAF8",
                  borderRadius: 14,
                }}
                className="p-3 text-center flex flex-col items-center gap-1"
              >
                <span
                  style={{
                    color: s.accent,
                    fontWeight: 800,
                    fontSize: "1.5rem",
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </span>
                <span
                  style={{
                    color: "#5EAFA8",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Input row */}
          <div
            style={{
              background: "#fff",
              border: "1.5px solid #E4FAF8",
              borderRadius: 16,
            }}
            className="flex gap-3 p-3"
          >
            <input
              type="text"
              style={{
                flex: 1,
                border: "1.5px solid #CCFBF1",
                borderRadius: 10,
                padding: "8px 14px",
                fontSize: "0.9rem",
                color: "#134E4A",
                fontFamily: "inherit",
                outline: "none",
                background: "#F0FDFA",
                fontWeight: 500,
              }}
              placeholder="Nouvelle tâche..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTodo()}
            />
            <select
              style={{
                border: "1.5px solid #CCFBF1",
                borderRadius: 10,
                padding: "8px 10px",
                fontSize: "0.82rem",
                color: "#134E4A",
                fontFamily: "inherit",
                background: "#F0FDFA",
                fontWeight: 600,
                cursor: "pointer",
                outline: "none",
              }}
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
            >
              <option value="Urgente">Urgente</option>
              <option value="Moyenne">Moyenne</option>
              <option value="Basse">Basse</option>
            </select>
            <button
              onClick={addTodo}
              style={{
                background: "#F97316",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                padding: "8px 16px",
                fontFamily: "inherit",
                fontWeight: 700,
                fontSize: "0.85rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                transition: "background 150ms ease",
                flexShrink: 0,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#EA6C00")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#F97316")
              }
            >
              <Plus className="w-4 h-4" />
              Ajouter
            </button>
          </div>

          {/* Filters + delete completed */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <SlidersHorizontal
                className="w-4 h-4"
                style={{ color: "#5EAFA8" }}
              />
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    background: filter === f ? "#0D9488" : "#fff",
                    color: filter === f ? "#fff" : "#134E4A",
                    border:
                      filter === f
                        ? "1.5px solid #0D9488"
                        : "1.5px solid #CCFBF1",
                    borderRadius: 8,
                    padding: "5px 12px",
                    fontFamily: "inherit",
                    fontWeight: 600,
                    fontSize: "0.78rem",
                    cursor: "pointer",
                    transition: "all 150ms ease",
                  }}
                >
                  {f} ({filterCounts[f]})
                </button>
              ))}
            </div>
            {completedCount > 0 && (
              <button
                onClick={deleteCompleted}
                style={{
                  background: "#FEE2E2",
                  color: "#EF4444",
                  border: "1.5px solid #FECACA",
                  borderRadius: 8,
                  padding: "5px 12px",
                  fontFamily: "inherit",
                  fontWeight: 600,
                  fontSize: "0.78rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  transition: "background 150ms ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#FECACA")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#FEE2E2")
                }
              >
                <Trash2 className="w-3 h-3" />
                Supprimer terminées ({completedCount})
              </button>
            )}
          </div>

          {/* Todo list */}
          <div>
            {filteredTodos.length > 0 ? (
              <ul className="flex flex-col gap-2">
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
              <div
                style={{
                  border: "1.5px dashed #CCFBF1",
                  borderRadius: 16,
                  padding: "48px 24px",
                  textAlign: "center",
                }}
              >
                <CheckSquare
                  strokeWidth={1.2}
                  className="w-12 h-12 mx-auto mb-3"
                  style={{ color: "#99E6DF" }}
                />
                <p
                  style={{
                    color: "#5EAFA8",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                  }}
                >
                  Aucune tâche pour ce filtre
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
