import React, { Component } from 'react';
import ListBooksScreen from './ListBooksScreen'
import SearchBookScreen from './SearchBookScreen'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'


/**
 * App.js
 * This component handles routing of application's screens
 * based on url and fetching the list of books on shelf
 */
class App extends Component {
    state = {
        booksOnShelf: []
    }

    /**
     * This function will call BookAPI.getAll() to fetch
     * the initial list of books to display in book shelf
     */
    componentDidMount() {
        this.getBooksOnShelf();
    }

    /**
     * This function moves the book to the selected shelf
     * by calling BooksAPI.update.
     * After the update is finished, BooksAPI.getAll()
     * is called to refresh the local copy of the books on shelf
     * with the remote list.
     * @param selectedShelf -- name of the user selected shelf
     * @param book -- a book to move to the selected shelf
     */
    handleBookMoveShelf = (selectedShelf, book) => {
        BooksAPI.update(book, selectedShelf).then(data => {
            this.getBooksOnShelf();
        })
    }

    getBooksOnShelf() {
        BooksAPI.getAll().then(books => {
            this.setState({booksOnShelf: books})
        })
    }

    render() {
        return (
            <div className="App">
                <Route exact path="/" render={() => (<ListBooksScreen  handleBookMoveShelf={this.handleBookMoveShelf} booksOnShelf={this.state.booksOnShelf} />)}/>
                <Route path="/search" render={() => (<SearchBookScreen handleBookMoveShelf={this.handleBookMoveShelf} booksOnShelf={this.state.booksOnShelf} />)}/>
            </div>
        );
    }

}

export default App;
