import React from "react";
import { motion } from "framer-motion";
import Breadcrumb from "../components/Breadcrumb";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";

export const promotions = [
  {
    id: 1,
    title: "Скидка 20% на душевые системы",
    slug: "promo1",
    description:
      "Только до конца месяца! Получите скидку 20% на эксклюзивные душевые системы.",
    date: "до 30 апреля 2025",
    image: banner1,
  },
  {
    id: 2,
    title: "Подарок при покупке от 10 000 ₽",
    slug: "promo2",
    description:
      "Каждому покупателю при заказе от 10 000 ₽ — фирменный аксессуар Demm в подарок.",
    date: "до 15 мая 2025",
    image: banner2,
  },
  {
    id: 3,
    slug: "promo3",
    title: "Весенняя распродажа",
    description: "Скидки до 30% на популярные модели смесителей и изливов.",
    date: "до 10 мая 2025",
    image: banner3,
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
            class="text-[46px] font-[500] text-[#122952] mt-[25px] mb-[10px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Акции
          </motion.h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-[50px]">
            {promotions.map((promo, index) => (
              <Link to={`/promotions/${promo.slug}`} key={promo.id}>
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
              </Link>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Promotions;
