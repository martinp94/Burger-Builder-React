import React from 'react'

import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return <li key={igKey}><span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}</li>
        })
    return (
        <React.Fragment>
            <h3>Your order</h3>
            <p>A delicious burget with the following ingredients:</p>
            {ingredientSummary}
            <p><strong>Total price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button 
                click={props.clickContinue}
                type='success'
                enabled={true} >Continue</Button>
            <Button 
                click={props.clickCancel}
                type='danger'
                enabled={true} >Cancel</Button>
        </React.Fragment>
    )
    
}

export default orderSummary