import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsBookmarkStar } from "react-icons/bs";
import { BsBookmarkStarFill } from "react-icons/bs";
// old redux
//import { deleteBook, toggleFavorite } from '../../redux/books/actionCreators';
import {
    selectTitleFilter,
    selectAuthorFilter,
    selectOnlyFavoriteFilter
} from '../../redux/slices/filterSlice';

// redux toolkit
import {
    deleteBook,
    toggleFavorite,
    selectBooks
} from '../../redux/slices/booksSlice';
import './BookList.css'

const BookList = () => {
    // old redux
    //const books = useSelector((state) => state.books)

    // redux toolkit
    const books = useSelector(selectBooks)

    const titleFilter = useSelector(selectTitleFilter)
    const authorFilter = useSelector(selectAuthorFilter)
    const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter)

    const dispatch = useDispatch()

    const handleDeleteBook = (bookId) => {
        dispatch(deleteBook(bookId))
    }

    const handleToggleFavorite = (bookId) => {
        dispatch(toggleFavorite(bookId))
    }

    const filteredBooks = books.filter((book) => {
        const matchesTitle = book.title
            .toLowerCase()
            .includes(titleFilter.toLowerCase())

        const matchesAuthor = book.author
            .toLowerCase()
            .includes(authorFilter.toLowerCase())

        const matchesFavorite = onlyFavoriteFilter ? book.isFavorite : true

        return matchesTitle && matchesAuthor && matchesFavorite
    })

    const highlightMatch = (text, filter) => {

        if (!filter) return text

        const regex = new RegExp(`(${filter})`, 'gi')

        return text.split(regex).map((substring, i) => {
            if (substring.toLowerCase() === filter.toLowerCase()) {
                return (
                    <span key={i} className='highlight'>
                        {substring}
                    </span>
                )
            }
            return substring

        })
    }


    return (
        <div className="app-block book-list">
            <h2>Book List</h2>
            {books.length === 0 ? (
                <p>No books available</p>
            ) : (
                <ul>
                    {filteredBooks.map((book, i) => (
                        <li key={book.id}>
                            <div className='book-info'>
                                {++i}. {highlightMatch(book.title, titleFilter)} by{' '
                                }<strong>{highlightMatch(book.author, authorFilter)}</strong> ({book.source})
                            </div>
                            <span onClick={() => handleToggleFavorite(book.id)}>
                                {book.isFavorite ? (
                                    <BsBookmarkStarFill className='star-icon' />
                                ) : (
                                    <BsBookmarkStar className='star-icon' />
                                )}
                            </span>
                            <div className="book-actions">
                                <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default BookList;
