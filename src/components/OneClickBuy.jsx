import React, { useState } from "react";
import axios from "axios";

const OneClickBuy = ({ productId, productName, isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) return setError("Введите имя");
    if (!phone.trim()) return setError("Введите телефон");

    setLoading(true);
    try {
      await axios.post("/api/oneclick-buy", {
        productId,
        productName,
        name,
        phone,
      });
      setSuccess(true);
      setName("");
      setPhone("");
      setTimeout(onClose, 3000); // Авто закрытие через 3 секунды
    } catch (err) {
      setError("Ошибка отправки, попробуйте снова");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">
          Купить {productName} в 1 клик
        </h2>

        {success && <p className="text-green-600 mb-2">Заявка отправлена!</p>}
        {error && <p className="text-red-600 mb-2">{error}</p>}

        {!success && (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Ваше имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="tel"
              placeholder="Телефон"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 rounded text-white font-bold ${
                loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              } transition-colors`}
            >
              {loading ? "Отправка..." : "Купить"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default OneClickBuy;
