import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const addIngredient = name => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: {
            ingredient: name
        }
    }
}

export const removeIngredient = name => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload: {
            ingredient: name
        }
    }
}

export const setIngredients = ingredients => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        payload: {
            ingredients
        }
    }
}

export const fetchIngredientsFailed = error => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
        payload: {
            error
        }
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then(({data}) => {
                dispatch(setIngredients(data))
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed(error))
            })
    }
}