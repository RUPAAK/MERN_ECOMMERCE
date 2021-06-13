import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getOrderDetails} from '../actions/orderActions'

const OrderScreen = ({match}) => {
    const orderId= match.params.div
    const dispatch = useDispatch()
    const orderDetails= useSelector(state=> state.orderDetails)
    const {order, loading, error}= orderDetails
    
    const itemPrice= (o)=>{
        return o.cartItems.reduce((acc, item)=> acc +item.price *item.qty, 0).toFixed(2)
    }
    useEffect(() => {
        dispatch(getOrderDetails(orderId))
    }, [match, dispatch, orderId])


    return (
        <>
            {loading? (<h3>Loading</h3>): error?(<h3>{error}</h3>):(
                <h1>hi</h1>
            )}
        </>
    )
}

export default OrderScreen
