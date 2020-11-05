import React from "react";
import { BsCheck } from "react-icons/bs";

export default function TodoCard() {
  const [submitted, setSubmitted] = React.useState(false);

  const handleKeyDown = e => {
    console.log(e.key);
    console.log(e.target.value);
  };

  return (
    <div id="todocard">
      <div id="card">
        <input
          type="text"
          onKeyDown={e => handleKeyDown(e)}
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
