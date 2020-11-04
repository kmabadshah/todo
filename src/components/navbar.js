import React from "react";

export default function Navbar() {
  return (
    <div id="navbar">
      <button to="/user" id="btn-home">
        Home
      </button>
      <button to="/about" id="btn-about">
        About
      </button>
    </div>
  );
}
