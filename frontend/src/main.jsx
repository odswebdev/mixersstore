import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext.jsx";
import ScrollToTop from "./components/ScrollToTop";
import App from "./App";
import "../src/libs/jquery.min.js";
import "../src/libs/swiper-bundle.min.js";
import "./index.css";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  if (root) {
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <BrowserRouter basename="/mixersstore">
          <CartProvider>
            <ScrollToTop />
            <App />
          </CartProvider>
        </BrowserRouter>
      </React.StrictMode>
    );
  }
});
