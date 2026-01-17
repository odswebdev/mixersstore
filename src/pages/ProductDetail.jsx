import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumb from "../components/Breadcrumb";
import Header from "../components/Header";
import Footer from "../components/Footer";
import QuickOrderModal from "../components/QuickOrderModal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { products } from "../data/products";
import { useCart } from "../context/CartContext.jsx";

const ProductDetail = () => {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [showQuickOrder, setShowQuickOrder] = useState(false);
  const [notification, setNotification] = useState(null);
  const { addToCart } = useCart();

  if (!product) {
    return <div className="text-center py-20">Товар не найден</div>;
  }

  const features = [
    ["Коллекция", product.collection],
    ["Стиль", product.style],
    ["Вид", product.view],
    ["Тип монтажа", product.mountingType],
    ["Управление", product.management],
    ["Количество источников", product.numberSource],
  ];

  const collectionItems = [
    { id: 1, img: "../src/assets/smes-acearium.png", title: "Коллекция 1" },
    { id: 2, img: "../src/assets/smes-acearium.png", title: "Коллекция 2" },
    { id: 3, img: "../src/assets/smes-acearium.png", title: "Коллекция 3" },
    { id: 4, img: "../src/assets/smes-acearium.png", title: "Коллекция 4" },
    { id: 5, img: "../src/assets/smes-acearium.png", title: "Коллекция 5" },
  ];

  const additionalItems = [
    { id: 1, img: "../src/assets/stworki.png", title: "Дополнение 1" },
    { id: 2, img: "../src/assets/stworki.png", title: "Дополнение 2" },
    { id: 3, img: "../src/assets/stworki.png", title: "Дополнение 3" },
    { id: 4, img: "../src/assets/stworki.png", title: "Дополнение 4" },
    { id: 5, img: "../src/assets/stworki.png", title: "Дополнение 5" },
  ];

  // Обработчик добавления в корзину
  const handleAddToCart = () => {
    addToCart(product);
    showNotification(`${product.name} добавлен в корзину!`);
  };

  // Обработчик "Купить в 1 клик"
  const handleQuickOrder = () => {
    setShowQuickOrder(true);
  };

  // Обработчик отправки формы быстрого заказа
  const handleQuickOrderSubmit = (formData) => {
    console.log("Быстрый заказ:", {
      product,
      customer: formData,
      date: new Date().toISOString()
    });
    
    // Здесь можно добавить отправку на сервер
    showNotification("Заказ оформлен! Мы свяжемся с вами в ближайшее время.");
    setShowQuickOrder(false);
    
    // Можно также добавить товар в корзину
    addToCart(product);
  };

  // Показ уведомления
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div>
      <Header />
      <div className="max-w-[1300px] mx-auto px-4 pb-[80px]">
        <Breadcrumb
          items={[
            { label: "Главная", href: "/" },
            { label: "Каталог", href: "/catalog" },
            { label: "Смесители", href: "/catalog/mixers" },
            { label: product.name },
          ]}
        />

        {/* Уведомление */}
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 z-50 bg-[#213F74] text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{notification}</span>
          </motion.div>
        )}

        <div className="w-full mt-[20px] pb-[40px] space-y-16">
          <div className="grid grid-cols-2 md:grid-cols-2 gap-10 w-full">
            {/* Левая колонка с изображениями */}
            <div className="w-full">
              <Swiper
                spaceBetween={10}
                thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                className="mb-4 rounded-lg overflow-hidden"
              >
                <SwiperSlide>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto object-cover rounded-lg bg-[#FFF]"
                  />
                </SwiperSlide>
              </Swiper>

              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                className="cursor-pointer"
              >
                <SwiperSlide>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full object-cover"
                  />
                </SwiperSlide>
              </Swiper>
            </div>

            {/* Правая колонка с инфо */}
            <div className="flex flex-col w-full">
              <motion.h1
                className="text-[32px] font-medium mb-[20px] text-left text-[#122952] dark:text-white"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {product.name}
              </motion.h1>

              <div className="flex mb-[20px] space-x-6 gap-6 text-gray-700">
                <div className="flex items-center gap-4">
                  <svg
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      y="0.5"
                      width="16"
                      height="16"
                      rx="8"
                      fill="#11D25E"
                    />
                    <path
                      d="M5 8L7.16073 10.3408C7.23992 10.4266 7.37546 10.4266 7.45465 10.3408L11 6.5"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>

                  <span className="text-[16px] text-[#11D25E]">
                    {product.inStock}
                  </span>
                </div>
                <div className="text-[16px] text-[#4D526C]">
                  Артикул: {product.articleNumber}
                </div>
              </div>

              <div className="grid grid-cols-[55%_50%] gap-6 w-full">
                <div>
                  <div className="mb-[20px]">
                    <span className="text-[16px] font-semibold">Цвет:</span>{" "}
                    <span className="text-[16px] text-[#4D526C]">
                      {product.color}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mb-[30px]">
                    <div className="bg-[#c22626] w-[20px] h-[20px] p-[20px] rounded-lg text-center flex justify-center items-center">
                      CR
                    </div>
                    <div className="bg-[#915858] w-[20px] h-[20px] p-[20px] rounded-lg text-center flex justify-center items-center">
                      X
                    </div>
                    <div className="bg-[#cd8585] w-[20px] h-[20px] p-[20px] rounded-lg text-center flex justify-center items-center">
                      CR
                    </div>
                  </div>
                  <div className="font-semibold mb-[20px]">Характеристики:</div>
                  <div className="w-full text-sm">
                    {features.map(([label, value], i) => (
                      <div
                        key={i}
                        className="flex justify-between border-b border-[#CFD8DE]"
                      >
                        <div className="px-2 py-[10px] text-[16px] text-[#4D526C]">
                          {label}
                        </div>
                        <div className="px-2 py-[10px] text-[16px] text-[#122952]">
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="rounded-[10px] bg-white shadow-[0_10px_20px_rgba(0,0,0,0.2)] w-[80%] p-[30px_30px] cursor-pointer">
                    <div className="price mb-3 flex items-center">
                      <span className="no__discount__price text-[22px] font-semibold text-[#213F74] mr-2">
                        {product.price.toLocaleString()} руб./шт
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={handleAddToCart}
                        className="bg-[#213F74] text-[#FFF] text-[14px] font-medium w-full h-[50px] rounded-[50px] mb-[8px] hover:bg-[#122952] transition-colors"
                      >
                        В корзину
                      </button>
                      <button
                        onClick={handleQuickOrder}
                        className="bg-[#F3F5F7] text-[#213F74] text-[14px] font-medium w-full h-[50px] rounded-[50px] hover:bg-[#E8EAED] transition-colors"
                      >
                        Купить в 1 клик
                      </button>
                    </div>
                  </div>

                  <div className="text-[14px] text-[#4D526C] mt-4 max-w-[200px]">
                    Цена действительна только для интернет-магазина и может
                    отличаться от цен в розничных магазинах.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Остальной код остается без изменений */}
          {/* ... */}
        </div>
      </div>
      <Footer />

      {/* Модальное окно быстрого заказа */}
      <QuickOrderModal
        isOpen={showQuickOrder}
        onClose={() => setShowQuickOrder(false)}
        product={product}
        onSubmit={handleQuickOrderSubmit}
      />
    </div>
  );
};

export default ProductDetail;
