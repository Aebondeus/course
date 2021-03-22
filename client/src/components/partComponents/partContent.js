import React from "react";
import ReactMarkdown from "react-markdown"
import {Image} from "cloudinary-react";

export const PartContent = (props) => {
    return (
      // add optional pic
      <div className="card">
        <div className="card-header">
          <strong>{props.data.name}</strong>
        </div>
        <div className="card-body">
          {!!props.data.image ? ( // in css try to inherit widht and heigh
            <div className="part-img">
              <Image
                cloudName="mordorcloud"
                publicId={props.data.image}
                width="500"
                crop="scale"
              />
            </div>
          ) : null}
          <ReactMarkdown source={props.data.content} />
        </div>
      </div>
    );
}