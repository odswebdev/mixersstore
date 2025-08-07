import { Link } from "react-router-dom"; // или убери, если не используешь react-router

const Breadcrumb = ({ items }) => {
  return (
    <nav
      className="text-sm text-black flex items-center space-x-1"
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center mt-[25px]">
          {index !== 0 && <span className="mx-1 mr-[10px]">/</span>}
          {item.href ? (
            <Link
              to={item.href}
              className="hover:text-white transition-colors text-[15px] text-[rgba(0,_7,_45,_0.5)] no-underline mr-[10px]"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-white">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
