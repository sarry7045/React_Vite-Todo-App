import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTodo } from "../Store/Store";

const TodosList = () => {
  const {
    todos,
    toggleAsTodoCompleted,
    handleSelectAll,
    selectAll,
    // setSelectAll,
    handleDeleteTodo,
  } = useTodo();

  const [searchParam] = useSearchParams();
  const [isShowSelectAll, setIsShowSelectAll] = useState<boolean>(false);
  const todosData = searchParam.get("todos");
  let filterTodos = todos;

  if (todosData === "Active") {
    filterTodos = filterTodos.filter((todo) => !todo?.completed);
  }

  if (todosData === "Completed") {
    filterTodos = filterTodos.filter((todo) => todo?.completed);
  }

  useEffect(() => {
    const hasCompletedTask = filterTodos.some((item) => item?.completed);
    setIsShowSelectAll(hasCompletedTask);
    // if (hasCompletedTask) {
    // setSelectAll(true);
    // }
  }, [filterTodos]);

  console.log("isShowSelectAll", isShowSelectAll);
  console.log("selectAll", selectAll);

  console.log("filterTodos", filterTodos);

  return (
    <>
      {isShowSelectAll && !(todosData === "Completed") && (
        <div className="selectAllContainer">
          <input
            type="checkbox"
            checked={selectAll}
            // value={`Todo-${id}`}
            onChange={() => handleSelectAll()}
          />
          <span className="selectAll">Select All</span>
        </div>
      )}

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
              {!completed && (
                <button
                  className="editButton"
                  type="button"
                  onClick={() => handleDeleteTodo(id)}
                >
                  Edit
                </button>
              )}

              {completed && (
                <button type="button" onClick={() => handleDeleteTodo(id)}>
                  Delete
                </button>
              )}
            </li>
          );
        })}
      </ul>

      {(selectAll || isShowSelectAll) && (
        <div className="deleteAllContainer">
          <button
            type="button"
            className={`${
              isShowSelectAll && selectAll ? "deleteAll" : "deleteMultiple"
            }`}
          >
            {isShowSelectAll && selectAll ? "Delete All" : "Delete Multiple"}
          </button>
        </div>
      )}
    </>
  );
};

export default TodosList;
