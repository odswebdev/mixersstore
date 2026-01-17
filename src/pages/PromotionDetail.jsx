import React from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import { motion } from "framer-motion";

import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";

import { promotions } from "../pages/Promotions";

const PromotionDetail = () => {
  const { slug } = useParams();
  const promo = promotions.find((p) => p.slug === slug);

  if (!promo) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-semibold">Акция не найдена</h2>
        <Link to="/promotions" className="text-blue-600 underline">
          Вернуться к списку акций
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="max-w-[1300px] mx-auto px-4">
        <Breadcrumb
          items={[
            { label: "Главная", href: "/" },
            { label: "Акции", href: "/promotions" },
            { label: promo.title },
          ]}
        />

        <motion.h1
          className="text-[36px] font-[600] text-[#122952] mt-[25px] mb-[20px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {promo.title}
        </motion.h1>

        <img
          src={promo.image}
          alt={promo.title}
          className="w-full h-[400px] object-cover rounded-2xl shadow-lg mb-6"
        />

        <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
          {promo.description}
        </p>

        <span className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-6">
          Действует {promo.date}
        </span>

        <Link
          to="/promotions"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition mb-[60px]"
        >
          Назад к акциям
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default PromotionDetail;
