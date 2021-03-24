import React from "react";
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";
import "react-mde/lib/styles/css/react-mde-all.css";

export const PartEditor = (props) => {
  return (
    <ReactMde
      value={props.content}
      onChange={props.setContent}
      selectedTab={props.selectedTab}
      onTabChange={props.setSelectedTab}
      generateMarkdownPreview={(markdown) =>
        Promise.resolve(<ReactMarkdown source={markdown} />)
      }
      childProps={{
        writeButton: {
          tabIndex: -1,
        },
      }}
    />
  );
};
