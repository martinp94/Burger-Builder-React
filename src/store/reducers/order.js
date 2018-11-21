import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utility'

const initialState = {
    orders: null,
    loading: false,
    purchased: false
}

const ordersToArray = orders => {
    const newOrders = []
    for(const order in orders) {
        newOrders.push({
            id: order,
            ingredients: orders[order].ingredients,
            orderData: orders[order].orderData,
            price: orders[order].price
        })
    }
    return newOrders
}

const orderReducer = (state = initialState, action) => {
    switch(action.type) {

        // PURCHASING ORDERS
        case actionTypes.PURCHASE_ORDER_START:
            return updatedObject(state, { loading: true })
        case actionTypes.PURCHASE_ORDER_SUCCESS: 
            return updatedObject(state, 
                { 
                    loading: false,
                    orders: ordersToArray(action.payload.orders),
                    purchased: true
                })
        case actionTypes.PURCHASE_ORDER_FAIL: 
            return updatedObject(state, { loading: false }) 
        case actionTypes.UPDATE_PURCHASED:
            return updatedObject(state, {
                purchased: action.payload.purchased
            })
        
        // FETCHING ORDERS
        case actionTypes.FETCH_ORDERS_START:
            return updatedObject(state, { loading: true })
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return updatedObject(state, 
                { 
                    loading: false,
                    orders: ordersToArray(action.payload.orders)
                })
        case actionTypes.FETCH_ORDERS_FAIL:
        return updatedObject(state, { loading: false })
        
        default:
            return state
    }
}

export default orderReducer