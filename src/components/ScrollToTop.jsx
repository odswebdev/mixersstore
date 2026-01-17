import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // Если есть якорь, скроллим к нему
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }

    // Отменяем любой текущий плавный скролл
    window.scrollTo({ top: 0, behavior: "auto" });

    // Делаем плавный скролл через requestAnimationFrame
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Малый таймаут гарантирует срабатывание даже при повторном клике
    const timeout = setTimeout(scrollToTop, 0);

    return () => clearTimeout(timeout);
  }, [pathname, search, hash, navigationType]);

  return null;
}
