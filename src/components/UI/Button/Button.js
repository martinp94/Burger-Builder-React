import React from 'react'

import classes from './Button.css'

const modal = (props) => {

    const btnClass = props.enabled ? 
                        (props.type === 'danger' ? 
                            [classes.Button, classes.Danger].join(' ') :
                             (props.type === 'success' ? [classes.Button, classes.Success].join(' ') : classes.Button)) 
                        : [classes.Button, classes.Disabled].join(' ')
    return (
        <button 
            onClick={props.click} 
            className={btnClass}
            disabled={!props.enabled}>{props.children}</button>
    )
    
}
    


export default modal