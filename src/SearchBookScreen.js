import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import GridBooks from './GridBooks'
import PropTypes from 'prop-types'
import Rx from 'rxjs/Rx'

/**
 * SearchBookScreen.js
 * This component displays a search input and the book search result.
 * Each book in the search result has a drop-down menu to select the
 * book shelf. When the user selects a shelf, the book is added (moved)
 * to the selected shelf and removed from the search result.
 * Book search result is obtained from the server using BooksAPI.
 */
class SearchBookScreen extends Component {
  static propTypes = {
    handleBookMoveShelf: PropTypes.func.isRequired,
    booksOnShelf: PropTypes.array.isRequired
  }

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
      //this.performSearchAPI(searchTerm)
      this.performSearchViaRx(searchTerm)
    }
  }

  performSearchViaRx(searchTerm) {
    //const source = Rx.Observable.fromPromise(BooksAPI.search(searchTerm, 10)).flatMap(Rx.Observable.from);
    const source = Rx.Observable.fromPromise(BooksAPI.search(searchTerm, 10));
    source.debounce(() => Rx.Observable.interval(5000)).subscribe(response => console.log('response', response));
  }

  performSearchAPI(searchTerm) {
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

  /**
   * This function assigns the "shelf" attribute
   * of the book by comparing the book with the list of
   * books already on the shelf.
   * If book is on the shelf, "shelf" value is assigned,
   * otherwise "none" is assigned.
   * @param books -- search result books
   * @param booksOnShelf -- the list of books on shelf
   * @returns the list of books with shelf value assigned.
   */
  updateBooksShelfAttribute = (books, booksOnShelf) => {
    let updatedBooks = books.map(aBook => {
      aBook.shelf = "none"
      booksOnShelf.forEach(aBookOnShelf => {
        if (aBook.id === aBookOnShelf.id) {
          aBook.shelf = aBookOnShelf.shelf
        }
      })
      return aBook;
    })
    return updatedBooks
  }

  render() {
    const { query, books } = this.state
    const { handleBookMoveShelf, booksOnShelf } = this.props
    let books2display = this.updateBooksShelfAttribute(books, booksOnShelf)
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" value={query} placeholder="Search by title or author" onChange={(event)=> { this.onSearchUpdate(event.target.value) }}/>
          </div>
        </div>
        <div className="search-books-results">
          <GridBooks books={books2display} handleBookMove={handleBookMoveShelf}/>
        </div>
      </div>
    )
  }
}

export default SearchBookScreen
