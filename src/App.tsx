import Todos from "./Components/Todos";
import TodosList from "./Components/TodosList";
import Navbar from "./Components/Navbar";
import "./App.css";

function App() {
  return (
    <>
      <main>
        <h2>React-Vite Todo App</h2>
        <Navbar />
        <Todos />
        <TodosList />
      </main>
    </>
  );
}

export default App;

// If Input empty raha toh user add nhi kar sakta - Done  -  Open Message popup for it - Done

// We can also edit the Todo
// Select All and Delete All , Select Multiple and Delete Multiple
// When selecting one by one all , its not showing delete button
// When i Select all and Unselect one by one at that time we have to Unchekc the select all input
// when we select all and refreh , after that seldted items id fine but , selectall check box and dlete button hidden
