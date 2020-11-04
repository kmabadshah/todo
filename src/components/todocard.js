import React from "react";
import { BsCheck } from "react-icons/bs";

export default function TodoCard() {
  return (
    <div id="todocard">
      <div id="card">
        <input type="text" id="init-input" placeholder="I will meditate..." />
        <button id="btn-submit">
          <BsCheck />
        </button>
      </div>
    </div>
  );
}
