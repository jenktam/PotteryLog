// context provider - handles state that's used throughout app
import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { makeRequest } from '../axios';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

  // makes /post login call and sets currendUser within AuthContext
  const login = async (inputs) => {
    const res = await makeRequest.post('/auth/login', inputs);

    setCurrentUser(res.data);
  };

  const logout = async (inputs) => {
    await makeRequest.post('/auth/logout', inputs);

    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
