import { FormEvent, useEffect, useRef, useState } from "react";
import { useTodo } from "../Store/Store";

const Todos = () => {
  const [todo, setTodo] = useState("");
  const { handleAddTodo } = useTodo();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todo.length < 1) {
      alert("Please Fill The Input");
    }
    setTodo("");
    if (todo.length > 0) {
      handleAddTodo(todo);
    }
  };

  useEffect(() => {
    if (inputRef.current !== undefined) {
      inputRef.current?.focus();
    }
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default Todos;
