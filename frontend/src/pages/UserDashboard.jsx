import React, { useState } from "react";

export default function UserDashboard() {
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({ name: "", email: "" });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState("");

  // Пример истории заказов
  const [orders] = useState([
    { id: 1, date: "2025-08-20", total: "1200₽", status: "Доставлен" },
    { id: 2, date: "2025-08-22", total: "350₽", status: "В обработке" },
  ]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
      setError("Пожалуйста, заполните все поля");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Введите корректный email");
      return;
    }

    // Здесь можно добавить реальный API вызов
    setUser({
      name: isLogin ? "Пользователь" : formData.name,
      email: formData.email,
    });
    setIsAuthenticated(true);
    setFormData({ email: "", password: "", name: "" });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser({ name: "", email: "" });
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: "", email: "" });

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = () => {
    setUser({ ...user, name: editData.name, email: editData.email });
    setIsEditing(false);
  };

  // Если пользователь не авторизован, показываем форму входа/регистрации
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {isLogin ? "Вход в аккаунт" : "Регистрация"}
          </h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block mb-1 font-medium">Имя</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ваше имя"
                />
              </div>
            )}

            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ваш email"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Пароль</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ваш пароль"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
            >
              {isLogin ? "Войти" : "Зарегистрироваться"}
            </button>
          </form>

          <p className="text-center mt-4 text-gray-600">
            {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}{" "}
            <button
              className="text-blue-500 hover:underline"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
            >
              {isLogin ? "Зарегистрироваться" : "Войти"}
            </button>
          </p>
        </div>
      </div>
    );
  }

  // Личный кабинет
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Личный кабинет</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Выйти
          </button>
        </div>

        {/* Профиль пользователя */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Профиль</h3>
          {isEditing ? (
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleEditChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Имя"
              />
              <input
                type="email"
                name="email"
                value={editData.email}
                onChange={handleEditChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSaveProfile}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                >
                  Сохранить
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
                >
                  Отмена
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Имя:</span> {user.name}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {user.email}
              </p>
              <button
                onClick={() => {
                  setIsEditing(true);
                  setEditData(user);
                }}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Редактировать
              </button>
            </div>
          )}
        </div>

        {/* История заказов */}
        <div>
          <h3 className="text-xl font-semibold mb-4">История заказов</h3>
          {orders.length === 0 ? (
            <p>Заказов пока нет.</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border border-gray-300 rounded p-4 flex justify-between items-center"
                >
                  <div>
                    <p>
                      <span className="font-semibold">Заказ #{order.id}</span>
                    </p>
                    <p>Дата: {order.date}</p>
                    <p>Сумма: {order.total}</p>
                  </div>
                  <p
                    className={`font-semibold ${
                      order.status === "Доставлен"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {order.status}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
