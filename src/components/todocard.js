import React from "react";
import { BsCheck } from "react-icons/bs";

export default function TodoCard() {
  return (
    <div id="todocard">
      <div className="card d-flex">
        <input type="text" id="init_input" />
        <button id="btn-submit">
          <BsCheck />
        </button>
      </div>
    </div>
  );
}
