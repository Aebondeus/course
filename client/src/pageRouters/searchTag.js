import React, { useState, useEffect } from "react";
import { Card, Spinner, Row, Col } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { GenericPost } from "../components/commonComponents/mainPost.js";
import { Sorter } from "../components/commonComponents/postsSorter.js";
import { PageNotFound } from "../components/notFound.js";
import "../styles/search.css";

const defaultSort = {ratingTotal:-1}

export const SearchByTag = ({ match }) => {
  const tagLabel = match.params.tagLabel;
  const [sort, setSort] = useState(defaultSort);
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/search/byTag/${tagLabel}`, {
      method: "PUT",
      body: JSON.stringify({ sort: sort }),
      headers: { "Content-Type": "application/json" },
    })
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
  }, [sort]);

  const selectHandler = (event) => {
    setSort(event.value);
  };

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
      <div className="row-wrapper">
        <Row>
          <Col lg={8} md={8} className="posts-col">
            <Card className="card-out">
              <Card.Body>
                <GenericPost posts={posts} style={{ marginBottom: "1rem" }} />
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} md={4} className="sorter-col">
            <Card className="card-out">
              <Card.Body>
                <Sorter selectHandler={selectHandler} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};
