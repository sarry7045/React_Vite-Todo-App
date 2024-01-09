// import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTodo } from "../Store/Store";

const TodosList = () => {
  const {
    todos,
    toggleAsTodoCompleted,
    handleSelectAll,
    handleDeleteTodo,
    handleDeleteAll,
    // handleDeleteMultiple,
    // handleEditTodo,
  } = useTodo();

  const [searchParam] = useSearchParams();
  const todosData = searchParam.get("todos");
  let filterTodos = todos;

  if (todosData === "Active") {
    filterTodos = filterTodos.filter((todo) => !todo?.completed);
  }

  if (todosData === "Completed") {
    filterTodos = filterTodos.filter((todo) => todo?.completed);
  }

  // useEffect(() => {
  //   const hasCompletedTask = filterTodos.some((item) => item?.completed);
  //   const hasCompletedAllTask = filterTodos.every((item) => item?.completed);
  // }, [filterTodos]);

  return (
    <>
      {/* {!(todosData === "Completed") && (
        <div className="selectAllContainer">
          <input
            type="checkbox"
            // checked={}
            onChange={() => handleSelectAll()}
          />
          <span className="selectAll">Select All</span>
        </div>
      )} */}

      <ul className="main-task">
        {filterTodos?.map((todo) => {
          const { id, completed, task } = todo;
          return (
            <li key={id}>
              <input
                type="checkbox"
                checked={completed}
                value={`Todo-${id}`}
                onChange={() => toggleAsTodoCompleted(id)}
              />
              <label htmlFor={`Todo-${id}`}>{task}</label>
              {/* {!completed && (
                <button
                  className="editButton"
                  type="button"
                  onClick={() => handleEditTodo(id, task)}
                >
                  Edit
                </button>
              )} */}

              {completed && (
                <button type="button" onClick={() => handleDeleteTodo(id)}>
                  Delete
                </button>
              )}
            </li>
          );
        })}
      </ul>

      {/* <div className="deleteAllContainer">
        <button
          type="button"
          onClick={() => handleDeleteAll()}
          className="deleteAll"
        >
          Delete All
        </button>
      </div>

      <div className="deleteAllContainer">
        <button
          type="button"
          className="deleteMultiple"
          // onClick={() => handleDeleteMultiple()}
        >
          Delete Multiple
        </button>
      </div> */}
    </>
  );
};

export default TodosList;
