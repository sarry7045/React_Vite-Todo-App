import React from "react";
import ReactDOM from "react-dom/client";
import { TodoProvider } from "./Store/Store.tsx";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TodoProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TodoProvider>
  </React.StrictMode>
);






// Cntrl + Space Button = Give the Suggestions
// Cntrl + Alt + Upp Arrow = Select Mutiple Line
// Alt + Arrow Button = To Move Lines
