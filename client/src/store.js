import {combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension";

import {productListReducer,productDetailReducer} from './reducers/productReducers'
import {cartReducer} from './reducers/cartReducers'

const reducer= combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer,
    cart: cartReducer
})

const cartFromStorage= localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')): []

const initialState={
  cart:{
    cartItems: cartFromStorage
  }
}
const middleware= [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );

export default store