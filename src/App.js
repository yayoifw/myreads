import React from 'react';
import ListBooksScreen from './ListBooksScreen'
import SearchBookScreen from './SearchBookScreen'
import { Route } from 'react-router-dom'


/**
 * App.js
 * This component handles routing of application's screens
 * based on url.
 */
const App = () => (
  <div className="App">
    <Route exact path="/" render={()=> (<ListBooksScreen />)} />
    <Route path="/search" render={()=> (<SearchBookScreen />)} />
  </div>
);

export default App;
