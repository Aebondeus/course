import React from "react";
import ReactMarkdown from "react-markdown";
import { Card } from "react-bootstrap";
import { Image } from "cloudinary-react";
import "../../styles/part.css";

export const PartContent = (props) => {
  return (
    <Card style={{ border: "none" }}>
      <Card.Header className="post-title">{props.data.name}</Card.Header>
      <Card.Body>
        {!!props.data.image && (
          <div className="part-img">
            <Image
              className="cloud-img"
              cloudName="mordorcloud"
              publicId={props.data.image}
              crop="scale"
            />
          </div>
        )}
        <ReactMarkdown source={props.data.content} />
      </Card.Body>
    </Card>
  );
};
