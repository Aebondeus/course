import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserPosts } from "../components/userComponents/userPosts";
import { authContext } from "../context/authContext";
import { Row, Col, Button } from "react-bootstrap";
import { Sorter } from "../components/commonComponents/postsSorter";
import { UserInfo } from "../components/userComponents/aboutUser.js";
import { FormattedMessage } from "react-intl";
import { PageNotFound } from "../components/notFound.js";
import "../styles/userpage.css";

export const UserPage = ({ match }) => {
  const userId = match.params.userId;
  const [error, setError] = useState(false);
  const [del, setDel] = useState(false);
  const [posts, setPosts] = useState(null);
  const [sort, setSort] = useState({ ratingTotal: -1 });
  const context = useContext(authContext);
  const history = useHistory();

  const getPosts = async () => {
    await fetch("/user/sort", {
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
  };

  const selectHandler = (event) => {
    setSort(event.value);
  };

  useEffect(() => {
    getPosts();
  }, [del, sort]);

  const newPost = () => {
    history.push("/createpost");
  };
  if (!!error) {
    return <PageNotFound />
  }
  return (
    <div>
      <div className="user-data" style={{ marginBottom: "2rem" }}>
        <UserInfo userId={userId} />
      </div>
      <Row className="user-posts-title">
        <Col lg={8} style={{ marginBottom: "1rem" }}>
          <div className="post-title" style={{ marginBottom: "1rem" }}>
            <FormattedMessage id="user-posts.title" />:
          </div>
          {userId === context.id &&(
            <Button variant="primary" onClick={newPost}>
              <FormattedMessage id="new-post" />
            </Button>
          )}
        </Col>
      </Row>
      <Row className="user-posts-content">
        <Col lg={8} md={8} sm={12} className="user-posts">
          <UserPosts posts={posts} del={del} setDel={setDel} />
        </Col>
        <Col lg={4} md={4} sm={12} className="posts-sorter">
          <Sorter selectHandler={selectHandler} />
        </Col>
      </Row>
    </div>
  );
};
