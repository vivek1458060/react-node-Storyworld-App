import thunk from 'redux-thunk';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import authReducer from '../reducers/auth';
import storiesReducer from '../reducers/stories';
import modalReducer from '../reducers/modal';

const composeEnhacers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
            stories: storiesReducer,
            modal: modalReducer
        }),
        composeEnhacers(applyMiddleware(thunk))
    )
    return store;
}