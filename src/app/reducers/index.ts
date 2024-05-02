import { combineReducers } from 'redux';
import formReducer from './formReducer';
import imageReducer from './imageReducer';

const rootReducers = combineReducers({
    form: formReducer,
    image: imageReducer
})

export default rootReducers