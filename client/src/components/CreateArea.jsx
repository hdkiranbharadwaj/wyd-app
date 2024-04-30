import React, { useState } from "react";
import { Cookies } from "react-cookie";
function CreateArea() {
  const [note, setNote] = useState("");
  const cookies = new Cookies();
  async function submitNote(event) {
    if (note == "") {
      alert("Type something...");
    } else {
      try {
        const ui = cookies.get("userid");
        const body = { userid: ui, note: note };
        const response = await fetch("/api/noteadd", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (response.status == 200 && response.ok) {
          setNote("");
          window.location.reload();
        } else {
          alert(
            "You have enlightened the world for today, Light it up tomorrow"
          );
        }
      } catch (err) {
        console.error(err);
      }
    }
    event.preventDefault();
  }

  return (
    <div>
      <form class="form">
        <div class="input text-capitalize">
          <b>{"Hello " + cookies.get("fullname") + ","}</b>
        </div>
        <textarea
          class="textarea"
          onChange={(e) => {
            setNote(e.target.value);
          }}
          value={note}
          placeholder="Lets face your mind..."
          rows="3"
        />
        <button class="button svgbutton" onClick={submitNote}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-brilliance"
            viewBox="0 0 16 16"
          >
            <path d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16M1 8a7 7 0 0 0 7 7 3.5 3.5 0 1 0 0-7 3.5 3.5 0 1 1 0-7 7 7 0 0 0-7 7" />
          </svg>
        </button>
      </form>
    </div>
  );
}

export default CreateArea;
