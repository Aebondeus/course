import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import { TagCloud } from "react-tagcloud";

export const Cloud = () => {
  const [tags, setTags] = useState(null);
  const history = useHistory();

  useEffect(() => {
    fetch("/main/alltags")
      .then((res) => res.json())
      .then((res) => {
        setTags(
          res.reduce((tagArr, tag) => {
            if (!!tag.posts.length) {
              tagArr.push({ value: tag.label, count: tag.posts.length });
            }
            return tagArr;
          }, [])
        );
      });
  }, []);

  const tagHandler = (event) => {
    const tag = event.value;
    history.push(`/searchByTag/${tag}`);
  };

  if (!tags) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status" />
      </div>
    );
  }
  if (!tags.length) {
    return (
      <div className="text-center">
        <FormattedMessage id="tag-cloud.abscence" />
      </div>
    );
  }
  return (
    <div className="tag-cloud-wrapper text-center">
      <TagCloud
        minSize={10}
        maxSize={30}
        tags={tags}
        onClick={tagHandler}
        disableRandomColor={true} // temporary true, need to prevent multiple fetch
      />
    </div>
  );
};
