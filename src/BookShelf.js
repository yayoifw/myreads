import React from 'react'
import PropTypes from 'prop-types'

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
