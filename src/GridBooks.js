import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

const GridBooks = (props) => {
  const { books, handleBookMove } = props
  return (
    <ol className="books-grid">
      {books.map(aBook => (
        <li key={aBook.id}>
          <Book book={aBook} handleBookMove={handleBookMove}/>
        </li>
      ))}
    </ol>
  )
}

GridBooks.propTypes = {
  books: PropTypes.array.isRequired,
  handleBookMove: PropTypes.func.isRequired
}

export default GridBooks
