import React from "react";
import { BsCheck } from "react-icons/bs";

export default function View({
  data: { setSubmitted, setTodoText, todoText, currentUser, todos },
}) {
  return (
    <div id="todocard">
      <div id="card">
        <div id="todo-input">
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
          <button
            id="btn-submit"
            onClick={() => todoText && setSubmitted(true)}
          >
            <BsCheck />
          </button>
        </div>

        {todos.map((todo, i) => {
          return (
            <div className="todo" key={i}>
              <h3>{todo.text}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}
