import React, { useContext } from "react";
import CreatableSelect from "react-select/creatable";
import { FormattedMessage } from "react-intl";
import { ThemeContext } from "styled-components";

export const TagsField = ({ tags, handleTag, value }) => {
  const context = useContext(ThemeContext);

  return (
    <CreatableSelect
      isMulti={true}
      options={tags}
      onChange={handleTag}
      placeholder={<FormattedMessage id="select-tags" />}
      value={value}
      theme={(theme) => ({
        ...theme,
        colors: {
          primary: context.text,
          primary25: context.cardHeaderFooter,
          primary50: context.cardHeaderFooter,
          neutral0: context.wholeApp,
          neutral10: context.tag,
          neutral20: context.cardBorder,
          neutral40: context.text,
          neutral80: context.text,
          danger: "black",
          dangerLight: context.tagDanger,
        },
      })}
    />
  );
};
