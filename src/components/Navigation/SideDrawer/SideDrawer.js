import React from 'react'

import classes from './SideDrawer.css'
import NavigationItems from '../NavigationItems/NavigationItems'
import Logo from '../../Logo/Logo'
import Backdrop from '../../UI/Backdrop/Backdrop'

const sideDrawer = (props) => {

    return (
        <React.Fragment>

            <div className={classes.MobileOnly}>
                <Backdrop 
                    show={props.open}
                    click={props.clickBackdrop}
                    />
            </div>
           
            <div className={[classes.SideDrawer, (props.open ? classes.Open : classes.Close)].join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </React.Fragment>
        
    )
}
    


export default sideDrawer