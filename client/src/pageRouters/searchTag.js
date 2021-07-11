import React, { useState, useEffect } from "react";
import { Spinner, Row, Col } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { PostPaginator } from "../components/commonComponents/postPaginator.js";
import { GenericPost } from "../components/commonComponents/mainPost.js";
import { Sorter } from "../components/commonComponents/postsSorter.js";
import { PageNotFound } from "../components/notFound.js";
import { serverRoutes } from '../constants/allRoutes';
import "../styles/search.css";

const { search: { byTag } } = serverRoutes;

// TODO: take out constants, document titles, routes and backend-interacted functions
// TODO: error is true or false, we dont need to double check it in 54 line
const PER_PAGE = 10;
const defaultSort = { ratingTotal: -1 };

export const SearchByTag = ({ match }) => {
  const tagLabel = match.params.tagLabel;
  const [sort, setSort] = useState(defaultSort);
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(false);
  const [curPage, setCurPage] = useState(0);
  document.title = `Search by tag | Поиск по тегу: ${tagLabel}; `;

  const offset = curPage * PER_PAGE;
  const pageCount = !!posts && Math.ceil(posts.length / PER_PAGE);
  const postsOnPage = !!posts && posts.slice(offset, offset + PER_PAGE);

  useEffect(() => {
    fetch(`${byTag}/${tagLabel}`, {
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

  const handlePageClick = (data) => {
    setCurPage(data.selected);
  };

  if (!!error) {
    return <PageNotFound />;
  }
  if (!posts) {
    return (
      <div className="loader text-center">
        <Spinner animation="border" role="status" />
      </div>
    );
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
            <GenericPost posts={postsOnPage} style={{ marginBottom: "1rem" }} />
            <PostPaginator
              pageCount={pageCount}
              onPageChange={handlePageClick}
            />
          </Col>
          <Col lg={4} md={4} className="posts-sorter">
            <Sorter selectHandler={selectHandler} />
          </Col>
        </Row>
      </div>
    </div>
  );
};
