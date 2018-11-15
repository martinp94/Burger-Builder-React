import React from 'react'

import classes from './Button.css'

const modal = (props) => {

    const btnClass = props.type === 'danger' ? [classes.Button, classes.Danger].join(' ') : (props.type === 'success' ? [classes.Button, classes.Success].join(' ') : classes.Button) 
    return (
        <button onClick={props.click} className={btnClass}>{props.children}</button>
    )
    
}
    


export default modal