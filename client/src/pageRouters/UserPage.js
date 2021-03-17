import React, { useState, useEffect, useContext } from "react";
import { useLoad } from "../hooks/loadHook.js";
import { useHistory } from "react-router-dom";
import { UserPosts } from "../components/userComponents/userPosts";
import { authContext } from "../context/authContext";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Sorter } from "../components/userComponents/postsSorter";

export const UserPage = ({ match }) => {
  const [posts, setPosts] = useState(null);
  const [sort, setSort] = useState({name:-1})
  const [time, setTime] = useState(true);
  const context = useContext(authContext);
  const {request} = useLoad();
  const history = useHistory();

  const getPosts = async () => {
    const data = await request('/user/sort', "PUT", {sortMatch:{author:match.params.userId}, sort:sort});
    setPosts(data);
  };

  const selectHandler = (event) => {
    setSort(event.value);
  };

  useEffect(() => {
    if (time) {
      setTimeout(() => {
        setTime(false);
      }, 3000);
    } else {
      setTimeout(() => {
        setTime(true);
      }, 5000);
    }
  }, [time]);

  useEffect(() => {
    getPosts();
  }, [time, sort]);

  const newPost = () => {
    history.push("/createpost");
  };
  return (
    <div>
      <Container>
        <Row>
          <Col lg={3}>
            <h2>USER PAGE</h2>
            <div className="user-data">
              {match.params.userId === context.id ? (
                <Button variant="primary" onClick={newPost}>
                  Create new post
                </Button>
              ) : null}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
          <h2>User posts</h2>
          </Col>
        </Row>
        <Row>
          <Col lg={8} md={8} sm={12}>
            <UserPosts posts={posts} />
          </Col>
          <Col lg={4} md={4} sm={12}>
            <Sorter selectHandler={selectHandler}/>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
