import React from 'react'

import classes from './BuildControl.css'

const buildControl = (props) => (
        <div className={classes.BuildControl}>
            <label className={classes.Label}>{props.label}</label>
            <button 
                className={classes.Less}
                onClick={e => props.clickRemove(props.label.toLowerCase())}
                disabled={props.disabled}>Less</button>
            <button 
                className={classes.More}
                onClick={e => props.clickAdd(props.label.toLowerCase())}>More</button>
        </div>
)


export default buildControl;