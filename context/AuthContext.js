import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode'; // Make sure to npm install jwt-decode
import { encode as btoa, decode as atob } from 'base-64'; // Import base-64

if (!global.atob) {
  global.atob = atob;
}

if (!global.btoa) {
  global.btoa = btoa;
}

const AuthContext = createContext();
// const BASE_URL = 'http://localhost:3000/api/v1';
// const BASE_URL = 'http://10.0.2.2:3000/api/v1';
const BASE_URL = 'http://192.168.1.27:3000/api/v1';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleLogin = async (username, password) => {
    try {
      const userData = { username, password };
      const response = await axios.post(`${BASE_URL}/login`, userData);

      if (response.status === 200 && response.data.token) {
        const token = response.data.token;
        await AsyncStorage.setItem('userToken', token); // Store the token
        console.log('token: ', token);
        const decoded = jwtDecode(token); // Decode the token
        console.log('decoded: ', decoded);

        if (decoded.id) {
          setUser({ id: decoded.id, username: username });
        } else {
          throw new Error('User ID not found in token');
        }
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error(error);
      throw error; // Make sure to handle this error in your component
    }
  };

  const handleRegister = async (username, email, password) => {
    try {
      // Replace with your API endpoint
      const response = await axios.post(`${BASE_URL}/add-user`, {
        username,
        email,
        password,
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, handleLogin, handleLogout, handleRegister }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
