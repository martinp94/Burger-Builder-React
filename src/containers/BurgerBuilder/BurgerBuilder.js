import React, { Component } from 'react'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import withErrorHandler from '../withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import { connect } from 'react-redux'
import * as burgerBuilderActions from '../../store/actions/burgerBuilder'

class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        modalOpen: false
    }

    updatePurchasing = (purchasing) => {
        this.setState({
            purchasing,
            modalOpen: true
        })
    }

    continuePurchasingHandler = () => {
        this.props.history.push('/checkout')
        this.props.history.goForward()
    }

    orderButtonHandler = () => {
        this.setState({ 
            purchasing: true 
        })
    }

    componentDidMount() {
        this.props.initIngredients()
    }

    render() {
        
        if(this.props.ingredients) {
            const disabledIngredients = { ...this.props.ingredients }
            for(let ingredient in disabledIngredients)
                disabledIngredients[ingredient] = disabledIngredients[ingredient] <= 0 ? true : false
            
            return (
                <React.Fragment>
                    <Modal 
                        show={this.state.purchasing && this.state.modalOpen}
                        clickBackdrop={() => this.updatePurchasing(false)}>
                        <OrderSummary 
                            ingredients={this.props.ingredients}
                            clickContinue={this.continuePurchasingHandler}
                            clickCancel={() => this.updatePurchasing(false)}
                            price={this.props.totalPrice} /> 
                    </Modal>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        clickAdd={this.props.onIngredientAdd}
                        clickRemove={this.props.onIngredientRemove}
                        disabledIngredients={disabledIngredients}
                        price={this.props.totalPrice.toFixed(2)}
                        purchasable={this.props.purchasable}
                        clickOrderButton={() => this.updatePurchasing(true)} />
                </React.Fragment>
            )
        } else if(this.props.error) {
            return <h1>{this.props.error}</h1>
        } else {
            return <h1>Loading...</h1>
        }
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        purchasable: state.burgerBuilder.purchasable,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdd: ing => dispatch(burgerBuilderActions.addIngredient(ing)),
        onIngredientRemove: ing => dispatch(burgerBuilderActions.removeIngredient(ing)),
        initIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))