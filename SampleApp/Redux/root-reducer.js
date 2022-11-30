import {combineReducers} from 'redux';
import {reducer as userReducer} from './reducers';

const reducer = combineReducers({
    user:userReducer,
})

export {reducer};