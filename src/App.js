import React, { Component } from 'react';
import ListBooksScreen from './ListBooksScreen'

const testData = require('./books.json')
const testBookList = testData.books

testBookList.filter(abook => (abook.shelf === "read"))

class App extends Component {
  render() {
    return (
<div className="App">
<ListBooksScreen books={testBookList} />
</div>
    );
  }
}

export default App;
