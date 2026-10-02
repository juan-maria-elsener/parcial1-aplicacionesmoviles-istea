import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  userEmail: string | null;
  register: (email: string, pass: string) => Promise<boolean>;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const USER_DATA_KEY = '@user_data';
const SESSION_KEY = '@auth_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const savedSession = await AsyncStorage.getItem(SESSION_KEY);
        if (savedSession) {
          setUserEmail(savedSession);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error al recuperar la sesión:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadSession();
  }, []);


  const register = async (email: string, pass: string) => {
    try {
      const userData = JSON.stringify({ email, pass });
      await AsyncStorage.setItem(USER_DATA_KEY, userData);
      return true;
    } catch (error) {
      return false;
    }
  };

  // Valida el login contra los datos guardados (Punto 3)
  const login = async (email: string, pass: string) => {
    try {
      const savedData = await AsyncStorage.getItem(USER_DATA_KEY);
      if (savedData) {
        const user = JSON.parse(savedData);
        if (user.email === email && user.pass === pass) {
          await AsyncStorage.setItem(SESSION_KEY, email);
          setUserEmail(email);
          setIsAuthenticated(true);
          return true;
        }
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
    setUserEmail(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, userEmail, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);