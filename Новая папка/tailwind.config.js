/** @type {import('tailwindcss').Config} */

const importantPlugin = require("tailwindcss-important");

module.exports = {
  mode: "jit",
  content: [
    "./index.html",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        "hero-xs": "clamp(1.5rem, 4vw, 3.75rem)",
        "hero-sm": "clamp(2rem, 5vw, 3.75rem)",
        "hero-md": "clamp(3rem, 6vw, 5rem)",
        "hero-lg": "clamp(4rem, 7vw, 6rem)",
        "hero-xl": "clamp(5rem, 8vw, 7.5rem)",
        "about-xs": "clamp(4.5rem, 4vw, 3.75rem)",
        "about-sm": "clamp(4.5rem, 5vw, 3.75rem)",
        "about-md": "clamp(4.5rem, 6vw, 5rem)",
        "about-lg": "clamp(5.5rem, 7vw, 6rem)",
        "about-xl": "clamp(6rem, 8vw, 7.5rem)",
        "experience-xs": "clamp(1.5rem, 4vw, 3.75rem)",
        "experience-sm": "clamp(2rem, 5vw, 3.75rem)",
        "experience-md": "clamp(3rem, 6vw, 5rem)",
        "experience-lg": "clamp(4rem, 7vw, 6rem)",
        "experience-xl": "clamp(5rem, 8vw, 7.5rem)",
        "services-xs": "clamp(1.5rem, 4vw, 3.75rem)",
        "services-sm": "clamp(2rem, 5vw, 3.75rem)",
        "services-md": "clamp(3rem, 6vw, 5rem)",
        "services-lg": "clamp(4rem, 7vw, 6rem)",
        "services-xl": "clamp(5rem, 8vw, 7.5rem)",
        "projects-xs": "clamp(1.5rem, 4vw, 3.75rem)",
        "projects-sm": "clamp(2rem, 5vw, 3.75rem)",
        "projects-md": "clamp(3rem, 6vw, 5rem)",
        "projects-lg": "clamp(4rem, 7vw, 6rem)",
        "projects-xl": "clamp(5rem, 8vw, 7.5rem)",
        "testimonials-xs": "clamp(1.5rem, 4vw, 3.75rem)",
        "testimonials-sm": "clamp(2rem, 5vw, 3.75rem)",
        "testimonials-md": "clamp(3rem, 6vw, 5rem)",
        "testimonials-lg": "clamp(4rem, 7vw, 6rem)",
        "testimonials-xl": "clamp(5rem, 8vw, 7.5rem)",
        "faq-xs": "clamp(1.5rem, 4vw, 3.75rem)",
        "faq-sm": "clamp(2rem, 5vw, 3.75rem)",
        "faq-md": "clamp(3rem, 6vw, 5rem)",
        "faq-lg": "clamp(4rem, 7vw, 6rem)",
        "faq-xl": "clamp(5rem, 8vw, 7.5rem)",
        "contacts-xs": "clamp(1.5rem, 4vw, 3.75rem)",
        "contacts-sm": "clamp(2rem, 5vw, 3.75rem)",
        "contacts-md": "clamp(3rem, 6vw, 5rem)",
        "contacts-lg": "clamp(4rem, 7vw, 6rem)",
        "contacts-xl": "clamp(5rem, 8vw, 7.5rem)",
      },
      colors: {
        bg: "hsl(246 44% 7%)",
        border: "hsl(280 10% 50% / 1)",
        card: "hsl(237 36% 10%)",
        color: "hsl(240 18% 80%)",
        "neon-green": "#39ff14",
        "neon-blue": "#00f0ff",
        "neon-pink": "#ff00f0",
        "neon-purple": "#c800ff",
        "theme-text": "var(--theme-text)",
        "theme-border": "var(--theme-border)",
        "theme-hover": "var(--theme-hover)",
        "theme-bg-dd": "var(--theme-bg-dd)",
        "fun-gray-light": "#b2bbcf",
        "fun-gray": "#7b89a8",
        "fun-gray-medium": "#767c85",
        "fun-gray-darker": "#2a2a2c",
        "fun-gray-dark": "#1F1F20",
        "fun-gray-darkest": "#141414",
        "fun-pink": "#0fc",
        "fun-pink-darker": "#000f2e",
        "fun-pink-darkest": "#000c24",
        "fun-pink-dark": "#192742",
        "fun-pink-light": "#009ac5",
        "purple-500": "#6b46c1",
        "pink-500": "#d53f8c",
        "red-500": "#e53e3e",
        "blue-500": "#3182ce",
        "blue-600": "#2b6cb0",
        "gradient-start": "#f3ec78",
        "gradient-end": "#af4261",
      },
      borderColor: {
        "border-hover": "#af4261",
      },
      transitionProperty: {
        border: "border-color",
      },
      scale: {
        105: "1.05",
        110: "1.10",
      },
      borderRadius: {
        "12px": "12px",
      },
      backgroundImage: {
        gradientDropDownLayout:
          "linear-gradient(90deg, rgba(0,252,252,0.8), rgba(0,252,252,0.6), rgba(0,255,255,0.4))",
        gradient:
          "conic-gradient(from 180deg at 50% 70%,hsla(0,0%,98%,1) 0deg,#eec32d 72.0000010728836deg,#ec4b4b 144.0000021457672deg,#709ab9 216.00000858306885deg,#4dffbf 288.0000042915344deg,hsla(0,0%,98%,1) 1turn)",
        "dark-squad": "linear-gradient(to right, #121212, #1a1a1a)",
        "pastel-soft": "linear-gradient(to right, #fce4ec, #f8bbd0)",
        "rich-tones": "linear-gradient(to right, #212121, #424242)",
        "natural-colors": "linear-gradient(to right, #f0f4c3, #c5e1a5)",
        "sea-atmosphere": "linear-gradient(to right, #e0f7fa, #80deea)",
        space: "linear-gradient(to right, #000000, #3f51b5)",
        fruity: "linear-gradient(to right, #ffccbc, #ffab91)",
        "deep-forest": "linear-gradient(to right, #ffccbc, #ffab91)",
        "warm-sunset": "linear-gradient(to right, #ff6f20, #ff9e80)",
        "nature-harmony": "linear-gradient(to right, #e0f7fa, #a5d6a7)",
        "quiet-ocean": "linear-gradient(to right, #0097a7, #80deea)",
        "warm-lights": "linear-gradient(to right, #d35400, #f39c12)",
        "winter-chill": "linear-gradient(to right, #1976d2, #90caf9)",
        "sunny-fields": "linear-gradient(to right, #ffeb3b, #ffe082)",
        "mountain-dawn": "linear-gradient(to right, #6a1b9a, #ab47bc)",
        "mysterious-space": "linear-gradient(to right, #1a237e, #2196f3)",
        "forest-mystery": "linear-gradient(to right, #2e7d32, #66bb6a)",
        "bright-fantasy": "linear-gradient(to right, #ff5252, #ff4081)",
        "night-symphony": "linear-gradient(to right, #3e2723, #4a148c)",
        "fairy-flowers": "linear-gradient(to right, #e91e63, #f06292)",
        "warm-evening": "linear-gradient(to right, #ff7043, #ffcc80)",
        "eternal-autumn": "linear-gradient(to right, #bf360c, #d84315)",
        "light-rainbow":
          "linear-gradient(to right, #ff5252, #ffeb3b, #4caf50, #2196f3)",
        "fire-sunset": "linear-gradient(to right, #ff6f00, #ff9800, #ff5722)",
        "cool-pomegranate": "linear-gradient(to right,#8e44ad,#c0392b)",
        "sunny-softness": "linear-gradient(to right, #ffeb3b, #ffb74d)",
        "night-secret": "linear-gradient(to right, #212121, #424242)",
        "moonlight-glow": "linear-gradient(to right, #00695c, #004d40)",
        "winter-tale": "linear-gradient(to right, #0d47a1, #1976d2)",
        "vibrant-summer": "linear-gradient(to right, #ff8f00, #ffd740)",
        "gradient-theme1": "linear-gradient(to right, #2c3e50, #bdc3c7)",
        "gradient-theme2": "linear-gradient(to right, #FFF, #FFF)",
        "gradient-theme3":
          "linear-gradient(to right, #f7797d, #fbd786, #c6ffdd)",
        "gradient-theme4": "linear-gradient(to right, #8e2de2, #4a00e0)",
        "gradient-theme5": "linear-gradient(to right, #ad5389, #3c1053)",
        "image-theme1":
          "url('/src/assets/photos/abstract/retrowave-scenery.jpg')",
        themeAstronaut:
          "url('/src/assets/photos/abstract/abstract-astronaut.jpg')",
        /* "image-theme3":
          "url('/src/assets/photos/abstract/abstract-circles.jpg')", */
        "image-theme5":
          "url('/src/assets/photos/abstract/abstract-mountains.jpg')",
        "image-theme6": "url('/src/assets/photos/abstract/abstract-grid2.jpg')",
        "image-theme7": "url('/src/assets/photos/abstract/man-vr-glasses.jpg')",
        themeSpace:
          "url('/src/assets/photos/abstract/abstract-astronaut-snap.jpg')",
        themeBrownBlackGr: "url('/src/assets/photos/gr-bg-pt.png')",
        themeRoseOrangeGr: "url('/src/assets/photos/gr-bg-pt2.png')",
        themeBlueLineGr: "url('/src/assets/photos/gr-bg-pt3.png')",
        themeBlueBoxGr: "url('/src/assets/photos/gr-bg-pt4.png')",
        themeMetallLineGr: "url('/src/assets/photos/gr-bg-pt7.png')",
        themeRandomGr: "url('/src/assets/photos/gr-bg-pt8.png')",
        themeTextAbstractBlack:
          "url('/src/assets/photos/iridescent-texture-background.jpg')",
        themeTextAbstractLight:
          "url('/src/assets/photos/white-iridescent-texture-background.jpg')",
        themeTextWaveBlue:
          "url('/src/assets/photos/image-from-rawpixel-id-11992051-jpeg.jpg')",
        "video-theme1":
          "url('/src/assets/videos/mixkit-abstract-tunnel-of-digital-rotating-squares-30868-hd-ready.mp4')",
        "video-theme2":
          "url('/src/assets/videos/vecteezy_a-software-developer-working-on-a-complex-coding-project_47880060.mov')",
        themeMouseColor: "linear-gradient(to right, #ff7e5f, #feb47b)",
        themeFogEffect: "linear-gradient(to right, #000, #000)",
        themeWaterfallShinyDrops: "linear-gradient(to right, #ff7e5f, #feb47b)",
        themeElectricFlashes: "linear-gradient(to right, #ff7e5f, #feb47b)",
        themeAstronaut2:
          "url('/src/assets/photos/abstract/abstract-astronaut.jpg')",
      },
      fontSize: {
        "clamp-logo": "clamp(1.25rem, 4vw + 0.5rem, 2.5rem)",
        "clamp-h1": "clamp(1.75rem, 4vw + 1rem, 3.5rem)",
        "clamp-h2": "clamp(1.5rem, 3vw + 1rem, 3rem)",
        "clamp-h3": "clamp(1.25rem, 2.5vw + 1rem, 2.5rem)",
        "clamp-h4": "clamp(1rem, 2vw + 1rem, 2rem)",
        "clamp-h5": "clamp(0.875rem, 2vw + 0.75rem, 1.5rem)",
        "clamp-h6": "clamp(0.75rem, 1.75vw + 0.75rem, 1.25rem)",
        "clamp-base": "clamp(0.9375rem, 1.5vw + 0.5rem, 1.125rem)",
        "clamp-small": "clamp(0.875rem, 1.75vw + 0.5rem, 1rem)",
        "clamp-logo-xs": "clamp(1.6rem, 2vw + 0.5rem, 1.6rem)", // Пример для лого
        "clamp-desc": "clamp(0.9375rem, 1.5vw + 0.5rem, 1.125rem)",
        "clamp-m-desc": "clamp(1rem, 2vw + 0.5rem, 1.125rem)",
        "clamp-about-tabs": "clamp(0.875rem, 2vw + 0.5rem, 0.875rem)",
        "clamp-tech-name": "clamp(0.875rem, 2vw + 0.5rem, 1.25rem)",
        "clamp-service-title": "clamp(1.125rem, 2vw + 0.75rem, 1.5rem)", // Пример для заголовка h3
        "clamp-link": "clamp(1rem, 2vw + 0.5rem, 1rem)", // Пример для ссылки
        "clamp-button": "clamp(0.875rem, 2vw + 0.5rem, 1rem)", // Пример для кнопки
        "clamp-subtitle": "clamp(1.25rem, 2vw + 0.875rem, 2.5rem)", // Пример для заголовка h2
        "clamp-achievements-title": "clamp(3.75rem, 2vw + 1rem, 3.75rem)",
        "clamp-achievements-desc": "clamp(1rem, 2vw + 1rem, 1rem)",
        "clamp-percentage-r": "clamp(1rem, 2vw + 0.5rem, 1.5rem)",
        "clamp-percentage-title": "clamp(1.25rem, 2vw + 0.5rem, 1.25rem)",
        "clamp-about-tabs": "clamp(0.875rem, 2vw + 0.5rem, 0.875rem)",
        "clamp-copyright": "clamp(0.75rem, 1.5vw + 0.5rem, 1rem)",
        "clamp-mobile-link-xs": "clamp(0.6rem, 1vw + 1.4rem, 2rem)",
        "clamp-mobile-link": "clamp(2rem, 2vw + 2rem, 2rem)",
        "clamp-tablet-link": "clamp(1.8rem, 2vw + 1.8rem, 2.2rem)",
        "clamp-pc-link": "clamp(2rem, 1vw + 2rem, 2.5rem)",
        "clamp-mobile-contact-btn": "clamp(1.4rem, 4vw + 1.2rem, 1.6rem)",
      },
      width: {
        100: "100%",
        50: "50%",
        33: "33%",
        cw: "calc(100% - 10px)",
        // Add your custom width values here
        "my-custom-width": "1210px",
      },
      boxShadow: {
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        item: "0 8px 16px rgba(0, 0, 0, 0.1)",
        container: "0 4px 8px rgba(0, 0, 0, 0.1)",
      },
      rotate: {
        360: "360deg",
      },
      animation: {
        anim: "anim 1s cubic-bezier(1,0,0.5,1) forwards",
        showText: "showText 0.5s 1s linear forwards",
        animouse: "animouse 2s linear infinite",
        animateprogress: "animateprogress 1s cubic-bezier(1,0,0.5,1) forwards",
        progressline: "progressline 1.5s 0.5s cubic-bezier(1,0,0.5,1) forwards",
        fadeInAndBounce: "fadeIn 3s ease-out",
        borderColorChange: "borderColorChange 5s ease-in-out infinite",
        boxShadowChange: "boxShadowChange 5s ease-in-out infinite",
        borderGlow: "borderGlow 2s ease-in-out infinite",
        scrollFadeIn: "scrollFadeIn 1s ease-out forwards",
        textH: "textH 5s ease-in-out infinite alternate",
        glowAnimation: "glowAnimation 1s infinite",
        hologramShimmer: "hologramShimmer 0.3s infinite",
        hologramAnimation: "hologramAnimation 8s infinite",
        mouseColorAnimation: "mouseColorAnimation 10s infinite alternate",
      },
      keyframes: {
        mouseColorAnimation: {
          "0%": {
            backgroundColor: "linear-gradient(to right, #ff7e5f, #feb47b)",
          },
          "50%": {
            backgroundColor: "linear-gradient(to left, #6a11cb, #2575fc)",
          },
          "100%": {
            backgroundColor: "linear-gradient(to right, #ff7e5f, #feb47b)",
          },
        },
        gradientAnimation: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        hologramAnimation: {
          "0%": { transform: "rotateX(30deg) rotateY(15deg) translateZ(0)" },
          "50%": {
            transform: "rotateX(20deg) rotateY(10deg) translateZ(20px)",
          },
          "100%": { transform: "rotateX(30deg) rotateY(15deg) translateZ(0)" },
        },
        hologramShimmer: {
          "0%": { opacity: "0.3" },
          "50%": { opacity: "0.7" },
          "100%": { opacity: "0.3" },
        },
        pulse: {
          "0%": {
            transform: "translate(-50%, -50%) scale(1)",
            boxShadow: "0 0 15px rgba(255, 255, 255, 0.6)",
          },
          "100%": {
            transform: "translate(-50%, -50%) scale(1)",
            boxShadow: "0 0 15px rgba(255, 255, 255, 0.6)",
          },
          "50%": {
            transform: "translate(-50%, -50%) scale(1.2)",
            boxShadow: "0 0 25px rgba(255, 255, 255, 0.8)",
          },
        },
        particlePulse: {
          "0%": {
            transform: "translate(-50%, -50%) scale(1)",
          },
          "100%": {
            transform: "translate(-50%, -50%) scale(1)",
          },
          "50%": {
            transform: "translate(-50%, -50%) scale(1.4)",
          },
        },
        colorShift: {
          "0%": {
            backgroundColor: "hsl(0,_100%,_70%)",
          },
          "100%": {
            backgroundColor: "hsl(360,_100%,_70%)",
          },
        },
        dropdownSlideDown: {
          from: { opacity: "0", transform: "translateY(-10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        glowAnimation: {
          "0%": { textShadow: "0 0 5px rgba(255, 255, 255, 0.5)" },
          "50%": { textShadow: "0 0 20px rgba(255, 255, 255, 0.9)" },
          "100%": { textShadow: "0 0 5px rgba(255, 255, 255, 0.5)" },
        },
        floatImage: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-22px)" },
          "100%": { transform: "translateY(0)" },
        },
        textH: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
        borderGlow: {
          "0%, 100%": { boxShadow: "0 0 15px 5px rgba(106, 17, 203, 0.7)" },
          "50%": { boxShadow: "0 0 25px 10px rgba(249, 212, 35, 0.9)" },
        },
        scrollFadeIn: {
          "0%": { opacity: 0, transform: "translateY(50px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        borderColorChange: {
          "0%": { borderColor: "#6a11cb" },
          "25%": { borderColor: "#2575fc" },
          "50%": { borderColor: "#ff4e50" },
          "75%": { borderColor: "#f9d423" },
          "100%": { borderColor: "#6a11cb" },
        },
        boxShadowChange: {
          "0%": { boxShadow: "0 0 20px #6a11cb" },
          "25%": { boxShadow: "0 0 20px #2575fc" },
          "50%": { boxShadow: "0 0 20px #ff4e50" },
          "75%": { boxShadow: "0 0 20px #f9d423" },
          "100%": { boxShadow: "0 0 20px #6a11cb" },
        },
        fadeIn2: {
          from: { opacity: "0", transform: "scale(0.9)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1", transform: "scale(1.03)" },
        },
        borderGlow: {
          "0%": { boxShadow: "0 0 15px 5px rgba(106, 17, 203, 0.7)" },
          "100%": { boxShadow: "0 0 15px 5px rgba(106, 17, 203, 0.7)" },
          "50%": { boxShadow: "0 0 25px 10px rgba(249, 212, 35, 0.9)" },
        },
        scrollFadeIn: {
          "0%": {
            opacity: "0",
            transform: "translateY(50px) rotateY(-15deg) rotateX(-15deg)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0) rotateY(0) rotateX(0)",
          },
        },
        anim: {
          "100%": { transform: "scaleX(1)" },
        },
        showText: {
          "100%": { opacity: "1" },
        },
        animouse: {
          "0%": {
            top: "29%",
          },
          "15%": {
            top: "50%",
          },
          "50%": {
            top: "50%",
          },
          "100%": {
            top: "29%",
          },
        },
        progressline: {
          "100%": { transform: "scaleX(1)" },
        },
      },
    },
    fontFamily: {
      signature: ["Roboto"],
    },
    container: {
      center: true,
    },
    screens: {
      xs: "320px", // Начиная с 320px
      sm: "640px", // Начиная с 640px
      md: "768px", // Начиная с 768px
      lg: "1024px", // Начиная с 1024px
      lgg: "1170px", // Начиная с 1024px
      xl: "1280px", // Начиная с 1280px
      "xl-1280": "1280px",
      "xl-1366": "1366px",
      "xl-1440": "1440px",
      "xl-1600": "1600px",
      "xl-1920": "1920px",
    },
  },
  plugins: [
    importantPlugin(),
    // ... other plugins ...
  ],
  resolve: {
    alias: {
      global: "window",
    },
  },
};
