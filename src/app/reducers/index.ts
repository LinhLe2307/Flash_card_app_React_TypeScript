import { combineReducers } from "redux";
import formReducer from "./formReducer";
import imageReducer from "./imageReducer";

const appReducer = combineReducers({
    form: formReducer,
    image: imageReducer
})

// this is for reset the state after submitting
const rootReducers = (state, action) => {
    return appReducer(state, action)
}

export default rootReducers