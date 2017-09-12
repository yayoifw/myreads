import React, { Component } from 'react'

class BookShelf extends Component {
  render() {
    const { name, children } = this.props
 return (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{name}</h2>
    <div className="bookshelf-books">
    {children}
    </div>
  </div>
  )
  }
}

export default BookShelf
