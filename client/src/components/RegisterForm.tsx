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
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {message && (
        <div style={{ color: isError ? 'red' : 'green' }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
