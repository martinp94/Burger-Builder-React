import React from 'react'

import classes from './Order.css'

const order = (props) => {
    const ingredients = Object.keys(props.order.ingredients).map(ing => <span 
                                                                            key={ing}
                                                                            style={{ textTransform: 'capitalize' }}>{ing} ({props.order.ingredients[ing]}) </span>)
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredients}</p>
            <p>Price <strong>EUR {props.order.price}</strong></p>
        </div>
    )
}

export default order