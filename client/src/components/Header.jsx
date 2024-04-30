import React from "react";
import LogOutButton from "./LogOutButton";

function Header() {
  return (
    <header className="comic-neue-bold">
      <h1 className="comic-neue-bold px-2">Whach You Doing!!</h1>
      <div className="spacer"></div>
      <LogOutButton />
    </header>
  );
}

export default Header;
