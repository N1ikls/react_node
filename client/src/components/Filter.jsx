import React, { useState } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";
const Filter = ({ todos }) => {
  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    "label + &": {
      marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "10px 26px 10px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:focus": {
        borderRadius: 4,
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  }));
  const styles = {
    marginLeft: "30px",
  };
  const [column, setColumn] = useState("");
  const [condition, setCondition] = useState("");
  const [input, setInput] = useState("");
  const handleChange = (event) => {
    setColumn(event.target.value);
  };
  const handleChangeCondition = (event) => {
    setCondition(event.target.value);
  };
  const FilterChange = () => {
    if (column === 20) {
      const todosFilter = todos.map((todo) => todo.todo_count);
      console.log("Filter_count", todosFilter);
      if (condition === 20) {
        const filter = todosFilter.filter((number) => number > input);
        console.log("Filter full", filter);
      }
    }
  };
  FilterChange();
  return (
    <div className="row">
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Column</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={column}
            label="Column"
            onChange={handleChange}
          >
            <MenuItem value={10}>Name</MenuItem>
            <MenuItem value={20}>Count</MenuItem>
            <MenuItem value={30}>Distance</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 120 }} style={styles}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Сondition</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={condition}
            label="condition"
            onChange={handleChangeCondition}
          >
            <MenuItem value={10}>Равно</MenuItem>
            <MenuItem value={20}>Больше</MenuItem>
            <MenuItem value={30}>Меньше</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <FormControl sx={{ m: 1 }} variant="standard" className="formControl">
        <InputLabel htmlFor="demo-customized-textbox">Filtter</InputLabel>
        <BootstrapInput
          value={input}
          onChange={(e) => setInput(e.target.value)}
          id="demo-customized-textbox"
        />
      </FormControl>
    </div>
  );
};
export default Filter;
