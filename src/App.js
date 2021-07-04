import { Button, Container } from "@material-ui/core";
import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import productsApi from "./api/productsApi";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import AlbumFearture from "./features/Album";
import TodoFearture from "./features/Todo";

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
    <>
      <Header />

      <Container>
        <Switch>
          <Redirect from="/" to="/todos" exact />
          <Redirect from="/show/:id" to="/todos/:id" exact />

          <Route path="/todos" component={TodoFearture} />
          <Route path="/albums" component={AlbumFearture} />

          <Route component={NotFound} />
        </Switch>
      </Container>

      <Footer />
    </>
  );
}

export default App;
