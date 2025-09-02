import React from "react";
import i18next from "i18next";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import { Provider } from "react-redux";
import "./assets/css/style.css";
import store from "./redux/store/store.js";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { initReactI18next } from "react-i18next";
import TokenTimeout from "./helper/RemoveToken.js";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();
i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    detection: {
      order: ["cookie", "htmlTag", "localStorage", "path", "subdomain"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/localse/{{lng}}/translation.json",
    },
  });
const initialOptions = {
  clientId: "clientId",
  currency: "USD",
  intent: "capture",
};
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
        <TokenTimeout />
        <ToastContainer />
    </Provider>
  </React.StrictMode>
);
