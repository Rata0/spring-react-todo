import { Routes, Route, BrowserRouter } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import AuthRoute from './components/AuthRoute';
import ProfilePage from './components/ProfilePage';
import TodoList from './components/TodoList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route
        path="/profile"
        element={
          <AuthRoute>
            <ProfilePage />
          </AuthRoute>
        }
      />
      <Route
        path="/todos"
        element={
          <AuthRoute>
            <TodoList />
          </AuthRoute>
        }
      />
      <Route path="/" element={<LoginForm />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;
