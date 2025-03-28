import { useEffect, useState } from "react";
import { fetchTodos } from "../services/todoService";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await fetchTodos();
        setTodos(data);
      } catch (error) {
        console.error('Failed to load todos:', error);
      }
    };
    
    loadTodos();
  }, []);

  console.log(todos);

  return (
    <div>
      <h2>My TODOs</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title} - {todo.completed ? '✓' : '✗'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
