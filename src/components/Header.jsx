import React from "react";
import CartIcon from "../components/CartIcon";
import { Link } from "react-router-dom";

const Header = () => {
  const links = [
    { id: 1, link: "О компании", href: "/about" },
    { id: 2, link: "Оплата и доставка", href: "/pay" },
    { id: 3, link: "Магазины", href: "/stores" },
    { id: 4, link: "Контакты", href: "/contacts" },
  ];

  const links2 = [
    { id: 1, link: "Акции", href: "/actions" },
    { id: 2, link: "Смесители", href: "/mixers" },
    { id: 3, link: "Душевые системы", href: "#dush" },
    { id: 4, link: "Душевые стойки", href: "#stoyki" },
    { id: 5, link: "Изливы", href: "#izlivy" },
    { id: 6, link: "Аксессуары", href: "#aksessuary" },
  ];

  const handleDesktopLinkClick = (e, href) => {
    e.preventDefault();
    // скролл до якоря (опционально)
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header>
      <div className="w-full bg-[#F3F5F7]">
        <div className="max-w-[1300px] mx-auto px-4">
          <div className="flex flex-row justify-between items-center w-full h-[36px] pt-[8px] pb-[8px]">
            <nav className="flex flex-row justify-between items-center">
              <ul className="flex flex-row items-center gap-[40px] list-none">
                {links.map(({ id, link, href }) => (
                  <li key={id} className="navbar__item">
                    <Link
                      className="text-[15px] text-[#00072D] no-underline hover:text-[#002D79]"
                      to={href}
                      /*  onClick={(e) => handleDesktopLinkClick(e, href)} */
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <Link to="/login" className="no-underline">
              <button className="flex justify-center items-center border-none text-[15px] text-[#213f74] font-medium p-[10px] w-[170px] h-[36px] bg-[#E8ECF0] cursor-pointer">
                <svg
                  className="mr-[5px]"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.3346 19.25V17.4167C18.3346 16.4442 17.9483 15.5116 17.2607 14.8239C16.5731 14.1363 15.6404 13.75 14.668 13.75H7.33464C6.36217 13.75 5.42954 14.1363 4.74191 14.8239C4.05428 15.5116 3.66797 16.4442 3.66797 17.4167V19.25"
                    stroke="#213F74"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.9987 10.0833C13.0237 10.0833 14.6654 8.44171 14.6654 6.41667C14.6654 4.39162 13.0237 2.75 10.9987 2.75C8.97365 2.75 7.33203 4.39162 7.33203 6.41667C7.33203 8.44171 8.97365 10.0833 10.9987 10.0833Z"
                    stroke="#213F74"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Личный кабинет</span>
              </button>
            </Link>
          </div>
        </div>
        <div className="bg-[#fff] w-full">
          <div className="max-w-[1300px] mx-auto px-4 flex flex-row justify-between items-center">
            <div className="w-[138px] pt-[10px] pb-[10px]">
              <a href="/">
                <img
                  className="navbar__logo-img"
                  src="../src/assets/logo.png"
                  alt=""
                />
              </a>
            </div>

            <div className="relative">
              <input
                className="border border-solid border-[#e5e9ec] rounded-[46px] w-[686px] h-[50px] p-[15px_20px] bg-[#f3f5f7]"
                type="search"
                name=""
                id=""
                placeholder="Поиск по сайту"
              />
              <svg
                className="absolute cursor-pointer right-[1rem] top-1/2 transform -translate-y-1/2"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                  stroke="#213F74"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21.0004 21L16.6504 16.65"
                  stroke="#213F74"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="hidden relative w-[686px] h-[390px] bg-[#FFF] top-0">
                <button className="flex justify-center items-center border-none rounded-[50px] text-[14px] text-[#fff] font-medium p-[14_28px] w-[170px] h-[50px] bg-[#213f74] cursor-pointer">
                  Все результаты
                </button>
              </div>
            </div>

            <div className="flex flex-col items-end justify-end">
              <span className="text-[22px] text-[#213F74] font-[600] text-right">
                <a className="no-underline" href="tel:+79999999999">
                  +7 999 999-99-99
                </a>
              </span>
              <div className="flex flex-row items-center">
                <svg
                  className="mr-[5px]"
                  width="6"
                  height="6"
                  viewBox="0 0 6 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="3" cy="3" r="3" fill="#00DE59" />
                </svg>
                <span className="text-[14px] text-[#00072D]">
                  Звоните с 8:10 до 18:10
                </span>
              </div>
            </div>

            <button className="flex justify-center items-center border-none rounded-[50px] text-[14px] text-[#fff] font-medium p-[14_28px] w-[170px] h-[50px] bg-[#213f74] cursor-pointer">
              Заказать звонок
            </button>
          </div>
        </div>
        <div className="bg-[#213F74] w-full">
          <div className="max-w-[1300px] mx-auto px-4 flex flex-row justify-between items-center w-full h-[50px]">
            <nav className="flex flex-row justify-between items-center">
              <ul className="flex flex-row items-center gap-[40px] list-none">
                {links2.map(({ id, link, href }) => (
                  <li
                    key={id}
                    className="hover:m-0 hover:bg-[#c6bcb2] p-[15px]"
                  >
                    <Link
                      className="text-[15px] font-[500] text-[#FFF] no-underline"
                      to={href}
                      /*  onClick={(e) => handleDesktopLinkClick(e, href)} */
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <CartIcon />

            <div className="hidden w-[50px] h-[50px] bg-[#213f74] rounded-[37px]"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
