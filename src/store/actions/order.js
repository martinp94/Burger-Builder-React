import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

// PURCHASING

export const purchaseOrderSuccess = orders => {
    return {
        type: actionTypes.PURCHASE_ORDER_SUCCESS,
        payload: {
            orders
        }
    }
}

export const purchaseOrderFail = error => {
    return {
        type: actionTypes.PURCHASE_ORDER_FAIL,
        payload: {
            error
        }
    }
}

export const purchaseOrderStart = () => {
    return {
        type: actionTypes.PURCHASE_ORDER_START
    }
}

export const updatePurchased = purchased => {
    return {
        type: actionTypes.UPDATE_PURCHASED,
        payload: {
            purchased
        }
    }
}

export const tryPurchase = order => {
    return dispatch => {
        dispatch(purchaseOrderStart())
        axios.post('/orders.json', order)
            .then( ({data}) => {
                axios.get('orders.json').then( ({ data }) => dispatch(purchaseOrderSuccess(data)) )
            })
            .catch( error => {
                dispatch(purchaseOrderFail(error))
            })
    }
}

// FETCHING ORDERS

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrdersFail = error => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        payload: {
            error
        }
    }
}

export const fetchOrdersSuccess = orders => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        payload: {
            orders
        }
    }
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart())
        axios.get('orders.json')
            .then( ({ data }) => dispatch(fetchOrdersSuccess(data)) )
            .catch( error => {
                dispatch(fetchOrdersFail(error))
            })
    }
}