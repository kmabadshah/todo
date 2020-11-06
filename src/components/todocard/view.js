import React from "react";
import { BsCheck } from "react-icons/bs";

export default function View({
  data: { setSubmitted, setTodoText, todoText, currentUser },
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

        {currentUser.todos.map(todo => {
          return (
            <div className="todo">
              <h3>{todo.text}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}
