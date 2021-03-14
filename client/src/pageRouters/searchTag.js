import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { PostsResult } from "../components/searchComponents/postsResult";

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
        <div>Search results for the tag {match.params.tagLabel}: </div>
      </div>
      {!!posts ? (
        !!posts.length ? (
          <Card>
            <Card.Body>
              {posts.map((post) => {
                return <PostsResult data={post} />;
              })}
            </Card.Body>
          </Card>
        ) : (
          <div className="posts-abscence">Posts not found</div>
        )
      ) : (
        <div className="loader">Here will be loader...</div> // yeah...
      )}
    </div>
  ) : (
    <div className="tag-error">Tag doesn't exist </div> // here will be 404 page
  );
};
