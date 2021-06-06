import React, { useState } from "react";
import TodoList from "./components/TodoList";

function TodoFearture(props) {
  const initList = [
    {
      id: 1,
      title: "Eat",
      status: "new",
    },
    {
      id: 2,
      title: "Sleep",
      status: "completed",
    },
    {
      id: 3,
      title: "Code",
      status: "new",
    },
  ];

  const [todoList, setTodoList] = useState(initList);
  const [filteredStatus, setFilteredList] = useState("all");

  const handleTodoClick = (todo, idx) => {
    const newTodoList = [...todoList];

    newTodoList[idx] = {
      ...newTodoList[idx],
      status: newTodoList[idx].status === "new" ? "completed" : "new",
    };

    setTodoList(newTodoList);
  };

  const handleFilterClick = (status) => {
    setFilteredList(status);
  };

  const renderTodoList = todoList.filter(
    (todo) => filteredStatus === "all" || filteredStatus === todo.status
  );

  return (
    <div>
      <h3>Todo List</h3>
      <TodoList todoList={renderTodoList} onTodoClick={handleTodoClick} />

      <button onClick={() => handleFilterClick("all")}>All</button>
      <button onClick={() => handleFilterClick("completed")}>Completed</button>
      <button onClick={() => handleFilterClick("new")}>New</button>
    </div>
  );
}

export default TodoFearture;
