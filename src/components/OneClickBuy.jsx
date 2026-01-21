import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OneClickBuy = ({ productId, productName, isOpen, onClose, price, productImage }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1); // 1 - форма, 2 - успех
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  
  const navigate = useNavigate();
  const modalRef = useRef();
  const inputRef = useRef();

  // Анимация появления
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 300);
    } else {
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);

  // Закрытие при клике вне модалки
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target) && isOpen) {
        handleClose();
      }
    };
    
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  // Валидация телефона
  const validatePhone = (phone) => {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  // Валидация email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    
    if (value && !validatePhone(value)) {
      setPhoneError("Введите корректный номер телефона");
    } else {
      setPhoneError("");
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    if (value && !validateEmail(value)) {
      setEmailError("Введите корректный email");
    } else {
      setEmailError("");
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
      setStep(1);
      setError("");
      setName("");
      setPhone("");
      setEmail("");
    }, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Валидация
    if (!name.trim()) {
      setError("Введите имя");
      return;
    }
    
    if (!phone.trim()) {
      setError("Введите телефон");
      return;
    }
    
    if (!validatePhone(phone)) {
      setError("Введите корректный номер телефона");
      return;
    }
    
    if (!email.trim()) {
      setError("Введите email");
      return;
    }
    
    if (!validateEmail(email)) {
      setError("Введите корректный email");
      return;
    }
    
    setLoading(true);
    
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const orderId = `ORDER-${Date.now()}`;
      
      // Сохраняем данные заказа
      localStorage.setItem("lastOrder", JSON.stringify({
        orderId,
        productName,
        price,
        customerName: name,
        email,
        phone
      }));
      
      setSuccess(true);
      setStep(2);
      
      // Автоматическое закрытие через 3 секунды
      setTimeout(() => {
        handleClose();
        navigate(`/payment/${orderId}`);
      }, 3000);
      
    } catch (err) {
      setError("Ошибка при создании заказа. Попробуйте снова.");
      console.error("Order creation error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen && !isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 transition-all duration-300 ${
      isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}>
      {/* Фон с размытием */}
      <div className={`absolute inset-0 bg-black transition-all duration-300 ${
        isVisible ? 'opacity-50' : 'opacity-0'
      } backdrop-blur-sm`}></div>
      
      {/* Контент модалки */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div
          ref={modalRef}
          className={`relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 ${
            isVisible 
              ? 'translate-y-0 opacity-100 scale-100' 
              : 'translate-y-10 opacity-0 scale-95'
          }`}
        >
          {/* Анимированная шапка */}
          <div className="relative overflow-hidden rounded-t-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-90"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 animate-gradient-x"></div>
            
            <div className="relative p-6">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-all duration-200 group"
              >
                <span className="text-white text-lg font-light transform group-hover:rotate-90 transition-transform duration-200">
                  ✕
                </span>
              </button>
              
              <div className="flex items-center space-x-4">
                {productImage && (
                  <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg">
                    <img 
                      src={productImage} 
                      alt={productName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <h2 className="text-white text-xl font-bold">
                    Купить в 1 клик
                  </h2>
                  <p className="text-white/90 text-sm mt-1">{productName}</p>
                </div>
              </div>
              
              {price && (
                <div className="mt-4 flex items-center justify-between bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                  <span className="text-white/80">Сумма к оплате:</span>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-white">{price}</span>
                    <span className="text-white/80 ml-1">₽</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Основной контент */}
          <div className="p-6">
            {/* Индикатор шагов */}
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  step === 1 
                    ? 'bg-blue-600 text-white scale-110' 
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  1
                </div>
                <div className={`w-12 h-1 mx-2 transition-all duration-300 ${
                  step === 2 ? 'bg-blue-600' : 'bg-gray-200'
                }`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  step === 2 
                    ? 'bg-blue-600 text-white scale-110' 
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  2
                </div>
              </div>
            </div>
            
            {step === 1 ? (
              <>
                {error && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl animate-shake">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-red-600 font-medium">{error}</span>
                    </div>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Поле имени */}
                  <div className="relative group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ваше имя *
                    </label>
                    <div className="relative">
                      <input
                        ref={inputRef}
                        type="text"
                        placeholder="Иван Иванов"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 group-hover:border-blue-400"
                        required
                      />
                      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-200 pointer-events-none transition-all duration-200"></div>
                    </div>
                  </div>
                  
                  {/* Поле телефона */}
                  <div className="relative group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Телефон *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="+7 (999) 123-45-67"
                        value={phone}
                        onChange={handlePhoneChange}
                        className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                          phoneError 
                            ? 'border-red-300 focus:ring-red-500' 
                            : 'border-gray-300 focus:ring-blue-500 group-hover:border-blue-400'
                        }`}
                        required
                      />
                      {phone && !phoneError && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                    {phoneError && (
                      <p className="mt-1 text-sm text-red-600 animate-fadeIn">{phoneError}</p>
                    )}
                  </div>
                  
                  {/* Поле email */}
                  <div className="relative group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email для чека *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="example@mail.ru"
                        value={email}
                        onChange={handleEmailChange}
                        className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                          emailError 
                            ? 'border-red-300 focus:ring-red-500' 
                            : 'border-gray-300 focus:ring-blue-500 group-hover:border-blue-400'
                        }`}
                        required
                      />
                      {email && !emailError && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                    {emailError && (
                      <p className="mt-1 text-sm text-red-600 animate-fadeIn">{emailError}</p>
                    )}
                  </div>
                  
                  {/* Кнопка отправки */}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg shadow-lg transition-all duration-300 transform ${
                      loading 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin h-6 w-6 mr-3 text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                        </svg>
                        Обработка...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        Перейти к оплате
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                        </svg>
                      </span>
                    )}
                  </button>
                  
                  {/* Дополнительная информация */}
                  <div className="pt-2">
                    <p className="text-xs text-gray-500 text-center">
                      Нажимая кнопку, вы соглашаетесь с{" "}
                      <a href="/privacy" className="text-blue-600 hover:text-blue-800 underline">
                        условиями обработки персональных данных
                      </a>
                    </p>
                    
                    {/* Преимущества */}
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        Быстро
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        Безопасно
                      </div>
                    </div>
                  </div>
                </form>
              </>
            ) : (
              /* Экран успеха */
              <div className="text-center py-8 animate-fadeIn">
                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Заказ создан успешно!
                </h3>
                
                <p className="text-gray-600 mb-6">
                  Спасибо за ваш заказ, {name}! Сейчас вы будете перенаправлены на страницу оплаты
                </p>
                
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Заказ №</span>
                    <span className="font-semibold">ORDER-{Date.now().toString().slice(-8)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Товар</span>
                    <span className="font-semibold">{productName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Сумма</span>
                    <span className="text-lg font-bold text-green-600">{price} ₽</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-center text-gray-500">
                  <svg className="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  <span>Перенаправление через 3 секунды...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Пропсы по умолчанию
OneClickBuy.defaultProps = {
  price: null,
  productImage: null,
};

export default OneClickBuy;