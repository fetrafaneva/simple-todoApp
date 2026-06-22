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
      <style>{`
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .input-row { flex-direction: column !important; }
          .input-row input { font-size: 1rem !important; padding: 12px 14px !important; }
          .input-row select { font-size: 0.9rem !important; padding: 11px 10px !important; }
          .input-row button { width: 100% !important; justify-content: center !important; padding: 12px 16px !important; font-size: 0.95rem !important; }
          .filter-bar { flex-direction: column !important; align-items: flex-start !important; }
          .filter-btns { flex-wrap: wrap !important; }
          .delete-btn { width: 100% !important; justify-content: center !important; }
          .app-header h1 { font-size: 1.6rem !important; }
          .app-padding { padding: 20px 16px 100px !important; }
          .stat-value { font-size: 1.8rem !important; }
        }
      `}</style>

      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <FloatingOrbs />

      <div
        className="app-padding flex justify-center px-4 py-12"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="w-full max-w-2xl flex flex-col gap-6">
          {/* Header */}
          <div className="app-header flex items-center gap-3">
            <div
              style={{
                background: "#0D9488",
                width: 44,
                height: 44,
                borderRadius: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <CheckSquare style={{ width: 22, height: 22, color: "#fff" }} />
            </div>
            <div style={{ flex: 1 }}>
              <h1
                style={{
                  color: "#134E4A",
                  fontWeight: 800,
                  fontSize: "1.4rem",
                  lineHeight: 1.2,
                  margin: 0,
                }}
              >
                Mes Tâches
              </h1>
              <p
                style={{
                  color: "#5EAFA8",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  margin: 0,
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
                style={{
                  background: "#CCFBF1",
                  borderRadius: 999,
                  height: 7,
                  overflow: "hidden",
                }}
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

          {/* Stat cards — 4 cols desktop, 2x2 mobile */}
          <div
            className="stats-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 10,
            }}
          >
            {[
              { label: "Total", value: todos.length, accent: "#0D9488" },
              { label: "Urgentes", value: urgentCount, accent: "#EF4444" },
              { label: "Moyennes", value: mediumCount, accent: "#F59E0B" },
              { label: "Terminées", value: completedCount, accent: "#10B981" },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  background: "#fff",
                  border: "1.5px solid #E4FAF8",
                  borderRadius: 14,
                  padding: "12px 8px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <span
                  className="stat-value"
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

          {/* Input row — horizontal desktop, vertical mobile */}
          <div
            className="input-row"
            style={{
              background: "#fff",
              border: "1.5px solid #E4FAF8",
              borderRadius: 16,
              display: "flex",
              gap: 10,
              padding: 12,
            }}
          >
            <input
              type="text"
              style={{
                flex: 1,
                border: "1.5px solid #CCFBF1",
                borderRadius: 10,
                padding: "10px 14px",
                fontSize: "0.9rem",
                color: "#134E4A",
                fontFamily: "inherit",
                outline: "none",
                background: "#F0FDFA",
                fontWeight: 500,
                minWidth: 0,
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
                padding: "10px 8px",
                fontSize: "0.82rem",
                color: "#134E4A",
                fontFamily: "inherit",
                background: "#F0FDFA",
                fontWeight: 600,
                cursor: "pointer",
                outline: "none",
                flexShrink: 0,
              }}
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
            >
              <option value="Urgente">🔴 Urgente</option>
              <option value="Moyenne">🟡 Moyenne</option>
              <option value="Basse">🟢 Basse</option>
            </select>
            <button
              onClick={addTodo}
              style={{
                background: "#F97316",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                padding: "10px 18px",
                fontFamily: "inherit",
                fontWeight: 700,
                fontSize: "0.88rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                transition: "background 150ms ease",
                flexShrink: 0,
                minHeight: 44,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#EA6C00")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#F97316")
              }
            >
              <Plus style={{ width: 16, height: 16 }} />
              Ajouter
            </button>
          </div>

          {/* Filters + delete completed */}
          <div
            className="filter-bar"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            <div
              className="filter-btns"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              <SlidersHorizontal
                style={{
                  width: 15,
                  height: 15,
                  color: "#5EAFA8",
                  flexShrink: 0,
                }}
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
                    padding: "7px 14px",
                    fontFamily: "inherit",
                    fontWeight: 600,
                    fontSize: "0.8rem",
                    cursor: "pointer",
                    transition: "all 150ms ease",
                    minHeight: 36,
                  }}
                >
                  {f} ({filterCounts[f]})
                </button>
              ))}
            </div>
            {completedCount > 0 && (
              <button
                className="delete-btn"
                onClick={deleteCompleted}
                style={{
                  background: "#FEE2E2",
                  color: "#EF4444",
                  border: "1.5px solid #FECACA",
                  borderRadius: 8,
                  padding: "7px 14px",
                  fontFamily: "inherit",
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  transition: "background 150ms ease",
                  minHeight: 36,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#FECACA")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#FEE2E2")
                }
              >
                <Trash2 style={{ width: 13, height: 13 }} />
                Supprimer terminées ({completedCount})
              </button>
            )}
          </div>

          {/* Todo list */}
          <div style={{ paddingBottom: 16 }}>
            {filteredTodos.length > 0 ? (
              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                }}
              >
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
                  style={{
                    width: 48,
                    height: 48,
                    color: "#99E6DF",
                    display: "block",
                    margin: "0 auto 12px",
                  }}
                />
                <p
                  style={{
                    color: "#5EAFA8",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    margin: 0,
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
