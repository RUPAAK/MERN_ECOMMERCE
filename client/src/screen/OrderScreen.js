import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getOrderDetails} from '../actions/orderActions'
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";


const OrderScreen = ({match}) => {
    const orderId= match.params.id
    const dispatch = useDispatch()
    const orderDetails= useSelector(state=> state.orderDetails)
    const {order, loading, error}= orderDetails
    
    const itemPrice= (o)=>{
        return o.orderItems.reduce((acc, item)=> acc +item.price *item.qty, 0).toFixed(2)
    }
    useEffect(() => {
        dispatch(getOrderDetails(orderId))
    }, [match, dispatch, orderId])


    return (
        <>
            {loading? (<h3>Loading</h3>): error?(<h3>{error}</h3>):(
                <>
                <h1>Order {orderId}</h1>
                <Row>
                  <Col md={8}>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                          <strong>Name:</strong> {order.user.name}
                        </p>
          
                        <p>
                          <strong>Email:</strong>
                          <a href={`mailto:${order.user.email}`}> {order.user.email} </a>
                        </p>
          
                        <p>
                          <strong>Address: </strong>
                          {order.shippingAddress.address}, {order.shippingAddress.city},
                          {order.shippingAddress.postalCode},{" "}
                          {order.shippingAddress.country}
                        </p>
          
                        {order.isDelivered ? (
                          <h3>
                            Delivered on: {order.deliveredAt}
                            </h3>
                        ) : (
                            <h3>
                            Not Delivered
                            </h3>
                        )}
                      </ListGroup.Item>
          
                      <br></br>
          
                      <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                          <strong>Method:</strong>
                          {order.paymentMethod}
                        </p>
          
                        {order.isPaid ? (
                          <h3 >Paid on: {order.paidAt}</h3>
                        ) : (
                          <h3 >Not Paid</h3>
                        )}
                      </ListGroup.Item>
          
                      <br></br>
          
                      <ListGroup.Item>
                        <h2>Order Items:</h2>
                        {order.orderItems.length === 0 ? (
                          <h3 >Order is Empty</h3>
                        ) : (
                          <ListGroup variant="flush">
                            {order.orderItems.map((item, index) => (
                              <ListGroup.Item key={index}>
                                <Row>
                                  <Col md={1}>
                                    <Image
                                      src={item.image}
                                      alt={item.name}
                                      fluid
                                      rounded
                                    />
                                  </Col>
          
                                  <Col>
                                    <Link to={`/product/${item.product}`}>
                                      {item.name}
                                    </Link>
                                  </Col>
          
                                  <Col md={4}>
                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                  </Col>
                                </Row>
                              </ListGroup.Item>
                            ))}
                          </ListGroup>
                        )}
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
          
                  <Col md={4}>
                    <Card>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <h2>Order Summary</h2>
                        </ListGroup.Item>
          
                        <ListGroup.Item>
                          <Row>
                            <Col>Items</Col>
                            <Col> ${itemPrice(order)}</Col>
                          </Row>
                        </ListGroup.Item>
          
                        <ListGroup.Item>
                          <Row>
                            <Col>Shipping</Col>
                            <Col> ${order.shippingPrice}</Col>
                          </Row>
                        </ListGroup.Item>
          
                        <ListGroup.Item>
                          <Row>
                            <Col>Tax</Col>
                            <Col> ${order.taxPrice}</Col>
                          </Row>
                        </ListGroup.Item>
          
                        <ListGroup.Item>
                          <Row>
                            <Col>Total</Col>
                            <Col> ${order.totalPrice}</Col>
                          </Row>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card>
                  </Col>
                </Row>
              </>
            )}
        </>
    )
}

export default OrderScreen
