import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productListReducer,
  productDetailsReducer,
} from './reducers/productReducers';
import { joinReducer } from './reducers/joinReducers';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  join: joinReducer,
});

const joinItemFromStorage = localStorage.getItem('joinItems')
  ? JSON.parse(localStorage.getItem('joinItems'))
  : [];

const initialState = {
  join: { joinItems: joinItemFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
