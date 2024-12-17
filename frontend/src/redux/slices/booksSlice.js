import axios from 'axios'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import createBookWithID from '../../utils/createBookWithID';
import { setError } from './errorSlice';


const initialState = {
    books: [],
    isLoadingViaAPI: false
}

export const fetchBook = createAsyncThunk('books/fetchBooks', async (url, thunkAPI) => {
    try {
        const res = await axios.get(url)
        return res.data
    } catch (error) {
        thunkAPI.dispatch(setError(error.message))
        //option 1
        return thunkAPI.rejectWithValue(error)
        // //option 2
        //throw error
    }
});

const booksSlice = createSlice({
    name: 'books',
    initialState: initialState,
    reducers: {
        addBook: (state, action) => {
            //return [...state, action.payload]
            state.books.push(action.payload)
        },
        deleteBook: (state, action) => {
            return { ...state, books: state.books.filter((book) => book.id !== action.payload) }
        },
        toggleFavorite: (state, action) => {
            //mutate array, but lib immer return new arr
            state.books.forEach((book) => {
                if (book.id === action.payload) {
                    book.isFavorite = !book.isFavorite
                }
            })
            //     return state.map((book) => (
            //         book.id === action.payload ? { ...book, isFavorite: !book.isFavorite } : book
            //     ))
        }
    },
    //1 option how to create exterReducer
    // extraReducers: (builder) => {
    //     builder.addCase(fetchBook.pending, (state) => {
    //         state.isLoadingViaAPI = true
    //     })
    //     builder.addCase(fetchBook.fulfilled, (state, action) => {
    //         state.isLoadingViaAPI = false
    //         if (action.payload.title && action.payload.author) {
    //             state.books.push(createBookWithID(action.payload, 'API'))
    //         }
    //     })
    //     builder.addCase(fetchBook.rejected, (state) => {
    //         state.isLoadingViaAPI = false
    //     })
        // builder.addCase(fetchBook.rejected, (state, action) => {
        //     // you can save into modified initial state
        // })
    // },
    //2 option how to create extraReducer
    extraReducers: {
        [fetchBook.pending]: (state) => {
            state.isLoadingViaAPI = true
        },
        [fetchBook.fulfilled]: (state, action) => {
            state.isLoadingViaAPI = false
            if (action?.payload?.title && action?.payload?.author) {
                state.books.push(createBookWithID(action.payload, 'API'))
            }
        },
        [fetchBook.rejected]: (state) => {
            state.isLoadingViaAPI = false
        }
    }
})

export const {
    addBook,
    deleteBook,
    toggleFavorite
} = booksSlice.actions

export const selectBooks = (state) => state.books.books
export const selectIsLoadingViaAPI = (state) => state.books.isLoadingViaAPI

export default booksSlice.reducer