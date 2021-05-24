import React, {useEffect} from 'react'
import {addToCart, removeFromCart} from '../actions/cartActions'
import { Col, ListGroup, Row, Image, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";


const CartScreen = ({match, location}) => {
    const qty= location.search? Number(location.search.split('=')[1]): 1
    const productId= match.params.id
    const dispatch = useDispatch()
    const cart= useSelector((state)=> state.cart)
    const {cartItems}= cart

    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler=(id)=>{
        dispatch(removeFromCart(id))
    }

    return (
        <>
            <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <h2>
            You Cart is Empty <Link to="/">Go Back</Link>
          </h2>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={item.image}
                      lat={item.name}
                      fluid
                      rounded
                    ></Image>
                  </Col>

                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>

                  <Col md={2}>${item.price}</Col>

                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>

                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={()=> removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
    </Row>
        </>
    )
}

export default CartScreen

