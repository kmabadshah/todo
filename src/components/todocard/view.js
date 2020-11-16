import React from "react";
import { BsCheck } from "react-icons/bs";
import Todo from "./todo";

export default function View({
  data: {
    setSubmitted,
    setTodoText,
    todoText,
    currentUser: { todos },
  },
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
          return <Todo key={i} index={i} data={todo} />;
        })}
      </div>
    </div>
  );
}
