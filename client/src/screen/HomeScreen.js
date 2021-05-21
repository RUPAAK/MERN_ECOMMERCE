import React, { useEffect } from 'react'
import { getAllProducts } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'

const HomeScreen = () => {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList
    console.log(products)

    useEffect(() => {
        dispatch(getAllProducts())
    }, [dispatch])

    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {loading ? (<h1>Loading...</h1>) : error ? (<h1>Error..</h1>) : (
                    products.map((product) => {
                        return (
                            <Col sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        )
                    })
                )}
            </Row>
        </>
    )
}

export default HomeScreen
