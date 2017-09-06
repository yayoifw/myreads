import React, { Component } from 'react'
import Book from './Book'

class GridBooks extends Component {
  render() {
    const { books } = this.props
    return (
      <ol className="books-grid">
        {books.map(aBook => (
          <li>
            <Book book={aBook} />
          </li>
        ))}
      </ol>
    )
  }
}

export default GridBooks
