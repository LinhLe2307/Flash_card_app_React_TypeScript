import { combineReducers } from "redux"; 
import flashcardReducer from "./flashcardReducer";
import imageReducer from "./imageReducer";
import { ImageAction } from "../../shared/types/imageTypes";
import { FormAction } from "../../shared/types/formTypes";

const rootReducers = combineReducers({
    form: flashcardReducer,
    image: imageReducer
})

export default rootReducers