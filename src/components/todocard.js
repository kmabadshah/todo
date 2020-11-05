import React from "react";
import { BsCheck } from "react-icons/bs";

export default function TodoCard() {
  const [submitted, setSubmitted] = React.useState(false);

  return (
    <div id="todocard">
      <div id="card">
        <input
          type="text"
          onChange={e => console.log(e.target.value)}
          id="init-input"
          placeholder="I will meditate..."
        />
        <button id="btn-submit">
          <BsCheck />
        </button>
      </div>
    </div>
  );
}
