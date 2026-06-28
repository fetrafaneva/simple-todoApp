import { useEffect, useState } from "react";

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

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo(text: string, priority: Priority) {
    const newTodo: Todo = {
      id: Date.now(),
      text: text.trim(),
      priority,
      completed: false,
    };
    setTodos((prev) =>
      [newTodo, ...prev].sort(
        (a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
      )
    );
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

  return {
    todos,
    addTodo,
    deleteTodo,
    toggleCompleted,
    deleteCompleted,
    editTodo,
  };
}
