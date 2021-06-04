import React, { useEffect, useState } from "react";
import { Col, Form, Row, Button} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../actions/userActions";


const ProfileScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState()

  const userDetails = useSelector((state) => state.userDetails);
  const userlogin = useSelector((state) => state.userlogin);
  const userUpdateProfile= useSelector(state => state.userUpdateProfile)

  const {success}= userUpdateProfile;
  const { loading, error, user } = userDetails;
  const {userInfo}= userlogin
  
  const dispatch = useDispatch();

  useEffect(() => {
    const { userInfo } = userlogin;
    if (!userInfo) {
      history.push("/signin");
    } else {
      if (!user.name) {
        dispatch(getUserDetails());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, userInfo, user, dispatch]);

  const onSubmitHandler=(e)=>{
    e.preventDefault()
    if(password !== confirmPassword){
      alert('Password Not Matching')
    }else{
    }
      dispatch(updateUserProfile({_id: user._id, name, email, password}))
    }


  return (
    <Row>

      <Col md={3}>
        <h2>User Profile</h2>
        {error && <h3>{error}</h3>}
        {loading && <h3>loading...</h3>}
        {success && <h3>Profile Updated</h3>}
        <Form onSubmit={onSubmitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="Old Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default ProfileScreen;