import { ReactNode, createContext, useContext, useState } from "react";

export type TodosProviderType = {
  children: ReactNode;
};

export type Todo = {
  id: string;
  task: string;
  completed: boolean;
  createdAt: Date;
};

export type TodosContext = {
  todos: Todo[];
  handleAddTodo: (task: string) => void;
  toggleAsTodoCompleted: (id: string) => void;
  handleSelectAll: () => void;
  selectAll: boolean;
  setSelectAll: unknown;
  handleDeleteTodo: (id: string) => void;
  handleDeleteAll: () => void;
  handleDeleteMultiple: () => void;
  // handleEditTodo: (id: string, task: string) => void;
};

export const todoContext = createContext<TodosContext | null>(null);

export const TodoProvider = ({ children }: TodosProviderType) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const newTodos = localStorage.getItem("todos") || "[]";
      return JSON.parse(newTodos) as Todo[];
    } catch (error) {
      return [];
    }
  });
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [selectedTodos, setSelectedTodos] = useState<string[]>([]);

  const handleAddTodo = (task: string) => {
    setTodos((prev) => {
      const newTodos: Todo[] = [
        {
          id: Math.random().toString(),
          task: task,
          completed: false,
          createdAt: new Date(),
        },
        ...prev,
      ];
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  };

  const toggleAsTodoCompleted = (id: string) => {
    setTodos((prev) => {
      const newTodos = prev.map((todo) => {
        if (todo?.id === id) {
          return { ...todo, completed: !todo?.completed };
        } else {
          return todo;
        }
      });
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });

    setSelectedTodos((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const handleSelectAll = () => {
    setTodos((prev) => {
      const newTodos = prev.map((todo) => {
        return { ...todo, completed: !selectAll };
      });
      setSelectAll(!selectAll);
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => {
      const newTodos = prev.filter((filterTodo) => filterTodo?.id != id);
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  };

  const handleDeleteAll = () => {
    setTodos([]);
    localStorage.removeItem("todos");
  };

  const handleDeleteMultiple = () => {
    setTodos((prev) => {
      const newTodos = prev.filter((todo) => !selectedTodos.includes(todo.id));
      localStorage.setItem("todos", JSON.stringify(newTodos));
      setSelectedTodos([]); // Clear selected todos after deletion
      return newTodos;
    });
  };

  // const handleEditTodo = (id: string, task: string) => {};

  return (
    <todoContext.Provider
      value={{
        todos,
        handleAddTodo,
        toggleAsTodoCompleted,
        handleSelectAll,
        selectAll,
        setSelectAll,
        handleDeleteTodo,
        handleDeleteAll,
        handleDeleteMultiple,
        // handleEditTodo,
      }}
    >
      {children}
    </todoContext.Provider>
  );
};

export const useTodo = () => {
  const todoConsumer = useContext(todoContext);
  if (!todoConsumer) {
    throw new Error("Used OutSide of Provider");
  }
  return todoConsumer;
};
