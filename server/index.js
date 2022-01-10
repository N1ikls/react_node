const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
//middleware
app.use(cors());
app.use(express.json());
//ROUTES//

//create todo
app.post("/todos", async (req, res) => {
  try {
    const { todo_date, todo_name, todo_count, todo_distance } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (todo_date, todo_name, todo_count, todo_distance) VALUES($1,$2,$3,$4) RETURNING *",
      [todo_date, todo_name, todo_count, todo_distance]
    );
    res.json(newTodo);
  } catch (err) {
    console.error(err.message);
  }
});
//get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});
// sort
app.get('/todos/sort_count', async (req, res) => {
  try {
    const allTodos = await pool.query(`SELECT * FROM todo ORDER BY todo_count`);
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});
app.get(`/todos/sort_name`, async (req, res) => {
  try {
    const allTodos = await pool.query(`SELECT * FROM todo ORDER BY todo_name`);
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});
app.get(`/todos/sort_distance`, async (req, res) => {
  try {
    const allTodos = await pool.query(
      `SELECT * FROM todo ORDER BY todo_distance`
    );
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});
// filter

//get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
//update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { todo_date, todo_name, todo_count, todo_distance } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET todo_date = $1, todo_name = $2, todo_count = $3, todo_distance = $4 WHERE todo_id = $5",
      [todo_date, todo_name, todo_count, todo_distance, id]
    );
    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});
//delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const delteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("Todo was deleted !");
  } catch (err) {
    console.error(err.message);
  }
});
app.listen(5000, () => {
  console.log("server has started om port 5000");
});
