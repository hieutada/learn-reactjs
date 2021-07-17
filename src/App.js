import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import NotFound from './components/NotFound';
import AlbumFearture from './features/Album';
import ProductFeature from './features/Products';
import TodoFearture from './features/Todo';

function App() {
  return (
    <>
      <Header />

      <Switch>
        <Redirect from="/" to="/todos" exact />
        <Redirect from="/show/:id" to="/todos/:id" exact />

        <Route path="/todos" component={TodoFearture} />
        <Route path="/albums" component={AlbumFearture} />
        <Route path="/products" component={ProductFeature} />

        <Route component={NotFound} />
      </Switch>

      <Footer />
    </>
  );
}

export default App;
