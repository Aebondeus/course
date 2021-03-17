import React, { useState, useEffect, useContext } from "react";
import { MainPart } from "../components/newPostComponents/newPost.js";
import { useHistory } from "react-router-dom";
import {useLoad} from "../hooks/loadHook.js";
import { authContext } from "../context/authContext";

const genres = [
  "Comedy",
  "Drama",
  "Horror",
  "Erotic",
  "Love story",
  "Sci-Fi",
  "Fantasy",
  "Thriller",
  "Detective",
  "Fictional biography",
  "Fictional essay",
  "Fictional jounarist work",
];

export const NewPost = () => {
  const history = useHistory();
  const context = useContext(authContext);
  const [form, setForm] = useState({
    title: "",
    synopsis: "",
    genre: "",
  });
  const [tags, setTags] = useState([]);
  const [chosenTags, setChosen] = useState([]);
  const {load, request} = useLoad();

  const handleForm = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    console.log(form);
  };

  const handleTag = (event) => {
    console.log(event);
    setChosen(
      event.map((e) => {
        return e.label;
      })
    );
  };
  const formSubmit = async (event) => {
    event.preventDefault();
    await request("/post/newpost", "POST", {form, author:context.id, tags:chosenTags});
    history.push(`/user/${context.id}`)

  }

  useEffect(() => {
    fetch("/post/upload_tags")
      .then((res) => res.json())
      .then((data) => setTags(data));
  }, []);

  return (
    <MainPart
      handleForm={handleForm}
      genres={genres}
      tags={tags}
      handleTag={handleTag}
      formSubmit ={formSubmit}
      load={load}
    />
  );
};
