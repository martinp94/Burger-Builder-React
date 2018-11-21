import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utility'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const initialState = {
    ingredients: null,
    totalPrice: 0,
    purchasable: false,
    error: false
}

const reducer = (state = initialState, action) => {
    let newIngredients = {}
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            newIngredients = {
                ...state.ingredients,
                [action.payload.ingredient]: state.ingredients[action.payload.ingredient] + 1
            }
            return updatedObject(state, {
                ingredients: newIngredients,
                totalPrice: +(state.totalPrice + INGREDIENT_PRICES[action.payload.ingredient]),
                purchasable: Object.values({ ...newIngredients }).reduce((acc, el) => acc + el, 0) > 0
            })
        case actionTypes.REMOVE_INGREDIENT:
            newIngredients = {
                ...state.ingredients,
                [action.payload.ingredient]: state.ingredients[action.payload.ingredient] === 0 ? 0 : state.ingredients[action.payload.ingredient] - 1
            }
            return updatedObject(state, {
                ingredients: newIngredients,
                totalPrice: +(state.totalPrice - INGREDIENT_PRICES[action.payload.ingredient]),
                purchasable: Object.values({ ...newIngredients }).reduce((acc, el) => acc + el, 0) > 0
            })
        case actionTypes.SET_INGREDIENTS:
            newIngredients = {
                ...state.ingredients,
                ...action.payload.ingredients
            }
            return updatedObject(state, { 
                ingredients: newIngredients,
                totalPrice: Object.keys(newIngredients).reduce((acc, ing) => acc + (INGREDIENT_PRICES[ing] * newIngredients[ing]), 0),
                purchasable: Object.values({ ...newIngredients }).reduce((acc, el) => acc + el, 0) > 0

            })
        case actionTypes.FETCH_INGREDIENTS_FAILED: 
            return updatedObject(state, { error: true })
        default:
            return state;
    }
}

export default reducer