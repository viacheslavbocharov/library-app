import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaSpinner } from 'react-icons/fa'
//classic redux
//import { addBook } from '../../redux/books/actionCreators';

//redux toolkit
import { addBook, fetchBook, selectIsLoadingViaAPI } from '../../redux/slices/booksSlice';
import { setError } from '../../redux/slices/errorSlice';
import booksData from '../../data/books.json'
import createBookWithID from '../../utils/createBookWithID';
import './BookForm.css'

const BookForm = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const isLoadingViaAPI = useSelector(selectIsLoadingViaAPI)


    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()

        if (title && author) {
            const book = createBookWithID({ title, author }, 'manual')
            dispatch(addBook(book))
            setTitle('')
            setAuthor('')
        } else {
            dispatch(setError('You must fill in title and author'))
        }
    }

    const handleAddRandomBook = () => {
        const randomIndex = Math.floor(Math.random() * booksData.length)
        const randomBook = booksData[randomIndex]
        dispatch(addBook(createBookWithID(randomBook, 'random')))
    }


    const handleAddRandomBookViaAPI = () => {
        dispatch(fetchBook('http://localhost:4000/random-book-delayed'))
    }

    return (
        <div className="app-block book-form">
            <h2>Add a new book</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="author">Author:</label>
                    <input
                        type="text"
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <button type="submit">Add Book</button>
                <button type="button" onClick={handleAddRandomBook}>Add Random</button>
                <button type='button' onClick={handleAddRandomBookViaAPI} disabled={isLoadingViaAPI}>
                    {isLoadingViaAPI ? (
                        <>
                            <span>Loading...</span>
                            <FaSpinner className='spinner' />
                        </>
                    ) : 'Add random via API'}
                </button>
            </form>
        </div>
    );
}

export default BookForm;
