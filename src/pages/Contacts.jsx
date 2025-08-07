import React from "react";
import { motion } from "framer-motion";
import Breadcrumb from "../components/Breadcrumb";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Contacts = () => {
  return (
    <div>
      <div className="w-full">
        <Header />
        <div className="max-w-[1300px] mx-auto px-4">
          <Breadcrumb
            items={[{ label: "Главная", href: "/" }, { label: "Контакты" }]}
          />
          <motion.h1
            className="text-4xl font-bold text-center mb-10 text-gray-800 dark:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Контакты
          </motion.h1>

          <div className="grid md:grid-cols-2 gap-10 mb-16">
            {/* Контактная информация */}
            <motion.div
              className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
                Свяжитесь с нами
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <strong>Телефон:</strong> +7 (800) 555-35-35
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <strong>Email:</strong> info@demm.ru
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <strong>Адрес:</strong> ул. Примерная, д. 10, Москва
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Время работы:</strong> Пн–Сб: 10:00–20:00
              </p>
            </motion.div>

            {/* Форма обратной связи */}
            <motion.form
              className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              onSubmit={(e) => {
                e.preventDefault();
                alert("Форма отправлена!");
              }}
            >
              <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
                Обратная связь
              </h2>
              <input
                type="text"
                placeholder="Ваше имя"
                required
                className="w-full p-3 mb-4 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                required
                className="w-full p-3 mb-4 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none"
              />
              <textarea
                placeholder="Сообщение"
                required
                className="w-full p-3 mb-4 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none h-32 resize-none"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Отправить
              </button>
            </motion.form>
          </div>

          {/* Карта */}
          <motion.div
            className="overflow-hidden rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A0f030b19075b3c90c80bc4c1c184658f203c0a6cf3bbd34b7de1b9e340adf4d4&amp;source=constructor"
              width="100%"
              height="400"
              frameBorder="0"
              allowFullScreen
              title="Карта магазина"
              className="w-full h-[400px]"
            />
          </motion.div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Contacts;
