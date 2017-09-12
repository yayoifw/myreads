import React, { Component } from 'react'
import GridBooks from './GridBooks'
import BookShelf from './BookShelf'

class ListBooksScreen extends Component {
  render() {
    const { books } = this.props
    return (
<div className="list-books">
  <div className="list-books-title">
    <h1>MyReads</h1>
  </div>
  <div className="list-books-content">
    <div>
      <BookShelf name="Currently Reading">
        <GridBooks books={books.filter(abook=> (abook.shelf === "currentlyReading"))}/>
      </BookShelf>
      <BookShelf name="Want to Read">
        <GridBooks books={books.filter(abook=> (abook.shelf === "wantToRead"))}/>
      </BookShelf>
      <BookShelf name="Read">
        <GridBooks books={books.filter(abook=> (abook.shelf === "read"))}/>
      </BookShelf>
    </div>
  </div>
</div>
    )
  }
}

export default ListBooksScreen
