import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import Breadcrumb from "../components/Breadcrumb";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchResults from "../components/SearchResults";

const SearchPage = () => {
  return (
    <div>
      <div className="w-full">
        <Header />
        <main className="max-w-[1300px] mx-auto px-4">
          <Breadcrumb
            items={[
              { label: "Главная", href: "/" },
              { label: "Результаты поиска" },
            ]}
          />

          <section>
            <SearchResults />
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default SearchPage;
