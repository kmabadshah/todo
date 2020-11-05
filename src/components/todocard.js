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
      <form
        id="card"
        onSubmit={e => e.preventDefault & console.log(e.target.value)}
      >
        <input type="text" id="init-input" placeholder="I will meditate..." />
        <button id="btn-submit">
          <BsCheck />
        </button>
      </form>
    </div>
  );
}
