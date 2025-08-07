import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUser, FaShoppingBag, FaSignOutAlt, FaCog } from "react-icons/fa";
import axios from "axios"; // Для работы с API

const Account = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const [user, setUser] = useState({
    name: "Иван Иванов",
    email: "ivan@example.com",
    joined: "15 марта 2024",
  });
  const [orders, setOrders] = useState([]);
  const [newName, setNewName] = useState(user.name);
  const [newEmail, setNewEmail] = useState(user.email);
  const [newPassword, setNewPassword] = useState("");

  // Получение заказов через API
  useEffect(() => {
    axios
      .get("/api/orders") // Пример API запроса
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при получении заказов:", error);
      });
  }, []);

  // Обработчик изменения данных
  const handleUpdateUser = () => {
    setUser({ ...user, name: newName, email: newEmail });
    // В реальности нужно отправить запрос на сервер для сохранения данных
    alert("Данные успешно обновлены!");
  };

  // Обработчик смены пароля
  const handleChangePassword = () => {
    if (newPassword) {
      alert("Пароль успешно изменён!");
    } else {
      alert("Введите новый пароль!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Личный кабинет
      </motion.h1>

      <motion.div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-10 flex flex-col md:flex-row gap-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Сайдбар с вкладками */}
        <div className="w-full md:w-1/3 space-y-4">
          <div className="flex items-center gap-4">
            <FaUser className="text-3xl text-blue-500" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {user.name}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user.email}
              </p>
            </div>
          </div>

          <nav className="space-y-2 pt-6">
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex items-center gap-3 w-full text-left ${
                activeTab === "orders"
                  ? "text-blue-500"
                  : "text-gray-800 dark:text-gray-200"
              } hover:text-blue-500 transition`}
            >
              <FaShoppingBag /> Мои заказы
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-3 w-full text-left ${
                activeTab === "profile"
                  ? "text-blue-500"
                  : "text-gray-800 dark:text-gray-200"
              } hover:text-blue-500 transition`}
            >
              <FaUser /> Личные данные
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`flex items-center gap-3 w-full text-left ${
                activeTab === "settings"
                  ? "text-blue-500"
                  : "text-gray-800 dark:text-gray-200"
              } hover:text-blue-500 transition`}
            >
              <FaCog /> Настройки
            </button>
            <button className="flex items-center gap-3 w-full text-left text-red-500 hover:text-red-600 transition">
              <FaSignOutAlt /> Выйти
            </button>
          </nav>
        </div>

        {/* Контент */}
        <div className="w-full md:w-2/3 space-y-6">
          {activeTab === "orders" && (
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Последние заказы
              </h3>
              {orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl space-y-2"
                    >
                      <p>
                        <span className="font-medium">Номер заказа:</span>{" "}
                        {order.id}
                      </p>
                      <p>
                        <span className="font-medium">Дата:</span> {order.date}
                      </p>
                      <p>
                        <span className="font-medium">Статус:</span>{" "}
                        {order.status}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  У вас пока нет заказов.
                </p>
              )}
            </div>
          )}

          {activeTab === "profile" && (
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Личные данные
              </h3>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl space-y-2">
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Имя:</span>
                  </p>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600"
                  />
                </div>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Email:</span>
                  </p>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600"
                  />
                </div>
                <button
                  onClick={handleUpdateUser}
                  className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Обновить данные
                </button>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Смена пароля
              </h3>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl space-y-2">
                <div>
                  <p>
                    <span className="font-medium">Новый пароль:</span>
                  </p>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600"
                  />
                </div>
                <button
                  onClick={handleChangePassword}
                  className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Изменить пароль
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Account;
