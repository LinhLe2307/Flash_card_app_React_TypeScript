import { createSlice } from "@reduxjs/toolkit";
import { ImageState } from "../shared/types/imageTypes";

const initialState: ImageState = {}
const imageSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {
        openUnsplash: (state, action) => {
            // state = action.payload.initialInputs
            for (const inputId in action.payload.initialInputs){
                if (inputId === action.payload.inputId) {
                    state[inputId] = {
                        isOpeningUnsplash: true,
                        searchKeyword: '',
                        isClickingButton: false,
                        photos: []
                    }
                } else {
                    state[inputId] = {
                        isOpeningUnsplash: false,
                        searchKeyword: '',
                        isClickingButton: false,
                        photos: []
                    }
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
        },
        resetImage: (state) => {
            state = {}
        }
    }
})

export const { openUnsplash, searchKeyword, searching, photosAdded, resetImage } = imageSlice.actions
export default imageSlice.reducer