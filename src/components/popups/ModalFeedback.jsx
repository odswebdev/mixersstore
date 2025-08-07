import React, { useRef, useState, useEffect } from "react";
//import { motion } from "framer-motion";
//import PhoneInput from "react-phone-input-2";
//import "react-phone-input-2/lib/style.css";
//import axios from "axios";

function ModalFeedback({ onClose }) {
  const serviceId = "service_0xubreo";
  const templateId = "template_2slvzlg";
  const publicKey = "WHmOpK9xuyHFI8_Qw";
  const [serverStatus, setServerStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const form = useRef();
  const phoneRef = useRef(null);

  useEffect(() => {
    const input = phoneRef.current?.querySelector(".form-control");
    if (input) {
      input.classList.add("input-field");
    }
  }, []);

  const [formData, setFormData] = useState({
    username: "",
    phone: "",
  });

  const [phoneNumber, setPhoneNumber] = useState("");
  const phoneNumberRef = useRef(null); // Ссылка на инпут для телефона
  const [country, setCountry] = useState("ru");
  const [showForm, setShowForm] = useState(true);

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const formAnimation = {
    hidden: {
      x: -800,
      opacity: 0,
    },
    visible: (custom) => ({
      x: 0,
      opacity: 1,
      transition: { delay: custom * 0.7 },
    }),
  };

  useEffect(() => {
    const checkServerConnection = async () => {
      try {
        const response = await axios.get("/api/ping");
        setServerStatus(response.status === 200);
      } catch (error) {
        setServerStatus(false);
      }
    };
    checkServerConnection();
  }, []);

  const isValidName = (username) => {
    const NameRegex = /[a-zA-Zа-яА-Я]{3,16}$/;
    return NameRegex.test(username);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleChangePhone = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      phone: value,
    }));
    // Убираем сообщение об ошибке при вводе
    if (message) setMessage("");
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.username) {
      newErrors.username = "Введите Ваше имя";
    } else if (!isValidName(formData.username)) {
      newErrors.username = "В поле нельзя ввести цифры";
    }

    if (formData.username.length < 3) {
      newErrors.username = "Минимальное количество символов 3";
    }

    if (!formData.phone) {
      newErrors.phone = "Введите Ваш номер телефона";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendData = async (data) => {
    if (serverStatus) {
      try {
        const response = await fetch("/api/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error("Ошибка отправки данных");
        }
        return "SUCCESS";
      } catch (error) {
        throw new Error(error.message || "Ошибка соединения с сервером");
      }
    } else {
      try {
        await emailjs.send(serviceId, templateId, data, publicKey);
        return "SUCCESS";
      } catch (error) {
        throw new Error(error.text || "Ошибка отправки данных через emailjs");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Очистка предыдущих сообщений и статусов
    setIsLoading(true);
    setIsSuccess(false);
    setMessage("");

    const isValid = validateForm();
    if (isValid) {
      const formattedPhoneNumber = formatPhoneNumber(formData.phone);

      try {
        const result = await sendData({
          username: formData.username,
          phone: formattedPhoneNumber,
        });

        // Обновление проверки для строки "SUCCESS"
        if (result === "SUCCESS") {
          setIsSuccess(true);
          setMessage("Ваша заявка успешно отправлена.");

          // Скрытие формы и закрытие модального окна через 3 секунды
          setShowForm(false);
          setTimeout(() => handleCloseModal(), 3000);
        } else {
          console.log("Ошибка при отправке данных:", result); // Логирование
          throw new Error(result || "Произошла ошибка. Попробуйте снова.");
        }
      } catch (error) {
        setIsSuccess(false);
        setMessage(error.message || "Произошла ошибка. Попробуйте снова.");
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  // Вспомогательная функция для форматирования номера телефона
  const formatPhoneNumber = (phone) => {
    return `+${phone.replace(/\D/g, "")}`;
  };

  const handleCloseModal = () => {
    onClose();
    document.body.style.overflowY = "auto";
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    // Устанавливаем фокус на поле телефона после рендера
    if (phoneNumberRef.current && phoneNumberRef.current.inputElement) {
      phoneNumberRef.current.inputElement.focus();
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleOverlayClick}
      className="feedback__modal-overlay"
    >
      <motion.div
        variants={modalVariants}
        initial="visible"
        className="feedback__modal-container"
      >
        <motion.div
          initial="visible"
          className="feedback__modal__close--btn"
          onClick={handleCloseModal}
        >
          <span className="feedback__modal__close--icon">&#10006;</span>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          className="feedback__form-container"
        >
          <div className="feedback__modal-content__container">
            <h2
              id="feedback__heading"
              className="feedback__modal-content__title"
            >
              Обратная связь
            </h2>
            <p
              id="feedback__text"
              className="feedback__modal-content__subtitle"
            >
              Оставьте номер телефона и я с Вами свяжусь!
            </p>
          </div>

          {showForm ? (
            <motion.form
              id="feedback"
              onSubmit={handleSubmit}
              className="feedback__form"
            >
              <div className="feedback__form-input_container">
                <div className="feedback__errors">
                  <input
                    id="feedback_name"
                    type="text"
                    placeholder="Введите ваше имя"
                    name="username"
                    className="feedback__form-input input-field"
                    value={formData.username}
                    onChange={handleChange}
                    onBlur={() => setErrors({ ...errors, username: "" })}
                    autoComplete="off"
                  />
                  {errors.username && (
                    <div className="error" style={{ color: "red" }}>
                      {errors.username}
                    </div>
                  )}
                </div>
              </div>

              <div className="feedback__form-input_container">
                <div className="feedback__errors" ref={phoneRef}>
                  <PhoneInput
                    placeholder="Введите номер телефона"
                    value={formData.phone}
                    ref={phoneNumberRef}
                    country={country}
                    onChange={handleChangePhone}
                    defaultCountry="RU"
                    disableDropdown={true}
                    disableCountryCodeDropdown={true}
                    countryCodeEditable={false}
                    maxLength="18"
                    name="phone"
                    autoComplete="off"
                    className="feedback__form-input input-field"
                  />
                  {errors.phone && (
                    <div className="error" style={{ color: "red" }}>
                      {errors.phone}
                    </div>
                  )}
                </div>
              </div>

              <input
                type="submit"
                className="feedback__send"
                value="Отправить"
              />
            </motion.form>
          ) : (
            <div className={`feedback__msg ${isSuccess ? "show__msg" : ""}`}>
              <div className="feedback__success">
                Спасибо большое!
                <br /> Ваша заявка успешно отправлена.
                <br /> Я свяжусь с Вами в ближайшее время.
              </div>
            </div>
          )}

          {/* Сообщение об ошибке */}
          {!isSuccess && message && (
            <div className={`feedback__msg ${!isSuccess ? "show__msg" : ""}`}>
              <div className="feedback__error">{message}</div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default ModalFeedback;
