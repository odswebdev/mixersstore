import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "../contexts/CartContext";
import SidebarCatalog from "../components/SidebarCatalog";
import Breadcrumb from "../components/Breadcrumb";
import Header from "../components/Header";
import Footer from "../components/Footer";
import OneClickBuy from "../components/OneClickBuy";

import { products } from "../data/products";
import { catalogCategories } from "../data/categories";

const Catalog = () => {
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleOneClickBuy = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  // Проверяем размер экрана
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 🔹 Общие фильтры
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedViews, setSelectedViews] = useState([]);
  const [selectedMountingTypes, setSelectedMountingTypes] = useState([]);
  const [selectedManagements, setSelectedManagements] = useState([]);
  const [selectedNumberSources, setSelectedNumberSources] = useState([]);
  const [priceRange, setPriceRange] = useState([20000, 85000]);

  // 🔹 Категории (вкладки)
  const categories = ["Новинки", "Акция", "Хиты продаж"];
  const [selectedCategories, setSelectedCategories] = useState([]);

  const sortOptions = [
    "По возрастанию цены",
    "По убыванию цены",
    "По популярности",
  ];
  const [selectedSort, setSelectedSort] = useState("");

  // Пагинация
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // 🔹 Фильтрация товаров
  const filteredProducts = products.filter((p) => {
    const inCollection =
      selectedCollections.length === 0 ||
      selectedCollections.includes(p.collection);
    const inStyle =
      selectedStyles.length === 0 || selectedStyles.includes(p.style);
    const inColor =
      selectedColors.length === 0 || selectedColors.includes(p.color);
    const inView = selectedViews.length === 0 || selectedViews.includes(p.view);
    const inMountingType =
      selectedMountingTypes.length === 0 ||
      selectedMountingTypes.includes(p.mountingType);
    const inManagement =
      selectedManagements.length === 0 ||
      selectedManagements.includes(p.management);
    const inNumberSource =
      selectedNumberSources.length === 0 ||
      selectedNumberSources.includes(p.numberSource);
    const inPrice = p.price >= priceRange[0] && p.price <= priceRange[1];

    // ✅ Фильтр по категориям (Новинки / Хиты / Акции)
    const inCategory =
      selectedCategories.length === 0 ||
      p.labels?.some((label) => selectedCategories.includes(label));

    return (
      inCollection &&
      inStyle &&
      inColor &&
      inView &&
      inMountingType &&
      inManagement &&
      inNumberSource &&
      inPrice &&
      inCategory
    );
  });

  // 🔹 Сортировка фильтрованных товаров
  let sortedProducts = [...filteredProducts];
  if (selectedSort === "По возрастанию цены") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (selectedSort === "По убыванию цены") {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (selectedSort === "По популярности") {
    sortedProducts.sort((a, b) => b.id - a.id); // пример сортировки по id
  }

  // Пагинация - на мобильных показываем больше товаров для скролла
  useEffect(() => {
    if (isMobile) {
      setItemsPerPage(8); // Четное число для 2 в ряд
    } else {
      setItemsPerPage(6);
    }
  }, [isMobile]);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const categoryCounts = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  // Анимация для карточек
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.15)",
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="bg-[#F3F5F7] flex-grow">
        <div className="max-w-[1300px] mx-auto px-4 lg:px-6">
          <Breadcrumb
            items={[{ label: "Главная", href: "/" }, { label: "Каталог" }]}
          />
          <h1 className="text-[32px] md:text-[46px] font-[500] text-[#122952] mt-[20px] mb-[20px] md:mt-[25px] md:mb-[25px]">
            Каталог
          </h1>

          {/* Категории - адаптивная сетка */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-5 mb-[30px] md:mb-[40px]">
            {catalogCategories.map((cat) => (
              <Link
                key={cat.name}
                to={cat.slug}
                className="w-full no-underline"
              >
                <motion.div 
                  className="flex flex-col h-full rounded-[10px] p-4 bg-white shadow-[0px_8px_16px_rgba(0,0,0,0.1)] cursor-pointer hover:shadow-[0px_12px_24px_rgba(0,0,0,0.15)] transition-shadow duration-300"
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="mb-3 flex justify-center">
                    <img
                      className="w-[120px] h-[120px] md:w-[140px] md:h-[140px] lg:w-[160px] lg:h-[160px] object-contain"
                      src={cat.image}
                      alt={cat.name}
                    />
                  </div>
                  <div className="flex flex-col flex-grow justify-end">
                    <div className="mb-1 text-[16px] md:text-[18px] font-[500] text-[#122952] line-clamp-2">
                      {cat.name}
                    </div>
                    <div className="text-[14px] text-[#797d91]">
                      Товаров: {categoryCounts[cat.name] || 0}
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-5 md:gap-8 mb-[60px] md:mb-[80px]">
            {/* Кнопка для открытия сайдбара на мобильных */}
            {isMobile && (
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-2 bg-[#213F74] text-white py-3 px-5 rounded-[50px] font-medium mb-4 lg:hidden"
                onClick={() => setIsSidebarOpen(true)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                Фильтры
              </motion.button>
            )}

            {/* Сайдбар фильтров */}
            <div className={`${isMobile ? 'fixed inset-0 z-50' : 'w-full lg:w-[25%]'}`}>
              {(!isMobile || isSidebarOpen) && (
                <motion.div
                  initial={isMobile ? { x: -300 } : false}
                  animate={isMobile ? { x: 0 } : false}
                  exit={isMobile ? { x: -300 } : false}
                  transition={{ type: "spring", damping: 25 }}
                  className={`h-full ${isMobile ? 'bg-white p-4 overflow-y-auto' : ''}`}
                >
                  <SidebarCatalog
                    className="w-full"
                    products={products}
                    selectedCollections={selectedCollections}
                    setSelectedCollections={setSelectedCollections}
                    selectedStyles={selectedStyles}
                    setSelectedStyles={setSelectedStyles}
                    selectedViews={selectedViews}
                    setSelectedViews={setSelectedViews}
                    selectedColors={selectedColors}
                    setSelectedColors={setSelectedColors}
                    selectedMountingTypes={selectedMountingTypes}
                    setSelectedMountingTypes={setSelectedMountingTypes}
                    selectedManagements={selectedManagements}
                    setSelectedManagements={setSelectedManagements}
                    selectedNumberSources={selectedNumberSources}
                    setSelectedNumberSources={setSelectedNumberSources}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                  />
                  
                  {isMobile && (
                    <button
                      className="mt-6 w-full bg-[#F3F5F7] text-[#213F74] py-3 px-5 rounded-[50px] font-medium"
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Закрыть фильтры
                    </button>
                  )}
                </motion.div>
              )}
            </div>

            {/* Затемнение для мобильного сайдбара */}
            {isMobile && isSidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40"
                onClick={() => setIsSidebarOpen(false)}
              />
            )}

            {/* Основной контент */}
            <div className="w-full lg:w-[75%]">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 md:mb-[25px]">
                {/* Левая часть: категории */}
                <div className="flex flex-wrap gap-2 md:gap-[10px] grow min-w-0">
                  {categories.map((cat) => (
                    <motion.button
                      key={cat}
                      layout
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        setSelectedCategories((prev) =>
                          prev.includes(cat)
                            ? prev.filter((c) => c !== cat)
                            : [...prev, cat]
                        )
                      }
                      className={`px-4 py-2 md:px-5 md:py-3 rounded-[50px] cursor-pointer text-[12px] md:text-[14px] font-medium whitespace-nowrap transition-all duration-200
        ${
          selectedCategories.includes(cat)
            ? "bg-[#213F74] text-white shadow-lg"
            : "bg-white text-[#213F74] hover:bg-[#213F74] hover:text-white"
        }`}
                    >
                      {cat}
                    </motion.button>
                  ))}
                </div>

                {/* 🔹 Сортировка */}
                <div className="w-full md:w-auto flex justify-end">
                  <div className="relative inline-block w-full md:w-auto">
                    <select
                      value={selectedSort}
                      onChange={(e) => setSelectedSort(e.target.value)}
                      className="appearance-none bg-white border border-[#DCDC] rounded-[8px] py-2 md:py-3 pl-4 pr-10 text-[14px] md:text-[16px] font-medium text-[#213F74] w-full md:w-auto cursor-pointer hover:border-[#213F74] transition-colors"
                      aria-label="Сортировка"
                    >
                      <option value="">Сортировка</option>
                      {sortOptions.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#213F74]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Сетка товаров - адаптивная */}
              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4 lg:gap-5"
                initial="hidden"
                animate="visible"
              >
                <AnimatePresence>
                  {currentProducts.length ? (
                    currentProducts.map((product, index) => {
                      const inCart = cartItems.find(
                        (item) => item.id === product.id
                      );

                      return (
                        <motion.div
                          key={product.id}
                          variants={cardVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          whileHover="hover"
                          custom={index}
                          transition={{ delay: index * 0.05 }}
                          className="catalog__content__item flex flex-col h-full rounded-[12px] p-3 md:p-4 lg:p-5 bg-white shadow-[0px_8px_16px_rgba(0,0,0,0.08)] hover:shadow-[0px_12px_24px_rgba(0,0,0,0.12)] cursor-pointer transition-all duration-300"
                        >
                          <Link to={`/catalog/${product.slug}`} className="flex-grow">
                            <div className="catalog__content__item__labels flex flex-wrap gap-1 mb-2 md:mb-3">
                              <AnimatePresence>
                                {product.labels?.map((label) => {
                                  let labelStyle = "";

                                  switch (label) {
                                    case "Новинки":
                                      labelStyle = "bg-green-500";
                                      break;
                                    case "Акционные товары":
                                      labelStyle = "bg-red-500";
                                      break;
                                    case "Хиты продаж":
                                      labelStyle = "bg-blue-500";
                                      break;
                                    default:
                                      labelStyle = "bg-gray-500";
                                  }

                                  return (
                                    <motion.span
                                      key={label}
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      exit={{ opacity: 0, scale: 0.8 }}
                                      transition={{ duration: 0.2 }}
                                      className={`px-2 py-1 text-[10px] md:text-[11px] rounded-[4px] font-medium text-white ${labelStyle}`}
                                    >
                                      {label}
                                    </motion.span>
                                  );
                                })}
                              </AnimatePresence>
                            </div>

                            <div className="flex justify-center mb-3 md:mb-4">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full max-w-[180px] md:max-w-[200px] lg:max-w-[220px] h-auto object-contain"
                              />
                            </div>
                            
                            <div className="flex flex-row justify-between items-center mb-2 md:mb-3">
                              <div className="flex items-center gap-1 md:gap-2">
                                <div className="relative w-3 h-3 md:w-4 md:h-4">
                                  <div className="absolute inset-0 bg-[#10B981] rounded-full"></div>
                                  <svg
                                    className="absolute inset-0 w-full h-full text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    strokeWidth="3"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                </div>
                                <div className="text-[10px] md:text-[12px] font-medium text-[#10B981]">
                                  {product.inStock}
                                </div>
                              </div>
                              <div className="text-[10px] md:text-[12px] text-[#797D91]">
                                Арт: {product.articleNumber}
                              </div>
                            </div>
                            
                            <div className="desc text-[13px] md:text-[14px] text-[#122952] font-[500] mb-2 md:mb-3 line-clamp-2 md:line-clamp-3">
                              {product.name}
                            </div>
                            
                            <div className="collection__title text-[12px] md:text-[14px] text-[#4d526c] mb-4 md:mb-6">
                              Коллекция: ERYOS
                            </div>
                            
                            <div className="price flex items-center gap-2 mb-3 md:mb-4">
                              <span 
                                className={`text-[14px] md:text-[16px] font-[600] ${
                                  product.oldPrice 
                                    ? 'text-[#EF4444]' 
                                    : 'text-[#213F74]'
                                }`}
                              >
                                {product.price.toLocaleString('ru-RU')} ₽
                              </span>
                              {product.oldPrice && (
                                <span className="discount__price text-[11px] md:text-[12px] font-[500] text-[#a3a5b2] line-through">
                                  {product.oldPrice.toLocaleString('ru-RU')} ₽
                                </span>
                              )}
                            </div>
                          </Link>

                          <div className="flex flex-col gap-2 md:gap-3">
                            <AnimatePresence mode="wait" initial={false}>
                              {!inCart ? (
                                <motion.button
                                  key="addToCart"
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.9 }}
                                  transition={{ duration: 0.2 }}
                                  className="bg-[#213F74] text-white text-[12px] md:text-[14px] font-[500] w-full py-2 md:py-3 rounded-[50px] cursor-pointer hover:bg-[#1a3260] transition-colors"
                                  whileTap={{ scale: 0.95 }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    addToCart(product);
                                  }}
                                >
                                  В корзину
                                </motion.button>
                              ) : (
                                <motion.div
                                  key="counter"
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.9 }}
                                  transition={{ duration: 0.2 }}
                                  className="flex items-center justify-between bg-[#213F74] text-white text-[12px] md:text-[14px] font-[500] w-full py-2 md:py-3 px-3 md:px-4 rounded-[50px]"
                                >
                                  <motion.button
                                    className="bg-white/30 hover:bg-white/40 text-white w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center transition-all"
                                    whileTap={{ scale: 0.8 }}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      inCart.quantity === 1
                                        ? removeFromCart(product.id)
                                        : updateQuantity(product.id, inCart.quantity - 1);
                                    }}
                                  >
                                    -
                                  </motion.button>

                                  <span className="min-w-[30px] md:min-w-[40px] text-center">
                                    {inCart.quantity} шт.
                                  </span>

                                  <motion.button
                                    className="bg-white/30 hover:bg-white/40 text-white w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center transition-all"
                                    whileTap={{ scale: 0.8 }}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      updateQuantity(product.id, inCart.quantity + 1);
                                    }}
                                  >
                                    +
                                  </motion.button>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            <motion.button
                              key="quickBuy"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.1 }}
                              className="bg-[#F3F5F7] text-[12px] md:text-[14px] font-[500] text-[#213F74] w-full py-2 md:py-3 rounded-[50px] cursor-pointer hover:bg-[#e9ecef] transition-all border border-transparent hover:border-[#213F74]/20"
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleOneClickBuy(product);
                              }}
                            >
                              Купить в 1 клик
                            </motion.button>
                          </div>
                        </motion.div>
                      );
                    })
                  ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-12 md:py-20">
                      <div className="text-gray-400 mb-4">
                        <svg className="w-16 h-16 md:w-20 md:h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-gray-500 text-lg md:text-xl font-medium mb-2">Товаров не найдено</p>
                      <p className="text-gray-400 text-sm md:text-base text-center max-w-md">
                        Попробуйте изменить параметры фильтрации или сбросить фильтры
                      </p>
                    </div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Пагинация - адаптивная */}
              {sortedProducts.length > 0 && (
                <div className="flex flex-col items-center mt-8 md:mt-12 mb-6 md:mb-8">
                  <div className="mb-4 md:mb-6 text-[#797d91] text-xs md:text-sm">
                    Показано {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, sortedProducts.length)} из {sortedProducts.length} товаров
                  </div>
                  
                  <div className="flex items-center justify-center gap-1 md:gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => paginate(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg transition-all duration-200 ${
                        currentPage === 1
                          ? "bg-[#F3F5F7] text-[#a3a5b2] cursor-not-allowed"
                          : "bg-white text-[#213F74] hover:bg-[#213F74] hover:text-white border border-[#DCDC]"
                      }`}
                      aria-label="Предыдущая страница"
                    >
                      <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </motion.button>

                    <div className="flex items-center gap-1">
                      {(() => {
                        const pages = [];
                        const maxVisiblePages = isMobile ? 3 : 5;
                        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
                        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
                        
                        if (endPage - startPage + 1 < maxVisiblePages) {
                          startPage = Math.max(1, endPage - maxVisiblePages + 1);
                        }

                        if (startPage > 1) {
                          pages.push(
                            <motion.button
                              key={1}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => paginate(1)}
                              className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg transition-all duration-200 ${
                                currentPage === 1
                                  ? "bg-[#213F74] text-white shadow-lg"
                                  : "bg-white text-[#213F74] hover:bg-[#213F74] hover:text-white border border-[#DCDC]"
                              }`}
                            >
                              1
                            </motion.button>
                          );
                          
                          if (startPage > 2) {
                            pages.push(
                              <span key="dots1" className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 text-[#797d91]">
                                ...
                              </span>
                            );
                          }
                        }

                        for (let i = startPage; i <= endPage; i++) {
                          pages.push(
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => paginate(i)}
                              className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg transition-all duration-200 ${
                                currentPage === i
                                  ? "bg-[#213F74] text-white shadow-lg font-medium"
                                  : "bg-white text-[#213F74] hover:bg-[#213F74] hover:text-white border border-[#DCDC]"
                              }`}
                            >
                              {i}
                            </motion.button>
                          );
                        }

                        if (endPage < totalPages) {
                          if (endPage < totalPages - 1) {
                            pages.push(
                              <span key="dots2" className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 text-[#797d91]">
                                ...
                              </span>
                            );
                          }
                          
                          pages.push(
                            <motion.button
                              key={totalPages}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => paginate(totalPages)}
                              className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg transition-all duration-200 ${
                                currentPage === totalPages
                                  ? "bg-[#213F74] text-white shadow-lg"
                                  : "bg-white text-[#213F74] hover:bg-[#213F74] hover:text-white border border-[#DCDC]"
                              }`}
                            >
                              {totalPages}
                            </motion.button>
                          );
                        }

                        return pages;
                      })()}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg transition-all duration-200 ${
                        currentPage === totalPages
                          ? "bg-[#F3F5F7] text-[#a3a5b2] cursor-not-allowed"
                          : "bg-white text-[#213F74] hover:bg-[#213F74] hover:text-white border border-[#DCDC]"
                      }`}
                      aria-label="Следующая страница"
                    >
                      <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>

      {/* Модальное окно "Купить в 1 клик" */}
      <AnimatePresence>
        {modalOpen && selectedProduct && (
          <OneClickBuy
            productId={selectedProduct.id}
            productName={selectedProduct.name}
            isOpen={modalOpen}
            onClose={() => {
              setModalOpen(false);
              setSelectedProduct(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Catalog;