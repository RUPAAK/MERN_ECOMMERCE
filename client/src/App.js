import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screen/HomeScreen'
import {Container} from 'react-bootstrap'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import './App.css'

const App = () => {
    return (
        <Router>
            <Header/>
            <main style={{minHeight: '87vh'}} className="py-3">
                <Container>
                    <Route exact path='/' component={HomeScreen}></Route>
                </Container>
            </main>
            <Footer/>
        </Router>
    )
}

export default App
