import { Box } from "@material-ui/core";
import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import ListPage from "../Products/pages/ListPage";
import DetailPage from "./pages/DetailPage";

function ProductFeature(props) {
  const match = useRouteMatch();

  return (
    <Box py={2}>
      <Switch>
        <Route path={match.url} exact component={ListPage} />
        <Route path={`${match.url}/:productId`} component={DetailPage} />
      </Switch>
    </Box>
  );
}

export default ProductFeature;
