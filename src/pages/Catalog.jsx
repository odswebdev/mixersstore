import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Breadcrumb from "../components/Breadcrumb";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext.jsx";

const Catalog = () => {
  const { addToCart } = useCart();

  return (
    <div>
      <div className="w-full">
        <Header />
        <div className="max-w-[1300px] mx-auto px-4">
          <Breadcrumb
            items={[{ label: "Главная", href: "/" }, { label: "Каталог" }]}
          />
          <h1 className="text-[46px] font-[500] text-[#122952] mt-[25px]">
            Каталог
          </h1>
          <div className="flex flex-row justify-between gap-[10px] items-center mb-[40px]">
            <div className="flex flex-col h-[295px] rounded-[10px] p-[15px_15px] bg-[#FFF] shadow-[0px_10px_20px_rgba(0,0,0,0.2)] cursor-pointer">
              <div className="mb-[15px]">
                <img
                  className="w-[220px]"
                  src="./src/assets/smes__сat.png"
                  alt=""
                />
              </div>
              <div className="mb-[5px] text-[20px] font-[500] text-[#122952]">
                Смесители
              </div>
              <div className="text-[16px] text-[#797d91]">Товаров: 370</div>
            </div>
            <div className="flex flex-col h-[295px] rounded-[10px] p-[15px_15px] bg-[#FFF] shadow-[0px_10px_20px_rgba(0,0,0,0.2)] cursor-pointer">
              <div className="mb-[15px]">
                <img
                  className="w-[220px]"
                  src="./src/assets/dush__cat.png"
                  alt=""
                />
              </div>
              <div className="mb-[5px] text-[20px] font-[500] text-[#122952]">
                Душевые системы
              </div>
              <div className="text-[16px] text-[#797d91]">Товаров: 120</div>
            </div>
            <div className="flex flex-col h-[295px] rounded-[10px] p-[15px_15px] bg-[#FFF] shadow-[0px_10px_20px_rgba(0,0,0,0.2)] cursor-pointer">
              <div className="mb-[15px]">
                <img
                  className="w-[220px]"
                  src="./src/assets/stoyki__cat.png"
                  alt=""
                />
              </div>
              <div className="mb-[5px] text-[20px] font-[500] text-[#122952]">
                Душевые стойки
              </div>
              <div className="text-[16px] text-[#797d91]">Товаров: 146</div>
            </div>
            <div className="flex flex-col h-[295px] rounded-[10px] p-[15px_15px] bg-[#FFF] shadow-[0px_10px_20px_rgba(0,0,0,0.2)] cursor-pointer">
              <div className="mb-[15px]">
                <img
                  className="w-[220px]"
                  src="./src/assets/izlivy__cat.png"
                  alt=""
                />
              </div>
              <div className="mb-[5px] text-[20px] font-[500] text-[#122952]">
                Изливы
              </div>
              <div className="text-[16px] text-[#797d91]">Товаров: 88</div>
            </div>
            <div className="flex flex-col h-[295px] rounded-[10px] p-[15px_15px] bg-[#FFF] shadow-[0px_10px_20px_rgba(0,0,0,0.2)] cursor-pointer">
              <div className="mb-[15px]">
                <img
                  className="w-[220px]"
                  src="./src/assets/aksessuary__cat.png"
                  alt=""
                />
              </div>
              <div className="mb-[5px] text-[20px] font-[500] text-[#122952]">
                Аксессуары
              </div>
              <div className="text-[16px] text-[#797d91]">Товаров: 32</div>
            </div>
          </div>

          <div className="flex mb-[80px]">
            <div className="sidebar"></div>
            <div className="catalog">
              <div className="catalog__header">
                <div className="tabs"></div>
                <div className="sort"></div>
              </div>
              <div className="catalog__content flex justify-between items-center gap-[24px]">
                <div className="catalog__content__item flex flex-col w-auto min-h-[582px] rounded-[10px] p-[15px_15px] bg-[#FFF] shadow-[0px_10px_20px_rgba(0,0,0,0.2)] cursor-pointer">
                  <div className="catalog__content__item__labels hidden">
                    <div>Новинка</div>
                    <div>Акция</div>
                    <div>Хит</div>
                  </div>
                  <div>
                    <img
                      className="w-[266px]"
                      src="./src/assets/smes-bide.png"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-row justify-between items-center mb-[15px]">
                    <div className="text-[12px] text-[#797D91]">
                      Нет в наличии
                    </div>
                    <div className="text-[12px] text-[#797D91]">
                      Артикул: 4720X
                    </div>
                  </div>
                  <div className="desc text-[14px] text-[#122952] font-[500] mb-[10px] break-words max-w-[306px]">
                    Demm Rory Смеситель для биде на 1 отв. с донным клапаном,
                    цвет: бронза
                  </div>
                  <div className="collection__title text-[14px] text-[#4d526c] mb-[30px]">
                    Коллекция: ERYOS
                  </div>
                  <div className="price mb-[12px]">
                    <span className="no__discount__price text-[16px] font-[600] text-[#f00] mr-[8px]">
                      45 220 руб./шт
                    </span>
                    <span className="discount__price text-[12px] font-[500] text-[#a3a5b2]">
                      54 600 руб./шт
                    </span>
                  </div>
                  <div className="catalog__content__item__btns flex flex-col gap-[8px]">
                    <button
                      className="bg-[#213F74] text-[#FFF] text-[14px] font-[500] w-full h-[50px] p-[15px_100px] rounded-[50px] border-none cursor-pointer"
                      onClick={addToCart}
                    >
                      В корзину
                    </button>
                    <button className="bg-[#F3F5F7] text-[14px] font-[500] text-[#213F74] w-full h-[50px] p-[15px_80px] border-none rounded-[50px] cursor-pointer">
                      Купить в 1 клик
                    </button>
                  </div>
                </div>

                <div className="catalog__content__item flex flex-col w-auto min-h-[582px] rounded-[10px] p-[15px_15px] bg-[#FFF] shadow-[0px_10px_20px_rgba(0,0,0,0.2)] cursor-pointer">
                  <div className="catalog__content__item__labels hidden">
                    <div>Новинка</div>
                    <div>Акция</div>
                    <div>Хит</div>
                  </div>
                  <div>
                    <img
                      className="w-[266px]"
                      src="./src/assets/smes-acearium.png"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-row justify-between items-center mb-[15px]">
                    <div className="text-[12px] text-[#797D91]">
                      Нет в наличии
                    </div>
                    <div className="text-[12px] text-[#797D91]">
                      Артикул: 4720X
                    </div>
                  </div>
                  <div className="desc text-[14px] text-[#122952] font-[500] mb-[10px] break-words max-w-[306px]">
                    Demm Rory Смеситель для биде на 1 отв. с донным клапаном,
                    цвет: бронза
                  </div>
                  <div className="collection__title text-[14px] text-[#4d526c] mb-[30px]">
                    Коллекция: ERYOS
                  </div>
                  <div className="price mb-[12px]">
                    <span className="no__discount__price text-[16px] font-[600] text-[#f00] mr-[8px]">
                      45 220 руб./шт
                    </span>
                    <span className="discount__price text-[12px] font-[500] text-[#a3a5b2]">
                      54 600 руб./шт
                    </span>
                  </div>
                  <div className="catalog__content__item__btns flex flex-col gap-[8px]">
                    <button
                      className="bg-[#213F74] text-[#FFF] text-[14px] font-[500] w-full h-[50px] p-[15px_100px] rounded-[50px] border-none cursor-pointer"
                      onClick={addToCart}
                    >
                      В корзину
                    </button>
                    <button className="bg-[#F3F5F7] text-[14px] font-[500] text-[#213F74] w-full h-[50px] p-[15px_80px] border-none rounded-[50px] cursor-pointer">
                      Купить в 1 клик
                    </button>
                  </div>
                </div>

                <div className="catalog__content__item flex flex-col w-auto min-h-[582px] rounded-[10px] p-[15px_15px] bg-[#FFF] shadow-[0px_10px_20px_rgba(0,0,0,0.2)] cursor-pointer">
                  <div className="catalog__content__item__labels hidden">
                    <div>Новинка</div>
                    <div>Акция</div>
                    <div>Хит</div>
                  </div>
                  <div>
                    <img
                      className="w-[266px]"
                      src="./src/assets/smes-jago.png"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-row justify-between items-center mb-[15px]">
                    <div className="text-[12px] text-[#797D91]">
                      Нет в наличии
                    </div>
                    <div className="text-[12px] text-[#797D91]">
                      Артикул: 4720X
                    </div>
                  </div>
                  <div className="desc text-[14px] text-[#122952] font-[500] mb-[10px] break-words max-w-[306px]">
                    Demm Rory Смеситель для биде на 1 отв. с донным клапаном,
                    цвет: бронза
                  </div>
                  <div className="collection__title text-[14px] text-[#4d526c] mb-[30px]">
                    Коллекция: ERYOS
                  </div>
                  <div className="price mb-[12px]">
                    <span className="no__discount__price text-[16px] font-[600] text-[#f00] mr-[8px]">
                      45 220 руб./шт
                    </span>
                    <span className="discount__price text-[12px] font-[500] text-[#a3a5b2]">
                      54 600 руб./шт
                    </span>
                  </div>
                  <div className="catalog__content__item__btns flex flex-col gap-[8px]">
                    <button
                      className="bg-[#213F74] text-[#FFF] text-[14px] font-[500] w-full h-[50px] p-[15px_100px] rounded-[50px] border-none cursor-pointer"
                      onClick={addToCart}
                    >
                      В корзину
                    </button>
                    <button className="bg-[#F3F5F7] text-[14px] font-[500] text-[#213F74] w-full h-[50px] p-[15px_80px] border-none rounded-[50px] cursor-pointer">
                      Купить в 1 клик
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Catalog;
