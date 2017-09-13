import React, { Component } from 'react'
import GridBooks from './GridBooks'
import BookShelf from './BookShelf'

const testData = require('./books.json')
const testBookList = testData.books

testBookList.filter(abook => (abook.shelf === "read"))

class ListBooksScreen extends Component {
  state = {
    books: testBookList
  }

  handleBookMoveShelf = (selectedShelf, book) => {
    console.log(selectedShelf)
    // make a copy of bookList
    let newBooks = [...this.state.books]
    newBooks.map(aBook => {
      // update target book's shelf
      if (aBook.id === book.id) {
        aBook.shelf = selectedShelf
      }
    })
    this.setState({ books: newBooks })
    // TODO: Call API to update bookList
  }

  render() {
    const { books } = this.state
    return (
<div className="list-books">
  <div className="list-books-title">
    <h1>MyReads</h1>
  </div>
  <div className="list-books-content">
    <div>
      <BookShelf name="Currently Reading">
        <GridBooks books={books.filter(abook=> (abook.shelf === "currentlyReading"))}
                   handleBookMove={this.handleBookMoveShelf}/>
      </BookShelf>
      <BookShelf name="Want to Read">
        <GridBooks books={books.filter(abook=> (abook.shelf === "wantToRead"))}
                   handleBookMove={this.handleBookMoveShelf}/>
      </BookShelf>
      <BookShelf name="Read">
        <GridBooks books={books.filter(abook=> (abook.shelf === "read"))}
                   handleBookMove={this.handleBookMoveShelf}/>
      </BookShelf>
    </div>
  </div>
</div>
    )
  }
}

export default ListBooksScreen
