import React from "react";
import CustomCheckboxSvg from "../components/CustomCheckboxSvg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <section className="bg-[linear-gradient(27deg,_rgba(44,_53,_70,_0.7)_0%,_rgba(44,_53,_70,_0.4)_100%),url('./assets/faq_forms_bg.png')] bg-[length:100%_100%] bg-center bg-no-repeat h-[470px]">
        <div className="max-w-[1300px] mx-auto px-4">
          <div className="flex flex-col relative pl-[115px]">
            <div className="absolute flex justify-center items-center top-[0%] w-[65px] h-[60px] bg-[#C6BCB2] rounded-[0_0_10px_10px]">
              <img src="./src/assets/logo-feedback.png" alt="" />
            </div>

            <h2 className="text-[46px] font-[500] text-[#fff] pt-[40px] mb-[30px]">
              Остались вопросы?
            </h2>

            <p className="text-[16px] text-[#fff] leading-tight break-words animate-fade-in-title max-w-[565px]">
              Заполните форму, мы свяжемся с вами в ближайшее время, ответим на
              все вопросы и предоставим консультацию по ассортименту.
            </p>

            <form className="flex gap-[20px]">
              <input
                className="text-[#FFF] w-[220px] h-[37px] border-r-[0px] border-t-[0px] border-l-[0px] border-b-[1px] border-b-[#FFF] focus-within:border-l-[0px] 
  focus-within:border-r-[0px] focus-within:border-t-[0px] focus-within:border-t-transparent focus:border-b-1px focus:outline-none focus:border-b-[#F2E] bg-transparent placeholder:text-[14px] placeholder:text-[rgba(255,_255,_255,_0.7)]"
                type="text"
                name=""
                id=""
                placeholder="Ваше имя"
              />
              <input
                className="text-[#FFF] w-[220px] h-[37px] border-r-[0px] border-t-[0px] border-l-[0px] border-b-[1px] border-b-[#FFF] focus-within:border-l-[0px] 
  focus-within:border-r-[0px] focus-within:border-t-[0px] focus-within:border-t-transparent focus:border-b-1px focus:outline-none focus:border-b-[#F2E] bg-transparent placeholder:text-[14px] placeholder:text-[rgba(255,_255,_255,_0.7)]"
                type="tel"
                name=""
                id=""
                placeholder="Номер телефона"
              />
            </form>

            <div className="flex">
              <CustomCheckboxSvg
                label="Я согласен(а) с Политикой конфиденциальности."
                onChange={(val) => console.log("checked:", val)}
              />
            </div>

            <button className="text-[14px] text-[#FFF] font-[600] w-[176px] h-[60px] flex justify-center items-center rounded-[50px] bg-[#C6BCB2] p-[30px_20px] border-none cursor-pointer">
              Оставить заявку
            </button>
          </div>
        </div>
      </section>
      <section className="pt-[80px] pb-[80px] bg-[#FFF]">
        <div className="max-w-[1300px] mx-auto px-4">
          <div className="flex flex-row justify-between items-start">
            <div className="flex flex-col mr-[115px]">
              <div className="w-[138px] pb-[60px]">
                <a href="/">
                  <img
                    className="navbar__logo-img"
                    src="../src/assets/logo.png"
                    alt=""
                  />
                </a>
              </div>
              <button className="flex justify-center items-center border-[2px] border-solid border-[#e5e9ec] rounded-[50px] p-[14_28px] w-[217px] h-[60px] bg-[#f3f5f7] opacity-100 cursor-pointer">
                <svg
                  className="mr-[10px]"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_0_44)">
                    <path
                      d="M10.0011 0.90918C15.022 0.90918 19.092 4.97918 19.092 10.0001C19.092 15.021 15.022 19.091 10.0011 19.091C8.39451 19.0936 6.81622 18.6684 5.42835 17.8592L0.913805 19.091L2.1429 14.5746C1.33298 13.1863 0.907485 11.6074 0.910169 10.0001C0.910169 4.97918 4.98017 0.90918 10.0011 0.90918ZM6.9029 5.72736L6.72108 5.73463C6.60337 5.7418 6.48833 5.77273 6.3829 5.82554C6.28428 5.88139 6.19426 5.9512 6.11562 6.03282C6.00653 6.13554 5.94471 6.22463 5.87835 6.311C5.5421 6.74818 5.36105 7.28492 5.36381 7.83645C5.36562 8.28191 5.48199 8.71554 5.66381 9.121C6.03562 9.941 6.64744 10.8092 7.45471 11.6137C7.64926 11.8074 7.84017 12.0019 8.04562 12.1828C9.04871 13.066 10.244 13.7029 11.5365 14.0428L12.0529 14.1219C12.2211 14.131 12.3893 14.1183 12.5584 14.1101C12.8231 14.0964 13.0816 14.0247 13.3156 13.9001C13.4347 13.8388 13.5509 13.772 13.6638 13.7001C13.6638 13.7001 13.7029 13.6746 13.7774 13.6183C13.9002 13.5274 13.9756 13.4628 14.0774 13.3565C14.1529 13.2783 14.2184 13.1865 14.2683 13.0819C14.3393 12.9337 14.4102 12.651 14.4393 12.4155C14.4611 12.2355 14.4547 12.1374 14.452 12.0765C14.4483 11.9792 14.3674 11.8783 14.2793 11.8355L13.7502 11.5983C13.7502 11.5983 12.9593 11.2537 12.4756 11.0337C12.425 11.0116 12.3708 10.999 12.3156 10.9965C12.2534 10.9901 12.1906 10.9971 12.1313 11.017C12.072 11.0369 12.0177 11.0693 11.972 11.1119C11.9674 11.1101 11.9065 11.1619 11.2493 11.9583C11.2115 12.009 11.1596 12.0473 11.1 12.0683C11.0404 12.0894 10.9759 12.0922 10.9147 12.0765C10.8555 12.0606 10.7975 12.0405 10.7411 12.0165C10.6284 11.9692 10.5893 11.951 10.512 11.9183C9.99023 11.6906 9.50716 11.383 9.08017 11.0065C8.96562 10.9065 8.85926 10.7974 8.75017 10.6919C8.39252 10.3494 8.08083 9.96191 7.8229 9.53918L7.76926 9.45282C7.73073 9.39478 7.69959 9.33218 7.67653 9.26645C7.64199 9.13282 7.73199 9.02554 7.73199 9.02554C7.73199 9.02554 7.9529 8.78372 8.05562 8.65282C8.15562 8.52554 8.24017 8.40191 8.29471 8.31373C8.40199 8.141 8.43562 7.96373 8.37926 7.82645C8.12471 7.20463 7.86108 6.58554 7.59017 5.971C7.53653 5.84918 7.37744 5.76191 7.2329 5.74463C7.18381 5.73918 7.13471 5.73373 7.08562 5.73009C6.96354 5.72402 6.8412 5.72524 6.71926 5.73373L6.90199 5.72645L6.9029 5.72736Z"
                      fill="#00B649"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_0_44">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span className="text-[14px] font-500 text-[#213f74]">
                  Написать в WhatsApp
                </span>
              </button>
            </div>

            <div className="flex flex-col mr-[75px]">
              <div className="mb-[30px] font-600 text-[18px] text-[rgba(77,_82,_108,_0.5)]">
                КАТАЛОГ
              </div>
              <div className="flex flex-col gap-[15px]">
                <a
                  className="text-[15px] text-[rgba(0,_7,_45,_0.8)] no-underline"
                  href="/mixers"
                >
                  Смесители
                </a>
                <a
                  className="text-[15px] text-[rgba(0,_7,_45,_0.8)] no-underline"
                  href="#"
                >
                  Душевые системы
                </a>
                <a
                  className="text-[15px] text-[rgba(0,_7,_45,_0.8)] no-underline"
                  href="#"
                >
                  Душевые стойки
                </a>
                <a
                  className="text-[15px] text-[rgba(0,_7,_45,_0.8)] no-underline"
                  href="#"
                >
                  Изливы
                </a>
                <a
                  className="text-[15px] text-[rgba(0,_7,_45,_0.8)] no-underline"
                  href="#"
                >
                  Аксессуары
                </a>
              </div>
            </div>

            <div className="flex flex-col mr-[195px]">
              <div className="mb-[30px] font-600 text-[18px] text-[rgba(77,_82,_108,_0.5)]">
                ДЛЯ КЛИЕНТА
              </div>
              <div className="flex flex-col gap-[15px]">
                <a
                  className="text-[15px] text-[rgba(0,_7,_45,_0.8)] no-underline"
                  href="/actions"
                >
                  Акции
                </a>
                <a
                  className="text-[15px] text-[rgba(0,_7,_45,_0.8)] no-underline"
                  href="/about"
                >
                  О компании
                </a>
                <a
                  className="text-[15px] text-[rgba(0,_7,_45,_0.8)] no-underline"
                  href="/pay"
                >
                  Оплата и доставка
                </a>
                <a
                  className="text-[15px] text-[rgba(0,_7,_45,_0.8)] no-underline"
                  href="/stores"
                >
                  Магазины
                </a>
                <a
                  className="text-[15px] text-[rgba(0,_7,_45,_0.8)] no-underline"
                  href="/contacts"
                >
                  Контакты
                </a>
              </div>
            </div>

            <div className="flex flex-col w-[32%]">
              <div className="text-[18px] font-[500] text-[#122952] mb-[20px]">
                Узнавайте об акциях и новостях
                <br /> первыми, подпишитесь на рассылку
              </div>
              <div className="relative flex flex-row mb-[20px]">
                <input
                  className="z-3 email__t border border-solid border-[#e5e9ec] rounded-[46px] w-[415px] h-[60px] bg-[#f3f5f7]"
                  type="text"
                  name=""
                  id=""
                  placeholder="Электронная почта"
                />
                <button className="absolute z-10 right-[0px] w-[163px] h-[65px] bg-[#213f74] rounded-[50px] text-[14px] font-[500] text-[#FFF] border-none cursor-pointer hover:bg-[#c19999]">
                  Подписаться
                </button>
              </div>
              <div className="text-[29px] text-[#213f74] font-[600] mb-[8px]">
                +7 999 999-99-99
              </div>
              <div className="">
                <svg
                  className="mr-[5px]"
                  width="10"
                  height="12"
                  viewBox="0 0 10 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_0_18)">
                    <path
                      d="M5 0.125C6.29293 0.125 7.53291 0.638615 8.44715 1.55285C9.36139 2.46709 9.875 3.70707 9.875 5C9.875 7.06 8.4275 9.305 5.57 11.759C5.41111 11.8955 5.20853 11.9705 4.99906 11.9703C4.7896 11.9701 4.58715 11.8948 4.4285 11.758L4.2395 11.594C1.5085 9.204 0.125 7.014 0.125 5C0.125 3.70707 0.638615 2.46709 1.55285 1.55285C2.46709 0.638615 3.70707 0.125 5 0.125ZM5 3.125C4.50272 3.125 4.02581 3.32254 3.67417 3.67417C3.32254 4.02581 3.125 4.50272 3.125 5C3.125 5.49728 3.32254 5.97419 3.67417 6.32582C4.02581 6.67746 4.50272 6.875 5 6.875C5.49728 6.875 5.9742 6.67746 6.32583 6.32582C6.67746 5.97419 6.875 5.49728 6.875 5C6.875 4.50272 6.67746 4.02581 6.32583 3.67417C5.9742 3.32254 5.49728 3.125 5 3.125Z"
                      fill="#213F74"
                      fillOpacity="0.8"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_0_18">
                      <rect width="10" height="12" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span className="text-[15px] text-[rgba(33,_63,_116,_0.8)]">
                  г. Новосибирск, улица, дом, офис
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#F3F5F7] pt-[10px] pb-[10px] h-[20px]">
        <div className="max-w-[1300px] mx-auto px-4">
          <div className="flex flex-row justify-start items-center">
            <div className="text-[15px] text-[#7F8295] mr-[115px]">
              &copy; DEMM RUBINETTERIA 2025
            </div>
            <Link
              to="/offer"
              className="text-[15px] text-[#7F8295] mr-[75px] no-underline"
            >
              Договор оферты
            </Link>
            <Link
              to="/soglasie"
              className="text-[15px] text-[#7F8295] no-underline"
            >
              Пользовательское соглашение
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
