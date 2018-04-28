import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as search from './search/reducer';
import thunk from 'redux-thunk';
let store = createStore(combineReducers({ ...search }), composeWithDevTools(applyMiddleware(thunk)));
export default store;
