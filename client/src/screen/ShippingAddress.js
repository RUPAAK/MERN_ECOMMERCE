import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveShippingMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingAddress = ({ history }) => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch()

    const onSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingMethod({ address, city, postalCode, country })        )
        history.push('/payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <br/>
            <br/>
            <Form onSubmit={onSubmitHandler}>
                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control onChange={(e)=> setAddress(e.target.value)} type="text" placeholder="Enter Address" value={address} required  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control onChange={(e)=> setCity(e.target.value)} type="text" placeholder="Enter City" value={city} required ></Form.Control>
                </Form.Group>
                <Form.Group controlId="postalCode">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control onChange={(e)=> setPostalCode(e.target.value)} type="text" placeholder="Enter Postal Code" value={postalCode} required ></Form.Control>
                </Form.Group>
                <Form.Group controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control onChange={(e)=> setCountry(e.target.value)} type="text" placeholder="Enter Country" value={country} required ></Form.Control>
                </Form.Group>
                <Button type="submit" varient="primary">Continue</Button>
            </Form>

        </FormContainer>
    )
}

export default ShippingAddress
