import { combineReducers } from 'redux';
import formReducer from './formReducer';
import imageReducer from './imageReducer';
import searchReducer from './searchReducer';

const rootReducers = combineReducers({
    form: formReducer,
    image: imageReducer,
    search: searchReducer
})

export default rootReducers