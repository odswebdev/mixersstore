import React from "react";
import { motion } from "framer-motion";
import Breadcrumb from "../components/Breadcrumb";
import Header from "../components/Header";
import Footer from "../components/Footer";

const OfferAgreement = () => {
  return (
    <div>
      <div className="w-full">
        <Header />
        <div className="max-w-[1300px] mx-auto px-4">
          <Breadcrumb
            items={[{ label: "Главная", href: "/" }, { label: "Каталог" }]}
          />
          <motion.h1
            className="text-4xl font-bold mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Договор оферты
          </motion.h1>

          <motion.section
            className="mb-12"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-semibold mb-4">1. Общие положения</h2>
            <p className="text-base leading-relaxed">
              1.1. Настоящий Договор является публичной офертой, составленной в
              соответствии с Гражданским Кодексом РФ.
            </p>
            <p className="text-base leading-relaxed">
              1.2. Оферта является обязательным и универсальным предложением для
              заключения договора купли-продажи между Продавцом и Покупателем.
            </p>
            <p className="text-base leading-relaxed">
              1.3. Акцепт оферты Покупателем является основанием для заключения
              договора между сторонами.
            </p>
          </motion.section>

          <motion.section
            className="mb-12"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-semibold mb-4">2. Предмет договора</h2>
            <p className="text-base leading-relaxed">
              2.1. Продавец обязуется передать Покупателю товар, а Покупатель
              обязуется оплатить и принять товар, в соответствии с условиями
              настоящего договора.
            </p>
            <p className="text-base leading-relaxed">
              2.2. Описание товара и его характеристики указаны на сайте
              Продавца.
            </p>
          </motion.section>

          <motion.section
            className="mb-12"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-semibold mb-4">
              3. Цена товара и порядок расчетов
            </h2>
            <p className="text-base leading-relaxed">
              3.1. Цена товара определяется в момент оформления заказа
              Покупателем на сайте Продавца.
            </p>
            <p className="text-base leading-relaxed">
              3.2. Оплата товара может быть произведена любым из предложенных
              способов оплаты на сайте.
            </p>
          </motion.section>

          <motion.section
            className="mb-12"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-semibold mb-4">
              4. Права и обязанности сторон
            </h2>
            <p className="text-base leading-relaxed">
              4.1. Продавец обязуется:
              <ul className="list-inside list-disc">
                <li>
                  предоставить Покупателю товар в соответствии с условиями
                  договора;
                </li>
                <li>
                  своевременно отправить товар согласно условиям доставки;
                </li>
                <li>соблюдать требования законодательства РФ.</li>
              </ul>
            </p>
            <p className="text-base leading-relaxed">
              4.2. Покупатель обязуется:
              <ul className="list-inside list-disc">
                <li>оплатить товар в полном объеме;</li>
                <li>принимать товар в соответствии с условиями доставки;</li>
                <li>
                  своевременно информировать Продавца о любых изменениях в
                  заказе.
                </li>
              </ul>
            </p>
          </motion.section>

          <motion.section
            className="mb-12"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-semibold mb-4">
              5. Ответственность сторон
            </h2>
            <p className="text-base leading-relaxed">
              5.1. Продавец несет ответственность за качество товара и его
              соответствие описанию на сайте.
            </p>
            <p className="text-base leading-relaxed">
              5.2. Покупатель несет ответственность за корректность указанных
              данных при оформлении заказа.
            </p>
          </motion.section>

          <motion.section
            className="mb-12"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-semibold mb-4">6. Прочие условия</h2>
            <p className="text-base leading-relaxed">
              6.1. Настоящий Договор вступает в силу с момента акцепта оферты
              Покупателем.
            </p>
            <p className="text-base leading-relaxed">
              6.2. Все изменения и дополнения к настоящему договору должны быть
              оформлены в письменной форме и подписаны обеими сторонами.
            </p>
          </motion.section>

          <motion.section
            className="mb-12"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-semibold mb-4">
              7. Заключительные положения
            </h2>
            <p className="text-base leading-relaxed">
              7.1. Данный договор составлен на русском языке и регулируется
              законодательством Российской Федерации.
            </p>
            <p className="text-base leading-relaxed">
              7.2. Все споры и разногласия, возникающие в процессе исполнения
              договора, решаются в соответствии с нормами гражданского
              законодательства РФ.
            </p>
          </motion.section>

          <div className="text-center mt-12">
            <p className="text-lg font-semibold">
              Если вы согласны с условиями данного Договора, нажмите кнопку ниже
              для завершения оформления заказа.
            </p>
            <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Принять условия
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default OfferAgreement;
