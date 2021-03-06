import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useLoad } from "../hooks/loadHook.js";
import { authContext } from "../context/authContext";
import { MainPart } from "../components/updatePostComponents/updatePost.js";
import { clientRoutes, serverRoutes } from "../constants/allRoutes";

const { user } = clientRoutes;
const {
  post: { main, uploadTags, uploadGenres },
} = serverRoutes;

export const UpdatePost = ({ match }) => {
  const postId = match.params.postId;
  const [data, setData] = useState(null);
  const [tags, setTags] = useState([]);
  const [genres, setGenres] = useState(null);
  const [chosenTags, setChosen] = useState([]);
  const [chosenGenre, setGenre] = useState(null);
  const { request, load, error } = useLoad();
  const context = useContext(authContext);
  const history = useHistory();
  document.title = !!data
    ? `Update the post | Обновить произдведение: ${data.name}`
    : "Loading...";

  const handleForm = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleTag = (event) => {
    setChosen(
      event.map((e) => {
        return e.label;
      })
    );
    setData({
      // think how to refactor it
      ...data,
      tags: event.map((e) => {
        return { label: e.label, value: e.value, id: !!e.id ? e.id : e._id };
      }),
    });
  };

  const handleGenre = (event) => {
    setGenre(event.label);
  };

  const formSubmit = async (event) => {
    try {
      event.preventDefault();
      const form = {
        title: data.name,
        synopsis: data.synopsis,
        genre: chosenGenre,
      };
      await request(`${main}/${postId}`, "PUT", {
        form,
        token: context.token,
        tags: chosenTags,
      });
      history.push(`${user}/${context.id}`);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetch(`${main}/${postId}`)
      .then((data) => data.json())
      .then((data) => {
        setData(data);
        setGenre(data.genre);
        setChosen(
          data.tags.map((value) => {
            return value.label;
          })
        );
      });
    fetch(uploadTags)
      .then((res) => res.json())
      .then((data) => setTags(data));
    fetch(uploadGenres)
      .then((res) => res.json())
      .then((res) => {
        setGenres(res);
      });
  }, []);

  return (
    <MainPart
      data={data}
      genre={chosenGenre}
      genres={genres}
      error={error}
      tags={tags}
      handleForm={handleForm}
      handleGenre={handleGenre}
      handleTag={handleTag}
      formSubmit={formSubmit}
      load={load}
    />
  );
};
