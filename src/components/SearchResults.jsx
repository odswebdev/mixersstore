import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";

import { products } from "../data/products";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ITEMS_PER_PAGE = 6;

const SearchResults = () => {
  const query = useQuery().get("query") || "";
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginatedItems = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">
        Результаты поиска: "{query}"
      </h1>

      {filtered.length === 0 ? (
        <p className="text-gray-500">Ничего не найдено</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedItems.map((product) => (
              <Link
                key={product.id}
                to={`/catalog/${product.slug}`}
                className="border rounded-lg overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full object-cover"
                />
                <div className="p-4">
                  <h2 className="font-medium text-lg">{product.name}</h2>
                  <p className="text-gray-600 mt-2">{product.price} руб.</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Пагинация */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-3">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 rounded ${
                    currentPage === index + 1
                      ? "bg-[#213F74] text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;
