import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Логотипы карт
const getCardLogo = (number) => {
  if (/^4/.test(number)) return "Visa";
  if (/^5[1-5]/.test(number)) return "MasterCard";
  if (/^2/.test(number)) return "MIR";
  return null;
};

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalAmount, payment } = location.state || {};

  const [method, setMethod] = useState(payment || "card"); // card, sbp, gpay
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [focusCVC, setFocusCVC] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [shake, setShake] = useState(false);
  const [maskNumber, setMaskNumber] = useState(false);

  // Подсветка и мигание цифр
  const formattedNumberArray = cardNumber
    .replace(/\D/g, "")
    .padEnd(16, "#")
    .split("");

  const handlePay = () => {
    if (method === "card") {
      const number = cardNumber.replace(/\s/g, "");
      if (number.length !== 16) {
        triggerError("Введите корректный номер карты");
        return;
      }
      if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        triggerError("Введите корректный срок действия");
        return;
      }
      if (!/^\d{3,4}$/.test(cvc)) {
        triggerError("Введите корректный CVC");
        return;
      }
    }

    setError("");
    setSuccess(true);
    setMaskNumber(true);

    setTimeout(() => {
      navigate("/");
    }, 3500);
  };

  const triggerError = (msg) => {
    setError(msg);
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const formatCardNumberDisplay = (arr) =>
    arr
      .map((digit, index) => (
        <motion.span
          key={index}
          animate={{
            opacity: digit === "#" ? 0.4 : 1,
            scale: digit === "#" ? 1 : [1, 1.1, 1],
          }}
          transition={{ repeat: digit === "#" ? 0 : 1, duration: 0.3 }}
          className={`transition-colors duration-200 ${
            cardNumber.replace(/\s/g, "").length > index
              ? "text-white font-bold"
              : "text-gray-400"
          }`}
        >
          {maskNumber && index < 12 ? "*" : digit}
        </motion.span>
      ))
      .reduce(
        (prev, curr, i) =>
          i % 4 === 3 ? [...prev, curr, " "] : [...prev, curr],
        []
      );

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <div className="max-w-[900px] mx-auto px-4 py-12 flex flex-col gap-6">
        <motion.h1
          className="text-4xl font-bold dark:text-white"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Оплата заказа
        </motion.h1>

        {/* Выбор метода оплаты */}
        <div className="flex gap-4">
          {["card", "sbp", "gpay"].map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className={`px-4 py-2 rounded-full font-medium ${
                method === m
                  ? "bg-[#213f74] text-white"
                  : "bg-gray-200 dark:bg-gray-700 dark:text-white"
              }`}
            >
              {m === "card" ? "Карта" : m === "sbp" ? "СБП" : "Google Pay"}
            </button>
          ))}
        </div>

        <AnimatePresence>
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-green-500 text-white p-6 rounded-lg text-center text-xl font-semibold shadow-lg relative overflow-hidden"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-2 left-2 text-3xl"
              >
                ✔
              </motion.div>
              Спасибо! Ваш заказ успешно оформлен.
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col gap-6 ${
                shake ? "animate-shake" : ""
              }`}
            >
              {method === "card" && (
                <>
                  {/* Анимированная карта */}
                  <motion.div
                    className="relative w-full h-[200px] rounded-xl perspective"
                    animate={{ rotateY: focusCVC ? 180 : 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    {/* Передняя сторона */}
                    <motion.div className="absolute w-full h-full rounded-xl backface-hidden bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white shadow-lg flex flex-col justify-between">
                      <div className="flex justify-between items-center mb-8">
                        <div className="text-lg tracking-widest flex flex-wrap">
                          {formatCardNumberDisplay(formattedNumberArray)}
                        </div>
                        <div>{getCardLogo(cardNumber.replace(/\s/g, ""))}</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>{expiry || "MM/YY"}</span>
                        <span>CVC</span>
                      </div>
                    </motion.div>

                    {/* Задняя сторона */}
                    <motion.div className="absolute w-full h-full rounded-xl backface-hidden rotateY-180 bg-gradient-to-r from-gray-700 to-gray-900 p-6 shadow-lg">
                      <div className="h-12 bg-black rounded mb-8"></div>
                      <div className="flex justify-end">
                        <div
                          className={`w-[60px] h-8 rounded text-white flex items-center justify-center transition-all duration-300 ${
                            cvc ? "bg-green-500 font-bold" : "bg-gray-500"
                          }`}
                        >
                          {cvc || "CVC"}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>

                  <input
                    type="text"
                    placeholder="Номер карты"
                    value={cardNumber}
                    maxLength={19}
                    onChange={(e) =>
                      setCardNumber(
                        e.target.value
                          .replace(/\D/g, "")
                          .replace(/(.{4})/g, "$1 ")
                          .trim()
                      )
                    }
                    className="p-3 border rounded dark:bg-gray-700 dark:text-white"
                    onFocus={() => setFocusCVC(false)}
                  />
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={expiry}
                      maxLength={5}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="p-3 border rounded dark:bg-gray-700 dark:text-white flex-1"
                      onFocus={() => setFocusCVC(false)}
                    />
                    <input
                      type="text"
                      placeholder="CVC"
                      value={cvc}
                      maxLength={4}
                      onChange={(e) => setCvc(e.target.value)}
                      className="p-3 border rounded dark:bg-gray-700 dark:text-white w-[100px]"
                      onFocus={() => setFocusCVC(true)}
                    />
                  </div>
                </>
              )}

              {method === "sbp" && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center dark:text-white">
                  Оплата через СБП. После нажатия вы перейдете в приложение
                  банка.
                </div>
              )}

              {method === "gpay" && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center dark:text-white">
                  Оплата через Google Pay.
                </div>
              )}

              {error && (
                <div className="text-red-500 text-sm font-medium">{error}</div>
              )}

              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                className="mt-4 w-full py-3 bg-[#213f74] text-white rounded-full font-medium"
                onClick={handlePay}
              >
                Оплатить {totalAmount} ₽
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentPage;
