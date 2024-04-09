import axios from 'axios';
import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { endPoint } from '../utils/apiEndPoint';
import { io } from 'socket.io-client';
import { API_URL } from '../utils/config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken]= useState('')
  const [socket, setSocket] = useState('');

  useEffect(() => {
    const socket = io(API_URL);
    setSocket(socket);
  
    return () => {
      socket.disconnect();
    };
  }, []);

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
      const result = await axios.post(`${endPoint.login}`, {username:email, password:password});
    
        setUser(result.data.user)
        localStorage.setItem('user', JSON.stringify(result.data.user))
        localStorage.setItem("token", result.data.accessToken)
        setToken(result.data.accessToken);
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
    <AuthContext.Provider value={{ user, socket, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useAuth = () => {
  return useContext(AuthContext);
};
