import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Card, Spinner } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { authContext } from "../../context/authContext";
import { useLoad } from "../../hooks/loadHook.js";
import { dateTimeCommon } from "../../utils/dateFormat.js";

export const UserPosts = ({ posts, del, setDel }) => {
  const { request, load } = useLoad();
  const context = useContext(authContext);
  const history = useHistory();

  const deletePost = async (event) => {
    event.preventDefault();
    const postId = event.target.value;
    await request(`/handle_post/post/${postId}`, "DELETE");
    setDel(!del);
  };

  const updatePost = async (event) => {
    history.push(`/updatepost/${event.target.value}`);
  };

  if (!posts) {
    return (
      <div className="loader text-center">
        <Spinner animation="border" role="status" />
      </div>
    );
  }
  if (!posts.length) {
    return (
      <Card.Text>
        <div className="posts-abscence"><FormattedMessage id="user-posts.abscence"/></div>
      </Card.Text>
    );
  }
  return (
    <div className="userposts-wrapper">
      {posts.map((post, idx) => {
        return (
          <Card key={idx} style={{ marginBottom: "1rem" }}>
            <Card.Body className="user-post">
              <Card.Title className="post-title">{post.name}</Card.Title>
              <Card.Text>
                <div className="post-synopsis">
                  <FormattedMessage id="synopsis" />: {post.synopsis}
                </div>
                <div className="post-rating">
                  <FormattedMessage id="rating" />: {post.ratingTotal}
                </div>
                <div className="post-date">
                  <FormattedMessage id="updated" />:{" "}
                  {dateTimeCommon.format(Date.parse(post.updated))}
                </div>
                <div>
                  <Link className="post-link" to={`/post/${post._id}`}>
                    <FormattedMessage id="open-post" />
                  </Link>
                </div>
              </Card.Text>
            </Card.Body>
            {post.author === context.id && (
              <Card.Footer style={{ padding: "0 .5rem" }}>
                <Button
                  value={post._id}
                  variant="link"
                  className="change-btn update-btn"
                  onClick={updatePost}
                >
                  <FormattedMessage id="update-post" />
                </Button>
                <Button
                  value={post._id}
                  variant="link"
                  className="change-btn delete-btn"
                  onClick={deletePost}
                  disabled={load}
                >
                  <FormattedMessage id="delete-post" />
                </Button>
              </Card.Footer>
            )}
          </Card>
        );
      })}
    </div>
  );
};
