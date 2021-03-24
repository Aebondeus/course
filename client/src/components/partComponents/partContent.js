import React from "react";
import ReactMarkdown from "react-markdown";
import { Image } from "cloudinary-react";
import "../../styles/part.css";

export const PartContent = (props) => {
  return (
    <div className="card">
      <div className="card-header">
        <strong>{props.data.name}</strong>
      </div>
      <div className="card-body">
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
      </div>
    </div>
  );
};
