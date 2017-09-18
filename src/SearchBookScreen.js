import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import GridBooks from './GridBooks'

/**
 * SearchBookScreen.js
 * This component displays a search input and the book search result.
 * Each book in the search result has a drop-down menu to select the
 * book shelf. When the user selects a shelf, the book is added (moved)
 * to the selected shelf and removed from the search result.
 * Book search result is obtained from the server using BooksAPI.
 */
class SearchBookScreen extends Component {
  state = {
    books: [],
    query: ''
  }

  /**
   * This function runs the book search by calling
   * BooksAPI.search() API call and update the
   * state.books with the search result.
   * @param newSearch -- search term
   */
  onSearchUpdate(newSearch) {
    this.setState({
      query: newSearch
    })

    // remove leading space only.
    // trailing space is allowed as title, author can contain space.
    const searchTerm = newSearch.replace(/^\s+/, "");

    if (searchTerm.length === 0) {
      this.setState({
        books: []
      })
    } else {
      BooksAPI.search(searchTerm, 10).then(books => {
        // check the returned book type is valid.
        if ((typeof books === "undefined") || (!Array.isArray(books))) {
          this.setState({
            books: []
          })
        } else {
          // update the book with the search result
          this.setState({
            books
          })
        }
      })
    }
  }

  /**
   * This function moves the book to the selected shelf
   * by calling BooksAPI.update() API call.
   * After the shelf update is completed, the book is
   * removed from the search result.
   * @param selectedShelf -- name of the user selected shelf
   * @param book -- a book to move to the selected shelf
   */
  handleBookMoveShelf = (selectedShelf, book) => {
    BooksAPI.update(book, selectedShelf).then(response => {
      this.setState(state => ({
        books: state.books.filter(aBook => aBook.id !== book.id)
      }))
    })
  }

  render() {
    const { query, books } = this.state
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" value={query} placeholder="Search by title or author" onChange={(event)=> { this.onSearchUpdate(event.target.value) }}/>
          </div>
        </div>
        <div className="search-books-results">
          <GridBooks books={books} handleBookMove={this.handleBookMoveShelf}/>
        </div>
      </div>
    )
  }
}

export default SearchBookScreen
