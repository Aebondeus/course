import React, { useState } from "react";
import { MainForm } from "../components/newPartComponents/newPart.js";
import { useLoad } from "../hooks/loadHook.js";
import { useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";

export const NewPart = ({ match }) => {
  document.title = "New part | Новая глава";
  const postId = match.params.postId;
  const history = useHistory();
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [content, setContent] = useState("**Type here!**");
  const [selectedTab, setSelectedTab] = useState("write");
  const { request, load, error } = useLoad();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!!selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        finalSubmit(reader.result);
      };
    } else {
      finalSubmit("");
    }
  };

  const finalSubmit = async (image) => {
    try {
      const part = { name, content, image };
      await request("/handle_post/newpart", "POST", {
        postId: postId,
        part,
      });
      history.push(`/post/${postId}`);
    } catch (e) {
      console.log(e);
    }
  };

  const handleFileInput = (file) => {
    setSelectedFile(file[0]);
  };

  const nameHandler = (event) => {
    setName(event.target.value);
  };

  return (
    <Container className="new-part-wrapper">
      <MainForm
        error={error}
        content={content}
        selectedTab={selectedTab}
        load={load}
        handleFileInput={handleFileInput}
        nameHandler={nameHandler}
        setContent={setContent}
        setSelectedTab={setSelectedTab}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};
