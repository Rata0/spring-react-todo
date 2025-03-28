import { useState } from 'react';
import axios from 'axios';

interface User {
  username: string;
  password: string;
}

const RegisterForm = () => {
  const [user, setUser] = useState<User>({
    username: '',
    password: ''
  });
  const [message, setMessage] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4040/register', user);
      setMessage('Registration successful!');
      setIsError(false);
      console.log(response.data);
    } catch (error) {
      setMessage('Registration failed');
      setIsError(true);
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
        Create an Account
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label 
            htmlFor="username" 
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
            className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your username"
            required
          />
        </div>
        
        <div>
          <label 
            htmlFor="password" 
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="••••••••"
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-colors duration-200"
        >
          Register
        </button>
      </form>
      
      {message && (
        <div 
          className={`mt-4 p-3 text-sm rounded-lg ${
            isError 
              ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100' 
              : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100'
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
