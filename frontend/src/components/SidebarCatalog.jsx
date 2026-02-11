import React from "react";
import { useState } from "react";
import { ChevronDown, ChevronRight, X, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import PriceRangeSlider from "../components/PriceRangeSlider";

export default function SidebarCatalog({
  products = [], // Значение по умолчанию - пустой массив
  selectedCollections,
  setSelectedCollections,
  selectedStyles,
  setSelectedStyles,
  selectedViews,
  setSelectedViews,
  selectedColors,
  setSelectedColors,
  selectedMountingTypes,
  setSelectedMountingTypes,
  selectedManagements,
  setSelectedManagements,
  selectedNumberSources,
  setSelectedNumberSources,
}) {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(true);
  const [isStylesOpen, setIsStylesOpen] = useState(true);
  const [isViewsOpen, setIsViewsOpen] = useState(true);
  const [isColorsOpen, setIsColorsOpen] = useState(true);
  const [isMountingTypesOpen, setIsMountingTypesOpen] = useState(true);
  const [isManagementsOpen, setIsManagementsOpen] = useState(true);
  const [isNumberSourcesOpen, setIsNumberSourcesOpen] = useState(true);
  const [priceRange, setPriceRange] = useState([20000, 85000]);

  // 🔹 БЕЗОПАСНАЯ проверка products
  const safeProducts = Array.isArray(products) ? products : [];

  // 🔹 Динамически считаем количество с защитой от null
  const collectionCounts = safeProducts.reduce((acc, p) => {
    if (p && p.collection) {
      acc[p.collection] = (acc[p.collection] || 0) + 1;
    }
    return acc;
  }, {});

  const collections = Object.keys(collectionCounts).map((name) => ({
    name,
    count: collectionCounts[name],
  }));

  // 🔹 Безопасное получение уникальных значений
  const getUniqueValues = (key) => {
    return [...new Set(
      safeProducts
        .filter(p => p && p[key]) // Фильтруем null и undefined
        .map(p => p[key])
    )];
  };

  const uniqueStyles = getUniqueValues('style');
  const uniqueViews = getUniqueValues('view');
  const uniqueColors = getUniqueValues('color');
  const uniqueMountingTypes = getUniqueValues('mountingType');
  const uniqueManagements = getUniqueValues('management');
  const uniqueNumberSources = getUniqueValues('numberSource');

  // Общие функции для переключения выбора
  const createToggleHandler = (setter) => (name) => {
    if (!name) return; // Защита от null/undefined
    setter((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  };

  const toggleCollection = createToggleHandler(setSelectedCollections);
  const toggleStyle = createToggleHandler(setSelectedStyles);
  const toggleView = createToggleHandler(setSelectedViews);
  const toggleColor = createToggleHandler(setSelectedColors);
  const toggleMountingType = createToggleHandler(setSelectedMountingTypes);
  const toggleManagement = createToggleHandler(setSelectedManagements);
  const toggleNumberSource = createToggleHandler(setSelectedNumberSources);

  const resetFilters = () => {
    setSelectedCollections([]);
    setSelectedStyles([]);
    setSelectedViews([]);
    setSelectedColors([]);
    setSelectedMountingTypes([]);
    setSelectedManagements([]);
    setSelectedNumberSources([]);
    setPriceRange([20000, 85000]);
  };

  const totalSelectedFilters = 
    selectedCollections.length +
    selectedStyles.length +
    selectedViews.length +
    selectedColors.length +
    selectedMountingTypes.length +
    selectedManagements.length +
    selectedNumberSources.length +
    (priceRange[0] !== 20000 || priceRange[1] !== 85000 ? 1 : 0);

  // Компонент секции фильтра с защитой от ошибок
  const FilterSection = ({ 
    title, 
    isOpen, 
    setIsOpen, 
    items = [], // Значение по умолчанию
    selectedItems = [], // Значение по умолчанию
    toggleItem,
    showCount = false,
    isColorSection = false
  }) => {
    // Безопасная проверка items
    const safeItems = Array.isArray(items) ? items : [];
    
    return (
      <div className="border-b border-gray-100 last:border-b-0">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full py-4 hover:bg-gray-50 transition-colors duration-200 rounded-lg px-1"
        >
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-gray-900">{title}</h3>
            {selectedItems.length > 0 && (
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full min-w-[20px] h-5 flex items-center justify-center">
                {selectedItems.length}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {isOpen ? (
              <ChevronDown className="w-5 h-5 text-gray-500 transition-transform duration-200" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-500 transition-transform duration-200" />
            )}
          </div>
        </button>
        
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[500px] opacity-100 mb-4" : "max-h-0 opacity-0"
        }`}>
          <div className="space-y-2 pb-2">
            {safeItems.map((item) => {
              // Защита от null/undefined
              if (!item) return null;
              
              const name = item.name || item;
              const count = item.count;
              const isSelected = selectedItems.includes(name);
              
              return (
                <button
                  key={name}
                  onClick={() => toggleItem(name)}
                  className={`flex items-center justify-between w-full p-3 rounded-lg transition-all duration-200 ${
                    isSelected 
                      ? "bg-blue-50 border border-blue-200" 
                      : "hover:bg-gray-50 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 border rounded-md flex items-center justify-center transition-colors ${
                      isSelected 
                        ? "bg-blue-600 border-blue-600" 
                        : "bg-white border-gray-300 hover:border-blue-400"
                    }`}>
                      {isSelected && (
                        <div className="w-2 h-2 bg-white rounded-sm" />
                      )}
                    </div>
                    <span className={`text-sm font-medium ${
                      isSelected ? "text-blue-700" : "text-gray-700"
                    }`}>
                      {name}
                    </span>
                  </div>
                  {showCount && count !== undefined && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      isSelected 
                        ? "bg-blue-100 text-blue-700" 
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Мобильная кнопка открытия фильтров */}
      <button
        onClick={() => setIsMobileFiltersOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 bg-white shadow-lg rounded-full p-4 flex items-center gap-2 border border-gray-200 animate-fade-in"
      >
        <Filter className="w-5 h-5" />
        {totalSelectedFilters > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
            {totalSelectedFilters}
          </span>
        )}
      </button>

      {/* Сайдбар для десктопа */}
      <aside className="hidden lg:block bg-white shadow-lg rounded-xl p-6 border border-gray-200 sticky top-6 h-fit transition-all duration-300 hover:shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-gray-700" />
            <h2 className="text-xl font-bold text-gray-900">Фильтры</h2>
          </div>
          {totalSelectedFilters > 0 && (
            <button
              onClick={resetFilters}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Сбросить ({totalSelectedFilters})
            </button>
          )}
        </div>

        <div className="space-y-1">
          <FilterSection
            title="Коллекция"
            isOpen={isCollectionsOpen}
            setIsOpen={setIsCollectionsOpen}
            items={collections}
            selectedItems={selectedCollections}
            toggleItem={toggleCollection}
            showCount={true}
          />
          
          <FilterSection
            title="Стиль"
            isOpen={isStylesOpen}
            setIsOpen={setIsStylesOpen}
            items={uniqueStyles}
            selectedItems={selectedStyles}
            toggleItem={toggleStyle}
          />
          
          <FilterSection
            title="Вид"
            isOpen={isViewsOpen}
            setIsOpen={setIsViewsOpen}
            items={uniqueViews}
            selectedItems={selectedViews}
            toggleItem={toggleView}
          />
          
          <FilterSection
            title="Цвет"
            isOpen={isColorsOpen}
            setIsOpen={setIsColorsOpen}
            items={uniqueColors}
            selectedItems={selectedColors}
            toggleItem={toggleColor}
          />
          
          <FilterSection
            title="Тип монтажа"
            isOpen={isMountingTypesOpen}
            setIsOpen={setIsMountingTypesOpen}
            items={uniqueMountingTypes}
            selectedItems={selectedMountingTypes}
            toggleItem={toggleMountingType}
          />
          
          <FilterSection
            title="Управление"
            isOpen={isManagementsOpen}
            setIsOpen={setIsManagementsOpen}
            items={uniqueManagements}
            selectedItems={selectedManagements}
            toggleItem={toggleManagement}
          />
          
          <FilterSection
            title="Кол-во источников"
            isOpen={isNumberSourcesOpen}
            setIsOpen={setIsNumberSourcesOpen}
            items={uniqueNumberSources}
            selectedItems={selectedNumberSources}
            toggleItem={toggleNumberSource}
          />
        </div>

        {/* Ценовой диапазон */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Цена, ₽</h3>
          <div className="px-1">
            <PriceRangeSlider priceRange={priceRange} setPriceRange={setPriceRange} />
          </div>
        </div>

        {/* Кнопка сброса */}
        <button
          onClick={resetFilters}
          className="w-full mt-8 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors duration-200 border border-gray-300 hover:border-gray-400 active:scale-[0.98]"
        >
          Сбросить все фильтры
        </button>
      </aside>

      {/* Мобильная версия фильтров */}
      {isMobileFiltersOpen && (
        <>
          {/* Оверлей */}
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 z-50 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsMobileFiltersOpen(false)}
          />
          
          {/* Сайдбар для мобильных */}
          <aside className="lg:hidden fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto animate-slide-in">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Filter className="w-6 h-6 text-gray-700" />
                  <h2 className="text-xl font-bold text-gray-900">Фильтры</h2>
                  {totalSelectedFilters > 0 && (
                    <span className="bg-blue-600 text-white text-sm px-2 py-1 rounded-full">
                      {totalSelectedFilters}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-4">
              <FilterSection
                title="Коллекция"
                isOpen={isCollectionsOpen}
                setIsOpen={setIsCollectionsOpen}
                items={collections}
                selectedItems={selectedCollections}
                toggleItem={toggleCollection}
                showCount={true}
              />
              
              <FilterSection
                title="Стиль"
                isOpen={isStylesOpen}
                setIsOpen={setIsStylesOpen}
                items={uniqueStyles}
                selectedItems={selectedStyles}
                toggleItem={toggleStyle}
              />
              
              <FilterSection
                title="Вид"
                isOpen={isViewsOpen}
                setIsOpen={setIsViewsOpen}
                items={uniqueViews}
                selectedItems={selectedViews}
                toggleItem={toggleView}
              />
              
              <FilterSection
                title="Цвет"
                isOpen={isColorsOpen}
                setIsOpen={setIsColorsOpen}
                items={uniqueColors}
                selectedItems={selectedColors}
                toggleItem={toggleColor}
              />
              
              <FilterSection
                title="Тип монтажа"
                isOpen={isMountingTypesOpen}
                setIsOpen={setIsMountingTypesOpen}
                items={uniqueMountingTypes}
                selectedItems={selectedMountingTypes}
                toggleItem={toggleMountingType}
              />
              
              <FilterSection
                title="Управление"
                isOpen={isManagementsOpen}
                setIsOpen={setIsManagementsOpen}
                items={uniqueManagements}
                selectedItems={selectedManagements}
                toggleItem={toggleManagement}
              />
              
              <FilterSection
                title="Кол-во источников"
                isOpen={isNumberSourcesOpen}
                setIsOpen={setIsNumberSourcesOpen}
                items={uniqueNumberSources}
                selectedItems={selectedNumberSources}
                toggleItem={toggleNumberSource}
              />

              {/* Ценовой диапазон для мобильных */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="text-base font-semibold text-gray-900 mb-4">Цена, ₽</h3>
                <div className="px-1">
                  <PriceRangeSlider priceRange={priceRange} setPriceRange={setPriceRange} />
                </div>
              </div>

              {/* Кнопки действий для мобильных */}
              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 mt-6">
                <div className="flex gap-3">
                  <button
                    onClick={resetFilters}
                    className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors duration-200"
                  >
                    Сбросить
                  </button>
                  <button
                    onClick={() => setIsMobileFiltersOpen(false)}
                    className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                  >
                    Показать товары
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </>
      )}

      {/* Добавляем стили для анимаций */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        
        /* Кастомный скроллбар */
        .overflow-y-auto {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 #f1f5f9;
        }
        
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </>
  );
}