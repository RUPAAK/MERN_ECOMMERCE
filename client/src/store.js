import {combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension";

import {productListReducer,productDetailReducer} from './reducers/productReducers'
import {cartReducer} from './reducers/cartReducers'
import {userLoginReducer, userRegisterReducer, userDetailsReducer, userDetailsUpdateReducer} from './reducers/userReducers'
import {orderCreateReducer, orderDetailsReducer} from './reducers/orderReducers'

const reducer= combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    userlogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userDetailsUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
})

const userFromStroage=localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')): null
const cartFromStorage= localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')): []
const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : { paymentMethod: null };

const initialState={
  cart:{
    cartItems: cartFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage
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