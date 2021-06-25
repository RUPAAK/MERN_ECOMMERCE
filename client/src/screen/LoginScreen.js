import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { login } from '../actions/userActions'

const LoginScreen = ({ history, location }) => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const dispatch = useDispatch()
    const userlogin = useSelector((state) => state.userlogin);
    const { loading, error, userInfo } = userlogin

    const redirect = location.search ? location.search.split("=")[1] : "/"

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [redirect, history, userInfo])

    const onSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <>
            <FormContainer>
                <h1>Sign In</h1>
                {error && <h1>{error}</h1>}
                {loading && <h1>Loading...</h1>}

                <Form onSubmit={onSubmitHandler}>
                    <Form.Group>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e) => setemail(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setpassword(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Button type="submit" >Login</Button>
                </Form>

                <Row className="py-3">
                    <Col>
                        New Customer? <Link to={`/register`}> Register</Link>
                    </Col>
                </Row>
            </FormContainer>
        </>
    )
}

export default LoginScreen
