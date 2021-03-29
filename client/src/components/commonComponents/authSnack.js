import React from "react";
import Snackbar from "@material-ui/core/Snackbar";

export const AuthSnack = ({ nickname, open, handleClose }) => (
  <Snackbar
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    open={open}
    autoHideDuration={3000}
    onClose={handleClose}
    message={`Welcome back, ${nickname}`}
  />
);

export const RegSnack = ({ open, handleClose }) => (
  <Snackbar
    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    open={open}
    autoHideDuration={3000}
    handleClose={handleClose}
    message="You're singed up! Now log in!"
  />
);
