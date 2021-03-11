import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";

export const TagsField = (props) => {
  return (
    <CreatableSelect
      isMulti={true}
      options={props.tags}
      onChange={props.handleTag}
      placeholder={props.placeholder ? props.placeholder.map(tag => {return `${tag.label}, `}) : "Select bastard..."}
    />
  );
};
