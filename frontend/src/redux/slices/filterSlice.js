import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    title: '',
    author: '',
    onlyFavorite: false
}

const filterSlice = createSlice({
    name: 'filter',
    initialState: initialState,
    reducers: {
        setTitleFilter: (state, action) => {
            return { ...state, title: action.payload }
            //state.title = action.payload можно мутировать state в при использовании Slices, 
            //т.к. под капотом библиотека immer обработает мутированный объект и веренет новое сотояние
        },
        setAuthorFilter: (state, action) => {
            return { ...state, author: action.payload }
        },
        setOnlyFavoriteFilter: (state) => {
            state.onlyFavorite = !state.onlyFavorite
        },
        resetFilters: () => {
            return initialState
        }
    }

})

export const {
    setTitleFilter,
    setAuthorFilter,
    setOnlyFavoriteFilter,
    resetFilters
} = filterSlice.actions

export const selectAuthorFilter = (state) => state.filter.author
export const selectTitleFilter = (state) => state.filter.title
export const selectOnlyFavoriteFilter = (state) => state.filter.onlyFavorite

export default filterSlice.reducer