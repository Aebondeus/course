import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FormattedMessage } from "react-intl";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 200,
  height: 200,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

export const ImgDrop = (props) => {
  const [files, setFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    props.handleFileInput(acceptedFiles);
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };
  
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/png, image/jpeg",
    onDrop,
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt={file.name} />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <div>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <div className="dnd-placeholder">
          <p>
            <FormattedMessage id="dnd-title" />
          </p>
          <div>
            <em>
              (<FormattedMessage id="dnd-p" />)
            </em>
            {!!props.updated && (
              <div>
                <em>
                  (<FormattedMessage id="dnd-update" />)
                </em>
              </div>
            )}
          </div>
        </div>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </div>
  );
};
