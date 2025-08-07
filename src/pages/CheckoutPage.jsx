import React, { useState } from "react";
import { motion } from "framer-motion";
import Breadcrumb from "../components/Breadcrumb";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    delivery: "courier",
    payment: "card",
  });

  const cartItems = [
    { id: 1, name: "Смеситель кухонный", price: 3500, quantity: 1 },
    { id: 2, name: "Душевая стойка", price: 7200, quantity: 1 },
  ];

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Заказ отправлен:", formData, cartItems);
    alert("Спасибо за заказ! Мы свяжемся с вами.");
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Оформление заказа
      </h1>

      <form onSubmit={handleSubmit} className="grid gap-8 md:grid-cols-2">
        {/* Контактные данные */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Контактные данные
          </h2>
          <input
            type="text"
            name="name"
            placeholder="Имя"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border dark:bg-gray-800 dark:border-gray-700"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Телефон"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border dark:bg-gray-800 dark:border-gray-700"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border dark:bg-gray-800 dark:border-gray-700"
          />
          <textarea
            name="address"
            placeholder="Адрес доставки"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border dark:bg-gray-800 dark:border-gray-700"
          />
        </div>

        {/* Способы доставки и оплаты */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Доставка
            </h2>
            <label className="block mb-2">
              <input
                type="radio"
                name="delivery"
                value="courier"
                checked={formData.delivery === "courier"}
                onChange={handleChange}
                className="mr-2"
              />
              Курьерская доставка
            </label>
            <label className="block">
              <input
                type="radio"
                name="delivery"
                value="pickup"
                checked={formData.delivery === "pickup"}
                onChange={handleChange}
                className="mr-2"
              />
              Самовывоз
            </label>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Оплата
            </h2>
            <label className="block mb-2">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={formData.payment === "card"}
                onChange={handleChange}
                className="mr-2"
              />
              Банковская карта
            </label>
            <label className="block">
              <input
                type="radio"
                name="payment"
                value="cash"
                checked={formData.payment === "cash"}
                onChange={handleChange}
                className="mr-2"
              />
              Наличными при получении
            </label>
          </div>
        </div>
      </form>

      {/* Товары и итог */}
      <div className="mt-12 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Ваш заказ
        </h2>
        <div className="space-y-2">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between border-b pb-2 text-gray-800 dark:text-gray-200"
            >
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>{item.price * item.quantity} ₽</span>
            </div>
          ))}
        </div>
        <div className="text-xl font-bold text-right text-gray-900 dark:text-white">
          Итого: {totalAmount} ₽
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="mt-4 w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
