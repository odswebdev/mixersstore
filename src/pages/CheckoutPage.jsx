import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import { useCart } from "../context/CartContext";

const CheckoutPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const [delivery, setDelivery] = useState("pickup");
  const [payment, setPayment] = useState("card");

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleConfirm = () => {
    navigate("/pay", { state: { totalAmount, delivery, payment } });
  };

  return (
    <div className="w-full">
      <Header />
      <div className="max-w-[1300px] mx-auto px-4 py-12 pb-[80px] flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <Breadcrumb
            items={[
              { label: "Главная", href: "/" },
              { label: "Подтверждение заказа" },
            ]}
          />
          <motion.h1
            className="text-4xl font-bold mb-8 dark:text-white"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Подтверждение заказа
          </motion.h1>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow mb-6">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">
              Выбор доставки
            </h2>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3 cursor-pointer dark:text-white">
                <input
                  type="radio"
                  name="delivery"
                  value="pickup"
                  checked={delivery === "pickup"}
                  onChange={(e) => setDelivery(e.target.value)}
                  className="accent-[#213f74]"
                />
                Самовывоз
              </label>
              <label className="flex items-center gap-3 cursor-pointer dark:text-white">
                <input
                  type="radio"
                  name="delivery"
                  value="courier"
                  checked={delivery === "courier"}
                  onChange={(e) => setDelivery(e.target.value)}
                  className="accent-[#213f74]"
                />
                Курьерская доставка
              </label>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">
              Выбор оплаты
            </h2>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3 cursor-pointer dark:text-white">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={payment === "card"}
                  onChange={(e) => setPayment(e.target.value)}
                  className="accent-[#213f74]"
                />
                Банковская карта
              </label>
              <label className="flex items-center gap-3 cursor-pointer dark:text-white">
                <input
                  type="radio"
                  name="payment"
                  value="sbp"
                  checked={payment === "sbp"}
                  onChange={(e) => setPayment(e.target.value)}
                  className="accent-[#213f74]"
                />
                СБП
              </label>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="mt-6 w-full py-3 bg-[#213f74] text-white rounded-full font-medium"
            onClick={handleConfirm}
          >
            Перейти к оплате
          </motion.button>
        </div>

        {/* Панель заказа справа */}
        <div className="md:w-[350px]">
          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col gap-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-bold dark:text-white">Ваш заказ</h2>
            <div className="flex flex-col gap-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span className="dark:text-gray-300">
                    {item.name} x{item.quantity}
                  </span>
                  <span className="font-semibold dark:text-white">
                    {item.price * item.quantity} ₽
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-lg font-semibold dark:text-white">
              <span>Итого:</span>
              <span>{totalAmount} ₽</span>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
