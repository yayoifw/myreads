import React, { Component } from 'react'
import './App.css'
import PropTypes from 'prop-types'

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    handleBookMove: PropTypes.func.isRequired
  }

  state = {
    shelf: "none"
  }

  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const selectedShelf = event.target.value;
    this.setState({ shelf: selectedShelf })
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
              <select value={(typeof book.shelf !== "undefined") ? book.shelf : this.state.shelf } onChange={this.handleChange}>
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
