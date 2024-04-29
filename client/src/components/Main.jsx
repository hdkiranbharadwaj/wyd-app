import React from "react";
import { Fragment, useState } from "react";
import { useCookies } from "react-cookie";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";

import CreateArea from "./CreateArea";

function Main() {
  // const [cookies, setCookie, removeCookie] = useCookies(null);
  // const userid = cookies.userid;

  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}
export default Main;
