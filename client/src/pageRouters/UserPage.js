import React, { useState, useEffect, useContext} from "react";
import {useHistory} from "react-router-dom";
import { UserPosts } from "../components/userComponents/userPosts";
import { authContext } from "../context/authContext";
import {Button} from "react-bootstrap";

export const UserPage = ({ match }) => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [time, setTime] = useState(true);
  const context = useContext(authContext);
  const history = useHistory();

  const getPosts = () => {
    fetch(`/user/user_posts/${match.params.userId}`)
      .then((res) => res.json())
      .then((data) => setPosts(data));
    fetch(`/user/user_comments/${match.params.userId}`)
      .then((res) => res.json())
      .then((data) => setComments(data));
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
  }, [time]);

  const newPost = () => {
    history.push('/createpost')
  }
  return (
    <div>
      <h2>USER PAGE</h2>
      <div className="user-data">
      {match.params.userId === context.id ? (
        <Button variant="primary" onClick={newPost}>Create new post</Button>
      ) : null}
        <UserPosts data={posts}/>
      </div>
    </div>
  );
};
