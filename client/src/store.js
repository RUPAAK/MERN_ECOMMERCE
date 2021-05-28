import {combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension";

import {productListReducer,productDetailReducer} from './reducers/productReducers'
import {cartReducer} from './reducers/cartReducers'
import {userLoginReducer, userRegisterReducer} from './reducers/userReducers'

const reducer= combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    userlogin: userLoginReducer,
    userRegister: userRegisterReducer,
})

const userFromStroage=localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')): null
const cartFromStorage= localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')): []

const initialState={
  cart:{
    cartItems: cartFromStorage
  },
  userlogin:{
    userInfo: userFromStroage
  }
}
const middleware= [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );

export default store