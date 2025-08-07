import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiMinus, FiPlus } from "react-icons/fi";
import Breadcrumb from "../components/Breadcrumb";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart
      ? JSON.parse(savedCart)
      : [
          {
            id: 1,
            name: "Смеситель для кухни",
            price: 3000,
            quantity: 1,
            imageUrl: "https://via.placeholder.com/150",
          },
          {
            id: 2,
            name: "Смеситель для ванной",
            price: 4500,
            quantity: 2,
            imageUrl: "https://via.placeholder.com/150",
          },
          {
            id: 3,
            name: "Смеситель для ванной",
            price: 4500,
            quantity: 2,
            imageUrl: "https://via.placeholder.com/150",
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const removeItemFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const changeQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const handleCheckout = () => {
    alert("Спасибо за заказ!");
    setCart([]);
  };

  return (
    <div className="w-full">
      <Header />
      <div className="max-w-[1300px] mx-auto px-4 py-12 pb-[80px]">
        <Breadcrumb
          items={[{ label: "Главная", href: "/" }, { label: "Каталог" }]}
        />

        <motion.h1
          className="text-4xl font-bold mb-8 text-left text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Корзина
        </motion.h1>

        <AnimatePresence>
          {cart.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-gray-500 dark:text-gray-400"
            >
              <img
                src="/empty-cart.svg"
                alt="Пустая корзина"
                className="w-40 mx-auto mb-4"
              />
              Ваша корзина пуста
            </motion.div>
          ) : (
            cart.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                layout
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex items-center gap-6"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Цена: {item.price} ₽
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => changeQuantity(item.id, item.quantity - 1)}
                      className="p-2 bg-gray-200 dark:bg-gray-700 rounded-md"
                    >
                      <FiMinus />
                    </button>
                    <motion.span
                      key={item.quantity}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="font-medium"
                    >
                      {item.quantity}
                    </motion.span>
                    <button
                      onClick={() => changeQuantity(item.id, item.quantity + 1)}
                      className="p-2 bg-gray-200 dark:bg-gray-700 rounded-md"
                    >
                      <FiPlus />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Сумма: {item.quantity * item.price} ₽
                  </p>
                </div>
                <button
                  onClick={() => removeItemFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <FiTrash2 size={20} />
                </button>
              </motion.div>
            ))
          )}
        </AnimatePresence>

        {/* Общая сумма и кнопка оформления заказа */}
        {cart.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 flex justify-between items-center"
          >
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              Общая сумма: {totalAmount} ₽
            </div>
            <Link to="/buy">
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                className="py-2 px-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-md shadow-md hover:to-blue-700 transition"
                onClick={handleCheckout}
              >
                Оформить заказ
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
