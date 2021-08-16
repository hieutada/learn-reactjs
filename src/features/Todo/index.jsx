import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";
import NotFound from "../../components/NotFound";

function TodoFearture(props) {
  const match = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={match.path} component={ListPage} exact />
        <Route path={`${match.path}/:todoID`} component={DetailPage} />
      </Switch>
    </div>
  );
}

export default TodoFearture;
