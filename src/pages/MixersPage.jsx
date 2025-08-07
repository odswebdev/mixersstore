import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios"; // Для работы с API

const MixersPage = () => {
  const [mixers, setMixers] = useState([]);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000], // Минимальная и максимальная цена
    brand: "",
    type: "",
  });

  // Получение смесителей через API
  useEffect(() => {
    axios
      .get("/api/mixers", { params: filters }) // Пример API запроса с фильтрами
      .then((response) => {
        setMixers(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при получении смесителей:", error);
      });
  }, [filters]);

  // Обработчик изменения фильтров
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Смесители
      </motion.h1>

      <motion.div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col lg:flex-row gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Фильтры */}
        <div className="w-full lg:w-1/4 space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Фильтры
          </h3>

          <div>
            <label className="block text-gray-700 dark:text-gray-300">
              Цена
            </label>
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={filters.priceRange[1]}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  priceRange: [filters.priceRange[0], e.target.value],
                })
              }
              className="w-full mt-2"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              До {filters.priceRange[1]} ₽
            </p>
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300">
              Бренд
            </label>
            <select
              name="brand"
              value={filters.brand}
              onChange={handleFilterChange}
              className="w-full p-2 mt-2 border rounded-md border-gray-300 dark:border-gray-600"
            >
              <option value="">Все бренды</option>
              <option value="brand1">Бренд 1</option>
              <option value="brand2">Бренд 2</option>
              <option value="brand3">Бренд 3</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300">
              Тип
            </label>
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="w-full p-2 mt-2 border rounded-md border-gray-300 dark:border-gray-600"
            >
              <option value="">Все типы</option>
              <option value="single">Однорычажный</option>
              <option value="double">Двухрычажный</option>
              <option value="thermostatic">Термостатический</option>
            </select>
          </div>
        </div>

        {/* Смесители */}
        <div className="w-full lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mixers.length > 0 ? (
            mixers.map((mixer, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-700 rounded-xl shadow-md overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={mixer.imageUrl}
                  alt={mixer.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {mixer.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {mixer.description}
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {mixer.price} ₽
                    </span>
                    <button className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Купить
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 w-full col-span-4">
              Нет смесителей для отображения.
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default MixersPage;
