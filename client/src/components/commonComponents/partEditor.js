import React from "react";
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";
import "react-mde/lib/styles/css/react-mde-all.css";

export const PartEditor = ({
  content,
  setContent,
  selectedTab,
  setSelectedTab,
}) => {
  return (
    <ReactMde
      value={content}
      onChange={setContent}
      selectedTab={selectedTab}
      onTabChange={setSelectedTab}
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
