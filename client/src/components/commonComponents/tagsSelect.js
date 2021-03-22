import React from "react";
import CreatableSelect from "react-select/creatable";
import {FormattedMessage} from "react-intl";

export const TagsField = (props) => {
  return (
    <CreatableSelect
      isMulti={true}
      options={props.tags}
      onChange={props.handleTag}
      placeholder={<FormattedMessage id="select-genre"/>}
      value={props.value}
    />
  );
};
