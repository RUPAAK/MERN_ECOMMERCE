import React from 'react'
import { Navbar, Nav , Row, Col} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Header = () => {
    return (
        <header>
            <Navbar bg="secondary" expand="lg">
                <Row className="text-center m-auto">
                    <Col className="mx-5">
                    <Navbar.Brand href="/" >PASAL</Navbar.Brand>
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
                        <LinkContainer to='/signup'>
                            <Nav.Link >SIGNUP</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
                    </Col>

                </Row>
            </Navbar>
        </header>
    )
}

export default Header
