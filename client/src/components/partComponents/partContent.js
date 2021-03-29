import React from "react";
import ReactMarkdown from "react-markdown";
import { Card } from "react-bootstrap";
import { Image } from "cloudinary-react";
import "../../styles/part.css";

export const PartContent = ({ part }) => {
  document.title = !!part.name ? part.name : "Loading...";
  return (
    <Card style={{ border: "none" }}>
      <Card.Header className="post-title">{part.name}</Card.Header>
      <Card.Body>
        {!!part.image && (
          <div className="part-img">
            <Image
              className="cloud-img"
              cloudName="mordorcloud"
              publicId={part.image}
              crop="scale"
            />
          </div>
        )}
        <ReactMarkdown source={part.content} />
      </Card.Body>
    </Card>
  );
};
