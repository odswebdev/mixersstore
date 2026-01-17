import { useState } from "react";
import { ChevronDown, ChevronRight, Heading3 } from "lucide-react";
import { Link } from "react-router-dom";
import PriceRangeSlider from "../components/PriceRangeSlider";

export default function SidebarCatalog({
  products, // 👈 добавили
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
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(true);
  const [isStylesOpen, setIsStylesOpen] = useState(true);
  const [isViewsOpen, setIsViewsOpen] = useState(true);
  const [isColorsOpen, setIsColorsOpen] = useState(true);
  const [isMountingTypesOpen, setIsMountingTypesOpen] = useState(true);
  const [isManagementsOpen, setIsManagementsOpen] = useState(true);
  const [isNumberSourcesOpen, setIsNumberSourcesOpen] = useState(true);
  const [priceRange, setPriceRange] = useState([20000, 85000]);

  // динамически считаем количество
  const collectionCounts = products.reduce((acc, p) => {
    acc[p.collection] = (acc[p.collection] || 0) + 1;
    return acc;
  }, {});

  const collections = Object.keys(collectionCounts).map((name) => ({
    name,
    count: collectionCounts[name],
  }));

  const uniqueStyles = [...new Set(products.map((p) => p.style))];
  const uniqueViews = [...new Set(products.map((p) => p.view))];
  const uniqueColors = [...new Set(products.map((p) => p.color))];
  const uniqueMountingTypes = [...new Set(products.map((p) => p.mountingType))];
  const uniqueManagements = [...new Set(products.map((p) => p.management))];
  const uniqueNumberSources = [...new Set(products.map((p) => p.numberSource))];

  const toggleCollection = (name) => {
    setSelectedCollections((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  };

  const toggleStyle = (name) => {
    setSelectedStyles((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  };

  const toggleView = (name) => {
    setSelectedViews((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  };

  const toggleColor = (name) => {
    setSelectedColors((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  };

  const toggleMountingType = (name) => {
    setMountingTypes((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  };

  const toggleManagement = (name) => {
    setSelectedManagements((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  };

  const toggleNumberSource = (name) => {
    setSelectedNumberSources((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  };

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

  return (
    <aside className="bg-white shadow-md rounded-lg p-4 border-t-[1px] border-t-[#E5E9EC] mb-[25px]">
      {/* Коллекция */}
      <div>
        <button
          onClick={() => setIsCollectionsOpen(!isCollectionsOpen)}
          className="flex items-baseline justify-between w-full text-lg font-semibold mb-2 border-none bg-transparent cursor-pointer"
        >
          <h2 className="text-[18px] font-medium text-[#122952] mt-6 mb-2">
            Коллекция
          </h2>
          {isCollectionsOpen ? (
            <ChevronDown className="w-[20px] h-[20px] text-gray-500" />
          ) : (
            <ChevronRight className="w-[20px] h-[20px] text-gray-500" />
          )}
        </button>

        {isCollectionsOpen && (
          <div className="space-y-2 pl-2">
            {collections.map((collection) => (
              <label
                key={collection.name}
                className="flex items-center gap-2 cursor-pointer mb-2"
              >
                <input
                  type="checkbox"
                  value={collection.name}
                  checked={selectedCollections.includes(collection.name)}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (selectedCollections.includes(value)) {
                      setSelectedCollections(
                        selectedCollections.filter((c) => c !== value)
                      );
                    } else {
                      setSelectedCollections([...selectedCollections, value]);
                    }
                  }}
                  className="w-4 h-4 accent-[#213F74] cursor-pointer"
                />
                <span className="flex items-center justify-between text-[14px] w-full">
                  <span
                    className={`transition-all ${
                      selectedCollections.includes(collection.name)
                        ? "text-[#213F74] font-semibold"
                        : "text-gray-700"
                    }`}
                  >
                    {collection.name}
                  </span>
                  <span className="ml-2 text-xs opacity-75">
                    ({collection.count})
                  </span>
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
      {/* Стиль */}
      <div>
        <button
          onClick={() => setIsStylesOpen(!isStylesOpen)}
          className="flex items-baseline justify-between w-full text-lg font-semibold mb-2 border-none bg-transparent cursor-pointer"
        >
          <h2 className="text-[18px] font-medium text-[#122952] mt-6 mb-2">
            Стиль
          </h2>
          {isStylesOpen ? (
            <ChevronDown className="w-[20px] h-[20px] text-gray-500" />
          ) : (
            <ChevronRight className="w-[20px] h-[20px] text-gray-500" />
          )}
        </button>

        {!isStylesOpen && (
          <div className="space-y-2 pl-2">
            {uniqueStyles.map((style) => (
              <label key={style} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedStyles.includes(style)}
                  onChange={() => toggleStyle(style)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-[16px] text-[#797D91]">{style}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      {/* Вид */}
      <div>
        <button
          onClick={() => setIsViewsOpen(!isViewsOpen)}
          className="flex items-baseline justify-between w-full text-lg font-semibold mb-2 border-none bg-transparent cursor-pointer"
        >
          <h2 className="text-[18px] font-medium text-[#122952] mt-6 mb-2">
            Вид
          </h2>
          {isViewsOpen ? (
            <ChevronDown className="w-[20px] h-[20px] text-gray-500" />
          ) : (
            <ChevronRight className="w-[20px] h-[20px] text-gray-500" />
          )}
        </button>

        {!isViewsOpen && (
          <div className="space-y-2 pl-2">
            {uniqueViews.map((view) => (
              <label key={view} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedViews.includes(view)}
                  onChange={() => toggleView(view)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-[16px] text-[#797D91]">{view}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      {/* Цвет */}
      <div>
        <button
          onClick={() => setIsColorsOpen(!isColorsOpen)}
          className="flex items-baseline justify-between w-full text-lg font-semibold mb-2 border-none bg-transparent cursor-pointer"
        >
          <h2 className="text-[18px] font-medium text-[#122952] mt-6 mb-2">
            Цвет
          </h2>
          {isColorsOpen ? (
            <ChevronDown className="w-[20px] h-[20px] text-gray-500" />
          ) : (
            <ChevronRight className="w-[20px] h-[20px] text-gray-500" />
          )}
        </button>

        {!isColorsOpen && (
          <div className="space-y-2 pl-2">
            {uniqueColors.map((color) => (
              <label key={color} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedColors.includes(color)}
                  onChange={() => toggleColor(color)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-[16px] text-[#797D91]">{color}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      {/* Тип монтажа */}
      <div>
        <button
          onClick={() => setIsMountingTypesOpen(!isMountingTypesOpen)}
          className="flex items-baseline justify-between w-full text-lg font-semibold mb-2 border-none bg-transparent cursor-pointer"
        >
          <h2 className="text-[18px] font-medium text-[#122952] mt-6 mb-2">
            Тип монтажа
          </h2>
          {isMountingTypesOpen ? (
            <ChevronDown className="w-[20px] h-[20px] text-gray-500" />
          ) : (
            <ChevronRight className="w-[20px] h-[20px] text-gray-500" />
          )}
        </button>

        {!isMountingTypesOpen && (
          <div className="space-y-2 pl-2">
            {uniqueMountingTypes.map((mountingType) => (
              <label key={mountingType} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedMountingTypes.includes(mountingType)}
                  onChange={() => toggleMountingType(mountingType)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-[16px] text-[#797D91]">
                  {mountingType}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
      {/* Управление */}
      <div>
        <button
          onClick={() => setIsManagementsOpen(!isManagementsOpen)}
          className="flex items-baseline justify-between w-full text-lg font-semibold mb-2 border-none bg-transparent cursor-pointer"
        >
          <h2 className="text-[18px] font-medium text-[#122952] mt-6 mb-2">
            Управление
          </h2>
          {isManagementsOpen ? (
            <ChevronDown className="w-[20px] h-[20px] text-gray-500" />
          ) : (
            <ChevronRight className="w-[20px] h-[20px] text-gray-500" />
          )}
        </button>

        {!isManagementsOpen && (
          <div className="space-y-2 pl-2">
            {uniqueManagements.map((management) => (
              <label key={management} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedManagements.includes(management)}
                  onChange={() => toggleManagement(management)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-[16px] text-[#797D91]">{management}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      {/* Кол-во источников */}
      <div>
        <button
          onClick={() => setIsNumberSourcesOpen(!isNumberSourcesOpen)}
          className="flex items-baseline justify-between w-full text-lg font-semibold mb-2 border-none bg-transparent cursor-pointer"
        >
          <h2 className="text-[18px] font-medium text-[#122952] mt-6 mb-2">
            Количество источников
          </h2>
          {isNumberSourcesOpen ? (
            <ChevronDown className="w-[20px] h-[20px] text-gray-500" />
          ) : (
            <ChevronRight className="w-[20px] h-[20px] text-gray-500" />
          )}
        </button>

        {!isNumberSourcesOpen && (
          <div className="space-y-2 pl-2">
            {uniqueNumberSources.map((numberSource) => (
              <label key={numberSource} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedNumberSources.includes(numberSource)}
                  onChange={() => toggleNumberSource(numberSource)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-[16px] text-[#797D91]">
                  {numberSource}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
      <PriceRangeSlider priceRange={priceRange} setPriceRange={setPriceRange} />
      {/* Сброс */}
      <Link
        onClick={resetFilters}
        className="mt-6 text-[14px] font-medium text-[#797D91] border-none bg-transparent underline cursor-pointer"
      >
        Сбросить фильтры
      </Link>
    </aside>
  );
}
