import React, { useState } from "react";
import { Cookies } from "react-cookie";

function CreateArea(props) {
  const [note, setNote] = useState({
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      content: "",
    });
    event.preventDefault();
  } // Instantiate Cookies object
  const cookies = new Cookies();

  // Access userid property from cookies
  console.log(cookies.get("fullname"));

  return (
    <div>
      <form class="form">
        <div class="input">{cookies.get("fullname")}</div>
        <textarea
          class="textarea"
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
        />
        <button class="button" onClick={submitNote}>
          Add
        </button>
      </form>
    </div>
  );
}

export default CreateArea;
