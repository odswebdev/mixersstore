import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowBack as ArrowBackIcon,
  LocalShipping as ShippingIcon,
  Payment as PaymentIcon,
  Person as PersonIcon,
  Home as HomeIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  CreditCard as CreditCardIcon,
  AccountBalance as BankIcon,
  QrCode as QrIcon,
  Store as StoreIcon,
  Schedule as ScheduleIcon,
  Security as SecurityIcon,
  Discount as DiscountIcon,
  CheckCircle as CheckCircleIcon,
  Edit as EditIcon,
  Add as AddIcon,
  LocationOn as LocationIcon,
} from "@mui/icons-material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import { useCart } from "../context/CartContext";

const CheckoutPage = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [delivery, setDelivery] = useState("pickup");
  const [payment, setPayment] = useState("card");
  const [addresses, setAddresses] = useState([
    { id: 1, title: "Дом", address: "ул. Примерная, д. 10, кв. 25", isDefault: true },
    { id: 2, title: "Работа", address: "ул. Рабочая, д. 5, офис 301", isDefault: false },
  ]);
  const [newAddress, setNewAddress] = useState({ title: "", address: "" });
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shippingCost = delivery === "courier" ? (totalAmount > 3000 ? 0 : 250) : 0;
  const discountAmount = (totalAmount * discount) / 100;
  const finalAmount = totalAmount + shippingCost - discountAmount;

  const deliveryOptions = [
    {
      id: "pickup",
      title: "Самовывоз",
      description: "Заберите заказ из нашего магазина",
      price: "Бесплатно",
      time: "Сегодня",
      icon: <StoreIcon />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "courier",
      title: "Курьерская доставка",
      description: "Доставим курьером по вашему адресу",
      price: totalAmount > 3000 ? "Бесплатно" : "250 ₽",
      time: "1-2 дня",
      icon: <ShippingIcon />,
      color: "from-purple-500 to-pink-500"
    },
    {
      id: "express",
      title: "Экспресс доставка",
      description: "Доставим в течение 2-х часов",
      price: "500 ₽",
      time: "2 часа",
      icon: <ScheduleIcon />,
      color: "from-orange-500 to-red-500"
    }
  ];

  const paymentOptions = [
    {
      id: "card",
      title: "Банковская карта",
      description: "Visa, Mastercard, Мир",
      icon: <CreditCardIcon />,
      color: "from-green-500 to-emerald-500"
    },
    {
      id: "sbp",
      title: "СБП",
      description: "Система быстрых платежей",
      icon: <QrIcon />,
      color: "from-blue-600 to-indigo-600"
    },
    {
      id: "cash",
      title: "Наличные",
      description: "Оплата при получении",
      icon: <BankIcon />,
      color: "from-gray-600 to-gray-700"
    }
  ];

  const handleConfirm = () => {
    navigate("/pay", { 
      state: { 
        totalAmount: finalAmount, 
        delivery, 
        payment,
        userInfo,
        discount
      } 
    });
  };

  const handleApplyPromo = () => {
    const codes = {
      "WELCOME10": 10,
      "SUMMER20": 20,
      "SALE15": 15
    };
    
    if (codes[promoCode.toUpperCase()]) {
      setDiscount(codes[promoCode.toUpperCase()]);
    }
  };

  const addAddress = () => {
    if (newAddress.title && newAddress.address) {
      setAddresses([...addresses, { 
        id: addresses.length + 1, 
        ...newAddress, 
        isDefault: false 
      }]);
      setNewAddress({ title: "", address: "" });
      setShowAddressForm(false);
    }
  };

  const setDefaultAddress = (id) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  const stepContent = [
    {
      title: "Доставка",
      icon: <ShippingIcon />,
      description: "Выберите способ получения заказа"
    },
    {
      title: "Оплата",
      icon: <PaymentIcon />,
      description: "Выберите способ оплаты"
    },
    {
      title: "Данные",
      icon: <PersonIcon />,
      description: "Заполните контактную информацию"
    }
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      {/* Прогресс бар */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <Breadcrumb
              items={[
                { label: "Главная", href: "/" },
                { label: "Корзина", href: "/cart" },
                { label: "Оформление заказа" },
              ]}
            />
            
            <div className="flex items-center gap-4">
              {stepContent.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <motion.div
                    animate={{ 
                      scale: step === index + 1 ? [1, 1.2, 1] : 1,
                      backgroundColor: step >= index + 1 ? 
                        "rgb(37, 99, 235)" : 
                        "rgb(209, 213, 219)"
                    }}
                    transition={{ duration: 0.3 }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold`}
                  >
                    {item.icon}
                  </motion.div>
                  <div className="hidden sm:block">
                    <div className={`text-sm font-medium ${step >= index + 1 ? 
                      "text-gray-900 dark:text-white" : 
                      "text-gray-500 dark:text-gray-400"}`}>
                      {item.title}
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500">
                      {item.description}
                    </div>
                  </div>
                  {index < stepContent.length - 1 && (
                    <div className={`w-8 h-0.5 ${step > index + 1 ? 
                      "bg-blue-500" : 
                      "bg-gray-300 dark:bg-gray-600"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
        <motion.h1
          className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-[#213f74] to-blue-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Оформление заказа
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Основная секция */}
          <div className="lg:col-span-2 space-y-8">
            {/* Шаг 1: Доставка */}
            <AnimatePresence>
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  className="space-y-8"
                >
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-100 dark:border-gray-700"
                  >
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                      <ShippingIcon className="text-blue-600" />
                      Способ доставки
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {deliveryOptions.map((option) => (
                        <motion.div
                          key={option.id}
                          whileHover={{ scale: 1.05, y: -5 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setDelivery(option.id)}
                          className={`relative cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 ${
                            delivery === option.id
                              ? "border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/20 shadow-lg"
                              : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-lg bg-gradient-to-r ${option.color}`}>
                              {option.icon}
                            </div>
                            <motion.div
                              animate={{ 
                                scale: delivery === option.id ? [1, 1.2, 1] : 1 
                              }}
                              className={`w-6 h-6 rounded-full border-2 ${
                                delivery === option.id
                                  ? "border-blue-500 bg-blue-500"
                                  : "border-gray-300 dark:border-gray-600"
                              }`}
                            >
                              {delivery === option.id && (
                                <div className="w-full h-full rounded-full bg-white" />
                              )}
                            </motion.div>
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                            {option.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                            {option.description}
                          </p>
                          <div className="flex items-center justify-between mt-4">
                            <span className="text-xl font-bold text-gray-900 dark:text-white">
                              {option.price}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                              <ScheduleIcon fontSize="small" />
                              {option.time}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Адреса доставки */}
                  {delivery !== "pickup" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-100 dark:border-gray-700"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                          <LocationIcon className="text-blue-600" />
                          Адреса доставки
                        </h3>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setShowAddressForm(!showAddressForm)}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
                        >
                          <AddIcon />
                          Новый адрес
                        </motion.button>
                      </div>

                      <AnimatePresence>
                        {showAddressForm && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl"
                          >
                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                  Название адреса
                                </label>
                                <input
                                  type="text"
                                  value={newAddress.title}
                                  onChange={(e) => setNewAddress({...newAddress, title: e.target.value})}
                                  placeholder="Например: Дом, Работа"
                                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                  Адрес
                                </label>
                                <input
                                  type="text"
                                  value={newAddress.address}
                                  onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
                                  placeholder="Введите полный адрес"
                                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={addAddress}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium"
                              >
                                Сохранить
                              </button>
                              <button
                                onClick={() => setShowAddressForm(false)}
                                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-lg font-medium"
                              >
                                Отмена
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="grid md:grid-cols-2 gap-4">
                        {addresses.map((address) => (
                          <motion.div
                            key={address.id}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setDefaultAddress(address.id)}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                              address.isDefault
                                ? "border-blue-500 bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/20"
                                : "border-gray-200 dark:border-gray-700"
                            }`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <HomeIcon className="text-blue-600" />
                                <span className="font-medium text-gray-900 dark:text-white">
                                  {address.title}
                                </span>
                              </div>
                              {address.isDefault && (
                                <motion.div
                                  animate={{ scale: [1, 1.2, 1] }}
                                  className="flex items-center gap-1 text-blue-600 text-sm"
                                >
                                  <CheckCircleIcon fontSize="small" />
                                  <span>По умолчанию</span>
                                </motion.div>
                              )}
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                              {address.address}
                            </p>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                // Редактирование адреса
                              }}
                              className="mt-3 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 flex items-center gap-1"
                            >
                              <EditIcon fontSize="small" />
                              Редактировать
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Шаг 2: Оплата */}
            <AnimatePresence>
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  className="space-y-8"
                >
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-100 dark:border-gray-700"
                  >
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                      <PaymentIcon className="text-green-600" />
                      Способ оплаты
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {paymentOptions.map((option) => (
                        <motion.div
                          key={option.id}
                          whileHover={{ scale: 1.05, y: -5 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setPayment(option.id)}
                          className={`relative cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 ${
                            payment === option.id
                              ? "border-green-500 bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-900/20 dark:to-green-800/20 shadow-lg"
                              : "border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-lg bg-gradient-to-r ${option.color}`}>
                              {option.icon}
                            </div>
                            <motion.div
                              animate={{ 
                                scale: payment === option.id ? [1, 1.2, 1] : 1 
                              }}
                              className={`w-6 h-6 rounded-full border-2 ${
                                payment === option.id
                                  ? "border-green-500 bg-green-500"
                                  : "border-gray-300 dark:border-gray-600"
                              }`}
                            >
                              {payment === option.id && (
                                <div className="w-full h-full rounded-full bg-white" />
                              )}
                            </motion.div>
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                            {option.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {option.description}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Блок безопасности */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 shadow-xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-green-100 dark:bg-green-800/30 rounded-xl">
                        <SecurityIcon className="text-green-600 dark:text-green-400 text-2xl" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                          Безопасная оплата
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Все платежи защищены SSL-шифрованием. Мы не храним данные вашей карты.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Шаг 3: Данные */}
            <AnimatePresence>
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  className="space-y-8"
                >
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-100 dark:border-gray-700"
                  >
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                      <PersonIcon className="text-purple-600" />
                      Контактная информация
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                          <PersonIcon fontSize="small" />
                          Имя и фамилия
                        </label>
                        <input
                          type="text"
                          value={userInfo.name}
                          onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                          placeholder="Иван Иванов"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                          <EmailIcon fontSize="small" />
                          Email
                        </label>
                        <input
                          type="email"
                          value={userInfo.email}
                          onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                          placeholder="example@email.com"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                          <PhoneIcon fontSize="small" />
                          Телефон
                        </label>
                        <input
                          type="tel"
                          value={userInfo.phone}
                          onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                          placeholder="+7 (999) 123-45-67"
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Комментарий к заказу */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700"
                  >
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                      Комментарий к заказу (необязательно)
                    </h3>
                    <textarea
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white min-h-[120px]"
                      placeholder="Например: позвонить перед доставкой, оставить у двери и т.д."
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Навигация по шагам */}
            <div className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700">
              {step > 1 ? (
                <motion.button
                  whileHover={{ scale: 1.05, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStep(step - 1)}
                  className="flex items-center gap-2 px-8 py-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-2xl font-medium shadow-lg"
                >
                  <ArrowBackIcon />
                  Назад
                </motion.button>
              ) : (
                <Link to="/cart">
                  <motion.button
                    whileHover={{ scale: 1.05, x: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-8 py-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-2xl font-medium shadow-lg"
                  >
                    <ArrowBackIcon />
                    Вернуться в корзину
                  </motion.button>
                </Link>
              )}

              {step < 3 ? (
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(33, 63, 116, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStep(step + 1)}
                  className="px-8 py-4 bg-gradient-to-r from-[#213f74] to-blue-600 text-white rounded-2xl font-bold shadow-xl"
                >
                  Продолжить
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(33, 63, 116, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleConfirm}
                  className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-bold shadow-xl"
                >
                  Подтвердить и оплатить
                </motion.button>
              )}
            </div>
          </div>

          {/* Сайдбар с заказом */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="sticky top-32 space-y-6"
            >
              {/* Корзина заказа */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-gray-100 dark:border-gray-700"
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  Ваш заказ
                </h2>
                
                <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden">
                        <img
                          src={item.imageUrl || `https://picsum.photos/seed/${item.id}/100/100`}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://picsum.photos/seed/${item.id}/100/100`;
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white truncate">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.quantity} × {item.price.toLocaleString()} ₽
                        </p>
                      </div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {(item.price * item.quantity).toLocaleString()} ₽
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Промокод */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <DiscountIcon className="text-purple-600" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      Промокод
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Введите промокод"
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleApplyPromo}
                      className="px-4 py-3 bg-purple-600 text-white rounded-xl font-medium"
                    >
                      OK
                    </motion.button>
                  </div>
                </div>

                {/* Итоги */}
                <div className="space-y-3">
                  {[
                    { label: "Товары", value: totalAmount.toLocaleString() + " ₽" },
                    { label: "Доставка", value: shippingCost === 0 ? "Бесплатно" : `${shippingCost} ₽` },
                    ...(discount > 0 ? [{ label: `Скидка ${discount}%`, value: `-${discountAmount.toLocaleString()} ₽`, color: "text-green-600 dark:text-green-400" }] : []),
                  ].map((item, index) => (
                    <div key={item.label} className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        {item.label}
                      </span>
                      <span className={`font-medium ${item.color || "text-gray-900 dark:text-white"}`}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-900 dark:text-white">
                        Итого
                      </span>
                      <motion.span
                        key={finalAmount}
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        className="text-2xl font-bold bg-gradient-to-r from-[#213f74] to-blue-600 bg-clip-text text-transparent"
                      >
                        {finalAmount.toLocaleString()} ₽
                      </motion.span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Итоговая информация */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 shadow-xl"
              >
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                  Краткая информация
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <ShippingIcon className="text-blue-600" />
                    <div>
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Доставка
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {deliveryOptions.find(d => d.id === delivery)?.title}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <PaymentIcon className="text-green-600" />
                    <div>
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Оплата
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {paymentOptions.find(p => p.id === payment)?.title}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CheckoutPage;