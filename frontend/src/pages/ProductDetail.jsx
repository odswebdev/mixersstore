import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import Breadcrumb from "../components/Breadcrumb";
import Header from "../components/Header";
import Footer from "../components/Footer";
import QuickOrderModal from "../components/QuickOrderModal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay, Thumbs, FreeMode, Zoom } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/zoom";
import "swiper/css/free-mode";
import { products } from "../data/products";
import { useCart } from "../context/CartContext.jsx";

const ProductDetail = () => {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [showQuickOrder, setShowQuickOrder] = useState(false);
  const [notification, setNotification] = useState(null);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || product?.color || "");
  const [activeTab, setActiveTab] = useState("description");
  const [imageZoomed, setImageZoomed] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const { addToCart } = useCart();
  const descriptionRef = useRef(null);
  const specificationsRef = useRef(null);
  const isDescriptionInView = useInView(descriptionRef, { once: true });
  const isSpecsInView = useInView(specificationsRef, { once: true });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
            Товар не найден
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Возможно, товар был перемещен или удален
          </p>
          <a 
            href="/catalog" 
            className="inline-block bg-[#213F74] text-white px-6 py-3 rounded-full hover:bg-[#122952] transition-colors"
          >
            Вернуться в каталог
          </a>
        </motion.div>
      </div>
    );
  }

  const features = [
    ["Коллекция", product.collection],
    ["Стиль", product.style],
    ["Вид", product.view],
    ["Тип монтажа", product.mountingType],
    ["Управление", product.management],
    ["Количество источников", product.numberSource],
    ["Материал", product.material || "Латунь, хром"],
    ["Гарантия", product.warranty || "5 лет"],
  ];

  const colors = product.colors || [
    { name: "Хром", value: "#C0C0C0", code: "CR" },
    { name: "Черный", value: "#000000", code: "BL" },
    { name: "Золото", value: "#FFD700", code: "GD" },
    { name: "Белый", value: "#FFFFFF", code: "WH" },
  ];

  const relatedProducts = products.filter(p => 
    p.category === product.category && p.id !== product.id
  ).slice(0, 5);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity, selectedColor });
    showNotification(`${product.name} (${selectedColor}) добавлен в корзину!`);
  };

  const handleQuickOrder = () => {
    setShowQuickOrder(true);
  };

  const handleQuickOrderSubmit = (formData) => {
    console.log("Быстрый заказ:", {
      product,
      color: selectedColor,
      quantity,
      customer: formData,
      date: new Date().toISOString()
    });
    
    showNotification("Заказ оформлен! Мы свяжемся с вами в ближайшее время.");
    setShowQuickOrder(false);
    addToCart({ ...product, quantity, selectedColor });
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Breadcrumb
            items={[
              { label: "Главная", href: "/" },
              { label: "Каталог", href: "/catalog" },
              { label: product.category, href: `/catalog/${product.category}` },
              { label: product.name },
            ]}
          />
        </motion.div>

        {/* Уведомление */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -50, x: 50 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: -50, x: 50 }}
              className="fixed top-6 right-6 z-50 bg-gradient-to-r from-[#213F74] to-[#122952] text-white px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3 backdrop-blur-sm"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.3 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <span className="font-medium">{notification}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Основная информация о товаре */}
        <div className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">
            {/* Левая колонка с изображениями */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Основное изображение */}
              <div className="relative group rounded-2xl overflow-hidden bg-white dark:bg-gray-800 p-4 shadow-xl">
                <Swiper
                  modules={[Zoom, Navigation, Thumbs]}
                  zoom={true}
                  navigation
                  thumbs={{ swiper: thumbsSwiper }}
                  className="rounded-lg cursor-zoom-in"
                  onClick={() => setImageZoomed(!imageZoomed)}
                >
                  <SwiperSlide>
                    <div className="swiper-zoom-container">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  </SwiperSlide>
                </Swiper>
                
                {/* Бейдж акции */}
                {product.discount && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10"
                  >
                    -{product.discount}%
                  </motion.div>
                )}
                
                {/* Кнопка избранного */}
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all z-10"
                >
                  <motion.svg
                    animate={{ scale: isLiked ? 1.2 : 1 }}
                    className={`w-6 h-6 ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-600'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </motion.svg>
                </button>
              </div>

              {/* Миниатюры */}
              <div className="px-2">
                <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={12}
                  slidesPerView={4}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="cursor-pointer"
                  breakpoints={{
                    320: { slidesPerView: 3 },
                    640: { slidesPerView: 4 },
                    1024: { slidesPerView: 5 },
                  }}
                >
                  {[...Array(4)].map((_, i) => (
                    <SwiperSlide key={i}>
                      <div className="rounded-lg overflow-hidden border-2 border-transparent hover:border-[#213F74] transition-all duration-300">
                        <img
                          src={product.image}
                          alt={`${product.name} ${i + 1}`}
                          className="w-full h-20 object-cover"
                          loading="lazy"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Информация о доставке */}
              <motion.div 
                className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-white">Информация о доставке</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                      <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">В наличии</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Доставка 1-3 дня</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                      <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">Самовывоз</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Сегодня из магазина</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Правая колонка с информацией */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {/* Заголовок и артикул */}
              <div>
                <motion.h1 
                  className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white leading-tight"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {product.name}
                </motion.h1>
                
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-full">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="w-2 h-2 bg-green-500 rounded-full"
                    />
                    <span className="text-sm font-medium text-green-700 dark:text-green-300">
                      {product.inStock}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full">
                    Артикул: <span className="font-mono font-medium">{product.articleNumber}</span>
                  </div>
                </div>
              </div>

              {/* Цена */}
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        {product.price.toLocaleString()} ₽
                      </span>
                      {product.oldPrice && (
                        <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                          {product.oldPrice.toLocaleString()} ₽
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">цена за шт.</p>
                  </div>
                  
                  <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1">
                    <button
                      onClick={decrementQuantity}
                      className="w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-[#213F74] dark:hover:text-white"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="w-8 text-center font-medium text-gray-900 dark:text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={incrementQuantity}
                      className="w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-[#213F74] dark:hover:text-white"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Цвета */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-gray-800 dark:text-white">Цвет:</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">{selectedColor}</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {colors.map((color, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedColor(color.name || color)}
                        className={`relative flex flex-col items-center p-2 rounded-lg transition-all ${selectedColor === (color.name || color) 
                          ? 'ring-2 ring-[#213F74] bg-blue-50 dark:bg-gray-700' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                      >
                        <div 
                          className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-600 shadow-inner"
                          style={{ backgroundColor: color.value || color }}
                        />
                        <span className="text-xs mt-1 font-medium text-gray-700 dark:text-gray-300">
                          {color.code || color}
                        </span>
                        {selectedColor === (color.name || color) && (
                          <motion.div
                            className="absolute -top-1 -right-1"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            <div className="bg-[#213F74] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                              ✓
                            </div>
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Кнопки действий */}
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    className="w-full bg-gradient-to-r from-[#213F74] to-[#122952] text-white font-semibold py-4 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Добавить в корзину
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleQuickOrder}
                    className="w-full bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 text-gray-800 dark:text-white font-semibold py-4 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300"
                  >
                    Купить в 1 клик
                  </motion.button>
                </div>
                
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                  Цена действительна только для интернет-магазина
                </p>
              </motion.div>

              {/* Быстрые характеристики */}
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="font-semibold text-xl mb-4 text-gray-900 dark:text-white">Основные характеристики</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {features.slice(0, 6).map(([label, value], i) => (
                    <div key={i} className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                      <span className="text-gray-600 dark:text-gray-300">{label}</span>
                      <span className="font-medium text-gray-900 dark:text-white">{value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Табы с описанием и характеристиками */}
          <motion.div 
            className="mt-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8">
                {["description", "specifications", "reviews", "delivery"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-1 font-medium text-sm border-b-2 transition-colors ${
                      activeTab === tab
                        ? 'border-[#213F74] text-[#213F74] dark:text-white'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    {tab === "description" && "Описание"}
                    {tab === "specifications" && "Характеристики"}
                    {tab === "reviews" && "Отзывы"}
                    {tab === "delivery" && "Доставка"}
                  </button>
                ))}
              </nav>
            </div>

            <div className="py-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === "description" && (
                    <div ref={descriptionRef} className="prose prose-lg dark:prose-invert max-w-none">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {product.description || "Премиальный смеситель, сочетающий в себе инновационные технологии и элегантный дизайн. Идеальное решение для современной ванной комнаты или кухни."}
                      </p>
                      <ul className="mt-6 space-y-3">
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Высококачественные материалы</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Экономия воды до 30%</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Легкая установка и обслуживание</span>
                        </li>
                      </ul>
                    </div>
                  )}

                  {activeTab === "specifications" && (
                    <div ref={specificationsRef} className="overflow-x-auto">
                      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <tbody>
                          {features.map(([label, value], i) => (
                            <tr key={i} className="border-b border-gray-200 dark:border-gray-700">
                              <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                {label}
                              </th>
                              <td className="px-6 py-4">{value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Похожие товары */}
          {relatedProducts.length > 0 && (
            <motion.div 
              className="mt-20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Похожие товары</h2>
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={24}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                  1280: { slidesPerView: 4 },
                }}
                className="pb-12"
              >
                {relatedProducts.map((relatedProduct) => (
                  <SwiperSlide key={relatedProduct.id}>
                    <motion.div 
                      whileHover={{ y: -10 }}
                      className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                    >
                      <div className="p-4">
                        <img 
                          src={relatedProduct.image} 
                          alt={relatedProduct.name}
                          className="w-full h-48 object-contain rounded-lg"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white line-clamp-2">
                          {relatedProduct.name}
                        </h3>
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-xl font-bold text-gray-900 dark:text-white">
                            {relatedProduct.price.toLocaleString()} ₽
                          </span>
                          <button className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 p-2 rounded-full transition-colors">
                            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />

      {/* Модальное окно быстрого заказа */}
      <QuickOrderModal
        isOpen={showQuickOrder}
        onClose={() => setShowQuickOrder(false)}
        product={product}
        selectedColor={selectedColor}
        quantity={quantity}
        onSubmit={handleQuickOrderSubmit}
      />

      {/* Плавающая кнопка корзины для мобильных */}
      <motion.button
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        onClick={handleAddToCart}
        className="fixed bottom-6 right-6 lg:hidden bg-gradient-to-r from-[#213F74] to-[#122952] text-white p-4 rounded-full shadow-2xl z-40 hover:shadow-3xl transition-all"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </motion.button>
    </div>
  );
};

export default ProductDetail;