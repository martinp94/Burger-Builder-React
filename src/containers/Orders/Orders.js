import React, { Component } from 'react'
import axios from '../../axios-orders'
import { connect } from 'react-redux'

import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../withErrorHandler/withErrorHandler'
import * as orderActions from '../../store/actions/order'

class Orders extends Component {

    componentDidMount() {
        if(!this.props.orders)
            this.props.fetchOrders()

        if(this.props.purchased)
            this.props.updatePurchased(false)
    }

    render() {

        const orders = !this.props.orders ? <Spinner /> : (
            this.props.orders.map(order => {
                return <Order 
                    key={order.id}
                    order={order} />
            })
        )

        return orders
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        purchased: state.order.purchased
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: () => dispatch(orderActions.fetchOrders()),
        updatePurchased: (purchased) => dispatch(orderActions.updatePurchased(purchased))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios)) 