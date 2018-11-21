import React from 'react'

import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.css'

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1 style={{ textAlign: 'center' }}>We hope it tastes well!</h1>
            <div style={{ width: '300px', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button 
                type="danger"
                click={props.clickCancel}
                enabled={true}>CANCEL</Button>
            <Button 
                type="success"
                click={props.clickContinue}
                enabled={true}>CONTINUE</Button>
        </div>

    )
}

export default checkoutSummary