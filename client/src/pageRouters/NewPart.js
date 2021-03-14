import React, { useState } from "react";
import { MainForm } from "../components/newPartComponents/newPart.js";
import {useLoad} from "../hooks/loadHook.js";
import {useHistory} from "react-router-dom";
import {Container} from "react-bootstrap";

export const NewPart = ({match}) => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [content, setContent] = useState("**Type here, mah boi!**")  
  const [selectedTab, setSelectedTab] = useState("write");
  const {request, load} = useLoad();
  
  const handleSubmit = async (event) => {
      event.preventDefault();
      const part = {name, content};
      const result = await request('/post/newpart', "POST", {postId:match.params.postId, part});
      history.push(`/post/${match.params.postId}`);
  }
  
  const nameHandler = (event) => {
      setName(event.target.value)
  }

  return (
    <Container className="new-part-wrapper">
      <MainForm
        nameHandler={nameHandler}
        content={content}
        setContent={setContent}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        handleSubmit={handleSubmit}
        load={load}
      />
    </Container>
  );
};
