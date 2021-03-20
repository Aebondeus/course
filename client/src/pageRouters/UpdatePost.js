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
  const [data, setData] = useState(null);
  const [tags, setTags] = useState([]);
  const [chosenTags, setChosen] = useState([]);
  const { request, load } = useLoad();
  const context = useContext(authContext);
  const history = useHistory();

  const handleForm = (event) => {
    console.log(event.target.name, event.target.value);
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleTag = (event) => {
    setChosen(
      event.map((e) => {
        return e.label;
      })
    );
    setData({ // think how to refactor it 
      ...data,
      tags: event.map((e) => {
        return { label: e.label, value: e.value, id: !!e.id ? e.id : e._id };
      }),
    });
  };

  const formSubmit = async (event) => {
    event.preventDefault();
    const postId = match.params.postId;
    const form = {
      title:data.name,
      synopsis:data.synopsis,
      genre:data.genre
    }
    console.log(postId, form, chosenTags);
    await request("/post/amendpost", "POST", {
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
        console.log(data);
        setData(data);
        setChosen(data.tags.map((value) => {
          return value.label;
        }))
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
