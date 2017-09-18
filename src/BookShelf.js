import React from 'react'
import PropTypes from 'prop-types'

/**
 * BookShelf.js
 * This component displays a shelf with a book category name.
 * It is a container component to hold the books.
 */
const BookShelf = (props) => {
  const { name, children } = props
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{name}</h2>
      <div className="bookshelf-books">
        {children}
      </div>
    </div>
  )
}

BookShelf.propTypes = {
  name: PropTypes.string.isRequired
}

export default BookShelf
