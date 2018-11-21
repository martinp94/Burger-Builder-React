import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {

    cancelHandler = () => {
        this.props.history.goBack()
    }

    continueHandler = () => {
        this.props.history.replace('/checkout/contactdata')
    }

    render() {
        let summary = <Redirect to="/burgerbuilder" />
        if(this.props.ingredients) {
            summary = <div>
                        <CheckoutSummary 
                            ingredients={this.props.ingredients}
                            clickCancel={this.cancelHandler}
                            clickContinue={this.continueHandler} />
                        <Route 
                            path={this.props.match.path + '/contactdata'} 
                            component={ContactData} />
                    </div> 
        }
        return summary
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients
    }
}

export default connect(mapStateToProps)(Checkout) 