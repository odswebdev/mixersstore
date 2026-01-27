import React, { useState, useEffect, useMemo } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "../data/products";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ITEMS_PER_PAGE = 12;

const SearchResults = () => {
  const query = useQuery().get("query") || "";
  const navigate = useNavigate();
  const location = useLocation();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("relevance");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Получаем все доступные категории из товаров
  const allCategories = useMemo(() => {
    const categories = new Set();
    products.forEach(product => {
      if (product.category) categories.add(product.category);
    });
    return Array.from(categories);
  }, []);

  // Фильтрация товаров с учетом всех параметров
  const filteredProducts = useMemo(() => {
    let result = products.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category?.toLowerCase().includes(query.toLowerCase()) ||
      product.collection?.toLowerCase().includes(query.toLowerCase())
    );

    // Фильтр по наличию
    result = result.filter(product => product.inStock === "В наличии");

    // Фильтр по цене
    result = result.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Фильтр по категориям
    if (selectedCategories.length > 0) {
      result = result.filter(product => 
        selectedCategories.includes(product.category)
      );
    }

    // Сортировка
    result = [...result].sort((a, b) => {
      switch(sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "newest":
          return b.id - a.id;
        default: // relevance
          return 0;
      }
    });

    return result;
  }, [query, priceRange, selectedCategories, sortBy]);

  // Сброс страницы при изменении фильтров
  useEffect(() => {
    setCurrentPage(1);
  }, [query, priceRange, selectedCategories, sortBy]);

  // Эффект загрузки
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [query, currentPage, sortBy]);

  // Пагинация
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedItems = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Форматирование цены
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price).replace('RUB', '₽');
  };

  // Обработчик выбора категории
  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Обработчик очистки фильтров
  const handleClearFilters = () => {
    setPriceRange({ min: 0, max: 100000 });
    setSelectedCategories([]);
    setSortBy("relevance");
  };

  // Компонент пагинации
  const Pagination = () => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
      const delta = 2;
      const range = [];
      const rangeWithDots = [];
      let l;

      for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
          range.push(i);
        }
      }

      range.forEach(i => {
        if (l) {
          if (i - l === 2) {
            rangeWithDots.push(l + 1);
          } else if (i - l !== 1) {
            rangeWithDots.push('...');
          }
        }
        rangeWithDots.push(i);
        l = i;
      });

      return rangeWithDots;
    };

    return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          Показано {((currentPage - 1) * ITEMS_PER_PAGE) + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} из {filteredProducts.length} товаров
        </div>
        
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            ←
          </button>
          
          {getPageNumbers().map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className="px-3 py-2">...</span>
              ) : (
                <button
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
                    currentPage === page
                      ? 'bg-[#213F74] text-white'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            →
          </button>
        </div>
      </div>
    );
  };

  // Компонент загрузки
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-gray-200 rounded-lg aspect-square mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Хлебные крошки */}
      <div className="bg-white border-b">
        <div className="max-w-[1400px] mx-auto px-4 py-4">
          <nav className="flex items-center text-sm text-gray-600">
            <Link to="/" className="hover:text-[#213F74] transition-colors">
              Главная
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Результаты поиска</span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Сайдбар фильтров */}
          <aside className="lg:w-1/4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-sm p-6 sticky top-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Фильтры</h2>
                <button
                  onClick={handleClearFilters}
                  className="text-sm text-[#213F74] hover:text-[#002D79] transition-colors"
                >
                  Сбросить все
                </button>
              </div>

              {/* Фильтр по категориям */}
              <div className="mb-8">
                <h3 className="font-medium mb-4">Категории</h3>
                <div className="space-y-2">
                  {allCategories.map(category => (
                    <label key={category} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryToggle(category)}
                        className="w-4 h-4 text-[#213F74] rounded border-gray-300 focus:ring-[#213F74]"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {category}
                        <span className="text-gray-400 ml-1">
                          ({products.filter(p => p.category === category && p.inStock === "В наличии").length})
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Фильтр по цене */}
              <div className="mb-8">
                <h3 className="font-medium mb-4">Цена, ₽</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="От"
                    />
                    <span className="text-gray-400">—</span>
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) || 100000 }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="До"
                    />
                  </div>
                  <div className="relative pt-2">
                    <input
                      type="range"
                      min="0"
                      max="100000"
                      step="1000"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) }))}
                      className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#213F74]"
                    />
                  </div>
                </div>
              </div>

              {/* Статус наличия */}
              <div>
                <h3 className="font-medium mb-4">Наличие</h3>
                <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-100">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-3"></div>
                  <span className="text-sm text-gray-700">Только товары в наличии</span>
                </div>
              </div>
            </motion.div>
          </aside>

          {/* Основной контент */}
          <main className="lg:w-3/4">
            {/* Заголовок и сортировка */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                    Результаты поиска: "{query}"
                  </h1>
                  <p className="text-gray-600">
                    Найдено {filteredProducts.length} товаров
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <label className="text-sm text-gray-600 mr-2">Сортировка:</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#213F74] focus:border-transparent"
                    >
                      <option value="relevance">По релевантности</option>
                      <option value="price-asc">По возрастанию цены</option>
                      <option value="price-desc">По убыванию цены</option>
                      <option value="name-asc">По названию (А-Я)</option>
                      <option value="newest">Сначала новинки</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Активные фильтры */}
              <AnimatePresence>
                {(selectedCategories.length > 0 || priceRange.min > 0 || priceRange.max < 100000) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex flex-wrap gap-2 mb-6"
                  >
                    {selectedCategories.map(category => (
                      <button
                        key={category}
                        onClick={() => handleCategoryToggle(category)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm hover:bg-blue-100 transition-colors"
                      >
                        {category}
                        <span className="text-xs">×</span>
                      </button>
                    ))}
                    {(priceRange.min > 0 || priceRange.max < 100000) && (
                      <button
                        onClick={() => setPriceRange({ min: 0, max: 100000 })}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm hover:bg-blue-100 transition-colors"
                      >
                        Цена: {formatPrice(priceRange.min)} — {formatPrice(priceRange.max)}
                        <span className="text-xs">×</span>
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Результаты поиска */}
            <AnimatePresence mode="wait">
              {loading ? (
                <LoadingSkeleton />
              ) : filteredProducts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-sm p-12 text-center"
                >
                  <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    По запросу "{query}" ничего не найдено
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Попробуйте изменить поисковый запрос или сбросить фильтры
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="px-6 py-3 bg-[#213F74] text-white rounded-lg hover:bg-[#002D79] transition-colors font-medium"
                  >
                    Сбросить фильтры
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {paginatedItems.map((product) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        whileHover={{ y: -4 }}
                        className="group"
                      >
                        <Link
                          to={`/product/${product.slug}`}
                          className="block bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 h-full border border-gray-100"
                        >
                          {/* Бейдж товара */}
                          {product.labels && product.labels.length > 0 && (
                            <div className="absolute top-3 left-3 z-10">
                              {product.labels.map((label, index) => (
                                <span
                                  key={index}
                                  className={`inline-block px-2 py-1 text-xs font-medium rounded-md mr-1 ${
                                    label === "Новинки"
                                      ? "bg-blue-100 text-blue-800"
                                      : label === "Хиты продаж"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-green-100 text-green-800"
                                  }`}
                                >
                                  {label}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Изображение */}
                          <div className="relative overflow-hidden bg-gray-100 aspect-square">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                            
                            {/* Статус наличия */}
                            <div className="absolute bottom-3 right-3">
                              <div className="flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <span className="font-medium">В наличии</span>
                              </div>
                            </div>
                          </div>

                          {/* Контент карточки */}
                          <div className="p-4">
                            <div className="mb-2">
                              <span className="text-xs text-gray-500">
                                {product.category}
                              </span>
                            </div>
                            
                            <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-[#213F74] transition-colors">
                              {product.name}
                            </h3>
                            
                            <div className="flex items-center justify-between mt-4">
                              <div>
                                <div className="text-lg font-bold text-gray-900">
                                  {formatPrice(product.price)}
                                </div>
                                {product.oldPrice && (
                                  <div className="text-sm text-gray-400 line-through">
                                    {formatPrice(product.oldPrice)}
                                  </div>
                                )}
                              </div>
                              
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  // Здесь можно добавить логику добавления в корзину
                                }}
                                className="px-4 py-2 bg-[#213F74] text-white text-sm font-medium rounded-lg hover:bg-[#002D79] transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                              >
                                В корзину
                              </button>
                            </div>
                            
                            {/* Дополнительная информация */}
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>Арт. {product.articleNumber}</span>
                                <span>{product.collection}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* Пагинация */}
                  <Pagination />
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;