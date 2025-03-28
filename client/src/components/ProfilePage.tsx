import { useEffect, useState } from 'react';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type TUser = {
  username: string,
  password: string,
}

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<TUser>();

  useEffect(() => {
    if (!AuthService.isAuthenticated()) {
      navigate('/login');
      return;
    }

    axios.get('http://localhost:4040/profile')
      .then(response => setUserData(response.data))
      .catch(() => {
        AuthService.removeToken();
        navigate('/login');
      });
  }, [navigate]);

  const handleLogout = () => {
    AuthService.removeToken();
    navigate('/login');
  };

  return (
    <div>
      <h2>Profile</h2>
      {userData && (
        <div>
          <p>Welcome, {userData.username}!</p>
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ProfilePage;
