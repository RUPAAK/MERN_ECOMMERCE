import React, { useEffect, useState } from 'react'
import { Col, Form, Row } from "react-bootstrap";
import {useDispatch, useSelector} from 'react-redux'
import {profileDetails} from '../actions/userActions'

const ProfileScreen = ({history}) => {
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const userDetail= useSelector(state=> state.userDetail)
    const userlogin= useSelector(state=> state.userlogin)

    const {loading, error, user}= userDetail
    const {userInfo}= userlogin

    const dispatch = useDispatch()

    useEffect(()=>{
        if(!userInfo){
            history.push('/signin')
        }else{
            dispatch(profileDetails())
            if(user){
                setname(user.name)
            }
        }

    }, [dispatch, history, user, userInfo])

    return (
        <>
            <Row>
                <Col md={3}>
                    <h2>User Profile</h2>

                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="name" placeholder="Enter Name" value={name}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter Email" value={email}></Form.Control>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </>
    )
}

export default ProfileScreen
