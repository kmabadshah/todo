import React from "react";
import { BsCheck } from "react-icons/bs";

export default function TodoCard() {
  return (
    <div id="todocard">
      <div className="card">
        <div className="card-body d-flex">
          <input type="text" />
          <button id="btn-submit">
            <BsCheck />
          </button>
        </div>
      </div>
    </div>
  );
}
