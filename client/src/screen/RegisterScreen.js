import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../actions/userActions";

const ProfileScreen = ({ history }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const userlogin = useSelector((state) => state.userlogin);
    const userDetails = useSelector(state => state.userDetails)

    const { loading, error, user } = userDetails;

    const { userInfo } = userlogin;

    const dispatch = useDispatch();

    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
        } else {
            if (!user.name) {
                dispatch(getUserDetails());
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [history, userInfo, user, dispatch]);


    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>

                <Form>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="name"
                            paceholde="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            paceholde="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    );
};

export default ProfileScreen;