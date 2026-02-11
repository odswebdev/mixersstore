import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import ScrollToTop from "./components/ScrollToTop";
import App from "./App";
import "./index.css";

// Эти импорты скорее всего не нужны, удалите если файлов нет:
// import "./libs/jquery.min.js";
// import "./libs/swiper-bundle.min.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/mixersstore">
      <CartProvider>
        <ScrollToTop />
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);