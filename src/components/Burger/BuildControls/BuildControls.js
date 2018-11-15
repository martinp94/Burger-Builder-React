import React from 'react'

import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'



const buildControls = (props) => {
    
    const controls = [
        { label: 'Salad', type: 'salad' },
        { label: 'Meat', type: 'meat' },
        { label: 'Cheese', type: 'cheese' },
        { label: 'Bacon', type: 'bacon' },
    ]

    return (
        <div className={classes.BuildControls}>
            <p>Total price: {props.price} &#8364;</p>
            {controls.map(control => (
                <BuildControl 
                    key={control.type}
                    label={control.label}
                    clickAdd={props.clickAdd}
                    clickRemove={props.clickRemove}
                    disabled={props.disabledIngredients[control.type]} />
            ))}
            <button 
                disabled={!props.purchasable}
                className={classes.OrderButton}
                onClick={props.clickOrderButton}>ORDER NOW</button>
        </div>
    )
}

export default buildControls;