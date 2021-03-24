import React, { useState, useEffect } from "react";
import { Card, Spinner } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { GenericPost } from "../components/commonComponents/mainPost.js";
import { PageNotFound } from "../components/notFound.js";

export const SearchByTag = ({ match }) => {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(false);
  const tagLabel = match.params.tagLabel;

  useEffect(() => {
    fetch(`/search/byTag/${tagLabel}`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw Error;
      })
      .then((res) => setPosts(res))
      .catch(() => {
        console.log("Found error");
        setError(true);
      });
  }, []);

  if (!!error){
    return (<PageNotFound />)
  }
  if (!posts){
    return  (
      <div className="loader text-center">
        <Spinner animation="border" role="status" />
      </div>
    )
  }
  return (
    <div className="search-wrapper">
      <div className="search-title" style={{ marginBottom: "1rem" }}>
        <div id="search-result">
          <FormattedMessage id="search-result-tag" /> {tagLabel}:{" "}
        </div>
      </div>
      <Card style={{ marginBottom: "3rem" }} className="card-out">
        <Card.Body>
          <GenericPost posts={posts} style={{ marginBottom: "1rem" }} />
        </Card.Body>
      </Card>
    </div>
  );
};
