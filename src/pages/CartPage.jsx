import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Remove as RemoveIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import Breadcrumb from "../components/Breadcrumb";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {};

  return (
    <div className="w-full">
      <Header />
      <div className="max-w-[1300px] mx-auto px-4 py-12 pb-[80px]">
        <Breadcrumb
          items={[{ label: "Главная", href: "/" }, { label: "Корзина" }]}
        />

        <motion.h1
          className="text-4xl font-bold mb-8 text-left text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Корзина
        </motion.h1>

        <p>В вашей корзине {cartItems.length} товара(ов)</p>

        <AnimatePresence>
          {cartItems.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-gray-500 dark:text-gray-400"
            >
              Ваша корзина пуста
            </motion.div>
          ) : (
            cartItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                layout
                className="flex mb-[30px] bg-white p-[20px_40px] dark:bg-gray-800 rounded-[10px] shadow items-center gap-[30px] border border-solid border-[#dcdc]"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-[10rem] h-[10rem] object-cover rounded-lg"
                />

                <div className="flex items-center gap-[20px] flex-1">
                  <div className="flex items-center gap-[20px]">
                    <p className="text-xl font-semibold dark:text-white">
                      {item.name}
                    </p>

                    <div className="flex items-center gap-3 mt-2">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuantity(item.id, -1)}
                        aria-label="Уменьшить количество"
                        className="flex items-center justify-center w-9 h-9 rounded-lg border-none bg-[#FFF] cursor-pointer dark:text-gray-300 hover:bg-gray-20 transition shadow-sm "
                      >
                        <RemoveIcon
                          className="w-[28px]"
                          fontSize="20px"
                          border="none"
                        />
                      </motion.button>

                      <motion.span
                        key={item.quantity}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="font-medium px-2"
                      >
                        {item.quantity}
                      </motion.span>

                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={() => updateQuantity(item.id, 1)}
                        aria-label="Увеличить количество"
                        className="flex items-center justify-center w-9 h-9 rounded-lg border-none bg-[#FFF] cursor-pointer dark:text-gray-300 transition shadow-sm"
                      >
                        <AddIcon className="w-[28px]" fontSize="20px" />
                      </motion.button>
                    </div>

                    <p className="text-sm text-gray-500 mt-1">
                      {item.quantity * item.price} ₽
                    </p>
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.8 }}
                  whileHover={{ scale: 1.1 }}
                  aria-label="Удалить товар"
                  className="text-red-500 hover:text-red-700 transition p-2 border-none bg-[#FFF] hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 shadow-sm cursor-pointer"
                  onClick={() => removeFromCart(item.id)}
                >
                  <DeleteIcon fontSize="medium" />
                </motion.button>
              </motion.div>
            ))
          )}
        </AnimatePresence>

        {cartItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full mt-8 flex justify-end items-center gap-[10px]"
          >
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              Общая сумма: {totalAmount} ₽
            </div>

            <Link to="/buy">
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                className="rounded-[50px] text-[#fff] font-medium w-[170px] h-[50px] bg-[#213f74]"
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
