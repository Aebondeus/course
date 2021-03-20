import React from "react";
import CreatableSelect from "react-select/creatable";

export const TagsField = (props) => {
  return (
    <CreatableSelect
      isMulti={true}
      options={props.tags}
      onChange={props.handleTag}
      placeholder="Select tag..."
      value={props.value}
    />
  );
};
