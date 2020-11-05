import React from "react";
import { BsCheck } from "react-icons/bs";

export default function TodoCard() {
  const [submitted, setSubmitted] = React.useState(false);

  const handleChange = e => {
    console.log(e.key);
  };

  return (
    <div id="todocard">
      <div id="card">
        <input
          type="text"
          onKeydown={e => handleChange(e)}
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
