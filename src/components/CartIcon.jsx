import { useCart } from "../context/CartContext.jsx";
import { Link } from "react-router-dom";

const CartIcon = () => {
  const { cartCount } = useCart();

  return (
    <Link to="/cart" className="no-underline">
      <button className="flex justify-center items-center border-none text-[15px] bg-transparent text-[#fff] font-medium cursor-pointer">
        <div className="relative flex items-center">
          {/* Счетчик */}
          <div className="absolute top-[-0.25rem] right-[4.2rem] z-20 w-[15px] h-[15px] bg-[#C6BCB2] rounded-[100%] flex items-center justify-center">
            <span className="text-white text-[10px] font-semibold leading-none">
              {cartCount}
            </span>
          </div>

          {/* Иконка корзины */}
          <svg
            className="mr-[15px]"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span>Корзина</span>
        </div>
      </button>
    </Link>
  );
};

export default CartIcon;
