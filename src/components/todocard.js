import React from "react";
import { BsCheck } from "react-icons/bs";

export default function TodoCard() {
  const [submitted, setSubmitted] = React.useState(false);
  const [todoText, setTodoText] = React.useState("");

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      setSubmitted(true);
      setTodoText(e.target.value);
    }
  };

  React.useEffect(() => {
    console.log(todoText);
  }, [todoText]);

  return (
    <div id="todocard">
      <div id="card">
        <input
          type="text"
          onChange={e => setTodoText(e.target.value)}
          onKeyDown={e => e.key === "Enter" && hasSubmitted(true)}
          id="init-input"
          placeholder="I will meditate..."
        />
        <button id="btn-submit" onClick={() => hasSubmitted(true)}>
          <BsCheck />
        </button>
      </div>
    </div>
  );
}
