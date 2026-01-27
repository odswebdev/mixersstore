import React from "react";
import { motion } from "framer-motion";
import Breadcrumb from "../components/Breadcrumb";
import Header from "../components/Header";
import Footer from "../components/Footer";
import hh2 from "../assets/hh2.jpg";

const AboutCompany = () => {
  return (
    <div>
      <div className="w-full">
        <Header />
        <div className="max-w-[1300px] mx-auto px-4">
          <Breadcrumb
            items={[{ label: "Главная", href: "/" }, { label: "О компании" }]}
          />
          <motion.h1
            className="text-[46px] font-[500] text-[#122952] mt-[25px] mb-[10px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            О компании
          </motion.h1>

          <motion.section
            className="mb-[10px] text-lg leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <p className="mb-4">
              <strong>
                DEMM rubinetteria – семейная компания созданная в г. Марментино
                в провинции Брешиа, работает в сфере производства смесителей и
                ванных комнат в течение последних 50 лет.
              </strong>
            </p>

            <p className="mb-4">
              Инновации, дизайн и качество являются краеугольным камнем DЕММ в
              производстве самых современных продуктов. DЕММ стремится к
              постоянным исследованиям в области охраны окружающей среды и
              энергосбережения. Новое поколение продуктов DЕММ было создано с
              заботой об окружающей среде и экологических последствий, и в то же
              время сочетание элегантного и утонченного дизайна, ожидаемого от
              всегда требовательной публики.
            </p>
          </motion.section>

          <motion.section
            className="flex text-lg leading-relaxed mb-[25px]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            <div className="flex-1 flex-col grow">
              <img src={hh2} alt="" />
            </div>

            <div className="flex-col items-stretch">
              <p className="mb-4">
                <strong>
                  DЕММ постоянно инвестирует в исследования и разработку новых
                  продуктов с целью обеспечения максимальной эффективности при
                  обеспечении качества и дизайна. Тесная связь между
                  человеческими ресурсами и передовыми технологиями гарантирует,
                  что DЕММ может обеспечить высочайшую безопасность и надежность
                  в соответствии с международными стандартами качества в
                  отрасли.
                </strong>
              </p>
              <p className="mb-4">
                Полный ассортимент изделий для ванной комнаты и кухни:
              </p>
              <ul className="list-disc pl-4 mb-4">
                <li>смесители,</li>
                <li>термостатические смесительные клапаны,</li>
                <li>традиционные смесители с двумя ручками,</li>
                <li>душевые стойки и все необходимое для талассотерапии.</li>
              </ul>
              <p className="text-xl font-medium mb-2">
                Выигрышное сочетание дизайна и технологий при отличном
                соотношении цены и качества!
              </p>
            </div>
          </motion.section>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AboutCompany;
