import { createSlice } from "@reduxjs/toolkit";

const initialState = {
        isOpeningUnsplash: false,
        searchKeyword: '',
        isClickingButton: false,
        photos: []
}
const imageSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {
        openUnsplash: (state, action) => {
            for (const inputId in state){
                if (inputId === action.payload.inputId) {
                    state[inputId].isOpeningUnsplash = true
                } else {
                    state[inputId].isOpeningUnsplash = false
                }
                }
        },
        searchKeyword: (state, action) => {
            for (const inputId in state){
                if (inputId === action.payload.inputId) {
                  state[inputId].searchKeyword = action.payload.value
                  state[inputId].isClickingButton = false
                } 
            } 
        },
        searching: (state, action) => {
            for (const inputId in state){
                if (inputId === action.payload.inputId) {
                    state[inputId].isClickingButton = true
                }
            }
        },
        photosAdded: (state, action) => {
            for (const inputId in state){
                if (inputId === action.payload.inputId) {
                    state[inputId].photos = action.payload.photos
                }
            }
        }

    }
})

export const { openUnsplash, searchKeyword, searching, photosAdded } = imageSlice.actions
export default imageSlice.reducer