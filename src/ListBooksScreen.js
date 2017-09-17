import React, { Component } from 'react'
import GridBooks from './GridBooks'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'


class ListBooksScreen extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
  }

  handleBookMoveShelf = (selectedShelf, book) => {
    // make a copy of bookList
    let newBooks = [...this.state.books]
    newBooks.map(aBook => {
      // update the target book's shelf
      if (aBook.id === book.id) {
        aBook.shelf = selectedShelf
      }
      return aBook;
    })
    this.setState({ books: newBooks })
    BooksAPI.update(book, selectedShelf)
  }

  render() {
    const { books } = this.state
    return (
<div className="list-books">
  <div className="open-search">
    <Link to="/search">Search</Link>
  </div>
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
