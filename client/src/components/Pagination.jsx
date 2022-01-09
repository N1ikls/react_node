import React from "react";
import "../App.css";
const Pagitanion = ({ todosPages, totalTodos, pagination }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalTodos / todosPages); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            className="pagination__item"
            key={number}
            onClick={() => pagination(number)}
          >
            {number}
          </li>
        ))}
      </ul>
    </>
  );
};
export default Pagitanion;
