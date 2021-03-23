import React, { useContext, useState } from "react";
import ReactStars from "react-stars";
import { Button, Spinner, Toast } from "react-bootstrap";
import { useHistory } from "react-router-dom"; // will be used for tags
import { FormattedMessage } from "react-intl";
import { authContext } from "../../context/authContext";
import { useLoad } from "../../hooks/loadHook.js";

export const PostInfo = ({ data, raters }) => {
  const [showSuccess, setSuccess] = useState(false);
  const [showError, setError] = useState(false);
  const { request } = useLoad();
  const history = useHistory();
  const context = useContext(authContext);

  const tagSearch = (event) => {
    event.preventDefault();
    history.push(`/searchByTag/${event.target.name}`);
  };

  const styleToast = {
    width: "250px",
  };

  const rateSent = async (event) => {
    if (raters.includes(context.id)) {
      setError(true);
    } else {
      await request("/post/rate", "PUT", {
        postId: data.id,
        userId: context.id,
        rate: event,
      });
      setSuccess(true);
    }
  };

  const stars = {
    count: 5,
    size: 24,
    activeColor: "#ffd700",
    value: !!data ? data.rating : 0,
    onChange: rateSent,
  };

  if (!!data) {
    return (
      <div className="post-info">
        <div className="card" style={{border:"none"}}>
          <div
            className="card-header post-title"
            style={{ paddingLeft: "0", backgroundColor: "#fff" }}
          >
            {data.name}
          </div>
          <div className="card-body">
            <div className="post-synopsis">
              <div>
                <strong>
                  <FormattedMessage id="synopsis" />:{" "}
                </strong>
                {data.synopsis}
              </div>
            </div>
            <div className="post-genre">
              <div>
                <strong>
                  <FormattedMessage id="genre" />:{" "}
                </strong>
                {data.genre}
              </div>
            </div>
            <div className="post-tags">
              <strong>
                <FormattedMessage id="tags" />:
              </strong>{" "}
              {!!data.tags.length ? (
                data.tags.map((tag) => {
                  return (
                    <Button
                      className="tag"
                      value={tag.id}
                      name={tag.label}
                      onClick={tagSearch}
                    >
                      {tag.label}
                    </Button>
                  );
                })
              ) : (
                <FormattedMessage id="tags-abscence" />
              )}
            </div>
            <div>
              <strong>
                <FormattedMessage id="rating" />:{" "}
              </strong>
              {data.rating}
            </div>
            {!!context.id ? <ReactStars {...stars} /> : null}
            <Toast
              onClose={() => setSuccess(false)}
              show={showSuccess}
              delay={3000}
              autohide
              style={styleToast}
            >
              <Toast.Header>
                <strong>
                  <FormattedMessage id="post-rate-success.header" />
                </strong>
              </Toast.Header>
              <Toast.Body>
                <FormattedMessage id="post-rate-success.body" />
              </Toast.Body>
            </Toast>
            <Toast
              onClose={() => setError(false)}
              show={showError}
              delay={3000}
              autohide
              style={styleToast}
            >
              <Toast.Header>
                <strong>
                  <FormattedMessage id="post-rate-error.header" />
                </strong>
              </Toast.Header>
              <Toast.Body>
                <FormattedMessage id="post-rate-error.body" />
              </Toast.Body>
            </Toast>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="loader text-center">
        <Spinner animation="border" role="status" />
      </div>
    );
  }
};
