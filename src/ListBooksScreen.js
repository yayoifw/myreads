import React, { Component } from 'react'
import GridBooks from './GridBooks'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'

/**
 * ListBooksScreen.js
 * This component displays the book shelf with 3 book
 * shelf categories: "Currently Reading", "Want to Read",
 * and "Read".
 * Each book has a drop-down menu to select the
 * book shelf. When the user selects a shelf, the book is moved
 * to the selected shelf.
 * Book list is obtained from the server using BooksAPI.
 */
class ListBooksScreen extends Component {
  state = {
    books: []
  }

  /**
  * This function will call BookAPI.getAll() to fetch
  * the book list to display in book shelf
  */
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
  }

  /**
   * This function moves the book to the selected shelf.
   * It creates a new books array with selected book's shelf
   * value updated to a (new) selectedShelf name. Then local
   * copy of books (state.books) is updated to this new array
   * to render the book shelves.
   * BooksAPI.update() is called to record book's new
   * selectedShelf value.
   * @param selectedShelf -- name of the user selected shelf
   * @param book -- a book to move to the selected shelf
   */
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
              <GridBooks books={books.filter(abook => (abook.shelf === "currentlyReading"))} handleBookMove={this.handleBookMoveShelf}/>
            </BookShelf>
            <BookShelf name="Want to Read">
              <GridBooks books={books.filter(abook => (abook.shelf === "wantToRead"))} handleBookMove={this.handleBookMoveShelf}/>
            </BookShelf>
            <BookShelf name="Read">
              <GridBooks books={books.filter(abook => (abook.shelf === "read"))} handleBookMove={this.handleBookMoveShelf}/>
            </BookShelf>
          </div>
        </div>
      </div>
    )
  }
}

export default ListBooksScreen
