import React from 'react'
import { Navbar, Nav, Row, Col, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userActions";


const Header = () => {
    const userlogin = useSelector(state => state.userlogin)
    const { userInfo } = userlogin

    const dispatch = useDispatch()

    const logoutHandler=()=>{
        dispatch(logout())
    }
    return (
        <header>
            <Navbar bg="secondary" expand="lg">
                <Row className="text-center m-auto">
                    <Col className="mx-5">
                        <LinkContainer to="/">
                            <Navbar.Brand >PASAL</Navbar.Brand>
                        </LinkContainer>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    </Col>
                    <Col className="mx-5">
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav>
                                <LinkContainer to="/">
                                    <Nav.Link>HOME</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/cart">
                                    <Nav.Link>CART</Nav.Link>
                                </LinkContainer>
                                {userInfo ?
                                    (<NavDropdown title={userInfo.name} id="username">
                                        <LinkContainer to="/profile">
                                            <NavDropdown.Item>Profile</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler}>
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>) : (
                                    <LinkContainer to="/signin">
                                        <Nav.Link>
                                        <i className="fas fa-user"></i> Sign In
                                        </Nav.Link>
                                    </LinkContainer>)
                                }
                                
                            </Nav>
                        </Navbar.Collapse>
                    </Col>

                </Row>
            </Navbar>
        </header>
    )
}

export default Header
