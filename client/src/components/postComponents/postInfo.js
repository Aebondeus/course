import React, { useContext, useState } from "react";
import ReactStars from "react-stars";
import { Button, Spinner, Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { authContext } from "../../context/authContext";
import { useLoad } from "../../hooks/loadHook.js";
import { ToastFaliure, ToastSuccess } from "./toasts";
import { clientRoutes, serverRoutes } from '../../constants/allRoutes';

const { searchByTag, user } = clientRoutes;
const { post: { ratePost } } = serverRoutes;

// TODO: destructure data, take out routes
export const PostInfo = ({ data, raters }) => {
  const [showSuccess, setSuccess] = useState(false);
  const [showError, setError] = useState(false);
  const { request, error } = useLoad();
  const history = useHistory();
  const context = useContext(authContext);

  const tagSearch = (event) => {
    event.preventDefault();
    const tag = event.target.name;
    history.push(`${searchByTag}/${tag}`);
  };

  const styleToast = {
    width: "250px",
  };

  const rateSent = async (event) => {
    if (raters.includes(context.id)) {
      setError(true);
    } else {
      try {
        await request(ratePost, "PUT", {
          postId: data.id,
          token: context.token,
          rate: event,
        });
        setSuccess(true);
      } catch (e) {
        setError(true);
      }
    }
  };

  const stars = {
    count: 5,
    size: 24,
    activeColor: "#ffd700",
    value: !!data ? data.rating : 0,
    onChange: rateSent,
  };

  if (!data) {
    return (
      <div className="loader text-center">
        <Spinner animation="border" role="status" />
      </div>
    );
  }
  return (
    <div className="post-info">
      <Card style={{ border: "none" }}>
        <Card.Header className="post-title">{data.name}</Card.Header>
        <Card.Body>
          <div className="post-synopsis">
            <div>
              <strong>
                <FormattedMessage id="synopsis" />:{" "}
              </strong>
              {data.synopsis}
            </div>
          </div>
          <div className="post-author">
            <div>
              <strong>
                <FormattedMessage id="author" />:{" "}
              </strong>
              <Link to={`${user}/${data.author}`}>{data.nickname}</Link>
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

                // TODO: could be without return, or with and with destructurization
                return (
                  <Button
                    variant="link"
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
          {!!context.id && <ReactStars {...stars} />}
          <ToastSuccess
            setSuccess={setSuccess}
            show={showSuccess}
            delay={3000}
            style={styleToast}
          />
          <ToastFaliure
            setError={setError}
            show={showError}
            delay={3000}
            style={styleToast}
          />
        </Card.Body>
      </Card>
    </div>
  );
};
