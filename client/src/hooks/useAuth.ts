import { useState, useEffect } from 'react';
import AuthService from '../services/AuthService';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await AuthService.validateToken();
      setIsAuthenticated(isValid);
    };
    
    checkAuth();
  }, []);

  const login = (token: string) => {
    AuthService.setToken(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    AuthService.removeToken();
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
};

export default useAuth;