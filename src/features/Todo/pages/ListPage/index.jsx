import React, { useEffect, useState } from 'react';
import TodoList from '../../components/TodoList';
import TodoForm from '../../components/TodoForm';
import queryString from 'query-string';
import { useLocation, useHistory, useRouteMatch } from 'react-router-dom';
import { Box, Container } from '@material-ui/core';

function ListPage(props) {
  const initList = [
    {
      id: 1,
      title: 'Eat',
      status: 'new',
    },
    {
      id: 2,
      title: 'Sleep',
      status: 'completed',
    },
    {
      id: 3,
      title: 'Code',
      status: 'new',
    },
  ];

  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();
  const [todoList, setTodoList] = useState(initList);

  const [filteredStatus, setFilteredStatus] = useState(() => {
    const params = queryString.parse(location.search);
    return params.status || 'all';
  });

  useEffect(() => {
    const params = queryString.parse(location.search);
    setFilteredStatus(params.status || 'all');
  }, [location.search]);

  const handleTodoClick = (todo, idx) => {
    const newTodoList = [...todoList];

    newTodoList[idx] = {
      ...newTodoList[idx],
      status: newTodoList[idx].status === 'new' ? 'completed' : 'new',
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
    (todo) => filteredStatus === 'all' || filteredStatus === todo.status
  );

  const handleTodoFormSubmit = (values) => {
    console.log('Form submit: ', values);
    const newTodo = {
      id: todoList.length + 1,
      title: values.title,
      status: 'new',
    };

    const newTodoList = [...todoList, newTodo];
    setTodoList(newTodoList);
  };

  return (
    <Box>
      <Container>
        <h3>What to do</h3>
        <TodoForm onSubmit={handleTodoFormSubmit} />

        <h3>Todo List</h3>
        <TodoList todoList={renderTodoList} onTodoClick={handleTodoClick} />

        <button onClick={() => handleFilterClick('all')}>All</button>
        <button onClick={() => handleFilterClick('completed')}>
          Completed
        </button>
        <button onClick={() => handleFilterClick('new')}>New</button>
      </Container>
    </Box>
  );
}

export default ListPage;
