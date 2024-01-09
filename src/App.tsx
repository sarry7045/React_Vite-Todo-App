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
// Select All and Delete All - Done

// We can also edit the Todo
// When user trying to add Same todo as they added previosly
// Select Multiple and Delete Multiple
// When selecting one by one all , its not showing delete ALL button
// When i Select all and Unselect one by one at that time we have to Uncheck the select all input
// When we select all and refreh , after that seleted items is fine but , selectall check box and delete button hidden
