export type Priority = "Urgente" | "Moyenne" | "Basse";

export type Todo = {
  id: number;
  text: string;
  priority: Priority;
  completed: boolean;
};
