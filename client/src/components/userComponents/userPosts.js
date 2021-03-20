import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Card, Spinner } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { authContext } from "../../context/authContext";
import { useLoad } from "../../hooks/loadHook.js";

export const UserPosts = ({ posts }) => {
  const { request, load } = useLoad();
  const context = useContext(authContext);
  const history = useHistory();

  const deletePost = async (event) => {
    event.preventDefault();
    await request(`/post/deletepost/`, "POST", { postId: event.target.value });
    history.push(`/user/${posts[0].author}`);
  };

  const updatePost = async (event) => {
    history.push(`/updatepost/${event.target.value}`);
  };

  return (
    <div className="userposts-wrapper">
      <Card>
        <Card.Body>
          {!!posts ? (
            posts.length > 0 ? (
              posts.map((post, idx) => {
                return (
                  <Card key={idx}>
                    <Card.Body>
                      <Card.Title className="post-title">
                        {post.name}
                      </Card.Title>
                      <Card.Text>
                        <div className="post-synopsis">
                          <FormattedMessage id="synopsis" />: {post.synopsis}
                        </div>
                        <div className="post-rating">
                          <FormattedMessage id="rating" />: {post.ratingTotal}
                        </div>
                        <div className="post-date">
                          <FormattedMessage id="updated" />: {post.updated}
                        </div>
                        <div className="post-link">
                          <Link to={`/post/${post._id}`}>Просмотреть пост</Link>
                        </div>
                      </Card.Text>
                    </Card.Body>
                    {post.author === context.id ? (
                      <Card.Footer>
                        <Button
                          value={post._id}
                          variant="primary"
                          className="change-btn update-btn"
                          onClick={updatePost}
                        >
                          Update post
                        </Button>
                        <Button
                          value={post._id}
                          variant="danger"
                          className="change-btn delete-btn"
                          onClick={deletePost}
                          disabled={load}
                        >
                          Delete post
                        </Button>
                      </Card.Footer>
                    ) : null}
                  </Card>
                );
              })
            ) : (
              <Card.Text>
                <div className="posts-abscence text-center">
                  Here could be the author posts...
                </div>
              </Card.Text>
            )
          ) : (
            <div className="loader text-center">
              <Spinner animation="border" role="status" />
            </div>
          )}
          {}
        </Card.Body>
      </Card>
    </div>
  );
};
