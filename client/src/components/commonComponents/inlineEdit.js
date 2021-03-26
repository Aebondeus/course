import React from "react";
import EdiText from "react-editext";

export const InlineEdit = ({ value, onSave }) => (
  <EdiText
    className="text-editor"
    type="text"
    value={!!value ? value : "Nothing here yet!"}
    onSave={onSave}
    editButtonClassName="edit-btn"
    editButtonContent="✏️"
    saveButtonClassName="save-btn"
    saveButtonContent="✓"
    cancelButtonClassName="cancel-btn"
    cancelButtonContent="✕"
  />
);
    