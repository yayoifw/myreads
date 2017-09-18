import React, { Component } from 'react'
import './App.css'
import PropTypes from 'prop-types'

/**
 * Book.js
 * This component displays a Book with a drop-down menu
 * to change the book-shelf it belongs to.
 * When the user selects a shelf, it notifies the parent
 * component using handleBookMove() callback.
 */
class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    handleBookMove: PropTypes.func.isRequired
  }

  /**
  * This function calls handleBookMove() callback
  * to inform parent component that user has
  * moved book's shelf value.
  * @param event -- select option select event.
  */
  handleChange = (event) => {
    const selectedShelf = event.target.value;
    this.props.handleBookMove(selectedShelf, this.props.book)
  }

  render() {
    const { book } = this.props
    const bookImage = (typeof book.imageLinks !== "undefined") ? `url(${book.imageLinks.smallThumbnail})` : ''
    return (
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: bookImage }}></div>
            <div className="book-shelf-changer">
              <select value={(typeof book.shelf !== "undefined") ? book.shelf : "none" } onChange={this.handleChange}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{ book.title }</div>
          <div className="book-authors">{ book.authors }</div>
        </div>
    )
  }
}

export default Book
