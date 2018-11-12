import React, { Component } from 'react'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            meat: 0,
            cheese: 0
        },
        totalPrice: 0,
        purchasable: false
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

    render() {

        const disabledIngredients = { ...this.state.ingredients }
        for(let ingredient in disabledIngredients)
            disabledIngredients[ingredient] = disabledIngredients[ingredient] <= 0 ? true : false

        return (
            <React.Fragment>
                <Modal />
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    clickAdd={this.addIngredientHandler}
                    clickRemove={this.removeIngredientHandler}
                    disabledIngredients={disabledIngredients}
                    price={this.state.totalPrice.toFixed(2)}
                    purchasable={this.state.purchasable} />
            </React.Fragment>
        )
    }
}

export default BurgerBuilder;