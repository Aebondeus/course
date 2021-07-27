import React, { useState, useEffect, useContext } from "react";
import { MainPart } from "../components/newPostComponents/newPost.js";
import { useHistory } from "react-router-dom";
import { useLoad } from "../hooks/loadHook.js";
import { authContext } from "../context/authContext";
import { clientRoutes, serverRoutes } from "../constants/allRoutes";

const {
  post: { newPost, uploadTags, uploadGenres },
} = serverRoutes;
const { user } = clientRoutes;

export const NewPost = () => {
  document.title = "New post | Новое произведение";
  const [form, setForm] = useState({
    title: "",
    synopsis: "",
  });
  const [tags, setTags] = useState([]);
  const [genres, setGenres] = useState([]);
  const [chosenTags, setChosen] = useState(null);
  const [genreLabel, setLabel] = useState(null);
  const [tagsValue, setValue] = useState(null);
  const { load, request, error } = useLoad();
  const history = useHistory();
  const { id: contextId, token } = useContext(authContext);

  const handleForm = ({ target: { value, name } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleTag = (tags) => {
    setValue(tags);
    setChosen(
      tags.map((tag) => {
        return tag.label;
      })
    );
  };

  const handleGenre = ({ label }) => {
    setLabel(label);
  };

  const formSubmit = async (event) => {
    try {
      event.preventDefault();
      form.genre = genreLabel;
      await request(newPost, "POST", {
        form,
        token,
        tags: chosenTags,
      });
      history.push(`${user}/${contextId}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch(uploadTags)
      .then((res) => res.json())
      .then((data) => setTags(data));
    fetch(uploadGenres)
      .then((res) => res.json())
      .then((res) => {
        setGenres(res);
        setLabel(res[0].label);
      });
  }, []);

  return (
    <MainPart
      error={error}
      handleForm={handleForm}
      handleGenre={handleGenre}
      tags={tags}
      genres={genres}
      handleTag={handleTag}
      formSubmit={formSubmit}
      load={load}
      value={tagsValue}
    />
  );
};
