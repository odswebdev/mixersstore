import React from "react";
import { motion } from "framer-motion";
import Breadcrumb from "../components/Breadcrumb";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CustomCheckboxSvg from "../components/CustomCheckboxSvg";

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
            class="text-[46px] font-[500] text-[#122952] mt-[25px] mb-[25px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Контакты
          </motion.h1>

          <div className="grid md:grid-cols-2 gap-10 mb-16">
            {/* Контактная информация */}
            <motion.div
              className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-gray-700 mb-4">
                Телефон для клиентов
              </h2>
              <p className="text-2xl text-gray-700 dark:text-gray-300 mb-2">
                <strong>8 800 700-28-20</strong>
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Бесплатная консультация
                <br />С понедельника по пятницу с 09:00 до 18:00 UTC +2
              </p>
              <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-[20px]">
                Адрес
              </h2>
              <p className="text-gray-700 dark:text-gray-300 underline mb-[20px]">
                236022 г. Калининград, Советский проспект 23
              </p>
              <p className="mb-[20px]">
                С понедельника по пятницу с 09:00 до 19:00 UTC +2
                <br />
                Суббота с 10:00 до 18:00 UTC +2
                <br />
                Воскресенье с 11:00 до 17:00 UTC +2
              </p>
              <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-[20px]">
                Реквизиты компании
              </h2>
              <p className="mb-[20px]">
                ООО «ТЕПЛОКОЛОР»
                <br />
                ИНН 3906379129 КПП 390601001
                <br />
                ОГРН 1193926004898
                <br />
                Юр.адрес: 236023 г. Калининград, ул. Осетинская 20
                <br />
                Факт. Адрес: 236022 г. Калининград, Советский проспект 23
                <br />
                Расчетный счет 40702810510500001577
                <br />
                В ООО «Банк Точка»
                <br />
                КОР/СЧЕТ 30101810745374525104
                <br />
                БИК 044525104
                <br />
                телефон +7 800 700 28 20
                <br />
                Генеральный директор Крот Андрей Анатольевич
              </p>
            </motion.div>

            {/* Форма обратной связи */}
            <motion.form
              className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              onSubmit={(e) => {
                e.preventDefault();
                alert("Форма отправлена!");
              }}
            >
              <h2 className="text-2xl font-bold text-gray-700 mb-[20px]">
                Остались вопросы?
              </h2>
              <p className="mb-[20px]">
                Заполните форму, мы свяжемся с вами в ближайшее время, ответим
                на все вопросы и предоставим консультацию по ассортименту.
              </p>
              <div className="flex gap-[10px]">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  required
                  className="w-full p-3 mb-4 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Почта"
                  required
                  className="w-full p-3 mb-4 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none"
                />
              </div>
              <input
                type="text"
                placeholder="Тема сообщения"
                required
                className="w-full p-3 mb-4 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none"
              />
              <textarea
                placeholder="Ваше сообщение"
                required
                className="w-full p-3 mb-4 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none h-32 resize-none"
              />

              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Задать вопрос
              </button>

              <div className="flex">
                <CustomCheckboxSvg
                  label="Отправляя данные, Вы соглашаетесь с политикой обработки персональных данных."
                  onChange={(val) => console.log("checked:", val)}
                />
              </div>

            </motion.form>
          </div>

          {/* Карта */}
          <motion.div
            className="overflow-hidden rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 mb-[50px]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A6cd42a5a13339a2808bcfbef4eef965b3bb7b2b9c848f604915070a169b59694&amp;source=constructor"
              width="100%"
              height="400"
              frameborder="0"
            ></iframe>
          </motion.div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Contacts;
