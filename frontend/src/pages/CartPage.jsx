import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Remove as RemoveIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  ShoppingCart as CartIcon,
  ArrowBack as ArrowBackIcon,
  LocalShipping as ShippingIcon,
  Security as SecurityIcon,
  Replay as ReplayIcon,
} from "@mui/icons-material";
import Breadcrumb from "../components/Breadcrumb";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../contexts/CartContext";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shippingCost = totalAmount > 5000 ? 0 : 500;
  const finalAmount = totalAmount + shippingCost;

  const handleCheckout = () => {
    // checkout logic
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }
    },
    exit: { 
      opacity: 0, 
      x: -100, 
      scale: 0.9,
      transition: { duration: 0.3 }
    }
  };

  const quantityVariants = {
    pulse: {
      scale: [1, 1.1, 1],
      transition: { duration: 0.3 }
    }
  };

  // Функция для получения URL изображения товара
  const getImageUrl = (item) => {
    // Проверяем различные возможные свойства изображения
    if (item.imageUrl) return item.imageUrl;
    if (item.image) return item.image;
    if (item.img) return item.img;
    if (item.photo) return item.photo;
    if (item.picture) return item.picture;
    if (item.thumbnail) return item.thumbnail;
    if (item.src) return item.src;
    
    // Заглушка, если изображение не найдено
    return "https://via.placeholder.com/150?text=No+Image";
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
        <Breadcrumb
          items={[
            { label: "Главная", href: "/" }, 
            { label: "Корзина" }
          ]}
        />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg"
          >
            <CartIcon className="text-white text-3xl" />
          </motion.div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Корзина покупок
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 dark:text-gray-300 mt-2"
            >
              {cartItems.length === 0 
                ? "Начните добавлять товары!" 
                : `У вас ${cartItems.length} товар${cartItems.length === 1 ? '' : cartItems.length < 5 ? 'а' : 'ов'} в корзине`
              }
            </motion.p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Основная секция товаров */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="popLayout">
              {cartItems.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-20 px-4 text-center"
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, 0, -10, 0],
                      y: [0, -10, 0, 10, 0]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 3 
                    }}
                    className="p-6 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-3xl mb-6"
                  >
                    <CartIcon className="text-6xl text-gray-400 dark:text-gray-500" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-3">
                    Корзина пуста
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">
                    Добавьте товары, чтобы продолжить покупки
                  </p>
                  <Link to="/">
                    <motion.button
                      whileHover={{ scale: 1.05, x: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <ArrowBackIcon />
                      Вернуться в магазин
                    </motion.button>
                  </Link>
                </motion.div>
              ) : (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-between items-center mb-6"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={clearCart}
                      className="flex items-center gap-2 px-4 py-2 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                    >
                      <ReplayIcon />
                      Очистить корзину
                    </motion.button>
                  </motion.div>

                  <div className="space-y-4">
                    <AnimatePresence>
                      {cartItems.map((item, index) => {
                        const imageUrl = getImageUrl(item);
                        
                        return (
                          <motion.div
                            key={item.id}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            custom={index}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                          >
                            <div className="flex flex-col sm:flex-row items-center p-6">
                              {/* Анимированное изображение */}
                              <motion.div
                                whileHover={{ scale: 1.05, rotate: 2 }}
                                className="relative mb-4 sm:mb-0 sm:mr-6"
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                                <img
                                  src={imageUrl}
                                  alt={item.name}
                                  className="relative w-32 h-32 object-cover rounded-xl shadow-lg"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://via.placeholder.com/150?text=No+Image";
                                  }}
                                />
                                
                                {/* Индикатор количества на изображении */}
                                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                                  {item.quantity}
                                </div>
                              </motion.div>

                              {/* Информация о товаре */}
                              <div className="flex-1 text-center sm:text-left">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                  {item.name || "Без названия"}
                                </h3>
                                
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
                                  {/* Управление количеством */}
                                  <div className="flex items-center gap-3">
                                    <motion.button
                                      whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6" }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                      className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                      aria-label="Уменьшить количество"
                                    >
                                      <RemoveIcon className="text-gray-700 dark:text-gray-300" />
                                    </motion.button>

                                    <motion.div
                                      variants={quantityVariants}
                                      animate="pulse"
                                      key={item.quantity}
                                      className="min-w-[40px] text-center"
                                    >
                                      <span className="text-xl font-bold text-gray-900 dark:text-white">
                                        {item.quantity}
                                      </span>
                                    </motion.div>

                                    <motion.button
                                      whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6" }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                      className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                      aria-label="Увеличить количество"
                                    >
                                      <AddIcon className="text-gray-700 dark:text-gray-300" />
                                    </motion.button>
                                  </div>

                                  {/* Цена */}
                                  <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="text-right"
                                  >
                                    <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                      {((item.price || 0) * item.quantity).toLocaleString()} ₽
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                      {(item.price || 0).toLocaleString()} ₽ / шт
                                    </p>
                                  </motion.div>
                                </div>
                              </div>

                              {/* Кнопка удаления */}
                              <motion.button
                                whileHover={{ 
                                  scale: 1.1,
                                  rotate: 180,
                                  backgroundColor: "#fee2e2"
                                }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => removeFromCart(item.id)}
                                className="absolute top-4 right-4 p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors rounded-lg"
                                aria-label="Удалить товар"
                              >
                                <DeleteIcon />
                              </motion.button>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Сайдбар с итогами */}
          <div className="lg:col-span-1">
            <AnimatePresence>
              {cartItems.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="sticky top-8"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-4 border-b dark:border-gray-700">
                      Итого
                    </h2>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-300">Товары</span>
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">
                          {totalAmount.toLocaleString()} ₽
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-300">Доставка</span>
                        <motion.span
                          key={shippingCost}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className={`text-lg font-semibold ${
                            shippingCost === 0 
                              ? "text-green-600 dark:text-green-400" 
                              : "text-gray-900 dark:text-white"
                          }`}
                        >
                          {shippingCost === 0 ? "Бесплатно" : `${shippingCost} ₽`}
                        </motion.span>
                      </div>

                      {shippingCost > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg"
                        >
                          🎉 Бесплатная доставка при заказе от 5 000 ₽
                        </motion.div>
                      )}

                      <div className="border-t dark:border-gray-700 pt-4 mt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-bold text-gray-900 dark:text-white">
                            Общая сумма
                          </span>
                          <motion.span
                            key={finalAmount}
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
                          >
                            {finalAmount.toLocaleString()} ₽
                          </motion.span>
                        </div>
                      </div>
                      
                      {/* Миниатюры товаров в корзине */}
                      <div className="mt-6 pt-6 border-t dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                          Ваши товары ({cartItems.length})
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {cartItems.slice(0, 8).map((item) => {
                            const imageUrl = getImageUrl(item);
                            return (
                              <motion.div
                                key={`thumb-${item.id}`}
                                whileHover={{ scale: 1.1, y: -3 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative"
                                title={item.name}
                              >
                                <img
                                  src={imageUrl}
                                  alt={item.name}
                                  className="w-12 h-12 object-cover rounded-lg shadow border-2 border-white dark:border-gray-700"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://via.placeholder.com/50?text=No+Img";
                                  }}
                                />
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                                  {item.quantity}
                                </div>
                              </motion.div>
                            );
                          })}
                          {cartItems.length > 8 && (
                            <div className="w-12 h-12 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center text-xs font-bold text-gray-700 dark:text-gray-300">
                              +{cartItems.length - 8}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Блок с преимуществами */}
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-3 text-green-600 dark:text-green-400">
                        <SecurityIcon />
                        <span className="text-sm">Безопасная оплата</span>
                      </div>
                      <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
                        <ShippingIcon />
                        <span className="text-sm">Быстрая доставка</span>
                      </div>
                    </div>

                    <Link to="/checkout">
                      <motion.button
                        whileHover={{ 
                          scale: 1.02,
                          boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.3)"
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleCheckout}
                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Перейти к оформлению
                      </motion.button>
                    </Link>

                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                      Нажимая кнопку, вы соглашаетесь с условиями обработки данных
                    </p>
                  </div>

                  {/* Рекомендации */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-lg"
                  >
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                      🎁 Продолжить покупки
                    </h3>
                    <Link to="/">
                      <motion.button
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-medium shadow hover:shadow-md transition-all"
                      >
                        Вернуться в магазин
                      </motion.button>
                    </Link>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CartPage;