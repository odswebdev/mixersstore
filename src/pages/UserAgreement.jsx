import React from "react";
import { motion } from "framer-motion";
import Breadcrumb from "../components/Breadcrumb";
import Header from "../components/Header";
import Footer from "../components/Footer";

const UserAgreement = () => {
  return (
    <div>
      <div className="w-full">
        <Header />
        <div className="max-w-[1300px] mx-auto px-4">
          <Breadcrumb
            items={[{ label: "Главная", href: "/" }, { label: "Каталог" }]}
          />
          <motion.h1
            className="text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Пользовательское соглашение
          </motion.h1>

          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 space-y-6 text-gray-800 dark:text-gray-300 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p>
              Настоящее Пользовательское соглашение (далее — «Соглашение»)
              регулирует отношения между компанией <strong>Demm</strong>,
              расположенной в Италии, осуществляющей продажи через
              интернет-магазин, и пользователем сайта demm.ru.
            </p>

            <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
              1. Общие положения
            </h2>
            <p>
              Используя сайт, вы соглашаетесь соблюдать условия данного
              Соглашения. Если вы не согласны с условиями — пожалуйста, не
              используйте сайт.
            </p>

            <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
              2. Права и обязанности сторон
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Пользователь обязуется предоставлять достоверную информацию при
                оформлении заказов.
              </li>
              <li>
                Администрация сайта имеет право изменять структуру, содержимое и
                условия работы сайта без предварительного уведомления.
              </li>
              <li>
                Компания Demm обязуется защищать персональные данные
                пользователей согласно законодательству РФ.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
              3. Интеллектуальная собственность
            </h2>
            <p>
              Весь контент сайта (изображения, тексты, логотипы, дизайн)
              принадлежит компании Demm и защищён авторским правом. Любое
              копирование без согласия запрещено.
            </p>

            <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
              4. Ответственность
            </h2>
            <p>
              Компания не несёт ответственности за возможные убытки, возникшие в
              результате использования сайта, включая действия третьих лиц.
            </p>

            <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
              5. Заключительные положения
            </h2>
            <p>
              Настоящее Соглашение может быть изменено в любое время. Актуальная
              версия всегда доступна на сайте. Использование сайта после
              изменений означает согласие с новыми условиями.
            </p>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Обновлено: 15 апреля 2025 года
            </p>
          </motion.div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default UserAgreement;
