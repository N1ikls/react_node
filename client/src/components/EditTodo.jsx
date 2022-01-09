import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
const EditTodo = ({ todo }) => {
  const [todo_date, setdate] = useState(todo.todo_date);
  const [todo_name, setname] = useState(todo.todo_name);
  const [todo_count, setcount] = useState(todo.todo_count);
  const [todo_distance, setdistance] = useState(todo.todo_distance);
  const UpdateTodo = async (e) => {
    e.preventDefault();
    try {
      const body = { todo_date, todo_name, todo_count, todo_distance };
      const response = await fetch(
        `http://localhost:5000/todos/${todo.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      console.log("edit:", response);
      setOpen(false); // для закрытия модального окна при нажатии на edit
      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <MdEdit className="icon" size="1.5rem" onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
            <button onClick={(e) => UpdateTodo(e)}>Edit</button>
          </div>
        </Box>
      </Modal>
    </>
  );
};
export default EditTodo;
