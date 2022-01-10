import React, { useEffect, useState } from "react";
import Pagitanion from "./Pagination";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import EditTodo from "./EditTodo";
import "../App.css";
const ListTodos = ({ col, input, operand }) => {
  const [todos, settodos] = useState([]);
  // for pagination ------------------------------------------------
  const [todosPage, settodosPage] = useState(1);
  const [todosPages] = useState(3);
  const lastCountIndex = todosPage * todosPages;
  const firstCountIndex = lastCountIndex - todosPages;
  const todosCount = todos.slice(firstCountIndex, lastCountIndex);
  const pagination = (pageNumber) => settodosPage(pageNumber);
  // ---------------------------------------------------------------
  //delete todo
  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      console.log("del:", deleteTodo);
      settodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };
  //get todos
  const getTodos = async () => {
    try {
      axios.get("http://localhost:5000/todos").then((res) => {
        settodos(res.data);
        console.log("getdata");
      });
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getTodos();
  }, []);
  //get filter todos
  const getFilter = async (column, value, operand) => {
    try {
      axios
        .get(`http://localhost:5000/todos/${column}/${operand}/${value}`)
        .then((res) => {
          settodos(res.data);
          console.log("getfilter", res.data);
        });
    } catch (err) {
      console.error(err.message);
    }
  };
  //-------------------------sort-----------------------------------
  //get todos
  const Sort = async (name) => {
    try {
      axios.get(`http://localhost:5000/todos/sort_${name}`).then((res) => {
        settodos(res.data);
        console.log("Sorted !!!", name);
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  //----------------------------------------------------------------
  const thead = [
    { title: "Date" },
    { title: "Name", todo: "name" },
    { title: "Count", todo: "count" },
    { title: "Distance", todo: "distance" },
    { title: "Edit" },
    { title: "Delete" },
  ];
  const listThead = thead.map((n) => (
    <th key={n.title} onClick={() => Sort(n.todo)}>
      {n.title}
    </th>
  ));
  const tbody = todosCount.map((todo) => (
    <tr key={todo.todo_id}>
      <td>{todo.todo_date}</td>
      <td>{todo.todo_name}</td>
      <td>{todo.todo_count}</td>
      <td>{todo.todo_distance}</td>
      <td>
        <EditTodo todo={todo} />
      </td>

      <td>
        <MdDelete
          className="icon"
          size="1.5rem"
          onClick={() => deleteTodo(todo.todo_id)}
        />
      </td>
    </tr>
  ));
  return (
    <>
      <div className="row">
        <h1>List Todos</h1>
        <button onClick={() => getTodos()}>Reload Table</button>
        <div className="filter">
          <button
            style={{
              marginLeft: "0px",
            }}
            onClick={() => getFilter(col, input, operand)}
          >
            Filter
          </button>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>{listThead}</tr>
        </thead>
        <tbody>{tbody}</tbody>
      </table>
      <Pagitanion
        todosPages={todosPages}
        totalTodos={todos.length}
        pagination={pagination}
      />
    </>
  );
};
export default ListTodos;
