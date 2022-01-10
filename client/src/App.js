import React, { Fragment } from "react";
import "./App.css";
import InputTodo from "./components/InputTodo";
import Filter from "./components/Filter";

function App() {
  return (
    <Fragment>
      <div className="container">
        <InputTodo />
        <Filter />
      </div>
    </Fragment>
  );
}

export default App;
