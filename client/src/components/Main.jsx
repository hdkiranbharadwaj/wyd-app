import React, { useEffect } from "react";
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

  async function getNotes() {
    try {
      const response = await fetch("/api/getnotes");
      const jsonData = await response.json();
      setNotes(jsonData);
      console.log(jsonData);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    getNotes(); // Call getNotes initially

    const intervalId = setInterval(() => {
      getNotes(); // Call getNotes every 5 minutes
    }, 5 * 60 * 1000); // 5 minutes in milliseconds

    return () => {
      clearInterval(intervalId); // Clean up the interval on unmount
    };
  }, []);
  return (
    <div>
      <Header />
      <CreateArea />
      {notes.map((noteItem) => {
        return (
          <Note
            key={noteItem.contentid}
            id={noteItem.contentid}
            fullname={noteItem.fullname}
            content={noteItem.status}
          />
        );
      })}
      <Footer />
    </div>
  );
}
export default Main;
