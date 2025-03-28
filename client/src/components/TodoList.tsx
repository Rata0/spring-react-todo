import { useEffect, useState } from "react";
import { fetchTodos } from "../services/todoService";

type Todo = {
  id: number;
  title: string;
  description: string;
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
    <div className="todos-container">
      <h2>My TODOS</h2>
      {todos.length === 0 ? (
        <p className="no-todos-message">Нет добавленных задач</p>
      ) : (
        <ul className="todos-list">
          {todos.map(todo => (
            <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <div className="todo-content">
                <h3>{todo.title}</h3>
                {todo.description && <p>{todo.description}</p>}
              </div>
              <div className="todo-status">
                {todo.completed ? '✓ Выполнено' : '✗ В процессе'}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
