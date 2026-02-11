import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";

export default function PriceRangeSlider({ priceRange, setPriceRange }) {
  const minPrice = 20000;
  const maxPrice = 85000;
  const [minVal, setMinVal] = useState(priceRange[0]);
  const [maxVal, setMaxVal] = useState(priceRange[1]);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const minThumbRef = useRef(null);
  const maxThumbRef = useRef(null);

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
    const newValue = Math.min(Math.max(value, minPrice), maxVal - 1000);
    setMinVal(newValue);
  };

  const handleMaxChange = (value) => {
    const newValue = Math.max(Math.min(value, maxPrice), minVal + 1000);
    setMaxVal(newValue);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("ru-RU").format(price);
  };

  return (
    <div
      ref={containerRef}
      className="w-full max-w-3xl mx-auto bg-white rounded-2xl"
    >
      {/* Заголовок и текущий диапазон */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        
      </div>

      {/* Поля ввода */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1">
          <div className="relative">
            <input
              type="number"
              min={minPrice}
              max={maxVal - 1000}
              value={minVal}
              onChange={(e) => handleMinChange(+e.target.value)}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
        </div>

        <div className="flex-1">
          <div className="relative">
            <input
              type="number"
              min={minVal + 1000}
              max={maxPrice}
              value={maxVal}
              onChange={(e) => handleMaxChange(+e.target.value)}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Слайдер */}
      <div className="relative pt-6 pb-2 px-1">
        {/* Фоновая линия */}
        <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-gray-200 rounded-full -translate-y-1/2" />
        
        {/* Активная линия */}
        <div
          className={`absolute top-1/2 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 -translate-y-1/2 transition-all ${
            isDragging ? "opacity-100" : "opacity-90"
          }`}
          style={{
            left: `${getPercent(minVal)}%`,
            right: `${100 - getPercent(maxVal)}%`,
          }}
        />

        {/* Левый ползунок */}
        <div
          ref={minThumbRef}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 group"
          style={{ left: `${getPercent(minVal)}%` }}
        >
          <div className="relative">
            <div className="w-5 h-5 bg-white border-2 border-blue-500 rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all cursor-pointer" />
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {formatPrice(minVal)} ₽
            </div>
          </div>
        </div>

        {/* Правый ползунок */}
        <div
          ref={maxThumbRef}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 group"
          style={{ left: `${getPercent(maxVal)}%` }}
        >
          <div className="relative">
            <div className="w-5 h-5 bg-white border-2 border-blue-500 rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all cursor-pointer" />
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {formatPrice(maxVal)} ₽
            </div>
          </div>
        </div>

        {/* Невидимые range инпуты для управления */}
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={minVal}
          onChange={(e) => handleMinChange(+e.target.value)}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          className="absolute top-1/2 left-0 w-full h-5 -translate-y-1/2 opacity-0 cursor-pointer z-30"
          style={{ pointerEvents: 'auto' }}
        />

        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={maxVal}
          onChange={(e) => handleMaxChange(+e.target.value)}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          className="absolute top-1/2 left-0 w-full h-5 -translate-y-1/2 opacity-0 cursor-pointer z-30"
          style={{ pointerEvents: 'auto' }}
        />
      </div>

      {/* Подсказка для мобильных */}
      <div className="mt-4 flex justify-center sm:hidden">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>👆</span>
          <span>Перетаскивайте кружки</span>
        </div>
      </div>
    </div>
  );
}