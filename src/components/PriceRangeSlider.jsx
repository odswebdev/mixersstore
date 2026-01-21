import { useState, useEffect, useRef, useCallback } from "react";

export default function PriceRangeSlider({ priceRange, setPriceRange }) {
  const minPrice = 20000;
  const maxPrice = 85000;
  const [minVal, setMinVal] = useState(priceRange[0]);
  const [maxVal, setMaxVal] = useState(priceRange[1]);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Дебаунс обновления диапазона
  useEffect(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      setPriceRange([minVal, maxVal]);
    });

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [minVal, maxVal, setPriceRange]);

  const getPercent = useCallback(
    (value) => ((value - minPrice) / (maxPrice - minPrice)) * 100,
    [minPrice, maxPrice]
  );

  const handleMinChange = (value) => {
    const newValue = Math.min(value, maxVal - 1000);
    setMinVal(Math.max(newValue, minPrice));
  };

  const handleMaxChange = (value) => {
    const newValue = Math.max(value, minVal + 1000);
    setMaxVal(Math.min(newValue, maxPrice));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("ru-RU").format(price);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  return (
    <div
      ref={containerRef}
      className="w-full p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Диапазон цены
        </h2>
        <div className="px-3 py-1.5 bg-blue-50 rounded-full">
          <span className="text-sm font-medium text-blue-600">
            {formatPrice(minVal)} - {formatPrice(maxVal)} руб.
          </span>
        </div>
      </div>

      {/* Поля ввода с улучшенным дизайном */}
      <div className="flex items-center justify-between mb-8">
        <div className="relative flex-1 mr-4">
          <label className="block text-sm font-medium text-gray-600 mb-1.5">
            От
          </label>
          <div className="relative">
            <input
              type="number"
              min={minPrice}
              max={maxVal - 1000}
              value={minVal}
              onChange={(e) => handleMinChange(+e.target.value)}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <span className="text-gray-400">₽</span>
            </div>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        <div className="relative flex-1 ml-4">
          <label className="block text-sm font-medium text-gray-600 mb-1.5">
            До
          </label>
          <div className="relative">
            <input
              type="number"
              min={minVal + 1000}
              max={maxPrice}
              value={maxVal}
              onChange={(e) => handleMaxChange(+e.target.value)}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <span className="text-gray-400">₽</span>
            </div>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Улучшенный ползунок */}
      <div className="relative py-6">
        {/* Фоновая линия с градиентом */}
        <div className="absolute top-1/2 left-0 right-0 h-2 bg-gradient-to-r from-gray-200 via-gray-200 to-gray-200 rounded-full transform -translate-y-1/2" />

        {/* Активный диапазон с анимированным градиентом */}
        <div
          className={`absolute top-1/2 h-2 rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 transform -translate-y-1/2 transition-all duration-300 ${
            isDragging ? "shadow-lg shadow-blue-200" : ""
          }`}
          style={{
            left: `${getPercent(minVal)}%`,
            right: `${100 - getPercent(maxVal)}%`,
          }}
        >
          {/* Индикатор цены на минимуме */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <div className="relative">
              <div className="px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded-md whitespace-nowrap transition-all duration-200">
                {formatPrice(minVal)} ₽
              </div>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-600 rotate-45" />
            </div>
          </div>

          {/* Индикатор цены на максимуме */}
          <div className="absolute -top-8 right-1/2 transform translate-x-1/2">
            <div className="relative">
              <div className="px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded-md whitespace-nowrap transition-all duration-200">
                {formatPrice(maxVal)} ₽
              </div>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-600 rotate-45" />
            </div>
          </div>
        </div>

        {/* Минимальная ручка */}
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={minVal}
          onChange={(e) => handleMinChange(+e.target.value)}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          className="absolute w-full h-10 top-1/2 transform -translate-y-1/2 opacity-0 cursor-pointer z-10"
        />

        {/* Максимальная ручка */}
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={maxVal}
          onChange={(e) => handleMaxChange(+e.target.value)}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          className="absolute w-full h-10 top-1/2 transform -translate-y-1/2 opacity-0 cursor-pointer z-10"
        />

        {/* Кастомные ручки */}
        <div
          className="absolute top-1/2 w-6 h-6 -translate-y-1/2 -translate-x-1/2 z-20"
          style={{ left: `${getPercent(minVal)}%` }}
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-white rounded-full shadow-lg" />
            <div className="absolute inset-1 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full" />
            <div className="absolute inset-2 bg-white rounded-full opacity-30 animate-ping" />
          </div>
        </div>

        <div
          className="absolute top-1/2 w-6 h-6 -translate-y-1/2 -translate-x-1/2 z-20"
          style={{ left: `${getPercent(maxVal)}%` }}
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-white rounded-full shadow-lg" />
            <div className="absolute inset-1 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full" />
            <div className="absolute inset-2 bg-white rounded-full opacity-30 animate-ping" />
          </div>
        </div>
      </div>

      {/* Минимальные и максимальные значения */}
      <div className="flex justify-between mt-2">
        <span className="text-sm text-gray-500 font-medium">
          {formatPrice(minPrice)} ₽
        </span>
        <span className="text-sm text-gray-500 font-medium">
          {formatPrice(maxPrice)} ₽
        </span>
      </div>

      {/* Кнопки быстрого выбора */}
      <div className="flex flex-wrap gap-2 mt-6">
        {[
          25000, 35000, 45000, 55000, 65000, 75000
        ].map((price) => (
          <button
            key={price}
            onClick={() => {
              handleMinChange(price);
              handleMaxChange(price + 10000);
            }}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
              minVal <= price && maxVal >= price + 10000
                ? "bg-blue-100 text-blue-600 border border-blue-200"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {formatPrice(price)}
          </button>
        ))}
      </div>
    </div>
  );
}
