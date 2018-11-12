import React from 'react'

import styles from './Burger.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';

const burger = (props) => {

    let ingredients = Object.keys(props.ingredients).map((ing, index) => {
        return [...Array(props.ingredients[ing])].map(() => {
            return <BurgerIngredient type={ing}
                    key={index + props.ingredients[ing] * Math.floor(Math.random() * 10000000)} />
        })
    })
    
    if(!ingredients.flat().length)
        ingredients = <p> Empty Burger </p>
    
    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top" />
               {ingredients}
            <BurgerIngredient type="bread-bottom" />
        </div>  
    )
}

export default burger;