import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import Breadcrumb from "../components/Breadcrumb";
import Header from "../components/Header";
import Footer from "../components/Footer";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const PrivacyPolicy = () => {
  return (
    <div>
      <div className="w-full">
        <Header />
        <div className="max-w-[1300px] mx-auto px-4">
          <Breadcrumb
            items={[
              { label: "Главная", href: "/" },
              { label: "Политика конфиденциальности" },
            ]}
          />
          {/* SEO мета-теги */}
          <Helmet>
            <title>Политика конфиденциальности | Ваш Интернет-магазин</title>
            <meta
              name="description"
              content="Ознакомьтесь с политикой конфиденциальности нашего интернет-магазина. Узнайте, как мы обрабатываем и защищаем ваши персональные данные."
            />
          </Helmet>

          {/* Заголовок */}
          <motion.h1
            className="text-4xl font-bold mb-10 text-center"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
          >
            Политика конфиденциальности
          </motion.h1>

          {/* Секции политики */}
          {sections.map((section, index) => (
            <motion.section
              key={index}
              className="mb-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
              {typeof section.content === "string" ? (
                <p className="text-base leading-relaxed">{section.content}</p>
              ) : (
                <ul className="list-disc list-inside space-y-1">
                  {section.content.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </motion.section>
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
};

const sections = [
  {
    title: "1. Общие положения",
    content:
      "Настоящая политика конфиденциальности регулирует порядок сбора, хранения, использования и раскрытия информации, которую предоставляет пользователь при использовании нашего интернет-магазина.",
  },
  {
    title: "2. Сбор и использование персональных данных",
    content: [
      "ФИО",
      "Адрес электронной почты",
      "Номер телефона",
      "Адрес доставки",
      "IP-адрес, данные браузера и устройства",
    ],
  },
  {
    title: "3. Защита данных",
    content:
      "Мы принимаем все необходимые организационные и технические меры для защиты персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения.",
  },
  {
    title: "4. Раскрытие информации третьим лицам",
    content:
      "Мы не передаём персональные данные пользователей третьим лицам, за исключением случаев, предусмотренных законодательством или необходимых для выполнения заказа (например, службе доставки).",
  },
  {
    title: "5. Использование файлов cookies",
    content:
      "Наш сайт использует файлы cookies для улучшения пользовательского опыта. Вы можете отключить cookies в настройках вашего браузера.",
  },
  {
    title: "6. Изменения в политике конфиденциальности",
    content:
      "Мы оставляем за собой право изменять настоящую политику в любое время. Все изменения публикуются на этой странице.",
  },
  {
    title: "7. Контактная информация",
    content: ["Email: support@вашмагазин.рф", "Телефон: +7 (000) 000-00-00"],
  },
];

export default PrivacyPolicy;
