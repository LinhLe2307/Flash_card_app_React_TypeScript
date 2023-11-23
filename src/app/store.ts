import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../features/formSlice"
import imageReducer from "../features/imageSlice"

export const store = configureStore({
    reducer: {
        form: formReducer,
        image: imageReducer
    }
})

store.subscribe(() => {
    const storeNow = store.getState()
    console.log(storeNow)
  })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch