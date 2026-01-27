import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Account from "../pages/Account";
import { motion } from "framer-motion";

const AccountPage = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // Проверяем localStorage при загрузке страницы
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuth");
    if (storedAuth === "true") {
      setIsAuth(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      setIsAuth(true);
      localStorage.setItem("isAuth", "true"); // сохраняем авторизацию
      localStorage.setItem("userEmail", email); // сохраняем email
    } else {
      alert("Введите email и пароль!");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (name && email && password) {
      setIsAuth(true);
      localStorage.setItem("isAuth", "true");
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userName", name);
    } else {
      alert("Заполните все поля!");
    }
  };

  const handleLogout = () => {
    setIsAuth(false);
    setEmail("");
    setPassword("");
    setName("");
    localStorage.removeItem("isAuth");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="flex-grow">
        {!isAuth ? (
          <motion.div
            className="max-w-md mx-auto mt-20 mb-20 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
              {isRegister ? "Регистрация" : "Вход"}
            </h2>

            <form
              onSubmit={isRegister ? handleRegister : handleLogin}
              className="space-y-4"
            >
              {isRegister && (
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
                />
              )}
              <input
                type="email"
                placeholder="Ваш email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                {isRegister ? "Зарегистрироваться" : "Войти"}
              </button>
            </form>

            <p className="text-center mt-4 text-gray-600 dark:text-gray-300">
              {isRegister ? "Уже есть аккаунт?" : "Нет аккаунта?"}{" "}
              <button
                onClick={() => setIsRegister(!isRegister)}
                className="text-blue-500 hover:underline"
              >
                {isRegister ? "Войти" : "Зарегистрироваться"}
              </button>
            </p>
          </motion.div>
        ) : (
          <Account onLogout={handleLogout} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AccountPage;
