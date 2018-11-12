import React from 'react'

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return <li>{igKey}: {props.ingredients[igKey]}</li>
        })
    return (
        <React.Fragment>
            <h3>Your order</h3>
            <p>A delicious burget with the following ingredients:</p>
            {ingredientSummary}
        </React.Fragment>
    )
    
}

export default orderSummary