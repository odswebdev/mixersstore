import React from "react";
import { motion } from "framer-motion";
import Breadcrumb from "../components/Breadcrumb";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
            className="text-[46px] font-[500] text-[#122952] mt-[25px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            О компании Demm
          </motion.h1>

          <motion.section
            className="mb-10 text-lg leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <p className="mb-4">
              <strong>Demm</strong> — это международная компания с головным
              офисом в <strong>Италии</strong>, специализирующаяся на продаже
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                {" "}
                эксклюзивных смесителей, душевых систем, стоек, изливов и
                аксессуаров
              </span>{" "}
              для ванных комнат и кухонь.
            </p>

            <p className="mb-4">
              Наша продукция создаётся в соответствии с
              <span className="font-medium">
                {" "}
                международными стандартами качества
              </span>{" "}
              и дизайна. Мы уделяем особое внимание деталям, чтобы каждая модель
              стала настоящим украшением интерьера.
            </p>

            <p className="mb-4">
              Команда Demm стремится объединить
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                {" "}
                элегантный итальянский стиль
              </span>{" "}
              с современными инженерными решениями. Мы гордимся качеством нашей
              продукции и постоянно расширяем ассортимент, следуя последним
              тенденциям в дизайне интерьера.
            </p>
          </motion.section>

          <motion.section
            className="mb-10 text-lg leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Филиалы в России</h2>
            <p className="mb-4">
              Несмотря на то, что Demm является итальянской компанией, мы
              активно развиваем свою сеть в <strong>России</strong>. Наши
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                {" "}
                официальные магазины и партнёрские шоурумы
              </span>{" "}
              расположены в крупных городах, включая Москву, Санкт-Петербург,
              Екатеринбург и Новосибирск.
            </p>
            <p className="mb-4">
              В каждом филиале вы можете получить профессиональную консультацию,
              ознакомиться с образцами продукции и оформить заказ с доставкой по
              всей стране.
            </p>
          </motion.section>

          <motion.section
            className="text-lg leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Миссия и ценности</h2>
            <p className="mb-4">
              Мы верим, что качественная сантехника — это не просто элемент
              интерьера, а важная часть комфорта и уюта в доме. Наша{" "}
              <strong>миссия</strong> — предлагать клиентам продукцию, которая
              сочетает в себе надёжность, эстетику и передовые технологии.
            </p>
            <p className="mb-4">
              Мы стремимся обеспечить высокий уровень сервиса, оперативную
              доставку и индивидуальный подход к каждому клиенту.
            </p>
          </motion.section>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.7 }}
          >
            <p className="text-xl font-medium mb-2">
              Demm — стиль, качество и надёжность из Италии.
            </p>
            <p className="text-lg">
              Доверьтесь профессионалам и создайте интерьер мечты вместе с нами.
            </p>
          </motion.div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AboutCompany;
