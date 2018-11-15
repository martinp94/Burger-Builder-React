import React from 'react'

import classes from './Modal.css'

import Backdrop from '../Backdrop/Backdrop'

const modal = (props) => (
    <React.Fragment>
        <Backdrop 
            show={props.show}
            click={props.clickBackdrop} />

        <div className={classes.Modal} 
            style={{  
                transform: props.show ? 'translateY(0)' : 'translateY(-100%)',
                transition: 'all 1s ease',
                opacity: props.show ? '1' : '0',
                zIndex: props.show ? '500' : '-100'
            }}>
            {props.children}
        </div>
    </React.Fragment>
)

export default modal