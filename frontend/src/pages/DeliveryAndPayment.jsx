import React, { useState } from "react";
import { motion } from "framer-motion";
import Breadcrumb from "../components/Breadcrumb";
import Header from "../components/Header";
import Footer from "../components/Footer";

const DeliveryAndPayment = () => {
  return (
    <div>
      <Header />
      <div className="max-w-[1300px] mx-auto px-4">
        <Breadcrumb
          items={[
            { label: "Главная", href: "/" },
            { label: "Оплата и доставка" },
          ]}
        />

        <motion.h1
          class="text-[46px] font-[500] text-[#122952] mt-[25px] mb-[10px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Оплата и доставка
        </motion.h1>

        <section className="mb-12">
          <p className="mb-[10px]">
            <strong>
              Стоимость доставки рассчитывается индивидуально, после
              формирования заказа
            </strong>
          </p>
          <p>
            Если у вас возникли вопросы относительно доставки и оплаты,
            обращайтесь в нашу службу поддержки клиентов: 8 800 700 28 20
            <br />С понедельника по пятницу с 09:00 до 18:00 UTC +2
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default DeliveryAndPayment;
