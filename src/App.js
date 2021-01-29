import React from "react";
import { Counter } from "./features/counter/Counter";
import Calendar from "./components/calendar/Calendar";

import "./App.css";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <Counter />
      </header> */}

      <Calendar></Calendar>
    </div>
  );
}

export default App;
