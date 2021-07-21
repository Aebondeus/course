import React, { useState, useEffect, useContext } from "react";
import { useLoad } from "../hooks/loadHook.js";
import { useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";
import { PartUpdate } from "../components/updatePartComponents/updatePart.js";
import { authContext } from "../context/authContext.js";
import { clientRoutes, serverRoutes } from '../constants/allRoutes';

const { part: { main }} = serverRoutes
const { toPost } = clientRoutes;

// TODO: take out document titles, backend-interacted functions, routes, destructure context
export const UpdatePart = ({ match }) => {
  const {
    params: { postId, partId },
  } = match;
  const { token } = useContext(authContext);
  const history = useHistory();
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [prevImage, setImage] = useState("");
  const [selectedTab, setSelectedTab] = useState("write");
  const { request, load, error } = useLoad();
  document.title = !!name
    ? `Update the part | Обновить главу: ${name}`
    : "Loading...";

  useEffect(() => {
    fetch(`${main}/${postId}/${partId}`)
      .then((data) => data.json())
      .then((data) => {
        setName(data.part.name);
        setContent(data.part.content);
        setImage(data.part.image);
      });
  }, [postId, partId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!!selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        finalSubmit(reader.result, true);
      };
    } else {
      finalSubmit(prevImage, false);
    }
  };

  const finalSubmit = async (image, updated) => {
    try {
      const data = { name, content, image };
      await request(`${main}/${postId}/${partId}`, "PUT", {
        data,
        prevImg: !!updated && prevImage,
        token
      });
      history.push(`${toPost}/${postId}`);
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
    <Container className="update-part-wrapper">
      <PartUpdate
        error={error}
        name={name}
        content={content}
        selectedTab={selectedTab}
        load={load}
        nameHandler={nameHandler}
        handleFileInput={handleFileInput}
        setContent={setContent}
        setSelectedTab={setSelectedTab}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};
