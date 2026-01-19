import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AccountPage from "./pages/AccountPage";
import UserAgreement from "./pages/UserAgreement";
import OfferAgreement from "./pages/OfferAgreement";
import AboutCompany from "./pages/AboutCompany";
import Contacts from "./pages/Contacts";
import Stores from "./pages/Stores";
import DeliveryAndPayment from "./pages/DeliveryAndPayment";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Promotions from "./pages/Promotions";
import PromotionDetail from "./pages/PromotionDetail";
import ProductDetail from "./pages/ProductDetail";
import SearchResults from "./components/SearchResults";
import PaymentPage from "./pages/PaymentPage";
import NotFound from "./pages/NotFound";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<AccountPage />} />
      <Route path="/" element={<Home />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/soglasie" element={<UserAgreement />} />
      <Route path="/buy" element={<CheckoutPage />} />
      <Route path="/offer" element={<OfferAgreement />} />
      <Route path="/about" element={<AboutCompany />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/stores" element={<Stores />} />
      <Route path="/delivery" element={<DeliveryAndPayment />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/promotions" element={<Promotions />} />
      <Route path="/promotions/:slug" element={<PromotionDetail />} />
      <Route path="/catalog/:slug" element={<ProductDetail />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/pay" element={<PaymentPage />} />
      <Route path="/paydelivery" element={<PaymentDelivery />} />
      <Route path="/oneclickbuy" element={<OneClickBuy />} />
      <Route
        path="/catalog/mixers"
        element={<CategoryPage title="Смесители" category="Смесители" />}
      />
      <Route
        path="/catalog/showersystems"
        element={
          <CategoryPage title="Душевые системы" category="Душевые системы" />
        }
      />
      <Route
        path="/catalog/showerracks"
        element={
          <CategoryPage title="Душевые стойки" category="Душевые стойки" />
        }
      />
      <Route
        path="/catalog/spouts"
        element={<CategoryPage title="Изливы" category="Изливы" />}
      />
      <Route
        path="/catalog/accessories"
        element={<CategoryPage title="Аксессуары" category="Аксессуары" />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
