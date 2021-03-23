import React, {useState} from "react";
import {Container} from "react-bootstrap";
import { Routes } from "./routers";
import { MainHeader } from "./components/headerComponents/mainHeader";
import { authContext } from "./context/authContext.js";
import { useAuth } from "./hooks/authHook.js";
import { IntlProvider } from "react-intl";
import locales from "./language/locales";
import ru from "./language/ru.json";
import en from "./language/en.json";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { MainFooter } from "./components/footerComponents/mainFooter";

function App() {
  const { token, id, nickname, login, logout } = useAuth();
  const [curLang, setLang] = useState(localStorage.getItem('lang') || locales.RU)
  const Route = Routes(token, id);

  const locale = {
    [locales.RU]: ru,
    [locales.EN]: en,
  };

  return (
    <authContext.Provider value={{ token, id, nickname, login, logout }}>
      <IntlProvider locale={curLang} messages={locale[curLang]}>
        <div className="whole-app" style={{ position: "relative" }}>
          <div className="header-main">
            <MainHeader setLang={setLang} />
          </div>
          <div className="all-components">
            <Container>{Route}</Container>
          </div>
        </div>
        <div className="footer-wrapper">
          <MainFooter />
        </div>
      </IntlProvider>
    </authContext.Provider>
  );
}

export default App;
