import React, { createContext, useContext, useState, useEffect } from "react";

// 1. Создаем сам контекст
const UserContext = createContext();

// 2. Создаем провайдер
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // инфо о пользователе
  const [isAuthenticated, setIsAuthenticated] = useState(false); // авторизация
  const [loading, setLoading] = useState(true); // загрузка при старте

  // имитация проверки токена при загрузке
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // вход
  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // выход
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  // пример обновления профиля
  const updateProfile = (newData) => {
    setUser((prev) => ({ ...prev, ...newData }));
    localStorage.setItem("user", JSON.stringify({ ...user, ...newData }));
  };

  return (
    <UserContext.Provider
      value={{ user, isAuthenticated, loading, login, logout, updateProfile }}
    >
      {children}
    </UserContext.Provider>
  );
};

// 3. Кастомный хук для удобного доступа
export const useUser = () => useContext(UserContext);
