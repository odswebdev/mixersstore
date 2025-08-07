import React, { useState } from "react";
import {
  Sun,
  Moon,
  CheckCircle,
  Truck,
  CreditCard,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";
import Breadcrumb from "../components/Breadcrumb";
import Header from "../components/Header";
import Footer from "../components/Footer";

const DeliveryAndPayment = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div>
      <div className="w-full">
        <Header />
        <div
          className={`max-w-[1300px] mx-auto px-4 py-10 text-gray-800 ${
            darkMode ? "bg-gray-900 text-gray-100" : "bg-white"
          }`}
        >
          <Breadcrumb
            items={[
              { label: "Главная", href: "/" },
              { label: "Оплата и доставка" },
            ]}
          />
          <div className="flex justify-end mb-6">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
            >
              {darkMode ? (
                <Sun size={24} className="text-yellow-400" />
              ) : (
                <Moon size={24} className="text-blue-600" />
              )}
            </button>
          </div>

          <motion.h1
            className="text-4xl font-bold mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Доставка и оплата
          </motion.h1>

          <section className="mb-12">
            <motion.h2
              className="text-2xl font-semibold mb-4"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Условия доставки
            </motion.h2>
            <ul className="space-y-4 text-base leading-relaxed">
              <motion.li
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Truck size={20} className="inline mr-2 text-blue-600" />
                <span className="font-semibold">Курьерская доставка:</span> по
                городу — от 1 до 3 рабочих дней.
              </motion.li>
              <motion.li
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Truck size={20} className="inline mr-2 text-blue-600" />
                <span className="font-semibold">Почтовая доставка:</span>{" "}
                отправка по всей стране через почту или транспортные компании
                (СДЭК, Boxberry).
              </motion.li>
              <motion.li
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Truck size={20} className="inline mr-2 text-blue-600" />
                <span className="font-semibold">Самовывоз:</span> возможен из
                нашего офиса по предварительной договоренности.
              </motion.li>
            </ul>
          </section>

          <section className="mb-12">
            <motion.h2
              className="text-2xl font-semibold mb-4"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Стоимость доставки
            </motion.h2>
            <p className="text-base leading-relaxed">
              Стоимость доставки зависит от региона и способа доставки. При
              оформлении заказа вам будет предложен расчет стоимости.
            </p>
          </section>

          <section className="mb-12">
            <motion.h2
              className="text-2xl font-semibold mb-4"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Способы оплаты
            </motion.h2>
            <ul className="space-y-4 text-base leading-relaxed">
              <motion.li
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <CreditCard size={20} className="inline mr-2 text-green-500" />
                <span className="font-semibold">Банковская карта:</span> Visa,
                MasterCard, МИР.
              </motion.li>
              <motion.li
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <FileText size={20} className="inline mr-2 text-orange-500" />
                <span className="font-semibold">Безналичный расчет:</span> для
                юридических лиц с выставлением счета.
              </motion.li>
              <motion.li
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <CheckCircle size={20} className="inline mr-2 text-green-600" />
                <span className="font-semibold">Наличные:</span> при самовывозе
                или курьерской доставке.
              </motion.li>
            </ul>
          </section>

          <section className="mb-6">
            <motion.h2
              className="text-2xl font-semibold mb-4"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Дополнительная информация
            </motion.h2>
            <p className="text-base leading-relaxed">
              После оформления заказа наш менеджер свяжется с вами для уточнения
              деталей доставки и оплаты. Если у вас есть вопросы, пожалуйста,
              свяжитесь с нами через форму обратной связи или по телефону.
            </p>
          </section>

          <section className="mb-12">
            <motion.h2
              className="text-2xl font-semibold mb-4"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              FAQ - Часто задаваемые вопросы
            </motion.h2>
            <ul className="space-y-4">
              <motion.li
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <span className="font-semibold">
                  Какие способы оплаты доступны?
                </span>{" "}
                Вы можете оплатить заказ картой, безналичным расчетом или
                наличными при самовывозе.
              </motion.li>
              <motion.li
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <span className="font-semibold">
                  Как долго длится доставка?
                </span>{" "}
                Обычно доставка занимает от 1 до 3 рабочих дней в пределах
                города.
              </motion.li>
              <motion.li
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <span className="font-semibold">
                  Могу ли я выбрать самовывоз?
                </span>{" "}
                Да, самовывоз возможен из нашего офиса, предварительно
                согласовав время.
              </motion.li>
            </ul>
          </section>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DeliveryAndPayment;
