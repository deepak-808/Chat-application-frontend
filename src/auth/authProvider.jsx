import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_URL } from '../config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken]= useState('')

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const getToken = localStorage.getItem("token") || '';
    
    if (storedUser && getToken) {
      setUser(JSON.parse(storedUser));
      setToken(getToken);
    }
  
    setLoading(false);
  }, []);
  

  const login = async (userData) => {
    setLoading(true)
    try {
      const {email, password} = userData
      const result = await axios.post(`${API_URL}auth/login`, {email, password});
      if(result.data.data.user.role === "admin" && result.data.statusCode === 200){
        setUser(result.data.data.user)
        localStorage.setItem('user', JSON.stringify(result.data.data.user))
        localStorage.setItem("token", result.data.data.token)
        setToken(result.data.data.token);
      }
    } catch (error) {
      console.error('Authentication failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.clear();
    setToken('');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

