import React, { useContext, useState } from "react";
import { Spinner } from "react-bootstrap";

import { authContext } from "../../../context/authContext";
import { useLoad } from "../../../hooks/loadHook.js";
import { PostInfo } from "./postInfo";

import { serverRoutes } from "../../../constants/allRoutes";

const {
  post: { ratePost },
} = serverRoutes;

export const PostInfoWrapper = ({ data, raters }) => {
  const [showSuccess, setSuccess] = useState(false);
  const [showError, setError] = useState(false);
  const { request } = useLoad();
  const { id: contextId, token } = useContext(authContext);

  const rateSent = async (event) => {
    if (raters.includes(contextId)) {
      setError(true);
    } else {
      try {
        await request(ratePost, "PUT", {
          postId: data.id,
          token,
          rate: event,
        });
        setSuccess(true);
      } catch (e) {
        setError(true);
      }
    }
  };

  if (!data) {
    return (
      <div className="loader text-center">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  return (
    <PostInfo
      data={data}
      toastProps={{ setSuccess, showSuccess, setError, showError }}
      rateSent={rateSent}
      contextId={contextId}
    />
  );
};
