import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { TagCloud } from "react-tagcloud";

const color = {
  luminosity: "dark",
  format: "rgba",
  alpha: 1,
};

export const Cloud = () => {
  const [tags, setTags] = useState([]);
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

  if (!tags.length){
    return (
      <div className="text-center">
        <Spinner
          animation="border"
          role="status"
        />
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
        disableRandomColor="true" // temporary true, need to prevent multiple fetch
      />
    </div>
  );
};
