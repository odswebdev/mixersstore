import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import SidebarCatalog from "../components/SidebarCatalog";
import Breadcrumb from "../components/Breadcrumb";
import Header from "../components/Header";
import Footer from "../components/Footer";
import OneClickBuy from "../components/OneClickBuy";

import smesBide from "../assets/smes-bide.png";
import smesAcearium from "../assets/smes-acearium.png";
import smesCat from "../assets/smes__сat.png";
import dushCat from "../assets/dush__cat.png";
import stoykiCat from "../assets/stoyki__cat.png";
import izlivyCat from "../assets/izlivy__cat.png";
import aksessuaryCat from "../assets/aksessuary__cat.png";

import { products } from "../data/products";
import { catalogCategories } from "../data/categories";

const Catalog = () => {
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOneClickBuy = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

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
  const categories = ["Новинки", "Акционные товары", "Хиты продаж"];
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

  // Пагинация
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

  return (
    <div>
      <Header />
      <div className="bg-[#F3F5F7]">
        <div className="max-w-[1300px] mx-auto px-4">
          <Breadcrumb
            items={[{ label: "Главная", href: "/" }, { label: "Каталог" }]}
          />
          <h1 className="text-[46px] font-[500] text-[#122952] mt-[25px] mb-[25px]">
            Каталог
          </h1>

          {/* Категории */}
          <div className="flex flex-col lg:flex-row justify-between gap-[20px] items-center mb-[25px] lg:mb-[40px]">
            {catalogCategories.map((cat) => (
              <Link
                key={cat.name}
                to={cat.slug}
                className="w-full lg:w-auto no-underline"
              >
                <div className="flex gap-[30px] lg:gap-0 lg:flex-col h-auto rounded-[10px] p-[15px] bg-[#FFF] shadow-[0px_10px_20px_rgba(0,0,0,0.2)] cursor-pointer">
                  <div className="mb-[15px]">
                    <img
                      className="w-[100px] lg:w-[220px]"
                      src={cat.image}
                      alt={cat.name}
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="mb-[5px] text-[20px] font-[500] text-[#122952]">
                      {cat.name}
                    </div>
                    <div className="text-[16px] text-[#797d91]">
                      Товаров: {categoryCounts[cat.name] || 0}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[25%_70%] lg:gap-[65px] mb-[80px]">
            {/* Передаем фильтры и сеттеры */}
            <SidebarCatalog
              className="w-full"
              products={products} // 👈 передаём список товаров
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
            <div className="flex flex-col w-full">
              <div className="flex justify-between items-center flex-wrap mb-[25px]">
                {/* Левая часть: категории */}
                <div className="flex flex-wrap gap-[10px] grow min-w-0">
                  {categories.map((cat) => (
                    <motion.button
                      key={cat}
                      layout
                      whileTap={{ scale: 0.97 }}
                      onClick={() =>
                        setSelectedCategories((prev) =>
                          prev.includes(cat)
                            ? prev.filter((c) => c !== cat)
                            : [...prev, cat]
                        )
                      }
                      className={`p-[10px_20px] rounded-[50px] cursor-pointer text-[14px] font-medium whitespace-nowrap
        ${
          selectedCategories.includes(cat)
            ? "bg-[#213F74] text-[#FFF]"
            : "bg-[#FFFFFF] text-[#213F74] hover:bg-[#213F74] hover:text-[#FFF]"
        }`}
                    >
                      {cat}
                    </motion.button>
                  ))}
                </div>

                {/* 🔹 Сортировка */}
                <div className="flex justify-end mb-[20px]">
                  <select
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value)}
                    className="border rounded p-2 text-sm bg-transparent border-none cursor-pointer text-[16px] font-medium text-[#213F74]"
                    aria-label="Сортировка"
                  >
                    {sortOptions.map((s) => (
                      <option
                        className="bg-transparent border border-[#DCDC]"
                        key={s}
                        value={s}
                      >
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="catalog__content flex flex-wrap justify-start items-center gap-[20px]">
                {currentProducts.length ? (
                  currentProducts.map((product) => {
                    const inCart = cartItems.find(
                      (item) => item.id === product.id
                    );

                    return (
                      <div
                        key={product.id}
                        className="catalog__content__item flex flex-col w-auto h-auto rounded-[10px] p-[20px_20px] bg-[#FFF] shadow-[0px_10px_20px_rgba(0,0,0,0.2)] cursor-pointer"
                      >
                        <Link to={`/catalog/${product.slug}`}>
                          <div className="catalog__content__item__labels flex gap-2 mb-2">
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
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    transition={{ duration: 0.3 }}
                                    className={`px-2 py-1 text-[12px] rounded-[5px] font-medium text-white ${labelStyle}`}
                                  >
                                    {label}
                                  </motion.span>
                                );
                              })}
                            </AnimatePresence>
                          </div>

                          <div>
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-[240px]"
                            />
                          </div>
                          <div className="flex flex-row justify-between items-center mb-[15px]">
                            <div className="text-[12px] text-[#797D91]">
                              {product.inStock}
                            </div>
                            <div className="text-[12px] text-[#797D91]">
                              Артикул: {product.articleNumber}
                            </div>
                          </div>
                          <div className="desc text-[14px] text-[#122952] font-[500] mb-[10px] break-words max-w-[306px]">
                            {product.name}
                          </div>
                          <div className="collection__title text-[14px] text-[#4d526c] mb-[30px]">
                            Коллекция: ERYOS
                          </div>
                          <div className="price gap-[10px] mb-[12px]">
                            <span className="no__discount__price text-[16px] font-[600] text-[#213F74] mr-[8px]">
                              {product.price} руб./шт
                            </span>
                            <span className="discount__price text-[12px] font-[500] text-[#a3a5b2] line-through">
                              {product.oldPrice} руб./шт
                            </span>
                          </div>
                        </Link>

                        <div className="flex flex-col gap-[10px] items-center justify-center">
                          {/* 🔹 Кнопка В корзину или - 1 + */}
                          <AnimatePresence mode="wait" initial={false}>
                            {!inCart ? (
                              <motion.button
                                key="addToCart"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.25 }}
                                className="bg-[#213F74] text-[#FFF] text-[14px] font-[500] w-full h-[50px] rounded-[50px] cursor-pointer"
                                whileTap={{ scale: 0.9 }}
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
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.25 }}
                                className="flex items-center justify-center gap-3 bg-[#213F74] text-[#FFF] text-[14px] font-[500] w-full h-[50px] rounded-[50px]"
                              >
                                <motion.button
                                  className="bg-gray-200 text-[#213F74] px-3 py-1 rounded-full"
                                  whileTap={{ scale: 0.8 }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    inCart.quantity === 1
                                      ? removeFromCart(product.id)
                                      : updateQuantity(product.id, -1);
                                  }}
                                >
                                  -
                                </motion.button>

                                <span>{inCart.quantity} шт.</span>

                                <motion.button
                                  className="bg-gray-200 text-[#213F74] px-3 py-1 rounded-full"
                                  whileTap={{ scale: 0.8 }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    updateQuantity(product.id, 1);
                                  }}
                                >
                                  +
                                </motion.button>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* 🔹 Кнопка Купить в 1 клик (всегда есть) */}
                          <motion.button
                            key="quickBuy"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.25 }}
                            className="bg-[#F3F5F7] text-[14px] font-[500] text-[#213F74] w-full h-[50px] border-none rounded-[50px] cursor-pointer"
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setSelectedProduct(product); // сохраняем выбранный товар
                              setModalOpen(true); // открываем модалку
                            }}
                          >
                            Купить в 1 клик
                          </motion.button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-500">Нет товаров по фильтрам</p>
                )}
              </div>

              {/* Пагинация */}
              <div className="flex justify-center items-center gap-3 mt-6">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === i + 1
                        ? "bg-[#213F74] text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              {/* Выбор количества товаров на странице */}
              <div className="flex justify-end mb-4">
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="border rounded p-2 text-sm"
                >
                  {[6, 12, 18, 24].map((n) => (
                    <option key={n} value={n}>
                      {n} на странице
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>

      {/* Модальное окно "Купить в 1 клик" - теперь ВНЕ основного контента */}
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
    </div>
  );
};

export default Catalog;