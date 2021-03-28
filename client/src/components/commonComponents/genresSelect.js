import React, {useContext} from "react";
import Select from "react-select";
import { FormattedMessage } from "react-intl";
import {ThemeContext} from "styled-components";

export const GenreField = (props) => {
  const context = useContext(ThemeContext);
  
  return (
    <Select
      isSearchable={true}
      options={props.genres}
      onChange={props.handleGenre}
      placeholder={<FormattedMessage id="select-genre" />}
      theme={(theme) => ({
        ...theme,
        colors: {
          primary: context.text,
          primary25: context.cardHeaderFooter,
          primary50: context.cardHeaderFooter,
          neutral0: context.wholeApp,
          neutral20: context.cardBorder,
          neutral40: context.text,
        },
      })}
    />
  );
};
