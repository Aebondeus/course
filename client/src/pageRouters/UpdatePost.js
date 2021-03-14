import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useLoad } from "../hooks/loadHook.js";
import { authContext } from "../context/authContext";
import { MainPart } from "../components/updatePostComponents/updatePost.js";
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

export const UpdatePost = ({ match }) => {
  const [data, setData] = useState({});
  const [form, setForm] = useState({
    title: "",
    synopsis: "",
    genre: "",
  });
  const [tags, setTags] = useState([]);
  const [chosenTags, setChosen] = useState([]); // need to set previous tags here
  const { request, load } = useLoad();
  const context = useContext(authContext);
  const history = useHistory();

  const handleForm = (event) => {
    console.log(event.target.name, event.target.value);
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
    const postId = match.params.postId;
    console.log(postId, form, chosenTags);
    const result = await request("/post/amendpost", "POST", {
      postId,
      form,
      tags: chosenTags,
    });
    history.push(`/user/${context.id}`);
  };

  useEffect(() => {
    fetch(`/post/getpost/${match.params.postId}`)
      .then((data) => data.json())
      .then((data) => {
        setData(data);
        setForm({
          title: data.name,
          synopsis: data.synopsis,
          genre: data.genre,
        });
        console.log(data);
      });
    fetch("/post/upload_tags")
      .then((res) => res.json())
      .then((data) => setTags(data));
  }, []);

  return (
    <MainPart
      data={data}
      genres={genres}
      tags={tags}
      handleForm={handleForm}
      handleTag={handleTag}
      formSubmit={formSubmit}
      load={load}
    />
  );
};
