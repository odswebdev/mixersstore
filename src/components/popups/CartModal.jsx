import React, { useState } from "react";
import { motion } from "framer-motion";

const CartModal = ({ isOpen, toggleModal, cart }) => {
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <motion.div
      className={`fixed bottom-16 right-4 bg-white dark:bg-gray-800 shadow-xl rounded-xl p-4 w-64 transform transition-all ${
        isOpen ? "scale-100" : "scale-0"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center">
        <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
          Корзина
        </h4>
        <button
          onClick={toggleModal}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
        >
          ×
        </button>
      </div>
      <div className="mt-4">
        {cart.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">Корзина пуста</p>
        ) : (
          <>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Товары: {cart.length}
            </p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              Общая сумма: {totalAmount} ₽
            </p>
          </>
        )}
      </div>
      <div className="mt-4">
        <button
          onClick={() => alert("Переход к оформлению заказа")}
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Перейти в корзину
        </button>
      </div>
    </motion.div>
  );
};

export default CartModal;
