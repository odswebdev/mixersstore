import React from "react";
import { motion } from "framer-motion";
import Breadcrumb from "../components/Breadcrumb";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Promotion = () => {
  const promo = {
    title: "Скидка 20% на душевые системы",
    description:
      "Только до конца месяца! Получите скидку 20% на эксклюзивные душевые системы Demm. Идеальное сочетание дизайна и качества от итальянского бренда. Акция действует во всех филиалах и в интернет-магазине.",
    date: "Акция действует до 30 апреля 2025 года",
    image: "https://source.unsplash.com/1000x600/?shower,luxury",
  };

  return (
    <div>
      <div className="w-full">
        <Header />
        <div className="max-w-[1300px] mx-auto px-4">
          <Breadcrumb
            items={[
              { label: "Главная", href: "/" },
              { label: "Политика конфиденциальности" },
            ]}
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            <img
              src={promo.image}
              alt="Акция"
              className="w-full h-64 object-cover"
            />

            <div className="p-6 space-y-4">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {promo.title}
              </h1>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                {promo.description}
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                {promo.date}
              </p>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Promotion;
