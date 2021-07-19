import React from "react";
import { ToastFaliure, ToastSuccess, ToastComment, ToastError } from "./toasts";

const styleToast = {
    width: "250px",
};

export const ToastBlockRating = ({setSuccess, showSuccess, setError, showError}) => (
  <>
    <ToastSuccess
      setSuccess={setSuccess}
      show={showSuccess}
      style={styleToast}
    />
    <ToastFaliure
      setError={setError}
      show={showError}
      style={styleToast}
    />
  </>
);

export const ToastBlockComments = ({setShow, show, error, setError}) => (
  <>
    <ToastComment setShow={setShow} show={show} />
    <ToastError setError={setError} show={error} />
  </>
)