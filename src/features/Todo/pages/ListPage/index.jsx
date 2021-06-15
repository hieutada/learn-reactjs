import React, { useEffect, useState } from "react";
import TodoList from "../../components/TodoList";
import queryString from "query-string";
import { useLocation, useHistory, useRouteMatch } from "react-router-dom";

function ListPage(props) {
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

  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();
  const [todoList, setTodoList] = useState(initList);

  const queryStatus = () => {
    const params = queryString.parse(location.search);
    return params.status || "all";
  }

  const [filteredStatus, setFilteredStatus] = useState(queryStatus);

  useEffect(() => {
    const params = queryString.parse(location.search);
    setFilteredStatus(queryStatus)
  }, [location.search]);

  const handleTodoClick = (todo, idx) => {
    const newTodoList = [...todoList];

    newTodoList[idx] = {
      ...newTodoList[idx],
      status: newTodoList[idx].status === "new" ? "completed" : "new",
    };

    setTodoList(newTodoList);
  };

  const handleFilterClick = (status) => {
    // setFilteredStatus(status);
    const queryParams = { status: status };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
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

export default ListPage;
