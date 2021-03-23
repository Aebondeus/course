import React, { useContext } from "react";
import { Link, useHistory} from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import { authContext } from "../../context/authContext.js";
import {useLoad} from "../../hooks/loadHook.js";
const dateOption = { year: "numeric", month: "numeric", day: "numeric" };
const dateTimeFormat = new Intl.DateTimeFormat("ru-Ru", dateOption);

export const Parts = ({part, data, idx}) => {
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
        <Card className="part-card">
          <Link
            to={`/post/${data.id}/${part.id}`}
            style={{ color: "black", textDecoration: "none" }}
          >
            <Card.Body>
              <strong>{part.name}</strong>
              <div>{dateTimeFormat.format(Date.parse(part.date))}</div>
            </Card.Body>
          </Link>
          {context.id === data.author ? (
            <Card.Footer>
              <Button
                className="change-btn update-btn"
                variant="primary"
                value={part.id}
                onClick={updateHandler}
              >
                <FormattedMessage id="update-part" />
              </Button>
              <Button
                className="change-btn delete-btn"
                variant="danger"
                value={part.id}
                onClick={deleteHandler}
                disabled={load}
              >
                <FormattedMessage id="delete-part" />
              </Button>
            </Card.Footer>
          ) : null}
        </Card>
      </div>
    );
}