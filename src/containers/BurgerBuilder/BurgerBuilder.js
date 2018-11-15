import React, { Component } from 'react'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../containers/withErrorHandler/withErrorHandler'


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 0,
        purchasable: false,
        purchasing: false,
        loading: false,
        modalOpen: false
    }

    addIngredientHandler = (ingredientKey) => {
        const ingredients = { ...this.state.ingredients}
        let totalPrice = this.state.totalPrice

        ingredients[ingredientKey]++
        totalPrice += INGREDIENT_PRICES[ingredientKey]

        this.setState({
            ingredients,
            totalPrice
        }, () => this.updatePurchasable())
    }

    removeIngredientHandler = (ingredientKey) => {
        const ingredients = { ...this.state.ingredients}
        let totalPrice = this.state.totalPrice;

        if(ingredients[ingredientKey] <= 0)
            return

        ingredients[ingredientKey]--
        totalPrice -= INGREDIENT_PRICES[ingredientKey]

        this.setState({
            ingredients,
            totalPrice
        }, () => this.updatePurchasable())  
    }

    updatePurchasable() {
        const sumIngredients = Object.values({ ...this.state.ingredients }).reduce((acc, el) => {
            return acc + el
        }, 0)

        this.setState({
            purchasable: sumIngredients > 0
        })
    }

    updatePurchasing = (purchasing) => {
        this.setState({
            purchasing,
            modalOpen: true
        })
    }

    continuePurchasingHandler = () => {

        this.setState({ loading: true })

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Martin',
                address: {
                    street: 'Plageeeeeeeeeeeenti',
                    zipCode: '85300',
                    country: 'Montenegro'
                },
                email: 'martin@brao.me'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ 
                    loading: false, 
                    modalOpen: false
                })
            })
            .catch(error => {
                this.setState({ 
                    loading: false,
                    modalOpen: false
                })
            })
    }

    orderButtonHandler = () => {
        this.setState({ 
            purchasing: true
        })
    }

    componentDidMount() {
        this.setState({ loading: true })
        axios.get('/ingredients.json')
            .then(({data}) => {
                this.setState({ ingredients: data,
                                loading: false })
                this.updatePurchasable()
            })
            .catch(error => {
                this.setState({ loading: false })
            })
    }

    render() {


        if(this.state.ingredients) {
            const disabledIngredients = { ...this.state.ingredients }
            for(let ingredient in disabledIngredients)
                disabledIngredients[ingredient] = disabledIngredients[ingredient] <= 0 ? true : false
            
            return (
                <React.Fragment>
                
                    <Modal 
                        show={this.state.purchasing && this.state.modalOpen}
                        clickBackdrop={() => this.updatePurchasing(false)}>
                        {!this.state.loading ? <OrderSummary 
                            ingredients={this.state.ingredients}
                            clickContinue={this.continuePurchasingHandler}
                            clickCancel={() => this.updatePurchasing(false)}
                            price={this.state.totalPrice} /> : <Spinner />}
                    </Modal>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        clickAdd={this.addIngredientHandler}
                        clickRemove={this.removeIngredientHandler}
                        disabledIngredients={disabledIngredients}
                        price={this.state.totalPrice.toFixed(2)}
                        purchasable={this.state.purchasable}
                        clickOrderButton={() => this.updatePurchasing(true)} />
                </React.Fragment>
            )
            
            
        } else {
            return this.state.loading ? <div style={{ margin: '300px' }}><Spinner /></div> : null
        } 
    }
}

export default withErrorHandler(BurgerBuilder, axios)