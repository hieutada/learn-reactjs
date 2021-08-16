import {
  List,
  ListItem, ListItemText
} from "@material-ui/core";
import classname from "classname";
import PropTypes, { func } from "prop-types";
import React from "react";
import "./style.scss";

TodoList.propTypes = {
  todoList: PropTypes.array,
  onTodoClick: func,
};

TodoList.defaultProps = {
  todoList: [],
  onTodoClick: null,
};

function TodoList(props) {
  const { todoList, onTodoClick } = props;

  const handleTodoClick = (todo, idx) => {
    if (!onTodoClick) return;

    onTodoClick(todo, idx);
  };

  return (
    <List component='nav' className='todo-list'>
      {todoList.map((todo, idx) => (

        <ListItem
          key={todo.id}
          className={classname({
            "todo-item": true,
            completed: todo.status === "completed",
          })}
          onClick={() => handleTodoClick(todo, idx)}
        >
          <ListItemText primary={todo.title} />
        </ListItem>
      ))}
    </List>
  );
}

export default TodoList;
