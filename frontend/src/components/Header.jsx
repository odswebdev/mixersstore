import React, { useState, useRef, useEffect, useMemo } from "react";
import CartIcon from "../components/CartIcon";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "../data/products";

const Header = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    consent: false,
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [focused, setFocused] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(3);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  //const availableProducts = products.filter(product => product.inStock === "В наличии");

    // ИСПРАВЛЕНИЕ: useMemo чтобы не создавать массив заново при каждом рендере
    const availableProducts = useMemo(() => 
      products.filter(product => product.inStock === "В наличии"),
      [] // Пустой массив зависимостей - создается один раз
    );

  const links = [
    { id: 1, link: "О компании", href: "/about" },
    { id: 2, link: "Оплата и доставка", href: "/paydelivery" },
    { id: 3, link: "Магазины", href: "/stores" },
    { id: 4, link: "Контакты", href: "/contacts" },
  ];

  const links2 = [
    { id: 1, link: "Акции", href: "/promotions" },
    { id: 2, link: "Смесители", href: "/catalog/mixers" },
    { id: 3, link: "Душевые системы", href: "/catalog/showersystems" },
    { id: 4, link: "Душевые стойки", href: "/catalog/showerracks" },
    { id: 5, link: "Изливы", href: "/catalog/spouts" },
    { id: 6, link: "Аксессуары", href: "/catalog/accessories" },
  ];

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const searchContainerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      setDropdownOpen(false);
      return;
    }
    
    // Фильтрация товаров с удалением дубликатов по id
    const filtered = availableProducts.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
    );
    
    // Удаление дубликатов - оставляем только первый уникальный товар по id
    const uniqueProducts = [];
    const seenIds = new Set();
    
    for (const product of filtered) {
      if (!seenIds.has(product.id)) {
        seenIds.add(product.id);
        uniqueProducts.push(product);
      }
    }
    
    // Ограничение результатов
    const limitedResults = uniqueProducts.slice(0, 8);
    setResults(limitedResults);
    setDropdownOpen(limitedResults.length > 0 || query.trim() !== '');
  }, [query, availableProducts]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  // Упрощенная позиция дропдауна - всегда под полем поиска
  useEffect(() => {
    const updateDropdownPosition = () => {
      if (searchContainerRef.current && dropdownRef.current && dropdownOpen) {
        const searchRect = searchContainerRef.current.getBoundingClientRect();
        const containerRect = searchContainerRef.current.parentElement.getBoundingClientRect();
        
        // Для всех разрешений - позиционируем относительно контейнера поиска
        dropdownRef.current.style.position = 'absolute';
        dropdownRef.current.style.left = '0';
        dropdownRef.current.style.right = '0';
        dropdownRef.current.style.width = '100%';
        dropdownRef.current.style.top = '100%';
        dropdownRef.current.style.marginTop = '5px';
      }
    };

    updateDropdownPosition();
    window.addEventListener("resize", updateDropdownPosition);
    window.addEventListener("scroll", updateDropdownPosition);

    return () => {
      window.removeEventListener("resize", updateDropdownPosition);
      window.removeEventListener("scroll", updateDropdownPosition);
    };
  }, [dropdownOpen, isSearchVisible, query]);

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
      setDropdownOpen(false);
      setQuery("");
      if (window.innerWidth < 1024) {
        setIsSearchVisible(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const toggleSearch = () => {
    const newState = !isSearchVisible;
    setIsSearchVisible(newState);
    if (newState) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery("");
      setDropdownOpen(false);
    }
  };

  const handleProductClick = (productSlug) => {
    navigate(`/product/${productSlug}`);
    setDropdownOpen(false);
    setQuery("");
    if (window.innerWidth < 1024) {
      setIsSearchVisible(false);
      setMenuOpen(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price).replace('RUB', '₽');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Введите ваше имя";
    if (!formData.phone.trim()) newErrors.phone = "Введите номер телефона";
    if (!/^\+?\d{10,15}$/.test(formData.phone))
      newErrors.phone = "Неверный формат номера";
    if (!formData.consent)
      newErrors.consent = "Необходимо согласие с политикой";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setIsPopupOpen(false);
      setFormData({ name: "", phone: "", consent: false });
    }, 3000);
  };

  const renderSearchDropdown = () => (
    <motion.div
      ref={dropdownRef}
      className="absolute left-0 right-0 w-full bg-white shadow-2xl rounded-lg z-50 overflow-hidden border border-gray-200"
      style={{
        maxHeight: '400px',
        overflowY: 'auto',
        scrollbarWidth: 'thin',
        scrollbarColor: '#cbd5e1 transparent',
      }}
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {results.length === 0 && query.trim() !== '' ? (
        <div className="p-4 text-gray-500 text-center">
          Ничего не найдено
        </div>
      ) : (
        <>
          {results.map((product) => (
            <button
              key={product.id}
              onClick={() => handleProductClick(product.slug)}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
            >
              <div className="flex justify-between items-center">
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 truncate">
                    {product.name}
                  </div>
                  <div className="text-sm text-gray-500 truncate">
                    {product.category}
                  </div>
                </div>
                <div className="ml-3 flex-shrink-0">
                  <div className="font-semibold text-gray-900">
                    {formatPrice(product.price)}
                  </div>
                  {product.oldPrice && (
                    <div className="text-sm text-gray-400 line-through">
                      {formatPrice(product.oldPrice)}
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
          
          {results.length > 0 && (
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <button
                onClick={handleSearch}
                className="w-full py-3 bg-[#213F74] text-white rounded-lg hover:bg-[#002D79] transition-colors font-medium"
              >
                Показать все результаты ({results.length})
              </button>
            </div>
          )}
        </>
      )}
    </motion.div>
  );

  const renderMobileSearchDropdown = () => (
    <motion.div
      ref={dropdownRef}
      className="absolute left-0 right-0 w-full bg-white shadow-lg z-40 overflow-hidden border border-gray-200"
      style={{
        maxHeight: 'calc(100vh - 73px)',
        overflowY: 'auto',
      }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      {results.length === 0 && query.trim() !== '' ? (
        <div className="p-4 text-gray-500 text-center">
          Ничего не найдено
        </div>
      ) : (
        <>
          {results.map((product) => (
            <button
              key={product.id}
              onClick={() => handleProductClick(product.slug)}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
            >
              <div className="flex justify-between items-center">
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 truncate">
                    {product.name}
                  </div>
                  <div className="text-sm text-gray-500 truncate">
                    {product.category}
                  </div>
                </div>
                <div className="ml-3 flex-shrink-0">
                  <div className="font-semibold text-gray-900">
                    {formatPrice(product.price)}
                  </div>
                  {product.oldPrice && (
                    <div className="text-sm text-gray-400 line-through">
                      {formatPrice(product.oldPrice)}
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
          
          {results.length > 0 && (
            <div className="p-4 border-t border-gray-200 bg-gray-50 sticky bottom-0">
              <button
                onClick={handleSearch}
                className="w-full py-3 bg-[#213F74] text-white rounded-lg hover:bg-[#002D79] transition-colors font-medium"
              >
                Показать все результаты ({results.length})
              </button>
            </div>
          )}
        </>
      )}
    </motion.div>
  );

  return (
    <header className="relative">
      <div className="w-full bg-[#F3F5F7]">
        <div className="max-w-[1300px] mx-auto px-4">
          <div className="hidden lg:flex justify-between items-center w-full h-[36px] pt-[8px] pb-[8px]">
            <nav className="flex flex-row justify-between items-center">
              <ul className="flex flex-row items-center gap-[40px] list-none">
                {links.map(({ id, link, href }) => (
                  <li key={id} className="navbar__item">
                    <Link
                      className="text-[15px] text-[#00072D] no-underline hover:text-[#002D79]"
                      to={href}
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <Link to="/login" className="no-underline">
              <button className="flex justify-center items-center border-none text-[15px] text-[#213f74] font-medium p-[10px] w-[170px] h-[36px] bg-[#E8ECF0] hover:bg-[#C6BCB2] cursor-pointer">
                <svg
                  className="mr-[5px]"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.3346 19.25V17.4167C18.3346 16.4442 17.9483 15.5116 17.2607 14.8239C16.5731 14.1363 15.6404 13.75 14.668 13.75H7.33464C6.36217 13.75 5.42954 14.1363 4.74191 14.8239C4.05428 15.5116 3.66797 16.4442 3.66797 17.4167V19.25"
                    stroke="#213F74"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.9987 10.0833C13.0237 10.0833 14.6654 8.44171 14.6654 6.41667C14.6654 4.39162 13.0237 2.75 10.9987 2.75C8.97365 2.75 7.33203 4.39162 7.33203 6.41667C7.33203 8.44171 8.97365 10.0833 10.9987 10.0833Z"
                    stroke="#213F74"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Личный кабинет</span>
              </button>
            </Link>
          </div>
        </div>
        
        <div className="bg-white w-full">
          <div className="max-w-[1300px] mx-auto px-4 flex flex-row justify-between items-center py-4">
            {/* Логотип */}
            <div className="w-[100px] lg:w-[138px]">
              <Link to="/">
                <img className="w-full h-auto" src={logo} alt="Логотип" />
              </Link>
            </div>

            {/* Десктопный поиск */}
            <div 
              ref={searchContainerRef}
              className="hidden lg:block relative flex-1 max-w-[686px] mx-4"
            >
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Поиск по сайту"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onFocus={() => query.trim() !== '' && setDropdownOpen(true)}
                  className="w-full h-[50px] px-5 rounded-full border border-[#e5e9ec] focus:outline-none focus:ring-2 focus:ring-[#213F74] focus:border-transparent transition-all"
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#213F74] hover:text-[#002D79] transition-colors"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21.0004 21L16.6504 16.65"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              
              <AnimatePresence>
                {dropdownOpen && window.innerWidth >= 1024 && renderSearchDropdown()}
              </AnimatePresence>
            </div>

            {/* Мобильный поиск */}
            <AnimatePresence>
              {isSearchVisible && (
                <motion.div
                  className="lg:hidden fixed inset-0 bg-white z-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center">
                      <button
                        onClick={toggleSearch}
                        className="mr-3 p-2 hover:bg-gray-100 rounded-full"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19 12H5"
                            stroke="#213F74"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 19L5 12L12 5"
                            stroke="#213F74"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <div className="flex-1 relative" ref={searchContainerRef}>
                        <input
                          ref={inputRef}
                          type="text"
                          placeholder="Поиск по сайту"
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="w-full h-[50px] px-4 rounded-lg border border-[#e5e9ec] focus:outline-none focus:ring-2 focus:ring-[#213F74] focus:border-transparent"
                          autoFocus
                        />
                        <AnimatePresence>
                          {dropdownOpen && window.innerWidth < 1024 && (
                            <div className="absolute left-0 right-0 top-full mt-1">
                              {renderMobileSearchDropdown()}
                            </div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Мобильные иконки */}
            <div className="flex lg:hidden items-center space-x-3">
              <button
                onClick={toggleSearch}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F3F5F7] hover:bg-[#E8ECF0] transition-colors"
                aria-label="Поиск"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                    stroke="#213F74"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21.0004 21L16.6504 16.65"
                    stroke="#213F74"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <Link
                to="/login"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F3F5F7] hover:bg-[#E8ECF0] transition-colors"
                aria-label="Личный кабинет"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.3346 19.25V17.4167C18.3346 16.4442 17.9483 15.5116 17.2607 14.8239C16.5731 14.1363 15.6404 13.75 14.668 13.75H7.33464C6.36217 13.75 5.42954 14.1363 4.74191 14.8239C4.05428 15.5116 3.66797 16.4442 3.66797 17.4167V19.25"
                    stroke="#213F74"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.9987 10.0833C13.0237 10.0833 14.6654 8.44171 14.6654 6.41667C14.6654 4.39162 13.0237 2.75 10.9987 2.75C8.97365 2.75 7.33203 4.39162 7.33203 6.41667C7.33203 8.44171 8.97365 10.0833 10.9987 10.0833Z"
                    stroke="#213F74"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              <Link
                to="/cart"
                className="relative w-10 h-10 flex items-center justify-center rounded-full bg-[#F3F5F7] hover:bg-[#E8ECF0] transition-colors"
                aria-label="Корзина"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z"
                    stroke="#213F74"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 6H21"
                    stroke="#213F74"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10"
                    stroke="#213F74"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-[#FF4444] text-white text-xs font-bold rounded-full">
                    {cartItemsCount > 9 ? "9+" : cartItemsCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#213F74] hover:bg-[#002D79] transition-colors relative z-50"
                aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
              >
                <div className="flex flex-col items-center justify-center w-5 h-5">
                  <span
                    className={`block w-full h-0.5 bg-white rounded-full transition-all duration-300 ${
                      menuOpen ? "rotate-45 translate-y-1" : "-translate-y-1"
                    }`}
                  ></span>
                  <span
                    className={`block w-full h-0.5 bg-white rounded-full transition-all duration-300 mt-1 ${
                      menuOpen ? "opacity-0" : ""
                    }`}
                  ></span>
                  <span
                    className={`block w-full h-0.5 bg-white rounded-full transition-all duration-300 mt-1 ${
                      menuOpen ? "-rotate-45 -translate-y-1" : "translate-y-1"
                    }`}
                  ></span>
                </div>
              </button>
            </div>

            {/* Десктопный контакт и кнопка */}
            <div className="hidden lg:flex flex-col items-end justify-end">
              <span className="text-[22px] text-[#213F74] font-[600] text-right">
                <a className="no-underline" href="tel:+79999999999">
                  +7 999 999-99-99
                </a>
              </span>
              <div className="flex flex-row items-center">
                <svg
                  className="mr-[5px]"
                  width="6"
                  height="6"
                  viewBox="0 0 6 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="3" cy="3" r="3" fill="#00DE59" />
                </svg>
                <span className="text-[14px] text-[#00072D]">
                  Звоните с 8:10 до 18:10
                </span>
              </div>
            </div>

            <Link
              to="#"
              onClick={() => setIsPopupOpen(true)}
              className="hidden lg:flex justify-center items-center border-none rounded-[50px] text-[14px] text-[#fff] font-medium p-[14_28px] w-[170px] h-[50px] bg-[#213f74] hover:bg-[#002D79] cursor-pointer transition-colors"
            >
              Заказать звонок
            </Link>
          </div>
        </div>
        
        {/* Нижняя синяя панель */}
        <div className="bg-[#213F74] w-full hidden lg:block">
          <div className="max-w-[1300px] mx-auto px-4 flex flex-row justify-between items-center w-full h-[48px]">
            <nav className="flex flex-row justify-between items-center">
              <ul className="flex flex-row items-center gap-[40px] list-none">
                {links2.map(({ id, link, href }) => (
                  <li
                    key={id}
                    className="hover:m-0 hover:bg-[#002D79] pt-[12px] pb-[12px] pl-[15px] pr-[15px] transition-colors"
                  >
                    <Link
                      className="text-[15px] font-[500] text-[#FFF] no-underline"
                      to={href}
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <CartIcon />

            <div className="hidden w-[50px] h-[50px] bg-[#213f74] rounded-[37px]"></div>
          </div>
        </div>
      </div>

      {/* Мобильное меню */}
      {menuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="lg:hidden fixed top-0 right-0 h-full w-3/4 max-w-[320px] bg-white shadow-lg z-50 overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="p-6 flex flex-col h-full">
              <div className="flex items-center justify-between mb-8">
                <Link to="/" onClick={() => setMenuOpen(false)}>
                  <img className="w-32" src={logo} alt="Логотип" />
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F3F5F7] hover:bg-[#E8ECF0] transition-colors"
                  aria-label="Закрыть меню"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 6L6 18"
                      stroke="#213F74"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 6L18 18"
                      stroke="#213F74"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <nav className="flex-1">
                <div className="mb-4">
                  <button
                    onClick={() => setIsCatalogOpen(!isCatalogOpen)}
                    className="flex items-center justify-between w-full text-left text-[15px] text-[#00072D] font-medium py-3 hover:text-[#213F74]"
                  >
                    <span>Каталог</span>
                    <svg
                      className={`transform transition-transform duration-200 ${isCatalogOpen ? 'rotate-180' : ''}`}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="#213F74"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  
                  <AnimatePresence>
                    {isCatalogOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <ul className="pl-4 space-y-2 mt-2 mb-4">
                          <li>
                            <Link
                              to="/catalog/mixers"
                              className="block text-[14px] text-[#4D526C] no-underline hover:text-[#213F74] py-2"
                              onClick={() => setMenuOpen(false)}
                            >
                              Смесители
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/catalog/showersystems"
                              className="block text-[14px] text-[#4D526C] no-underline hover:text-[#213F74] py-2"
                              onClick={() => setMenuOpen(false)}
                            >
                              Душевые системы
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/catalog/showerracks"
                              className="block text-[14px] text-[#4D526C] no-underline hover:text-[#213F74] py-2"
                              onClick={() => setMenuOpen(false)}
                            >
                              Душевые стойки
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/catalog/spouts"
                              className="block text-[14px] text-[#4D526C] no-underline hover:text-[#213F74] py-2"
                              onClick={() => setMenuOpen(false)}
                            >
                              Изливы
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/catalog/accessories"
                              className="block text-[14px] text-[#4D526C] no-underline hover:text-[#213F74] py-2"
                              onClick={() => setMenuOpen(false)}
                            >
                              Аксессуары
                            </Link>
                          </li>
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mb-3">
                  <Link
                    to="/promotions"
                    className="block text-[15px] text-[#00072D] font-medium no-underline hover:text-[#213F74] py-3"
                    onClick={() => setMenuOpen(false)}
                  >
                    Акции
                  </Link>
                </div>

                <div className="mb-3">
                  <Link
                    to="/about"
                    className="block text-[15px] text-[#00072D] font-medium no-underline hover:text-[#213F74] py-3"
                    onClick={() => setMenuOpen(false)}
                  >
                    О компании
                  </Link>
                </div>

                <div className="mb-3">
                  <Link
                    to="/paydelivery"
                    className="block text-[15px] text-[#00072D] font-medium no-underline hover:text-[#213F74] py-3"
                    onClick={() => setMenuOpen(false)}
                  >
                    Оплата и доставка
                  </Link>
                </div>

                <div className="mb-3">
                  <Link
                    to="/stores"
                    className="block text-[15px] text-[#00072D] font-medium no-underline hover:text-[#213F74] py-3"
                    onClick={() => setMenuOpen(false)}
                  >
                    Магазины
                  </Link>
                </div>

                <div className="mb-6">
                  <Link
                    to="/contacts"
                    className="block text-[15px] text-[#00072D] font-medium no-underline hover:text-[#213F74] py-3"
                    onClick={() => setMenuOpen(false)}
                  >
                    Контакты
                  </Link>
                </div>

                <div className="mb-4">
                  <Link
                    to="/cart"
                    className="flex items-center text-[15px] text-[#213f74] font-medium no-underline py-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F3F5F7] mr-3">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z"
                          stroke="#213F74"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M3 6H21"
                          stroke="#213F74"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10"
                          stroke="#213F74"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    Корзина
                  </Link>
                </div>

                <div className="mb-8">
                  <Link
                    to="/login"
                    className="flex items-center text-[15px] text-[#213f74] font-medium no-underline py-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F3F5F7] mr-3">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.3346 19.25V17.4167C18.3346 16.4442 17.9483 15.5116 17.2607 14.8239C16.5731 14.1363 15.6404 13.75 14.668 13.75H7.33464C6.36217 13.75 5.42954 14.1363 4.74191 14.8239C4.05428 15.5116 3.66797 16.4442 3.66797 17.4167V19.25"
                          stroke="#213F74"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10.9987 10.0833C13.0237 10.0833 14.6654 8.44171 14.6654 6.41667C14.6654 4.39162 13.0237 2.75 10.9987 2.75C8.97365 2.75 7.33203 4.39162 7.33203 6.41667C7.33203 8.44171 8.97365 10.0833 10.9987 10.0833Z"
                          stroke="#213F74"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    Личный кабинет
                  </Link>
                </div>
              </nav>
              
              <div className="pt-6 border-t border-gray-200 mt-auto">
                <div className="mb-4">
                  <a 
                    href="tel:+79999999999" 
                    className="text-[18px] text-[#213F74] font-[600] no-underline block mb-1"
                  >
                    +7 999 999-99-99
                  </a>
                  <div className="flex items-center">
                    <svg
                      className="mr-2"
                      width="6"
                      height="6"
                      viewBox="0 0 6 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="3" cy="3" r="3" fill="#00DE59" />
                    </svg>
                    <span className="text-[12px] text-[#00072D]">
                      Звоните с 8:10 до 18:10
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setIsPopupOpen(true);
                      setMenuOpen(false);
                    }}
                    className="w-full rounded-[50px] text-[14px] text-white font-medium py-3 bg-[#213f74] hover:bg-[#002D79] cursor-pointer transition-colors"
                  >
                    Заказать звонок
                  </button>

                  <Link 
                    to="https://wa.me/79379676127" 
                    target="_blank"
                    className="flex justify-center items-center border-[2px] border-solid border-[#e5e9ec] rounded-[50px] p-[10px] w-full h-[50px] bg-[#f3f5f7] opacity-100 cursor-pointer hover:bg-[#E8ECF0] transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    <svg
                      className="mr-[10px]"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_0_44)">
                        <path
                          d="M10.0011 0.90918C15.022 0.90918 19.092 4.97918 19.092 10.0001C19.092 15.021 15.022 19.091 10.0011 19.091C8.39451 19.0936 6.81622 18.6684 5.42835 17.8592L0.913805 19.091L2.1429 14.5746C1.33298 13.1863 0.907485 11.6074 0.910169 10.0001C0.910169 4.97918 4.98017 0.90918 10.0011 0.90918ZM6.9029 5.72736L6.72108 5.73463C6.60337 5.7418 6.48833 5.77273 6.3829 5.82554C6.28428 5.88139 6.19426 5.9512 6.11562 6.03282C6.00653 6.13554 5.94471 6.22463 5.87835 6.311C5.5421 6.74818 5.36105 7.28492 5.36381 7.83645C5.36562 8.28191 5.48199 8.71554 5.66381 9.121C6.03562 9.941 6.64744 10.8092 7.45471 11.6137C7.64926 11.8074 7.84017 12.0019 8.04562 12.1828C9.04871 13.066 10.244 13.7029 11.5365 14.0428L12.0529 14.1219C12.2211 14.131 12.3893 14.1183 12.5584 14.1101C12.8231 14.0964 13.0816 14.0247 13.3156 13.9001C13.4347 13.8388 13.5509 13.772 13.6638 13.7001C13.6638 13.7001 13.7029 13.6746 13.7774 13.6183C13.9002 13.5274 13.9756 13.4628 14.0774 13.3565C14.1529 13.2783 14.2184 13.1865 14.2683 13.0819C14.3393 12.9337 14.4102 12.651 14.4393 12.4155C14.4611 12.2355 14.4547 12.1374 14.452 12.0765C14.4483 11.9792 14.3674 11.8783 14.2793 11.8355L13.7502 11.5983C13.7502 11.5983 12.9593 11.2537 12.4756 11.0337C12.425 11.0116 12.3708 10.999 12.3156 10.9965C12.2534 10.9901 12.1906 10.9971 12.1313 11.017C12.072 11.0369 12.0177 11.0693 11.972 11.1119C11.9674 11.1101 11.9065 11.1619 11.2493 11.9583C11.2115 12.009 11.1596 12.0473 11.1 12.0683C11.0404 12.0894 10.9759 12.0922 10.9147 12.0765C10.8555 12.0606 10.7975 12.0405 10.7411 12.0165C10.6284 11.9692 10.5893 11.951 10.512 11.9183C9.99023 11.6906 9.50716 11.383 9.08017 11.0065C8.96562 10.9065 8.85926 10.7974 8.75017 10.6919C8.39252 10.3494 8.08083 9.96191 7.8229 9.53918L7.76926 9.45282C7.73073 9.39478 7.69959 9.33218 7.67653 9.26645C7.64199 9.13282 7.73199 9.02554 7.73199 9.02554C7.73199 9.02554 7.9529 8.78372 8.05562 8.65282C8.15562 8.52554 8.24017 8.40191 8.29471 8.31373C8.40199 8.141 8.43562 7.96373 8.37926 7.82645C8.12471 7.20463 7.86108 6.58554 7.59017 5.971C7.53653 5.84918 7.37744 5.76191 7.2329 5.74463C7.18381 5.73918 7.13471 5.73373 7.08562 5.73009C6.96354 5.72402 6.8412 5.72524 6.71926 5.73373L6.90199 5.72645L6.9029 5.72736Z"
                          fill="#00B649"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_0_44">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="text-[14px] font-medium text-[#213f74]">
                      Написать в WhatsApp
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Попап обратного звонка */}
      <AnimatePresence>
        {isPopupOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg max-w-md w-full p-[40px] relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                onClick={() => setIsPopupOpen(false)}
                className="absolute top-0 right-4 text-[#D2D9DF] hover:text-gray-600 text-[1.85rem]"
              >
                ×
              </button>

              {!success ? (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-[34px] font-medium leading-[32px] text-[#122952] mb-[15px]">
                      Оставьте заявку на обратный звонок
                    </h2>
                    <p className="text-[14px] text-[#4D526C] mb-[20px]">
                      Заполните форму, наш специалист свяжется с вами в
                      ближайшее время.
                    </p>

                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-4"
                    >
                      <motion.input
                        type="text"
                        name="name"
                        placeholder="Ваше имя"
                        value={formData.name}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        onChange={handleChange}
                        className={`border rounded-[46px] bg-[#F3F5F7] p-[20px] w-full ${
                          errors.name ? "border-red-500" : "border-[#E5E9EC]"
                        }`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      {errors.name && (
                        <span className="text-red-500 text-sm">
                          {errors.name}
                        </span>
                      )}

                      <motion.input
                        type="text"
                        name="phone"
                        placeholder="Номер телефона"
                        value={formData.phone}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        onChange={handleChange}
                        className={`border rounded-[46px] bg-[#F3F5F7] p-[20px] w-full ${
                          errors.phone ? "border-red-500" : "border-[#E5E9EC]"
                        }`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.05 }}
                      />
                      {errors.phone && (
                        <span className="text-red-500 text-sm">
                          {errors.phone}
                        </span>
                      )}

                      <motion.label
                        className="flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <input
                          type="checkbox"
                          name="consent"
                          checked={formData.consent}
                          onChange={handleChange}
                          className="w-4 h-4"
                        />
                        <span className="text-[12px] text-[#4D526C]">
                          Я согласен(а) с Политикой конфиденциальности.
                        </span>
                      </motion.label>
                      {errors.consent && (
                        <span className="text-red-500 text-sm">
                          {errors.consent}
                        </span>
                      )}

                      <motion.button
                        type="submit"
                        className="text-[14px] bg-[#213F74] text-white rounded-[50px] p-3 font-medium hover:bg-[#002d79] transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Оставить заявку
                      </motion.button>
                    </form>
                  </motion.div>
                </>
              ) : (
                <motion.div
                  className="flex flex-col items-center justify-center py-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-green-500 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <h3 className="text-xl font-bold text-[#213F74] mb-2">
                    Спасибо!
                  </h3>
                  <p className="text-gray-600 text-center">
                    Ваша заявка успешно отправлена. Мы свяжемся с вами в
                    ближайшее время.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;