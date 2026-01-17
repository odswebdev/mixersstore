import React, { useState } from "react";
import { motion } from "framer-motion";
import Breadcrumb from "../components/Breadcrumb";
import Header from "../components/Header";
import Footer from "../components/Footer";

const stores = [
  {
    city: "Калининград",
    address: "236022 г. Калининград, Советский проспект 23",
    phone: "+7 (495) 123-45-67",
    hours: "Пн–Пт: 09:00–19:00",
    mapLink:
      "https://yandex.ru/maps/?text=ул. Советский проспект, д. 23, Калининград",
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
            items={[{ label: "Главная", href: "/" }, { label: "Магазины" }]}
          />
          <motion.h1
            class="text-[46px] font-[500] text-[#122952] mt-[25px] mb-[10px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Наши магазины
          </motion.h1>

          {/* Фильтр по городам */}
          <div className="flex flex-wrap gap-4 mb-10">
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
          <div className="grid gap-8 md:grid-cols-2 mb-[50px]">
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
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Stores;
