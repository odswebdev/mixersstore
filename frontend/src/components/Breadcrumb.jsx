import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex items-center" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <div key={index} className="flex items-center mt-[25px]">
          {index !== 0 && (
            <span className="mx-1 mr-[10px] text-[rgba(0,_7,_45,_0.5)]">/</span>
          )}
          {item.href ? (
            <Link
              to={item.href}
              className="transition-colors text-[15px] text-[rgba(0,_7,_45,_0.5)] no-underline mr-[10px]"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-[15px] text-[#00072D]">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
