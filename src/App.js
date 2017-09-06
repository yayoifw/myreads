import React, { Component } from 'react';
import GridBooks from './GridBooks'
import Book from './Book'

const testBook = {
  title: 'Anne of GreenGables',
  authors: 'Mary Mode Mongmery',
  thumbnail: 'abc'
}
const bookList = [ {
    title: 'Anne of GreenGables',
    authors: 'Mary Mode Mongmery',
    thumbnail: 'abc'
  },
  {
      title: 'Anne of GreenGables',
      authors: 'Mary Mode Mongmery',
      thumbnail: 'abc'
    }
]


class App extends Component {
  render() {
    return (
      <div className="App">
      <GridBooks books={bookList}/>
      </div>
    );
  }
}

export default App;
