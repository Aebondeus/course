import React, { useState, useCallback } from "react"; // fro switching
import { Nav } from "react-bootstrap";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import locales from "../../language/locales.js";
import {FormattedMessage} from "react-intl";

export const UiSwitch = ({setLang}) => {
  const [switchState, setSwitch] = useState(localStorage.getItem("lang") === locales.EN);
  const updateLang = useCallback((event) => {
    if (event.target.checked){
      setLang(locales.EN); localStorage.setItem("lang", locales.EN);
      setSwitch(true);
    } else {
      setLang(locales.RU);
      setSwitch(false);
      localStorage.setItem("lang", locales.RU)
    } 
  })
  return (
    <Nav id="navbar-items-switch" className="ml-lg-5">
      <Nav.Item className="mt-lg-3 ml-lg-2">
        <Grid component="label" container alignItems="center">
          <Grid item><FormattedMessage id="navbar-lang.ru"/></Grid>
          <Grid item>
            <Switch onClick={updateLang} checked={switchState} color="default"/>
          </Grid>
          <Grid item><FormattedMessage id="navbar-lang.en"/></Grid>
        </Grid>
      </Nav.Item>
      <Nav.Item className="mt-lg-3 ml-lg-3">
        <Grid component="label" container alignItems="center">
          <Grid item>🌚</Grid>
          <Grid item>
            <Switch />
          </Grid>
          <Grid item>🌞</Grid>
        </Grid>
      </Nav.Item>
    </Nav>
  );
};
