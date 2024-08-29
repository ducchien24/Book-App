import React from "react";
import "./todo.css";
import TodoData from "./TodoData";
import TodoNew from "./TodoNew";
import { useState } from "react";

const TodoApp = () => {
  const [valueData, setValueData] = useState([]);

  const handClickDelete = (id) => {
    const newValueData = valueData.filter((item) => item.id !== id);
    setValueData(newValueData);
  };
  return (
    <>
      <div className="todo-container">
        <div className="todo-title"></div>
        <h2>Todo List </h2>
        <TodoNew setValueData={setValueData} />
        <TodoData valueData={valueData} handClickDelete={handClickDelete} />
      </div>
    </>
  );
};

export default TodoApp;
