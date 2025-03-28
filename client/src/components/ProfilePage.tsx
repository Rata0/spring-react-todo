import { useEffect, useState } from 'react';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
// import { fetchTodos, fetchProfile } from '../services/todoService';
import axios from 'axios';

type TUser = {
  username: string;
  password: string;
};

type TTodo = {
  id: number;
  title: string;
  completed: boolean;
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<TUser | null>(null);
  const [todos, setTodos] = useState<TTodo[]>([]);

  useEffect(() => {
    if (!AuthService.isAuthenticated()) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const profileResponse = await axios.get('http://localhost:4040/profile');
        setUserData(profileResponse.data);
        
        const todosResponse = await axios.get('http://localhost:4040/todos');
        setTodos(todosResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        AuthService.removeToken();
        navigate('/login');
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    AuthService.removeToken();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-500 h-32 relative">
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 bg-gray-200 flex items-center justify-center">
              <span className="text-4xl font-bold text-gray-600 dark:text-gray-400">
                {userData?.username.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        <div className="pt-20 px-6 pb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {userData?.username}
          </h1>
          
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-400">
              {todos.length} {todos.length === 1 ? 'task' : 'tasks'}
            </p>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h3 className="font-medium text-gray-900 dark:text-white mb-3 text-left">
              My Tasks
            </h3>
            
            {todos.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 py-4">
                No tasks yet
              </p>
            ) : (
              <ul className="space-y-2">
                {todos.map(todo => (
                  <li 
                    key={todo.id} 
                    className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <input 
                      type="checkbox" 
                      checked={todo.completed}
                      readOnly
                      className="h-5 w-5 text-blue-600 rounded mr-3"
                    />
                    <span className={`flex-1 text-left ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800 dark:text-gray-200'}`}>
                      {todo.title}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-6">
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;