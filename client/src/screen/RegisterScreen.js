import React, {useState, useEffect} from 'react'
import {Row, Col, Form, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import {register} from '../actions/userActions'
import {useDispatch, useSelector} from 'react-redux'

const RegisterScreen = ({history}) => {
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [confirmpassword, setconfirmpassword] = useState('')

    const userRegister= useSelector(state=> state.userRegister)
    const {loading, error, userInfo}= userRegister
    const dispatch = useDispatch()


    const onSubmitHandler=(e)=>{
        e.preventDefault();
        if(password !== confirmpassword){
            alert('Password Not Matching')
        }else{
            dispatch(register(name, email, password))
        }
    }
    useEffect(()=>{
        if(userInfo){
            history.push('/signin');
        }
    })
    return (
        <>
            <FormContainer>
            <Form onSubmit={onSubmitHandler}>
                <h1>Sign Up</h1>
                {loading && <h3>Loading...</h3>}
                {error && <h3>{error}</h3>}

                <Form.Group>
                    <Form.Label>Name</Form.Label>
                        <Form.Control onChange={(e)=> setname(e.target.value)} type="name" placeholder="Enter Name">
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                        <Form.Control onChange={(e)=> setemail(e.target.value)} type="email" placeholder="Enter Email">
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                        <Form.Control onChange={(e)=> setpassword(e.target.value)} type="password" placeholder="Enter Password">
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                        <Form.Control onChange={(e)=> setconfirmpassword(e.target.value)} type="password" placeholder="onfirm Password">
                    </Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">
                        Register
                </Button>

                <Row className="py-3">
                    <Col>
                        Already Signup?<Link to={`/signin`}> Login</Link> Here
                    </Col>
                </Row>
            </Form>
            </FormContainer>
        </>
    )
}

export default RegisterScreen
