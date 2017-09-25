import React from 'react'
import GridBooks from './GridBooks'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

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
const ListBooksScreen = (props) => {
    const { booksOnShelf, handleBookMoveShelf } = props;
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
                <GridBooks books={booksOnShelf.filter(abook => (abook.shelf === "currentlyReading"))} handleBookMove={handleBookMoveShelf}/>
              </BookShelf>
              <BookShelf name="Want to Read">
                <GridBooks books={booksOnShelf.filter(abook => (abook.shelf === "wantToRead"))} handleBookMove={handleBookMoveShelf}/>
              </BookShelf>
              <BookShelf name="Read">
                <GridBooks books={booksOnShelf.filter(abook => (abook.shelf === "read"))} handleBookMove={handleBookMoveShelf}/>
              </BookShelf>
            </div>
          </div>
        </div>
    )
}

ListBooksScreen.propTypes = {
    handleBookMoveShelf: PropTypes.func.isRequired,
    booksOnShelf: PropTypes.array.isRequired,
}

export default ListBooksScreen
