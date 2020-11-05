import React from "react";
import { BsCheck } from "react-icons/bs";

export default function View({
  data: { setSubmitted, setTodoText, todoText },
}) {
  return (
    <div id="todocard">
      <div id="card">
        <input
          type="text"
          onChange={e => setTodoText(e.target.value)}
          onKeyDown={e =>
            e.key === "Enter" && todoText
              ? setSubmitted(true)
              : setSubmitted(false)
          }
          id="todo-text"
          value={todoText}
          placeholder="I will meditate..."
        />
        <button id="btn-submit" onClick={() => todoText && setSubmitted(true)}>
          <BsCheck />
        </button>
      </div>
    </div>
  );
}
