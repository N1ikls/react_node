import React, { useState } from "react";
import "../App.css";
const InputTodo = () => {
  const [todo_date, setdate] = useState("");
  const [todo_name, setname] = useState("");
  const [todo_count, setcount] = useState("");
  const [todo_distance, setdistance] = useState("");
  const onClearInput = (e) => {
    e.preventDefault();
    setdate("");
    setname("");
    setcount("");
    setdistance("");
  };
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { todo_date, todo_name, todo_count, todo_distance };
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      onClearInput(e);
      console.log("input:", response);

      //window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <>
      <h1>Input Todo</h1>
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <div className="column">
          <label htmlFor="1">Date</label>
          <input
            className="input"
            id="1"
            type="text"
            value={todo_date}
            onChange={(e) => setdate(e.target.value)}
          />
          <label htmlFor="2">Name</label>
          <input
            className="input"
            id="2"
            type="text"
            value={todo_name}
            onChange={(e) => setname(e.target.value)}
          />
          <label htmlFor="3">Count</label>
          <input
            className="input"
            id="3"
            type="text"
            value={todo_count}
            onChange={(e) => setcount(e.target.value)}
          />
          <label htmlFor="4">Distance</label>
          <input
            className="input"
            id="4"
            type="text"
            value={todo_distance}
            onChange={(e) => setdistance(e.target.value)}
          />
          <button onClick={onSubmitForm}>Add</button>
        </div>
      </form>
    </>
  );
};

export default InputTodo;
