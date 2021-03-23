import React, { useState, useEffect } from "react";
import { Card, Spinner } from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import {GenericPost} from "../components/commonComponents/mainPost.js"
import {PageNotFound} from "../components/notFound.js";

export const SearchByTag = ({ match }) => {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/search/byTag/${match.params.tagLabel}`)
      .then((res) => res.json())
      .then((res) => setPosts(res))
      .catch(() => {
        console.log("Found error");
        setError(true);
      });
  }, []);

  return !error ? (
    <div className="search-wrapper">
      <div className="search-title" style={{ marginBottom: "1rem" }}>
        <div id="search-result">
          <FormattedMessage id="search-result-tag"/> {match.params.tagLabel}:{" "}
        </div>
      </div>
      {!!posts ? (
        !!posts.length ? (
          <Card style={{ marginBottom: "3rem" }} className="card-out">
            <Card.Body>
              <GenericPost posts={posts} style={{ marginBottom: "1rem" }} />
            </Card.Body>
          </Card>
        ) : (
          <div className="posts-abscence">
            <PageNotFound />
          </div>
        )
      ) : (
        <div className="loader text-center">
          <Spinner animation="border" role="status" />
        </div>
      )}
    </div>
  ) : (
    <div className="tag-error">Tag doesn't exist </div> // most likely that i will destroy it
  );
};
