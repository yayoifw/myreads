import React, { Component } from 'react';
import ListBooksScreen from './ListBooksScreen'
import SearchBookScreen from './SearchBookScreen'
import { Route } from 'react-router-dom'



class App extends Component {
  render() {
    return (
<div className="App">
<Route exact path="/" render={() => (<ListBooksScreen />)} />
<Route path="/search" render={() => (<SearchBookScreen />)} />
</div>
    );
  }
}

export default App;
