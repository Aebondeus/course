import React from "react";
import Select from "react-select";
import {FormattedMessage} from "react-intl";

export const GenreField = (props) => {
    return (
      <Select
        isSearchable={true}
        options={props.genres}
        onChange={props.handleGenre}
        placeholder={<FormattedMessage id="select-tags" />}
      />
    )
}