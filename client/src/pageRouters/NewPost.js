import React, { useState, useEffect, useContext } from "react";
import { MainPart } from "../components/newPostComponents/newPost.js";
import { useHistory } from "react-router-dom";
import { useLoad } from "../hooks/loadHook.js";
import { authContext } from "../context/authContext";
import { clientRoutes, serverRoutes } from '../constants/allRoutes';

const { post: { newPost, uploadTags, uploadGenres } } = serverRoutes;
const { toPost } = clientRoutes;

// TODO: take out all routes, take out functions that interact with backend
export const NewPost = () => {
  document.title = "New post | Новое произведение";
  const [form, setForm] = useState({
    title: "",
    synopsis: "",
  });
  const [tags, setTags] = useState([]);
  const [genres, setGenres] = useState([]);
  const [chosenTags, setChosen] = useState(null);
  const [chosenGenre, setGenre] = useState(null);
  const [tagsValue, setValue] = useState(null);
  const { load, request, error } = useLoad();
  const history = useHistory();
  const context = useContext(authContext);

  const handleForm = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleTag = (event) => {
    setValue(event);
    setChosen(
      event.map((e) => {
        return e.label;
      })
    );
  };

  const handleGenre = (event) => {
    setGenre(event.label);
  };

  const formSubmit = async (event) => {
    try {
      event.preventDefault();
      form.genre = chosenGenre;
      await request(newPost, "POST", {
        form,
        token:context.token,
        tags: chosenTags,
      });
      history.push(`${toPost}/${context.id}`);
    } catch (e) {
      console.log(e);
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
        setGenre(res[0].label);
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
