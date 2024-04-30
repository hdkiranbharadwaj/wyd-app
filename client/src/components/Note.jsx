import React from "react";

function Note(props) {
  return (
    <div className="note">
      <h1 className="text-capitalize">{props.fullname}</h1>
      <p>{props.content}</p>
    </div>
  );
}

export default Note;
