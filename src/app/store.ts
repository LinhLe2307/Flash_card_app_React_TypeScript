import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../features/flashcardSlice"
import imageReducer from "../features/imageSlice"

export const store = configureStore({
    reducer: {
        form: formReducer,
        image: imageReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch