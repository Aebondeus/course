import React from "react";
import {Button, Spinner} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom"; // will be used for tags
import {FormattedMessage} from "react-intl";

export const PostInfo = (props) => {

  const history = useHistory();
  const tagSearch = (event) => {
    event.preventDefault();
    history.push(`/searchByTag/${event.target.name}`)
  }

  if (!!props.data){
    return (
      <div className="post-info">
        <div className="card">
          <div className="card-header post-title">{props.data.name}</div>
          <div className="card-body">
            <div className="post-synopsis">
              <div>
                <FormattedMessage id="synopsis" />: {props.data.synopsis}
              </div>
            </div>
            <div className="post-genre">
              <div>
                <FormattedMessage id="genre" />: {props.data.genre}
              </div>
            </div>
            <div className="post-tags">
              <div>
                <FormattedMessage id="tags" />:{" "}
                {!!props.data.tags.length ? (
                  props.data.tags.map((tag) => {
                    return (
                      <Button
                        style={{ marginRight: ".4rem" }}
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
            </div>
            <div><FormattedMessage id="rating"/>: {props.data.rating}</div>
          </div>
        </div>
      </div>
    );
  } else {
    return (<div className="loader text-center"><Spinner animation="border" role="status" /></div>)
  }
  
};
