import React, { useState, useEffect } from "react";
import randomColor from "randomcolor";
import {Spinner} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { TagCloud } from "react-tagcloud";

export const Cloud = () => {
  const [tags, setTags] = useState([]);
  const [color, setColor] = useState({
    luminosity: 'dark',
    format: 'rgba',
    alpha:1
 })
  const history = useHistory();

  useEffect(() => {
    fetch("/main/alltags")
      .then((res) => res.json())
      .then((res) => {
        setTags(
          res.map((tag) => {
            return { value: tag.label, count: tag.posts.length };
          })
        );
      });
  }, []);

  const tagHandler = (event) => {
    history.push(`/searchByTag/${event.value}`);
  };

  return (
    <div className="tag-cloud-wrapper text-center">
      {!!tags.length ? (
        <TagCloud
          minSize={10}
          maxSize={30}
          tags={tags}
          onClick={tagHandler}
          colorOptions={color}
        />
      ) : (
        <Spinner
          animation="border"
          role="status"
          className="text-center"
          variant="primary"
        />
      )}
    </div>
  );
};
