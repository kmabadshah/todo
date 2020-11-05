import React from "react";
import { BsCheck } from "react-icons/bs";

export default function TodoCard() {
  const [submitted, setSubmitted] = React.useState(false);
  const [todoText, setTodoText] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.traget);
    console.log(data.getAll());
  }

  return (
    <div id="todocard">
      <form id="card" onSubmit={e => handleSubmit(e)}>
        <input
          type="text"
          name="todo-text"
          id="todo-text"
          placeholder="I will meditate..."
        />
        <button id="btn-submit">
          <BsCheck />
        </button>
      </form>
    </div>
  );
}
