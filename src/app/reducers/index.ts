import { combineReducers } from "redux";
import flashcardReducer from "./flashcardReducer";
import imageReducer from "./imageReducer";

const appReducer = combineReducers({
    form: flashcardReducer,
    image: imageReducer
})

// this is for reset the state after submitting
const rootReducers = (state, action) => {
    return appReducer(state, action)
}

export default rootReducers