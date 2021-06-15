import React, { useEffect } from "react";
import "./App.css";
import AlbumFearture from "./features/Album";
import TodoFearture from "./features/Todo";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";
import NotFound from "./components/NotFound";
import productsApi from "./api/productsApi";

function App() {
  useEffect(() => {
    const fetchProdiucts = async () => {
      const params = {
        _limit: 10,
      };
      const productList = await productsApi.getAll(params);
      console.log(productList);
    };

    fetchProdiucts();
  }, []);

  return (
    <div>
      <h3>HEADER</h3>
      <hr />

      <p>
        <NavLink to="/todos" activeClassName="active-menu">
          Todos
        </NavLink>
      </p>
      <p>
        <NavLink to="/albums" activeClassName="active-menu">
          Albums
        </NavLink>
      </p>

      <Switch>
        <Redirect from="/" to="/todos" exact />
        <Redirect from="/show/:id" to="/todos/:id" exact />

        <Route path="/todos" component={TodoFearture} />
        <Route path="/albums" component={AlbumFearture} />

        <Route component={NotFound} />
      </Switch>

      <hr />
      <h3>FOOTER</h3>
    </div>
  );
}

export default App;
