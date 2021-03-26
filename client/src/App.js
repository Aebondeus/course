import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Routes } from "./routers";
import { MainHeader } from "./components/headerComponents/mainHeader";
import { MainFooter } from "./components/footerComponents/mainFooter";
import { authContext } from "./context/authContext.js";
import { useAuth } from "./hooks/authHook.js";
import { IntlProvider } from "react-intl";
import {ThemeProvider} from "styled-components";
import locales from "./language/locales";
import ru from "./language/ru.json";
import en from "./language/en.json";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { darkTheme, lightTheme } from "./styles/theme";
import { GlobalStyles } from "./styles/global";

function App() {
  const { token, id, nickname, login, logout } = useAuth();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  )
  const [curLang, setLang] = useState(
    localStorage.getItem("lang") || locales.RU
  );
  const Route = Routes(token, id);

  const locale = {
    [locales.RU]: ru,
    [locales.EN]: en,
  };

  return (
    <authContext.Provider value={{ token, id, nickname, login, logout }}>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyles />
        <IntlProvider locale={curLang} messages={locale[curLang]}>
          <div className="whole-app" style={{ position: "relative" }}>
            <div className="header-main">
              <MainHeader setLang={setLang} setTheme={setTheme}/>
            </div>
            <Container>{Route}</Container>
          </div>
          <div className="footer-wrapper">
            <MainFooter />
          </div>
        </IntlProvider>
      </ThemeProvider>
    </authContext.Provider>
  );
}

export default App;
