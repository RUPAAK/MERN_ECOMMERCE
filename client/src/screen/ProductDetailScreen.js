import React, { useEffect, useState } from 'react'
import { Row, Image, Col, ListGroup, Card, Button, Form } from "react-bootstrap";
import {Link} from 'react-router-dom'
import Rating from '../components/Rating'
import { getProductDetail } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux';


const ProductDetailScreen = ({match, history}) => {
    const [qty, setqty] = useState(1)
    const dispatch = useDispatch()

    const productDetail= useSelector(state=> state.productDetail)

    const{loading, error, product} = productDetail
    useEffect(()=>{
        dispatch(getProductDetail(match.params.id))
    }, [match.params.id, dispatch])

    const addToCartHandler=()=>{
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    return (
        <>
            <Link className="btn btn-light my-3" to="/">
                Go Back
      </Link>
            {loading ? (
                <h1>Loading</h1>
            ) : error ? (
                <h1>Error</h1>
            ) : (
                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name}></Image>
                    </Col>

                    <Col md={3}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>

                            <ListGroup.Item variant="flush">
                                <Rating
                                    value={product.rating}
                                    text={`(${product.numReviews} reviews)`}
                                    color="red"
                                ></Rating>
                            </ListGroup.Item>

                            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                            <ListGroup.Item>
                                Description: ${product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>

                    <Col md={3}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>

                                        <Col>
                                            <strong>${product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>

                                        <Col>
                                            <strong>
                                                {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                                            </strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Choose Quantity:</Col>

                                        <Col>
                                            <Form.Control
                                                as="select"
                                                value={product.qty}
                                                onChange={(e)=> setqty(e.target.value)}
                                            >
                                                {[...Array(product.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Button
                                        className="btn-block"
                                        type="button"
                                        disabled={product.countInStock === 0}
                                        onClick={addToCartHandler}
                                    >
                                        Add to Cart
                  </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}
        </>
    )
}

export default ProductDetailScreen
