import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import smesBideImg from "/src/assets/smes-bide.png";

const OrderConfirmationPage = () => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    // Очистка корзины после подтверждения
    localStorage.removeItem("cart");
  }, []);

  return (
    <div className="w-full">
      <Header />
      <div className="max-w-[1300px] mx-auto px-4 py-12 pb-[80px]">
        <Breadcrumb
          items={[
            { label: "Главная", href: "/" },
            { label: "Корзина", href: "/cart" },
            { label: "Подтверждение заказа" },
          ]}
        />

        {/* Анимация галочки */}
        <div className="flex justify-center mb-6">
          <motion.svg
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            width="100"
            height="100"
            viewBox="0 0 52 52"
            className="stroke-green-500"
          >
            <circle
              cx="26"
              cy="26"
              r="25"
              fill="none"
              strokeWidth="2"
              stroke="currentColor"
              className="stroke-current text-green-500"
            />
            <motion.path
              fill="none"
              strokeWidth="4"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 27 l7 7 l17 -17"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            />
          </motion.svg>
        </div>

        <motion.h1
          className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          Заказ подтвержден
        </motion.h1>

        <p className="text-lg mb-6 text-center">
          Спасибо за ваш заказ! Ниже указаны товары, которые вы заказали:
        </p>

        <div className="flex flex-col gap-4">
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <motion.div
                key={`${item.id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="flex items-center gap-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
              >
                <img
                  src={item.imageUrl || smesBideImg}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex flex-col">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {item.name}
                  </p>
                  <p className="text-gray-500 dark:text-gray-300">
                    Количество: {item.quantity}
                  </p>
                  <p className="text-gray-500 dark:text-gray-300">
                    Цена: {item.price * item.quantity} ₽
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center">
              Корзина пуста.
            </p>
          )}
        </div>

        {cart.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-xl font-semibold text-gray-900 dark:text-white">
              Общая сумма: {totalAmount} ₽
            </p>
            <Link to="/">
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                className="mt-4 inline-block border-none rounded-full text-white font-medium px-6 py-3 bg-[#213f74] cursor-pointer"
              >
                Вернуться на главную
              </motion.button>
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default OrderConfirmationPage;
