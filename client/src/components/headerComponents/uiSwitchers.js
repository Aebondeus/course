import React, { useState, useCallback } from "react";
import { Nav } from "react-bootstrap";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import locales from "../../language/locales.js";
import { FormattedMessage } from "react-intl";

export const UiSwitch = ({ setLang, setTheme }) => {
  const [langState, setLangSwitch] = useState(
    localStorage.getItem("lang") === locales.EN
  );
  const [themeState, setThemeSwitch] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const updateTheme = useCallback((event) => {
    if (event.target.checked) {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
      setThemeSwitch(true);
    } else {
      setTheme("light");
      setThemeSwitch(false);
      localStorage.setItem("theme", "light");
    }
  }, [setTheme]);

  const updateLang = useCallback((event) => {
    if (event.target.checked) {
      setLang(locales.EN);
      localStorage.setItem("lang", locales.EN);
      setLangSwitch(true);
    } else {
      setLang(locales.RU);
      setLangSwitch(false);
      localStorage.setItem("lang", locales.RU);
    }
  }, [setLang]);

  return (
    <Nav id="navbar-items-switch" className="ml-lg-5">
      <Nav.Item className="mt-lg-3 ml-lg-2">
        <Grid component="label" container alignItems="center">
          <Grid item>
            <FormattedMessage id="navbar-lang.ru" />
          </Grid>
          <Grid item>
            <Switch
              onClick={updateLang}
              checked={langState}
              color={!themeState ? "default" : "secondary"}
            />
          </Grid>
          <Grid item>
            <FormattedMessage id="navbar-lang.en" />
          </Grid>
        </Grid>
      </Nav.Item>
      <Nav.Item className="mt-lg-3 ml-lg-3">
        <Grid component="label" container alignItems="center">
          <Grid item>🌞</Grid>
          <Grid item>
            <Switch
              onClick={updateTheme}
              checked={themeState}
              color={!themeState ? "default" : "secondary"}
            />
          </Grid>
          <Grid item>🌚</Grid>
        </Grid>
      </Nav.Item>
    </Nav>
  );
};
