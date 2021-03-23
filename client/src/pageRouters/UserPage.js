import React, { useState, useEffect, useContext } from "react";
import { useLoad } from "../hooks/loadHook.js";
import { useHistory } from "react-router-dom";
import { UserPosts } from "../components/userComponents/userPosts";
import { authContext } from "../context/authContext";
import { Row, Col, Button } from "react-bootstrap";
import { Sorter } from "../components/userComponents/postsSorter";
import { UserInfo } from "../components/userComponents/aboutUser.js";
import { FormattedMessage } from "react-intl";
import "../styles/userpage.css";
import { PageNotFound } from "../components/notFound.js";

export const UserPage = ({ match }) => {
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState(null);
  const [sort, setSort] = useState({name:-1})
  const context = useContext(authContext);
  const history = useHistory();

  const getPosts = async () => {
    await fetch("/user/sort", {
      method: "PUT",
      body: JSON.stringify({ sortMatch: { author: match.params.userId }, sort: sort }),
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
  };

  const selectHandler = (event) => {
    setSort(event.value);
  };

  useEffect(() => {
    getPosts();
  }, [sort]);

  const newPost = () => {
    history.push("/createpost");
  };
  return !error ? (
    <div>
      <div className="user-data" style={{ marginBottom: "2rem" }}>
        <UserInfo userId={match.params.userId} />
      </div>
      <Row>
        <Col lg={8} style={{ marginBottom: "1rem" }}>
          <div className="post-title" style={{ marginBottom: "1rem" }}>
            <FormattedMessage id="user-posts.title" />:
          </div>
          {match.params.userId === context.id ? (
            <Button variant="primary" onClick={newPost}>
              <FormattedMessage id="new-post" />
            </Button>
          ) : null}
        </Col>
      </Row>
      <Row>
        <Col lg={8} md={8} sm={12} className="user-posts">
          <UserPosts posts={posts} />
        </Col>
        <Col lg={4} md={4} sm={12} className="posts-sorter">
          <Sorter selectHandler={selectHandler} />
        </Col>
      </Row>
    </div>
  ) : <div className="posts-abscence"><PageNotFound /></div>
};
