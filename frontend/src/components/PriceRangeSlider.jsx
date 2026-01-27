import { useState, useEffect, useRef, useCallback } from "react";

export default function PriceRangeSlider({ priceRange, setPriceRange }) {
  const minPrice = 20000;
  const maxPrice = 85000;
  const [minVal, setMinVal] = useState(priceRange[0]);
  const [maxVal, setMaxVal] = useState(priceRange[1]);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
      className="w-full p-4 md:p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            Диапазон цены
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Выберите подходящий диапазон цен
          </p>
        </div>
        <div className="px-3 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 min-w-[180px]">
          <div className="text-xs text-gray-500 font-medium mb-1">Текущий диапазон</div>
          <div className="text-sm md:text-base font-bold text-blue-600">
            {formatPrice(minVal)} - {formatPrice(maxVal)} ₽
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            От, ₽
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
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-100 transition-all duration-200"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            До, ₽
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
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-100 transition-all duration-200"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>


      <div className="relative py-4 md:py-6 px-1">

        <div className="absolute top-1/2 left-0 right-0 h-3 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-full transform -translate-y-1/2 shadow-inner" />
        
        <div
          className={`absolute top-1/2 h-3 rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 transform -translate-y-1/2 transition-all duration-200 ${
            isDragging ? "shadow-lg shadow-blue-200/50" : ""
          }`}
          style={{
            left: `${getPercent(minVal)}%`,
            right: `${100 - getPercent(maxVal)}%`,
          }}
        >

          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-500/20 blur-sm" />
        </div>

        {!isMobile && (
          <>
            <div
              className="absolute -top-8 transform -translate-x-1/2 transition-all duration-200"
              style={{ left: `${getPercent(minVal)}%` }}
            >
              <div className="relative">
                <div className="px-2 py-1 bg-white text-blue-600 text-xs font-bold rounded-lg shadow-lg border border-blue-100 whitespace-nowrap">
                  {formatPrice(minVal)} ₽
                </div>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white border-l border-t border-blue-100 rotate-45" />
              </div>
            </div>

            <div
              className="absolute -top-8 transform -translate-x-1/2 transition-all duration-200"
              style={{ left: `${getPercent(maxVal)}%` }}
            >
              <div className="relative">
                <div className="px-2 py-1 bg-white text-blue-600 text-xs font-bold rounded-lg shadow-lg border border-blue-100 whitespace-nowrap">
                  {formatPrice(maxVal)} ₽
                </div>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white border-l border-t border-blue-100 rotate-45" />
              </div>
            </div>
          </>
        )}

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

        <div
          className="absolute top-1/2 w-7 h-7 md:w-8 md:h-8 -translate-y-1/2 -translate-x-1/2 z-20 transition-transform duration-150 active:scale-110"
          style={{ left: `${getPercent(minVal)}%` }}
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-white rounded-full shadow-xl" />
            <div className="absolute inset-1 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full" />
            <div className="absolute inset-0 border-2 border-white rounded-full" />
            <div className="absolute inset-2 bg-white rounded-full opacity-20 animate-ping" />
            {isMobile && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-1 bg-white/50 rounded-full" />
              </div>
            )}
          </div>
        </div>

        <div
          className="absolute top-1/2 w-7 h-7 md:w-8 md:h-8 -translate-y-1/2 -translate-x-1/2 z-20 transition-transform duration-150 active:scale-110"
          style={{ left: `${getPercent(maxVal)}%` }}
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-white rounded-full shadow-xl" />
            <div className="absolute inset-1 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full" />
            <div className="absolute inset-0 border-2 border-white rounded-full" />
            <div className="absolute inset-2 bg-white rounded-full opacity-20 animate-ping" />
            {isMobile && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-1 bg-white/50 rounded-full" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6 px-1">
        <div className="flex flex-col items-start">
          <span className="text-xs text-gray-400">Мин.</span>
          <span className="text-sm font-semibold text-gray-600">
            {formatPrice(minPrice)} ₽
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs text-gray-400">Макс.</span>
          <span className="text-sm font-semibold text-gray-600">
            {formatPrice(maxPrice)} ₽
          </span>
        </div>
      </div>

      <div className="mt-8">
        <p className="text-sm text-gray-500 font-medium mb-3">Популярные диапазоны:</p>
        <div className="flex flex-wrap gap-2">
          {[
            { min: 25000, max: 35000, label: "25-35 тыс." },
            { min: 35000, max: 45000, label: "35-45 тыс." },
            { min: 45000, max: 55000, label: "45-55 тыс." },
            { min: 55000, max: 65000, label: "55-65 тыс." },
            { min: 65000, max: 75000, label: "65-75 тыс." },
            { min: 75000, max: 85000, label: "75-85 тыс." },
          ].map((range) => {
            const isActive = minVal === range.min && maxVal === range.max;
            return (
              <button
                key={range.label}
                onClick={() => {
                  handleMinChange(range.min);
                  handleMaxChange(range.max);
                }}
                className={`px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200 flex-1 min-w-[100px] sm:flex-none ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-md"
                }`}
              >
                {range.label}
              </button>
            );
          })}
        </div>
      </div>

      {isMobile && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="text-sm text-blue-600 font-medium">
              {formatPrice(minVal)} - {formatPrice(maxVal)} ₽
            </div>
            <div className="text-xs text-blue-500">
              👆 Перетаскивайте кружки
            </div>
          </div>
        </div>
      )}
    </div>
  );
}