import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import Account from "./pages/Account";
import UserAgreement from "./pages/UserAgreement";
import OfferAgreement from "./pages/OfferAgreement";
import AboutCompany from "./pages/AboutCompany";
import Contacts from "./pages/Contacts";
import Stores from "./pages/Stores";
import DeliveryAndPayment from "./pages/DeliveryAndPayment";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import MixersPage from "./pages/MixersPage";
import Promotions from "./pages/Promotions";
import Promotion from "./pages/Promotion";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Account />} />
      <Route path="/" element={<Home />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/soglasie" element={<UserAgreement />} />
      <Route path="/buy" element={<CheckoutPage />} />
      <Route path="/offer" element={<OfferAgreement />} />
      <Route path="/about" element={<AboutCompany />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/stores" element={<Stores />} />
      <Route path="/pay" element={<DeliveryAndPayment />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/actions" element={<Promotions />} />
      <Route path="/action" element={<Promotion />} />
    </Routes>
  );
}

export default App;
