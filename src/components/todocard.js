import React from "react";
import { BsCheck } from "react-icons/bs";

export default function TodoCard() {
  const [submitted, setSubmitted] = React.useState(false);
  const [todoText, setTodoText] = React.useState("");

  // React.useEffect(() => {
  //   console.log(todoText);
  // }, [todoText]);

  return (
    <div id="todocard">
      <div id="card">
        <input
          type="text"
          onChange={e =>
            setTodoText(e.target.value) && console.log(e.target.id)
          }
          onKeyDown={e => e.key === "Enter" && setSubmitted(true)}
          id="init-input"
          placeholder="I will meditate..."
        />
        <button id="btn-submit" onClick={() => setSubmitted(true)}>
          <BsCheck />
        </button>
      </div>
    </div>
  );
}
