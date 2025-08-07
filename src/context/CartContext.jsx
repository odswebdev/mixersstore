import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(() => {
    // Получаем значение из localStorage при первом рендере
    const savedCount = localStorage.getItem("cartCount");
    return savedCount ? JSON.parse(savedCount) : 0;
  });

  const addToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  // Сохраняем значение в localStorage при каждом изменении cartCount
  useEffect(() => {
    localStorage.setItem("cartCount", JSON.stringify(cartCount));
  }, [cartCount]);

  return (
    <CartContext.Provider value={{ cartCount, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
