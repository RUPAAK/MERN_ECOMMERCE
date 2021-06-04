import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screen/HomeScreen'
import ProductDetailScreen from './screen/ProductDetailScreen'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import CartScreen from './screen/CartScreen'
import LoginScreen from './screen/LoginScreen'
import RegisterScreen from './screen/RegisterScreen'
import ProfileScreen from './screen/ProfileScreen'
import ShippingAddress from './screen/ShippingAddress'
import PlaceOrderScreen from './screen/PlaceOrderScreen'
import PaymentScreen from "./screen/PaymentScreen";
import {Container} from 'react-bootstrap'

import './App.css'


const App = () => {
    return (
        <Router>
            <Header/>
            <main style={{minHeight: '87vh'}} className="py-3">
                <Container>
                    <Route exact path='/' component={HomeScreen}></Route>
                    <Route path='/product/:id' component={ProductDetailScreen}></Route>
                    <Route path='/cart/:id?' component={CartScreen}></Route>
                    <Route path='/signin' component={LoginScreen}></Route>
                    <Route path='/register' component={RegisterScreen}></Route>
                    <Route path='/profile' component={ProfileScreen}></Route>
                    <Route path='/shipping' component={ShippingAddress}></Route>
                    <Route path="/placeorder" component={PlaceOrderScreen}></Route>
                    <Route path="/payment" component={PaymentScreen}></Route>
                </Container>
            </main>
            <Footer/>
        </Router>
    )
}

export default App
