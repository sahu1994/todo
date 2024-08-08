import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(logout());
    navigate('/login');
  };

  return (
    <button onClick={handleLogout}>
      Log Out
    </button>
  );
};

export default Logout;
