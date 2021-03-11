import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { authContext } from "../../context/authContext";
import { useLoad } from "../../hooks/loadHook.js";

export const UserPosts = (props) => {
  const { request, load } = useLoad();
  const context = useContext(authContext);
  const medium = (arr) => {
    let data = arr.reduce((prev, cur) => {
      return prev + cur;
    });
    return (data / arr.length).toFixed(1);
  };
  const history = useHistory();

  const deletePost = async (event) => {
    event.preventDefault();
    console.log(props.data[0].author);
    console.log(event.target.disabled);
    await request(`/post/deletepost/`, "POST", { postId: event.target.value });
    history.push(`/user/${props.data[0].author}`);
  };

  const updatePost = async(event) => {
    history.push(`/updatepost/${event.target.value}`)
  }

  return (
    <div className="userposts-wrapper">
      <div className="title" style={{ marginTop: ".5rem" }}>
        <h2>User posts</h2>
      </div>
      <Card>
        <Card.Body>
          {props.data.length > 0 ? (
            props.data.map((post, idx) => {
              return (
                <Card key={idx}>
                  <Card.Body>
                    <Card.Title className="post-title">{post.name}</Card.Title>
                    <Card.Text>
                      <div className="post-synopsis">{post.synopsis}</div>
                      <div className="post-rating">
                        {post.rating.length > 0 ? medium(post.rating) : 0}
                      </div>
                      <div className="post-link">
                        <Link to={`/post/${post._id}`}>Просмотреть пост</Link>
                      </div>
                    </Card.Text>
                  </Card.Body>
                  {post.author === context.id ? (
                    <Card.Footer>
                      <Button value={post._id}
                      variant="primary"
                      className="change-post update-post"
                      onClick={updatePost}>
                        Update post
                      </Button>
                      <Button
                        value={post._id}
                        variant="danger"
                        className="change-post delete-post"
                        onClick={deletePost}
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
          )}
        </Card.Body>
      </Card>
    </div>
  );
};
