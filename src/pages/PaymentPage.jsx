import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CreditCard as CreditCardIcon,
  QrCode as QrIcon,
  Smartphone as SmartphoneIcon,
  AccountBalance as BankIcon,
  Security as SecurityIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  CheckCircle as CheckCircleIcon,
  Timer as TimerIcon,
  Receipt as ReceiptIcon,
  LocalShipping as ShippingIcon,
  ArrowBack as ArrowBackIcon,
  Share as ShareIcon,
  Download as DownloadIcon,
} from "@mui/icons-material";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalAmount, payment, delivery, userInfo } = location.state || {};
  
  const [method, setMethod] = useState(payment || "card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [showCvc, setShowCvc] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 минут
  const [activeStep, setActiveStep] = useState(1);
  const [qrVisible, setQrVisible] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null);
  const [saveCard, setSaveCard] = useState(false);
  const [invoiceGenerated, setInvoiceGenerated] = useState(false);

  const cardControls = useAnimation();

  // Таймер для оплаты
  useEffect(() => {
    if (!success && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, success]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const paymentMethods = [
    {
      id: "card",
      name: "Банковская карта",
      icon: <CreditCardIcon />,
      description: "Visa, Mastercard, МИР",
      color: "from-blue-500 to-purple-600",
      popular: true
    },
    {
      id: "sbp",
      name: "СБП",
      icon: <SmartphoneIcon />,
      description: "Быстрая оплата через QR",
      color: "from-green-500 to-emerald-600",
      popular: true
    },
    {
      id: "bank",
      name: "Онлайн-банк",
      icon: <BankIcon />,
      description: "Тинькофф, Сбер, Альфа-Банк",
      color: "from-orange-500 to-red-600"
    }
  ];

  const banks = [
    { id: "sber", name: "Сбербанк", color: "#21A038" },
    { id: "tinkoff", name: "Тинькофф", color: "#FFDD2D" },
    { id: "alfa", name: "Альфа-Банк", color: "#EF3124" },
    { id: "vtb", name: "ВТБ", color: "#1946B8" },
    { id: "gazprom", name: "Газпромбанк", color: "#3C3C3B" },
  ];

  const handleCardNumberChange = (value) => {
    const formatted = value
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim()
      .slice(0, 19);
    setCardNumber(formatted);
  };

  const handleExpiryChange = (value) => {
    const formatted = value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d{0,2})/, "$1/$2")
      .slice(0, 5);
    setExpiry(formatted);
  };

  const handleProcessPayment = async () => {
    if (method === "card") {
      const number = cardNumber.replace(/\s/g, "");
      if (number.length !== 16) return showError("Введите корректный номер карты");
      if (!/^\d{2}\/\d{2}$/.test(expiry)) return showError("Введите корректный срок действия");
      if (!/^\d{3,4}$/.test(cvc)) return showError("Введите корректный CVC");
      if (!cardHolder.trim()) return showError("Введите имя владельца карты");
    }

    setProcessing(true);
    
    // Анимация обработки платежа
    await cardControls.start({
      rotateY: [0, 180, 360],
      scale: [1, 1.05, 1],
      transition: { duration: 1.5 }
    });

    // Имитация задержки обработки
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      setActiveStep(3);
      if (saveCard) {
        // Сохранение карты в профиль
      }
    }, 2000);
  };

  const showError = (message) => {
    // Анимация ошибки
    cardControls.start({
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.5 }
    });
  };

  const generateInvoice = () => {
    setInvoiceGenerated(true);
    // Генерация счета для оплаты
  };

  const steps = [
    { number: 1, title: "Выбор способа", active: activeStep >= 1 },
    { number: 2, title: "Оплата", active: activeStep >= 2 },
    { number: 3, title: "Подтверждение", active: activeStep >= 3 },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      {/* Прогресс бар */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <ArrowBackIcon />
              Назад к оформлению
            </button>
            
            <div className="flex items-center gap-6">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    <motion.div
                      animate={{ 
                        scale: step.active ? [1, 1.2, 1] : 1,
                        backgroundColor: step.active ? "#2563eb" : "#d1d5db"
                      }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold transition-colors`}
                    >
                      {step.active ? <CheckCircleIcon /> : step.number}
                    </motion.div>
                    <span className={`text-sm mt-2 ${step.active ? 
                      "text-blue-600 font-medium" : 
                      "text-gray-500 dark:text-gray-400"}`}>
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-1 ${steps[index + 1].active ? 
                      "bg-blue-500" : 
                      "bg-gray-300 dark:bg-gray-600"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row gap-8"
        >
          {/* Левая панель - форма оплаты */}
          <div className="lg:w-2/3 space-y-8">
            {/* Заголовок */}
            <div className="flex items-center justify-between">
              <motion.h1
                className="text-4xl font-bold bg-gradient-to-r from-[#213f74] to-blue-600 bg-clip-text text-transparent"
                animate={{ scale: success ? 1 : [1, 1.02, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                {success ? "Оплата успешна!" : "Оплата заказа"}
              </motion.h1>
              
              {/* Таймер */}
              {!success && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg"
                >
                  <TimerIcon />
                  <span className="font-bold">{formatTime(timeLeft)}</span>
                  <span className="text-sm">до завершения</span>
                </motion.div>
              )}
            </div>

            {/* Информация о заказе */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center gap-3 mb-4">
                <ReceiptIcon className="text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Детали заказа
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Сумма к оплате</div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {totalAmount?.toLocaleString() || "0"} ₽
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Способ доставки</div>
                  <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                    <ShippingIcon fontSize="small" />
                    {delivery === "pickup" ? "Самовывоз" : "Курьерская доставка"}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Выбор способа оплаты */}
            <AnimatePresence>
              {!success && (
                <motion.div
                  key="payment-methods"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap gap-3">
                    {paymentMethods.map((pm) => (
                      <motion.button
                        key={pm.id}
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setMethod(pm.id);
                          setActiveStep(2);
                          if (pm.id === "sbp") setQrVisible(true);
                        }}
                        className={`flex-1 min-w-[200px] p-4 rounded-xl border-2 transition-all ${
                          method === pm.id
                            ? `border-blue-500 bg-gradient-to-r ${pm.color} text-white shadow-lg`
                            : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white/20 rounded-lg">
                            {pm.icon}
                          </div>
                          <div className="text-left">
                            <div className="font-bold">{pm.name}</div>
                            <div className="text-sm opacity-90">{pm.description}</div>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  {/* Форма оплаты картой */}
                  {method === "card" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                          <CreditCardIcon className="text-blue-600" />
                          Данные банковской карты
                        </h3>
                        <div className="flex items-center gap-4">
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            <LockIcon fontSize="small" /> SSL защита
                          </div>
                        </div>
                      </div>

                      {/* Анимированная карта */}
                      <motion.div
                        animate={cardControls}
                        className="relative mb-8"
                      >
                        <div className="w-full h-48 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white shadow-2xl">
                          <div className="flex justify-between items-center mb-8">
                            <div className="text-2xl tracking-widest font-mono">
                              {cardNumber || "•••• •••• •••• ••••"}
                            </div>
                            <div className="text-sm bg-white/20 px-3 py-1 rounded-lg">
                              VISA
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="text-sm opacity-80">Владелец карты</div>
                              <div className="text-lg font-medium">
                                {cardHolder || "ИМЯ ВЛАДЕЛЬЦА"}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm opacity-80">Срок действия</div>
                              <div className="text-lg font-medium">
                                {expiry || "MM/YY"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Номер карты
                          </label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => handleCardNumberChange(e.target.value)}
                            placeholder="0000 0000 0000 0000"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono"
                            maxLength={19}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Срок действия
                          </label>
                          <input
                            type="text"
                            value={expiry}
                            onChange={(e) => handleExpiryChange(e.target.value)}
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Имя владельца
                          </label>
                          <input
                            type="text"
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                            placeholder="IVAN IVANOV"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center justify-between">
                            <span>CVC/CVV</span>
                            <button
                              type="button"
                              onClick={() => setShowCvc(!showCvc)}
                              className="text-sm text-blue-600"
                            >
                              {showCvc ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </button>
                          </label>
                          <input
                            type={showCvc ? "text" : "password"}
                            value={cvc}
                            onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                            placeholder="123"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono"
                            maxLength={4}
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mt-6">
                        <input
                          type="checkbox"
                          id="saveCard"
                          checked={saveCard}
                          onChange={(e) => setSaveCard(e.target.checked)}
                          className="rounded"
                        />
                        <label htmlFor="saveCard" className="text-sm text-gray-600 dark:text-gray-400">
                          Сохранить карту для будущих покупок
                        </label>
                      </div>
                    </motion.div>
                  )}

                  {/* Оплата через СБП */}
                  {method === "sbp" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700"
                    >
                      <div className="text-center mb-6">
                        <SmartphoneIcon className="text-5xl text-green-600 mb-4" />
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          Оплата через СБП
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Отсканируйте QR-код в мобильном приложении вашего банка
                        </p>
                      </div>

                      <div className="flex flex-col lg:flex-row items-center gap-8">
                        <motion.div
                          animate={{ 
                            scale: qrVisible ? 1 : 0.8,
                            opacity: qrVisible ? 1 : 0.5
                          }}
                          className="flex-1"
                        >
                          <div className="bg-white p-8 rounded-2xl shadow-inner flex items-center justify-center">
                            {qrVisible ? (
                              <div className="w-64 h-64 bg-gradient-to-r from-green-400 to-emerald-600 rounded-lg flex items-center justify-center text-white text-4xl">
                                <QrIcon fontSize="inherit" />
                              </div>
                            ) : (
                              <button
                                onClick={() => setQrVisible(true)}
                                className="px-6 py-3 bg-green-600 text-white rounded-lg"
                              >
                                Показать QR-код
                              </button>
                            )}
                          </div>
                        </motion.div>

                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 dark:text-white mb-4">
                            Выберите ваш банк
                          </h4>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {banks.map((bank) => (
                              <motion.button
                                key={bank.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedBank(bank.id)}
                                className={`p-3 rounded-lg flex flex-col items-center justify-center transition-all ${
                                  selectedBank === bank.id
                                    ? "ring-2 ring-blue-500 shadow-lg"
                                    : "bg-gray-100 dark:bg-gray-700"
                                }`}
                              >
                                <div
                                  className="w-8 h-8 rounded-full mb-2"
                                  style={{ backgroundColor: bank.color }}
                                />
                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                  {bank.name}
                                </span>
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Кнопка оплаты */}
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleProcessPayment}
                    disabled={processing}
                    className={`w-full py-4 rounded-xl font-bold text-xl shadow-2xl transition-all ${
                      processing
                        ? "bg-gradient-to-r from-gray-500 to-gray-600"
                        : "bg-gradient-to-r from-[#213f74] to-blue-600 hover:shadow-3xl"
                    } text-white`}
                  >
                    {processing ? (
                      <div className="flex items-center justify-center gap-3">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1 }}
                          className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                        />
                        Обработка платежа...
                      </div>
                    ) : (
                      `Оплатить ${totalAmount?.toLocaleString() || "0"} ₽`
                    )}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Успешная оплата */}
            <AnimatePresence>
              {success && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white shadow-2xl"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="text-center mb-6"
                  >
                    <CheckCircleIcon className="text-6xl mb-4" />
                    <h2 className="text-3xl font-bold mb-2">Оплата успешно завершена!</h2>
                    <p className="text-green-100">
                      Ваш заказ №{Math.floor(Math.random() * 1000000)} подтвержден
                    </p>
                  </motion.div>

                  <div className="bg-white/20 rounded-xl p-6 mb-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-green-100">Сумма</div>
                        <div className="text-2xl font-bold">{totalAmount?.toLocaleString()} ₽</div>
                      </div>
                      <div>
                        <div className="text-sm text-green-100">Способ оплаты</div>
                        <div className="text-lg font-medium">
                          {method === "card" ? "Банковская карта" : 
                           method === "sbp" ? "СБП" : "Онлайн-банк"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => navigate("/")}
                      className="flex-1 py-3 bg-white text-green-600 rounded-xl font-bold hover:bg-green-50"
                    >
                      Вернуться в магазин
                    </button>
                    <button
                      onClick={generateInvoice}
                      className="flex-1 py-3 bg-green-700 text-white rounded-xl font-bold hover:bg-green-800 flex items-center justify-center gap-2"
                    >
                      <DownloadIcon />
                      Скачать чек
                    </button>
                    <button
                      onClick={() => {/* Поделиться */}}
                      className="flex-1 py-3 bg-green-800 text-white rounded-xl font-bold hover:bg-green-900 flex items-center justify-center gap-2"
                    >
                      <ShareIcon />
                      Поделиться
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Правая панель - информация */}
          <div className="lg:w-1/3 space-y-6">
            {/* Безопасность */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <SecurityIcon className="text-blue-600 text-2xl" />
                <h3 className="font-bold text-gray-900 dark:text-white">Безопасная оплата</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircleIcon className="text-green-500" fontSize="small" />
                  SSL шифрование данных
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircleIcon className="text-green-500" fontSize="small" />
                  PCI DSS сертификация
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircleIcon className="text-green-500" fontSize="small" />
                  Безопасность 3D Secure
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircleIcon className="text-green-500" fontSize="small" />
                  Гарантия возврата средств
                </li>
              </ul>
            </motion.div>

            {/* Поддержка */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-xl"
            >
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Нужна помощь?</h3>
              <div className="space-y-3">
                <button className="w-full py-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-600">
                  Онлайн-чат поддержки
                </button>
                <button className="w-full py-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-600">
                  Позвонить в поддержку
                </button>
                <button className="w-full py-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-600">
                  Частые вопросы (FAQ)
                </button>
              </div>
            </motion.div>

            {/* Контакты */}
            {userInfo && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 shadow-xl"
              >
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Контактная информация</h3>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Имя</div>
                  <div className="font-medium text-gray-900 dark:text-white">{userInfo.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Email</div>
                  <div className="font-medium text-gray-900 dark:text-white">{userInfo.email}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Телефон</div>
                  <div className="font-medium text-gray-900 dark:text-white">{userInfo.phone}</div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PaymentPage;