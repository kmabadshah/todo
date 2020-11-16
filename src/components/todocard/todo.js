import React from "react";
import { BsCheck } from "react-icons/bs";
import { BiTrashAlt } from "react-icons/bi";
import { Context } from "../wrapper";
import autosize from "autosize";

export default function Todo({ data: { text }, index }) {
  const { currentUser, setCurrentUser } = React.useContext(Context);
  const [tempText, setTempText] = React.useState();
  const [isVisible, setIsVisible] = React.useState(true);
  const todoRef = React.useRef();

  /* React.useEffect(() => {
   *   todoRef.current.value = text;
   * }, [currentUser]); */

  const textOnChange = e => setTempText(e.target.innerText);

  React.useEffect(() => {
    todoRef.current.addEventListener("input", textOnChange);
    return () => todoRef.current.removeEventListener("input", textOnChange);
  }, []);

  return (
    text && (
      <div className="todo row no-gutters">
        <div className="col-8">
          <p
            className="text"
            ref={todoRef}
            onKeyUp={e => e.key === "Enter" && handleDone()}
            name="text"
            contentEditable={true}
          >
            {text}
          </p>
        </div>
        <div className="col-auto ml-auto">
          <button className="icon-check" onClick={() => handleDone()}>
            <BsCheck />
          </button>
        </div>
        <div className="col-auto ml-4">
          <button className="icon-del" onClick={() => handleDelete()}>
            <BiTrashAlt />
          </button>
        </div>
      </div>
    )
  );

  function handleDone() {
    todoRef.current.blur();
    const tempUser = { ...currentUser };

    if (tempText.trim()) {
      tempUser.todos[index].text = tempText.trim();
    } else {
      todoRef.current.removeEventListener("input", textOnChange);
      tempUser.todos.splice(index, 1);
    }

    setCurrentUser(tempUser);
  }

  function handleDelete() {
    const tempUser = { ...currentUser };
    const finalTodoList = tempUser.todos.filter(item => item.text !== text);
    tempUser["todos"] = finalTodoList;
    setCurrentUser(tempUser);
  }
}
