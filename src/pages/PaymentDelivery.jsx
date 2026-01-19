import React from "react";
import { motion } from "framer-motion";
import Breadcrumb from "../components/Breadcrumb";
import Header from "../components/Header";
import Footer from "../components/Footer";
//import deliveryImage from "../assets/delivery-image.jpg";
//import paymentIcon from "../assets/payment-icon.svg";
//import deliveryIcon from "../assets/delivery-icon.svg";

const PaymentDelivery = () => {
  return (
    <div>
      <div className="w-full">
        <Header />
        <div className="max-w-[1300px] mx-auto px-4">
          <Breadcrumb
            items={[
              { label: "Главная", href: "/" }, 
              { label: "Оплата и доставка" }
            ]}
          />
          
          <motion.h1
            className="text-[46px] font-[500] text-[#122952] mt-[25px] mb-[10px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            Оплата и доставка
          </motion.h1>

          <motion.section
            className="mb-[40px] text-lg leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <p className="mb-6">
              <strong>
                Мы предлагаем удобные и безопасные способы оплаты, а также 
                надежную доставку по всей России. Вы можете выбрать наиболее 
                подходящий для вас вариант.
              </strong>
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <motion.div 
                className="bg-gray-50 p-6 rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center mb-4">
                  <h2 className="text-2xl font-semibold text-[#122952]">
                    Способы оплаты
                  </h2>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded border-l-4 border-blue-500">
                    <h3 className="font-bold text-lg mb-2">💳 Онлайн-оплата</h3>
                    <p>Банковской картой Visa, Mastercard, Мир через защищенное соединение</p>
                  </div>
                  
                  <div className="p-4 bg-white rounded border-l-4 border-green-500">
                    <h3 className="font-bold text-lg mb-2">🏦 Безналичный расчет</h3>
                    <p>Для юридических лиц с выставлением счета</p>
                  </div>
                  
                  <div className="p-4 bg-white rounded border-l-4 border-yellow-500">
                    <h3 className="font-bold text-lg mb-2">💰 При получении</h3>
                    <p>Наличными или картой курьеру (доступно не для всех регионов)</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="bg-gray-50 p-6 rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center mb-4">
                  <h2 className="text-2xl font-semibold text-[#122952]">
                    Варианты доставки
                  </h2>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded border-l-4 border-red-500">
                    <h3 className="font-bold text-lg mb-2">🚚 Курьерская доставка</h3>
                    <p>По Москве и области — 1-2 рабочих дня</p>
                    <p className="text-sm text-gray-600">Стоимость: от 350 ₽</p>
                  </div>
                  
                  <div className="p-4 bg-white rounded border-l-4 border-purple-500">
                    <h3 className="font-bold text-lg mb-2">📦 Транспортные компании</h3>
                    <p>СДЭК, Деловые Линии, ПЭК по всей России</p>
                    <p className="text-sm text-gray-600">Срок: 3-7 дней</p>
                  </div>
                  
                  <div className="p-4 bg-white rounded border-l-4 border-teal-500">
                    <h3 className="font-bold text-lg mb-2">🏪 Самовывоз</h3>
                    <p>Из наших пунктов выдачи в Москве и Санкт-Петербурге</p>
                    <p className="text-sm text-gray-600">Бесплатно</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>

          <motion.section
            className="flex flex-col lg:flex-row gap-8 mb-[25px]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            <div className="lg:w-1/2">
             
            </div>

            <div className="lg:w-1/2">
              <h2 className="text-2xl font-bold text-[#122952] mb-6">
                Условия доставки
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 border rounded-lg hover:bg-blue-50 transition-colors">
                  <h3 className="font-bold text-lg mb-2 flex items-center">
                    <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-2 text-sm">1</span>
                    Сроки доставки
                  </h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Москва и МО: 1-2 рабочих дня</li>
                    <li>Регионы РФ: 3-10 рабочих дней</li>
                    <li>Срочная доставка: обсуждается индивидуально</li>
                  </ul>
                </div>
                
                <div className="p-4 border rounded-lg hover:bg-green-50 transition-colors">
                  <h3 className="font-bold text-lg mb-2 flex items-center">
                    <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center mr-2 text-sm">2</span>
                    Стоимость доставки
                  </h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Бесплатно при заказе от 15 000 ₽</li>
                    <li>Москва: от 350 ₽</li>
                    <li>Регионы: рассчитывается индивидуально</li>
                  </ul>
                </div>
                
                <div className="p-4 border rounded-lg hover:bg-yellow-50 transition-colors">
                  <h3 className="font-bold text-lg mb-2 flex items-center">
                    <span className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center mr-2 text-sm">3</span>
                    Дополнительные услуги
                  </h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Подъем на этаж: от 200 ₽</li>
                    <li>Сборка мебели: услуги монтажников</li>
                    <li>Упаковка для перевозки: бесплатно</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            className="mb-[50px]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            <h2 className="text-2xl font-bold text-[#122952] mb-6">
              Часто задаваемые вопросы
            </h2>
            
            <div className="space-y-4">
              <details className="group border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <summary className="font-bold cursor-pointer list-none">
                  Как отследить мой заказ?
                </summary>
                <p className="mt-2 text-gray-700">
                  После отправки заказа мы вышлем вам трек-номер для отслеживания 
                  на указанную почту. Также вы можете отслеживать статус заказа 
                  в личном кабинете.
                </p>
              </details>
              
              <details className="group border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <summary className="font-bold cursor-pointer list-none">
                  Можно ли изменить адрес доставки?
                </summary>
                <p className="mt-2 text-gray-700">
                  Да, вы можете изменить адрес доставки до момента отправки заказа. 
                  Свяжитесь с нашим менеджером по телефону или через онлайн-чат.
                </p>
              </details>
              
              <details className="group border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <summary className="font-bold cursor-pointer list-none">
                  Что делать, если товар поврежден?
                </summary>
                <p className="mt-2 text-gray-700">
                  В случае повреждения товара при доставке откажитесь от получения 
                  и сразу свяжитесь с нами. Мы отправим замену бесплатно.
                </p>
              </details>
              
              <details className="group border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <summary className="font-bold cursor-pointer list-none">
                  Есть ли доставка в выходные дни?
                </summary>
                <p className="mt-2 text-gray-700">
                  Да, мы осуществляем доставку по субботам. Воскресенье — выходной день.
                </p>
              </details>
            </div>
          </motion.section>

          <motion.div
            className="bg-blue-50 p-6 rounded-lg mb-[50px] text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <h3 className="text-xl font-bold text-[#122952] mb-3">
              Остались вопросы?
            </h3>
            <p className="mb-4">
              Наши менеджеры готовы помочь вам с выбором способа оплаты и доставки
            </p>
            <button className="bg-[#122952] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Связаться с нами
            </button>
          </motion.div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default PaymentDelivery;