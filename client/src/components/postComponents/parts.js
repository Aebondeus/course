import React, { useContext } from "react";
import { Link, useHistory} from "react-router-dom";
import { Button } from "react-bootstrap";
import { authContext } from "../../context/authContext.js";
import {useLoad} from "../../hooks/loadHook.js";

export const Parts = ({part, data, idx}) => {
    console.log(part, data, idx)
    const context = useContext(authContext);
    const history = useHistory();
    const {request, load} = useLoad();

    const updateHandler = async (event) => {
        console.log(data.id, event.target.value);
        history.push(`/updatepart/${data.id}/${event.target.value}`);
    }

    const deleteHandler = async (event) => {
      const partId = event.target.value;
      await request(`/post/deletepart/${partId}`, "DELETE", {partId})
    }
    return (
      <div className="post-parts" key={idx} style={{ marginTop: "1rem" }}>
        <div className="card">
          <Link
            to={`/post/${data.id}/${part.id}`}
            style={{ color: "black", textDecoration: "none" }}
          >
            <div className="card-body">
              <strong>{part.name}</strong>
              <div>{part.date}</div>
            </div>
          </Link>
          {context.id === data.author ? (
            <div className="card-footer">
              <Button
                className="change-btn update-btn"
                variant="primary"
                value={part.id}
                onClick={updateHandler}
              >
                Update part
              </Button>
              <Button
                className="change-btn delete-btn"
                variant="danger"
                value={part.id}
                onClick={deleteHandler}
                disabled={load}
              >
                Delete part
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    );
}