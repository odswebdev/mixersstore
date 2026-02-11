import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "../contexts/CartContext.jsx";
import SidebarCatalog from "../components/SidebarCatalog";
import Breadcrumb from "../components/Breadcrumb";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Импорты изображений остаются для категорий
import smesBide from "../assets/smes-bide.png";
import smesAcearium from "../assets/smes-acearium.png";
import smesCat from "../assets/smes__сat.png";
import dushCat from "../assets/dush__cat.png";
import stoykiCat from "../assets/stoyki__cat.png";
import izlivyCat from "../assets/izlivy__cat.png";
import aksessuaryCat from "../assets/aksessuary__cat.png";

// Базовый URL для API - ИСПРАВЛЕНО!
const API_BASE_URL = import.meta.env.PROD 
  ? '/mixersstore/api' 
  : 'http://localhost:5000/api';

const CategoryPage = ({ title, category }) => {
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Фильтры
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedViews, setSelectedViews] = useState([]);
  const [selectedMountingTypes, setSelectedMountingTypes] = useState([]);
  const [selectedManagements, setSelectedManagements] = useState([]);
  const [selectedNumberSources, setSelectedNumberSources] = useState([]);
  const [priceRange, setPriceRange] = useState([20000, 85000]);

  // 🔹 Подкатегории (Новинки / Акции / Хиты)
  const categories = ["Новинки", "Акция", "Хиты продаж"];
  const [selectedCategories, setSelectedCategories] = useState([]);

  // 🔹 Сортировка
  const sortOptions = [
    "По возрастанию цены",
    "По убыванию цены",
    "По популярности",
  ];
  const [selectedSort, setSelectedSort] = useState("");

  // 🔹 Загрузка товаров из БД - ИСПРАВЛЕНО!
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Строим URL с параметрами фильтрации
        const params = new URLSearchParams();
        params.append('category', category);
        params.append('isActive', 'true');
        params.append('limit', '100'); // Добавляем лимит для получения всех товаров
        
        // Добавляем фильтры, если они выбраны
        if (selectedCollections.length > 0) {
          params.append('collections', selectedCollections.join(','));
        }
        
        if (selectedStyles.length > 0) {
          params.append('styles', selectedStyles.join(','));
        }
        
        if (selectedColors.length > 0) {
          params.append('colors', selectedColors.join(','));
        }
        
        if (selectedViews.length > 0) {
          params.append('views', selectedViews.join(','));
        }
        
        if (selectedMountingTypes.length > 0) {
          params.append('mountingTypes', selectedMountingTypes.join(','));
        }
        
        if (selectedManagements.length > 0) {
          params.append('managements', selectedManagements.join(','));
        }
        
        if (selectedNumberSources.length > 0) {
          params.append('numberSources', selectedNumberSources.join(','));
        }
        
        params.append('minPrice', priceRange[0]);
        params.append('maxPrice', priceRange[1]);
        
        if (selectedCategories.length > 0) {
          params.append('labels', selectedCategories.join(','));
        }

        // Добавляем сортировку
        if (selectedSort) {
          let sortParam = '';
          switch (selectedSort) {
            case 'По возрастанию цены':
              sortParam = 'price_asc';
              break;
            case 'По убыванию цены':
              sortParam = 'price_desc';
              break;
            case 'По популярности':
              sortParam = 'popularity';
              break;
          }
          params.append('sort', sortParam);
        }

        // Делаем запрос к API
        const url = `${API_BASE_URL}/products?${params.toString()}`;
        console.log('Fetching products from:', url);
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Ошибка загрузки товаров: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Received data:', data);
        
        // 🔹 УНИВЕРСАЛЬНАЯ ОБРАБОТКА ОТВЕТА
        let productsArray = [];
        
        if (data) {
          if (Array.isArray(data)) {
            productsArray = data;
          } else if (data.products && Array.isArray(data.products)) {
            productsArray = data.products;
          } else if (data.rows && Array.isArray(data.rows)) {
            productsArray = data.rows;
          }
        }
        
        console.log(`Loaded ${productsArray.length} products`);
        setProducts(productsArray);
        
      } catch (err) {
        console.error('Ошибка загрузки товаров:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [
    category,
    selectedCollections,
    selectedStyles,
    selectedColors,
    selectedViews,
    selectedMountingTypes,
    selectedManagements,
    selectedNumberSources,
    priceRange,
    selectedCategories,
    selectedSort
  ]);

  // 🔹 Состояния загрузки и ошибок
  if (loading) {
    return (
      <div>
        <Header />
        <div className="bg-[#F3F5F7] min-h-screen">
          <div className="max-w-[1300px] mx-auto px-4 py-20">
            <div className="flex justify-center items-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#213F74] mx-auto mb-4"></div>
                <p className="text-[#122952]">Загрузка товаров...</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <div className="bg-[#F3F5F7] min-h-screen">
          <div className="max-w-[1300px] mx-auto px-4 py-20">
            <div className="text-center">
              <p className="text-xl text-red-500 mb-4">Ошибка загрузки товаров</p>
              <p className="text-gray-600">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 bg-[#213F74] text-white rounded-lg hover:bg-[#122952] transition-colors"
              >
                Попробовать снова
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="bg-[#F3F5F7] min-h-screen">
        <div className="max-w-[1300px] mx-auto px-4">
          <Breadcrumb
            items={[
              { label: "Главная", href: "/mixersstore/" },
              { label: "Каталог", href: "/mixersstore/catalog" },
              { label: title },
            ]}
          />

          <h1 className="text-[46px] font-[500] text-[#122952] mt-[25px] mb-[25px]">
            {title} {products.length > 0 && `(${products.length})`}
          </h1>

          <div className="grid lg:grid-cols-[280px_1fr] gap-[30px] mb-[80px]">
            {/* Передаем фильтры и сеттеры */}
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
            
            <div className="flex flex-col w-full">
              <div className="flex justify-between items-center flex-wrap mb-[25px]">
                {/* Левая часть: категории */}
                <div className="flex flex-wrap gap-[10px]">
                  {categories.map((cat) => (
                    <motion.button
                      key={cat}
                      whileTap={{ scale: 0.97 }}
                      onClick={() =>
                        setSelectedCategories((prev) =>
                          prev.includes(cat)
                            ? prev.filter((c) => c !== cat)
                            : [...prev, cat]
                        )
                      }
                      className={`px-[20px] py-[10px] rounded-[50px] cursor-pointer text-[14px] font-medium whitespace-nowrap transition-colors
                        ${
                          selectedCategories.includes(cat)
                            ? "bg-[#213F74] text-white"
                            : "bg-white text-[#213F74] hover:bg-[#213F74] hover:text-white"
                        }`}
                    >
                      {cat}
                    </motion.button>
                  ))}
                </div>

                {/* 🔹 Сортировка */}
                <div className="flex justify-end">
                  <select
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value)}
                    className="bg-transparent border-none cursor-pointer text-[16px] font-medium text-[#213F74] outline-none py-2"
                    aria-label="Сортировка"
                  >
                    <option value="">Сортировка</option>
                    {sortOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 🔹 GRID ДЛЯ ТОВАРОВ - ИСПРАВЛЕНО! */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                {products.length > 0 ? (
                  products.map((product) => {
                    const inCart = cartItems.find(
                      (item) => item.id === product.id
                    );

                    return (
                      <motion.div
                        key={product.id}
                        layoutId={`product-${product.id}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col h-full bg-white rounded-[10px] p-[20px] shadow-[0px_5px_15px_rgba(0,0,0,0.05)] hover:shadow-[0px_10px_25px_rgba(0,0,0,0.1)] transition-shadow"
                      >
                        <Link 
                          to={`/mixersstore/catalog/${product.slug}`} 
                          className="flex flex-col h-full no-underline"
                        >
                          {/* Лейблы */}
                          <div className="flex flex-wrap gap-2 mb-3 min-h-[28px]">
                            <AnimatePresence>
                              {product.labels?.map((label) => {
                                const labelColors = {
                                  "Новинки": "bg-green-500",
                                  "Акция": "bg-red-500",
                                  "Хиты продаж": "bg-blue-500"
                                };
                                return (
                                  <span
                                    key={`${product.id}-${label}`}
                                    className={`px-2 py-1 text-[11px] rounded-[5px] font-medium text-white ${
                                      labelColors[label] || "bg-gray-500"
                                    }`}
                                  >
                                    {label}
                                  </span>
                                );
                              })}
                            </AnimatePresence>
                          </div>

                          {/* Изображение */}
                          <div className="flex justify-center items-center mb-4 h-[180px]">
                            <img
                              src={product.mainImage || product.image || '/mixersstore/default-product-image.png'}
                              alt={product.name}
                              className="max-w-full max-h-full object-contain"
                              loading="lazy"
                              onError={(e) => {
                                e.target.src = '/mixersstore/default-product-image.png';
                              }}
                            />
                          </div>
                          
                          {/* Информация */}
                          <div className="flex justify-between items-center mb-3 text-[11px] text-[#797D91]">
                            <span className={product.inStock ? "text-green-600" : "text-red-500"}>
                              {product.inStock ? '✓ В наличии' : '✕ Нет в наличии'}
                            </span>
                            <span>Арт: {product.articleNumber}</span>
                          </div>
                          
                          {/* Название - фиксированная высота */}
                          <h3 className="text-[15px] leading-[1.4] font-medium text-[#122952] mb-2 line-clamp-2 h-[42px]">
                            {product.name}
                          </h3>
                          
                          {/* Коллекция */}
                          <div className="text-[13px] text-[#4d526c] mb-3">
                            {product.collection || 'Demm'}
                          </div>
                          
                          {/* Цена */}
                          <div className="flex items-baseline gap-2 mt-auto pt-3 border-t border-gray-100">
                            <span className="text-[20px] font-bold text-[#213F74]">
                              {product.price?.toLocaleString()} ₽
                            </span>
                            {product.oldPrice && (
                              <span className="text-[13px] text-[#a3a5b2] line-through">
                                {product.oldPrice?.toLocaleString()} ₽
                              </span>
                            )}
                          </div>
                        </Link>

                        {/* Кнопки */}
                        <div className="flex flex-col gap-2 mt-4">
                          <AnimatePresence mode="wait">
                            {!inCart ? (
                              <motion.button
                                key={`add-${product.id}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-full h-[44px] bg-[#213F74] text-white text-[14px] font-medium rounded-[50px] hover:bg-[#122952] transition-colors"
                                whileTap={{ scale: 0.97 }}
                                onClick={() => addToCart(product)}
                              >
                                В корзину
                              </motion.button>
                            ) : (
                              <motion.div
                                key={`counter-${product.id}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center justify-between w-full h-[44px] bg-[#213F74] text-white rounded-[50px] px-3"
                              >
                                <button
                                  className="w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    inCart.quantity === 1
                                      ? removeFromCart(product.id)
                                      : updateQuantity(product.id, -1);
                                  }}
                                >
                                  -
                                </button>
                                <span className="font-medium">{inCart.quantity} шт.</span>
                                <button
                                  className="w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    updateQuantity(product.id, 1);
                                  }}
                                >
                                  +
                                </button>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <button
                            className="w-full h-[44px] bg-[#F3F5F7] text-[14px] font-medium text-[#213F74] rounded-[50px] hover:bg-[#E5E7EB] transition-colors"
                            onClick={() => console.log("Купить в 1 клик", product.id)}
                          >
                            Купить в 1 клик
                          </button>
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="col-span-full text-center py-20">
                    <p className="text-gray-500 text-lg">Нет товаров по выбранным фильтрам</p>
                    <button
                      onClick={() => {
                        setSelectedCollections([]);
                        setSelectedStyles([]);
                        setSelectedColors([]);
                        setSelectedViews([]);
                        setSelectedMountingTypes([]);
                        setSelectedManagements([]);
                        setSelectedNumberSources([]);
                        setPriceRange([20000, 85000]);
                        setSelectedCategories([]);
                        setSelectedSort("");
                      }}
                      className="mt-4 px-6 py-2 bg-[#213F74] text-white rounded-lg hover:bg-[#122952] transition-colors"
                    >
                      Сбросить фильтры
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default CategoryPage;