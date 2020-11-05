import React from "react";
import { BsCheck } from "react-icons/bs";

export default function TodoCard() {
  const [submitted, setSubmitted] = React.useState(false);
  const [todoText, setTodoText] = React.useState("");

  function handleSubmit(e) {
    const data = new FormData(e.traget);
    console.log(data);
  }

  return (
    <div id="todocard">
      <form id="card" onSubmit={e => handleSubmit(e)}>
        <input type="text" id="init-input" placeholder="I will meditate..." />
        <button id="btn-submit">
          <BsCheck />
        </button>
      </form>
    </div>
  );
}
