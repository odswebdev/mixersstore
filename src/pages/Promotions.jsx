import React from "react";
import { motion } from "framer-motion";
import Breadcrumb from "../components/Breadcrumb";
import Header from "../components/Header";
import Footer from "../components/Footer";

const promotions = [
  {
    id: 1,
    title: "Скидка 20% на душевые системы",
    description:
      "Только до конца месяца! Получите скидку 20% на эксклюзивные душевые системы Demm.",
    date: "до 30 апреля 2025",
    image: "https://source.unsplash.com/800x600/?shower,luxury",
  },
  {
    id: 2,
    title: "Подарок при покупке от 10 000 ₽",
    description:
      "Каждому покупателю при заказе от 10 000 ₽ — фирменный аксессуар Demm в подарок.",
    date: "до 15 мая 2025",
    image: "https://source.unsplash.com/800x600/?bathroom,accessories",
  },
  {
    id: 3,
    title: "Весенняя распродажа",
    description:
      "Скидки до 30% на популярные модели смесителей и изливов. Успей купить по лучшей цене!",
    date: "до 10 мая 2025",
    image: "https://source.unsplash.com/800x600/?faucet,modern",
  },
];

const Promotions = () => {
  return (
    <div>
      <div className="w-full">
        <Header />
        <div className="max-w-[1300px] mx-auto px-4">
          <Breadcrumb
            items={[{ label: "Главная", href: "/" }, { label: "Акции" }]}
          />
          <motion.h1
            className="text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Акции и спецпредложения
          </motion.h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {promotions.map((promo, index) => (
              <motion.div
                key={promo.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <img
                  src={promo.image}
                  alt={promo.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5 flex flex-col justify-between h-full">
                  <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
                    {promo.title}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {promo.description}
                  </p>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Действует {promo.date}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Promotions;
