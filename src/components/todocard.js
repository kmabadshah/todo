import React from "react";
import { BsCheck } from "react-icons/bs";

export default function TodoCard() {
  const [submitted, setSubmitted] = React.useState(false);
  const [todoText, setTodoText] = React.useState("");

  React.useEffect(() => {
    if (submitted) {
      console.log("hello");
      setTodoText("");
      console.log(todoText);
      // setSubmitted(false);
    }
  }, [submitted]);

  return (
    <div id="todocard">
      <div id="card">
        <input
          type="text"
          onChange={e => setTodoText(e.target.value)}
          onKeyDown={e =>
            e.key === "Enter" ? setSubmitted(true) : setSubmitted(false)
          }
          id="todo-text"
          value={todoText}
          placeholder="I will meditate..."
        />
        <button id="btn-submit" onClick={() => setSubmitted(true)}>
          <BsCheck />
        </button>
      </div>
    </div>
  );
}
