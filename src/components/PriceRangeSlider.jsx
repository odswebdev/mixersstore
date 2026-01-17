import { useState, useEffect } from "react";

export default function PriceRangeSlider({ priceRange, setPriceRange }) {
  const minPrice = 20000;
  const maxPrice = 85000;

  const [minVal, setMinVal] = useState(priceRange[0]);
  const [maxVal, setMaxVal] = useState(priceRange[1]);

  useEffect(() => {
    setPriceRange([minVal, maxVal]);
  }, [minVal, maxVal]);

  const getPercent = (value) =>
    ((value - minPrice) / (maxPrice - minPrice)) * 100;

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md border-t border-[#E5E9EC]">
      <h2 className="text-[18px] font-medium text-[#122952] mb-4">
        Цена, руб.
      </h2>

      {/* Поля ввода */}
      <div className="flex items-center space-x-2 mb-4">
        <input
          type="number"
          min={minPrice}
          max={maxVal - 1000}
          value={minVal}
          onChange={(e) => setMinVal(Math.min(+e.target.value, maxVal - 1000))}
          className="w-20 border rounded p-1 text-sm"
        />
        <span>-</span>
        <input
          type="number"
          min={minVal + 1000}
          max={maxPrice}
          value={maxVal}
          onChange={(e) => setMaxVal(Math.max(+e.target.value, minVal + 1000))}
          className="w-20 border rounded p-1 text-sm"
        />
      </div>

      {/* Ползунок */}
      <div className="relative h-6">
        {/* Полная линия */}
        <div className="absolute h-1 w-full top-2.5 rounded bg-gray-300" />

        {/* Выделенный диапазон с градиентом */}
        <div
          className="absolute h-1 top-2.5 rounded transition-all duration-200"
          style={{
            left: `${getPercent(minVal)}%`,
            right: `${100 - getPercent(maxVal)}%`,
            background: "linear-gradient(90deg, #2563eb, #3b82f6)",
          }}
        />

        {/* Минимальная ручка */}
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={minVal}
          onChange={(e) => setMinVal(Math.min(+e.target.value, maxVal - 1000))}
          className="absolute w-full h-6 appearance-none pointer-events-auto bg-transparent"
        />

        {/* Максимальная ручка */}
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={maxVal}
          onChange={(e) => setMaxVal(Math.max(+e.target.value, minVal + 1000))}
          className="absolute w-full h-6 appearance-none pointer-events-auto bg-transparent"
        />

        {/* Стили для ручек */}
        <style jsx>{`
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: #2563eb;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
            cursor: pointer;
            transition: transform 0.2s;
            border: none;
            margin-top: -8px;
          }
          input[type="range"]::-webkit-slider-thumb:hover {
            transform: scale(1.2);
          }
          input[type="range"]::-moz-range-thumb {
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: #2563eb;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
            cursor: pointer;
            transition: transform 0.2s;
            border: none;
          }
          input[type="range"]::-ms-thumb {
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: #2563eb;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
            cursor: pointer;
            transition: transform 0.2s;
            border: none;
          }
        `}</style>
      </div>
    </div>
  );
}
