import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  const ArrowIcon = () => (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 15L22.8586 19.8586C22.9367 19.9367 22.9367 20.0633 22.8586 20.1414L18 25"
        stroke="#C6BCB2"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <div>
      <Header />

      <section className="relative min-h-[605px] bg-[#f3f5f7]">
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          className="h-full"
        >
          {[
            {
              id: 1,
              image: "./src/assets/bedroom.png",
              title: "Изысканные смесители для вашего интерьера",
              description:
                "Гарантируем высочайшую безопасность и надёжность в соответствии с международными стандартами качества.",
            },
            {
              id: 2,
              image: "./src/assets/bedroom2.png",
              title: "Изысканные смесители для вашего интерьера",
              description:
                "Гарантируем высочайшую безопасность и надёжность в соответствии с международными стандартами качества.",
            },
            {
              id: 3,
              image: "./src/assets/bedroom3.png",
              title: "Изысканные смесители для вашего интерьера",
              description:
                "Гарантируем высочайшую безопасность и надёжность в соответствии с международными стандартами качества.",
            },
            {
              id: 4,
              image: "./src/assets/bedroom4.png",
              title: "Изысканные смесители для вашего интерьера",
              description:
                "Гарантируем высочайшую безопасность и надёжность в соответствии с международными стандартами качества.",
            },
            {
              id: 5,
              image: "./src/assets/bedroom5.png",
              title: "Изысканные смесители для вашего интерьера",
              description:
                "Гарантируем высочайшую безопасность и надёжность в соответствии с международными стандартами качества.",
            },
            {
              id: 6,
              image: "./src/assets/bedroom6.png",
              title: "Изысканные смесители для вашего интерьера",
              description:
                "Гарантируем высочайшую безопасность и надёжность в соответствии с международными стандартами качества.",
            },
            {
              id: 7,
              image: "./src/assets/bedroom7.png",
              title: "Изысканные смесители для вашего интерьера",
              description:
                "Гарантируем высочайшую безопасность и надёжность в соответствии с международными стандартами качества.",
            },
          ].map(({ id, image, title, description }) => (
            <SwiperSlide key={id}>
              <div
                className="relative min-h-[605px] w-full bg-cover bg-center flex items-center"
                style={{ backgroundImage: `url(${image})` }}
              >
                <div className="max-w-[1300px] mx-auto px-4 w-full">
                  <div className="w-full max-w-auto bg-white/80 p-8 rounded-2xl shadow-lg pt-[300px]">
                    {/* Ссылка */}

                    <Link
                      to="/catalog"
                      className="group inline-block text-[16px] text-[#c6bcb2] font-[600] mb-4 no-underline hover:underline"
                    >
                      Перейти в каталог
                    </Link>

                    {/* Заголовок */}
                    <h1 className="text-[42px] sm:text-[48px] lg:text-[56px] font-[500] text-[#FFF] mb-4 max-w-[800px] leading-tight break-words animate-fade-in-title">
                      {title}
                    </h1>

                    {/* Описание */}
                    <p className="text-[16px] text-[#FFF] animate-fade-in-desc">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <style>
          {`
      .swiper-pagination {
        text-align: right !important;
        right: 20px;
        left: auto !important;
        bottom: 20px !important;
        display: flex !important;
        justify-content: flex-end;
        gap: 10px;
        padding-right: 20px;
      }

      .swiper-pagination-bullet {
        background: #213F74;
        opacity: 0.5;
        transition: all 0.3s;
      }

      .swiper-pagination-bullet-active {
        background: #213F74;
        opacity: 1;
        transform: scale(1.2);
      }

      .swiper-button-next,
      .swiper-button-prev {
        color: #213F74;
        width: 40px;
        height: 40px;
        background: rgba(255,255,255,0.8);
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }

      .swiper-button-next::after,
      .swiper-button-prev::after {
        font-size: 18px;
      }

      @keyframes fadeInTitle {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
      }

      @keyframes fadeInDesc {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
      }

      .animate-fade-in-title {
        animation: fadeInTitle 0.8s ease forwards;
        animation-delay: 0.2s;
      }

      .animate-fade-in-desc {
        animation: fadeInDesc 0.8s ease forwards;
        animation-delay: 0.6s;
      }
    `}
        </style>
      </section>
      <section className="pt-[80px] overflow-hidden">
        <div className="max-w-[1300px] mx-auto px-4">
          <div className="grid grid-cols-9 auto-rows-[260px] gap-[24px]">
            {/* Смесители — 2 колонки */}
            <div className="col-span-2 bg-[linear-gradient(180deg,rgba(44,53,70,0.1)_0%,rgba(31,44,73,0.9)_100%),url('./assets/smes.png')] bg-cover bg-center rounded-[10px] cursor-pointer hover:bg-[url('./assets/smes.png')]">
              <div className="relative top-[75%] pb-[34px] pl-[30px] pr-[30px] flex justify-between items-center">
                <div className="text-[24px] text-[#fff] font-[500]">
                  Смесители
                </div>
                <div className="rounded-full bg-[#fff]/20 w-10 h-10 flex items-center justify-center">
                  <ArrowIcon />
                </div>
              </div>
            </div>

            {/* Душевые системы — 4 колонки */}
            <div className="col-span-4 bg-[linear-gradient(180deg,rgba(44,53,70,0.1)_0%,rgba(31,44,73,0.9)_100%),url('./assets/dush.png')] bg-cover bg-center rounded-[10px] cursor-pointer hover:bg-[linear-gradient(180deg,rgba(44,53,70,0.1)_0%,rgba(31,44,73,0.9)_100%),url('./assets/dush.png')]">
              <div className="relative top-[75%] pb-[34px] pl-[30px] pr-[30px] flex justify-between items-center">
                <div className="text-[24px] text-[#fff] font-[500]">
                  Душевые системы
                </div>
                <div className="rounded-full bg-[#fff]/20 w-10 h-10 flex items-center justify-center">
                  <ArrowIcon />
                </div>
              </div>
            </div>

            {/* Коллекции — справа на две строки */}
            <div className="col-span-3 row-span-2 bg-[linear-gradient(180deg,rgba(44,53,70,0.1)_0%,rgba(31,44,73,0.9)_100%),url('./assets/stoyki.png')] bg-cover bg-center rounded-[10px] cursor-pointer hover:[url('./assets/stoyki.png')]">
              <div className="relative top-[30rem] pb-[30px] pl-[30px] pr-[30px] flex justify-between items-center">
                <div className="text-[24px] text-[#fff] font-[500]">
                  Душевые стойки
                </div>
                <div className="rounded-full bg-[#fff]/20 w-10 h-10 flex items-center justify-center">
                  <ArrowIcon />
                </div>
              </div>
            </div>

            {/* Ванны — 4 колонки */}
            <div className="col-span-4 bg-[linear-gradient(180deg,rgba(44,53,70,0.1)_0%,rgba(31,44,73,0.9)_100%),url('./assets/izlivy.png')] bg-cover bg-center rounded-[10px] cursor-pointer hover:[url('./assets/izlivy.png')]">
              <div className="relative top-[75%] pb-[34px] pl-[30px] pr-[30px] flex justify-between items-center">
                <div className="text-[24px] text-[#fff] font-[500]">Изливы</div>
                <div className="rounded-full bg-[#fff]/20 w-10 h-10 flex items-center justify-center">
                  <ArrowIcon />
                </div>
              </div>
            </div>

            {/* Аксессуары — 2 колонки */}
            <div className="col-span-2 bg-[linear-gradient(180deg,rgba(44,53,70,0.1)_0%,rgba(31,44,73,0.9)_100%),url('./assets/aksessuary.png')] bg-cover bg-center rounded-[10px] cursor-pointer hover:bg-[url('./assets/aksessuary.png')]">
              <div className="relative top-[75%] pb-[34px] pl-[30px] pr-[30px] flex justify-between items-center">
                <div className="text-[24px] text-[#fff] font-[500]">
                  Аксессуары
                </div>
                <div className="rounded-full bg-[#fff]/20 w-10 h-10 flex items-center justify-center">
                  <ArrowIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-[80px] overflow-hidden">
        <div className="bg-[#fff] p-[60px_80px] mx-[22px]">
          <div className="max-w-[1300px] mx-auto px-4">
            <div className="flex flex-row justify-between items-center mb-[40px]">
              <div className="text-[46px] font-[500] text-[#122952]">
                Актуальные акции
              </div>
              <button className="flex justify-center items-center border-none rounded-[50px] text-[14px] text-[#fff] font-medium p-[20_30px] w-[142px] h-[60px] bg-[#213f74] cursor-pointer">
                <span>Все акции</span>
              </button>
            </div>

            <div className="flex flex-row justify-between items-start gap-[24px]">
              <div className="card__item">
                <div className="overflow-hidden">
                  <div className="relative">
                    <div className="absolute top-[-20%] ml-[30px] mt-[130px] z-10 right-0 w-[140px] h-[140px] rounded-[230px] bg-[linear-gradient(125deg,_#d42d2c_0%,_#e46767_100%)]">
                      <div className="flex flex-wrap justify-center items-center p-[25px]">
                        <span className="text-[22px] font-bold text-[#FFF]">
                          Скидка
                        </span>
                        <span className="text-[42px] font-bold text-[#FFF]">
                          -15%
                        </span>
                      </div>
                    </div>
                    <div className="bg-[url('./assets/banner1.png')] bg-cover bg-center h-[200px] rounded-[10px]"></div>
                  </div>
                </div>
                <div className="mt-[15px]">
                  <div className="text-[14px] text-[#7f8295] mb-[10px]">
                    Акция действует до 11.11.2023
                  </div>
                  <div className="text-[18px] text-[#122952] mb-[15px]">
                    Скидка 15% на все смесители
                  </div>
                  <div className="text-[14px] text-[#4d526c] mb-[15px]">
                    Предлагаем смесители для кухни, ванны, душа по низким ценам!
                    Акция действует только на товары в наличии.
                  </div>
                  <a
                    className="text-[16px] font-[600] text-[#213f74] underline"
                    href="/"
                  >
                    Подробнее
                  </a>
                </div>
              </div>
              <div className="card__item">
                <div className="relative">
                  <div className="card__item__desc absolute z-10 text-[28px] font-600 text-[#fff] p-[30px_40px]">
                    Осенняя
                    <br /> распродажа
                  </div>
                  <div className="mb-[15px] bg-[linear-gradient(136.35deg,_rgba(31,_44,_73,_0.9)_3.81%,rgba(31,_44,_73,_0)_83.1%),url('./assets/banner2.png')] bg-cover bg-center h-[200px] rounded-[10px]"></div>
                </div>
                <div className="">
                  <div className="text-[14px] text-[#7f8295] mb-[10px]">
                    Акция действует до 30.11.2023
                  </div>
                  <div className="text-[18px] text-[#122952] mb-[15px]">
                    Осенняя распродажа сантехнических аксессуаров для ванной
                    комнаты
                  </div>
                  <div className="text-[14px] text-[#4d526c] mb-[15px]">
                    Большой выбор аксессуаров для ванной со скидками до 40%.
                    Товары со скидкой отмечены в каталоге красной табличкой
                    SALE.
                  </div>
                  <a
                    className="text-[16px] font-[600] text-[#213f74] underline"
                    href="/"
                  >
                    Подробнее
                  </a>
                </div>
              </div>
              <div className="card__item">
                <div className="relative">
                  <div className="absolute z-10 right-[0px]">
                    <img
                      className="object-cover max-h-[200px]"
                      src="./src/assets/percentages.png"
                      alt=""
                    />
                  </div>
                  <div className="mb-[15px] bg-[url('./assets/banner3.png')] bg-cover bg-center h-[200px] rounded-[10px]"></div>
                </div>
                <div className="">
                  <div className="text-[14px] text-[#7f8295] mb-[10px]">
                    Акция действует до 31.12.2023
                  </div>
                  <div className="text-[18px] text-[#122952] mb-[15px]">
                    Душевые системы по выгодным ценам!
                  </div>
                  <div className="text-[14px] text-[#4d526c] mb-[15px]">
                    Душевые системы, стойки и гарнитуры по выгодным ценам.
                    Доставка в любой регион России. Гарантия от производителя.
                  </div>
                  <a
                    className="text-[16px] font-[600] text-[#213f74] underline"
                    href="#"
                  >
                    Подробнее
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-[80px] pb-[80px] w-full px-4 py-12 bg-gray-50">
        <div className="max-w-[1300px] mx-auto px-4">
          <div className="max-w-6xl grid grid-cols-2 md:grid-cols-2 gap-[44px] items-start relative overflow-hidden">
            {/* Левая колонка — картинки */}
            <div className="relative w-full h-[400px] md:h-[400px] rounded-[10px]">
              {/* Фоновая картинка — занимает всю ширину и высоту колонки */}
              <img
                src="./src/assets/company.png"
                alt="Фоновая"
                className="absolute right-[0px] w-[80%] h-full object-cover rounded-[10px] shadow-md"
              />
              {/* Верхняя картинка — поверх фона, с отступами и рамкой */}
              <div className="absolute top-[10%] left-[10%] z-20 p-2 bg-white rounded-[10px] shadow-xl">
                <img
                  src="./src/assets/company3.png"
                  alt="Верхняя"
                  className="w-[330px] md:w-[320px] rounded-[10px] h-auto object-contain"
                />
              </div>
            </div>

            {/* Правая колонка — текст */}
            <div className="space-y-6">
              <div className="text-[46px] font-500 text-[#122952] mb-[40px]">
                О компании
              </div>
              <p className="text-[14px] text-[#4d526c]">
                Компания DEMM, созданная в Марментино, провинция Брешиа,
                работает в сфере производства кранов и ванных комнат в течение
                последних 50 лет. Компания DEMM постоянно инвестирует в
                исследования и разработку новых продуктов с целью обеспечения
                максимальной эффективности при одновременном обеспечении
                качества и дизайна.
              </p>
              <p className="text-[20px] font-[500] text-[#122952]">
                «Гарантируем высочайшую безопасность и надёжность в соответствии
                с международными стандартами качества»
              </p>
              <p className="text-[14px] text-[#4d526c] mb-[40px]">
                Мы производим обширную коллекцию изысканных и современных
                смесителей и душевых кабин. Изготавливаем продукцию в очень
                короткие сроки. Мы динамичны, дружелюбны и всегда рады
                сотрудничеству!
              </p>
              <a
                href="/about"
                className="flex justify-center items-center border-none rounded-[50px] text-[14px] text-[#fff] font-medium p-[14_28px] w-[170px] h-[50px] bg-[#213f74] no-underline cursor-pointer hover:bg-transparent"
              >
                Подробнее
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
