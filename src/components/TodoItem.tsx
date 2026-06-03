type Priority = "Urgente" | "Moyenne" | "Basse";

type Todo = {
  id: number;
  text: string;
  priority: Priority;
};

type Props = {
  todo: Todo;
};

const TodoItem = ({ todo }: Props) => {
  return (
    <li className="p-3 ">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox checkbox-primary checkbox-sm"
          />
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
