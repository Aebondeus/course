import React, { useState, useEffect, useContext, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { UserPostsWrapper } from "../components/userComponents/posts/userPosts";
import { authContext } from "../context/authContext";
import { Row, Col, Button, Spinner } from "react-bootstrap";
import { Sorter } from "../components/commonComponents/postsSorter";
import { AboutUserWrapper } from "../components/userComponents/about/aboutUserWrapper.js";
import { FormattedMessage } from "react-intl";
import { PostPaginator } from "../components/commonComponents/postPaginator.js";
import { PageNotFound } from "../components/notFound.js";
import { clientRoutes, serverRoutes } from '../constants/allRoutes';
import "../styles/userpage.css";

const { user: { sort: userSort, removeUser } } = serverRoutes;
const { createPost } = clientRoutes;
const PER_PAGE = 3;

export const UserPage = ({ match }) => {
  const { params: { userId }} = match;
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState(null);
  const [sort, setSort] = useState({ ratingTotal: -1 });
  const [del, setDel] = useState(false);
  const [curPage, setCurPage] = useState(0);
  const { id: contextId, token, logout } = useContext(authContext);
  const history = useHistory();

  const pageCount = posts && Math.ceil(posts.length / PER_PAGE);

  const offset = curPage * PER_PAGE;

  const postsOnPage = posts && posts.slice(offset, offset + PER_PAGE);

  const getPosts = useCallback(async () => {
    //! will be refactored
    await fetch(userSort, {
      method: "PUT",
      body: JSON.stringify({
        sortMatch: { author: userId },
        sort: sort,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw Error;
      })
      .then((res) => setPosts(res))
      .catch(() => setError(true));
  }, [sort, userId]);

  useEffect(() => {
    getPosts();
  }, [del, sort, userId, getPosts]);

  useEffect(() => {
    if (!postsOnPage?.length && curPage !== 0) {
      setCurPage(curPage - 1);
    }
  }, [pageCount, postsOnPage, curPage])

  const selectHandler = ({ value }) => {
    setSort(value);
  };

  const newPost = () => {
    history.push(createPost);
  };

  const handlePageClick = ({ selected }) => {
    setCurPage(selected);
  };

  const deleteUser = async () => { //! will be refactored
    await fetch(`${removeUser}/${userId}`, {
      method: "DELETE",
      body: JSON.stringify({
        token,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw Error;
      })
      .then(() => {
        logout();
        history.push("/");
      })
      .catch(() => {
        console.log("Get your hands of this console!");
      });
  };

  if (error) {
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
    <div>
      <div className="user-data" style={{ marginBottom: "2rem" }}>
        <AboutUserWrapper userId={userId} deleteUser={deleteUser} />
      </div>
      <Row className="user-posts-title">
        <Col lg={8} style={{ marginBottom: "1rem" }}>
          <div className="post-title">
            <FormattedMessage id="user-posts.title" />:
          </div>
          {userId === contextId && (
            <Button variant="link" className="new-post-btn" onClick={newPost}>
              ✒️
              <FormattedMessage id="new-post" />
            </Button>
          )}
        </Col>
      </Row>
      <Row className="user-posts-content">
        <Col lg={8} md={8} sm={12} className="user-posts">
          <UserPostsWrapper posts={postsOnPage} del={del} setDel={setDel} />
          {pageCount > 1 && (
            <PostPaginator
              pageCount={pageCount}
              onPageChange={handlePageClick}
            />
          )}
        </Col>
        <Col lg={4} md={4} sm={12} className="posts-sorter">
          <Sorter selectHandler={selectHandler} />
        </Col>
      </Row>
    </div>
  );
};
