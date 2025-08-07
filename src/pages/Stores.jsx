import React, { useState } from "react";
import { motion } from "framer-motion";
import Breadcrumb from "../components/Breadcrumb";
import Header from "../components/Header";
import Footer from "../components/Footer";

const stores = [
  {
    city: "Москва",
    address: "ул. Арбат, д. 25, ТЦ 'Интерьер-Сити'",
    phone: "+7 (495) 123-45-67",
    hours: "Пн–Сб: 10:00–20:00",
    mapLink: "https://yandex.ru/maps/?text=ул. Арбат, д. 25, Москва",
  },
  {
    city: "Санкт-Петербург",
    address: "Невский пр., д. 140, 2 этаж",
    phone: "+7 (812) 987-65-43",
    hours: "Пн–Сб: 10:00–21:00",
    mapLink:
      "https://yandex.ru/maps/?text=Невский пр., д. 140, Санкт-Петербург",
  },
  {
    city: "Екатеринбург",
    address: "ул. Малышева, д. 10, ТЦ 'Дом'",
    phone: "+7 (343) 555-12-34",
    hours: "Пн–Пт: 9:00–19:00",
    mapLink: "https://yandex.ru/maps/?text=ул. Малышева, д. 10, Екатеринбург",
  },
  {
    city: "Новосибирск",
    address: "Красный проспект, д. 50, пав. 18",
    phone: "+7 (383) 333-22-11",
    hours: "Пн–Сб: 10:00–18:00",
    mapLink:
      "https://yandex.ru/maps/?text=Красный проспект, д. 50, Новосибирск",
  },
];

const uniqueCities = [...new Set(stores.map((store) => store.city))];

const Stores = () => {
  const [selectedCity, setSelectedCity] = useState("Все");

  const filteredStores =
    selectedCity === "Все"
      ? stores
      : stores.filter((store) => store.city === selectedCity);

  return (
    <div>
      <div className="w-full">
        <Header />
        <div className="max-w-[1300px] mx-auto px-4">
          <Breadcrumb
            items={[{ label: "Главная", href: "/" }, { label: "Акции" }]}
          />
          <motion.h1
            className="text-4xl font-bold text-center mb-10 text-gray-800 dark:text-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Наши магазины
          </motion.h1>

          {/* Фильтр по городам */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <button
              onClick={() => setSelectedCity("Все")}
              className={`px-4 py-2 rounded-full border font-medium transition ${
                selectedCity === "Все"
                  ? "bg-blue-600 text-white"
                  : "border-gray-300 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-800"
              }`}
            >
              Все
            </button>
            {uniqueCities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-4 py-2 rounded-full border font-medium transition ${
                  selectedCity === city
                    ? "bg-blue-600 text-white"
                    : "border-gray-300 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-800"
                }`}
              >
                {city}
              </button>
            ))}
          </div>

          {/* Карточки магазинов */}
          <div className="grid gap-8 md:grid-cols-2">
            {filteredStores.map((store, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <h2 className="text-2xl font-semibold mb-2 text-blue-600 dark:text-blue-400">
                  {store.city}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-1">
                  <strong>Адрес:</strong> {store.address}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-1">
                  <strong>Телефон:</strong> {store.phone}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  <strong>Часы работы:</strong> {store.hours}
                </p>
                <a
                  href={store.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                >
                  Как добраться
                </a>
              </motion.div>
            ))}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Stores;
