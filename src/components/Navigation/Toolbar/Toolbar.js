import React from 'react'

import classes from './Toolbar.css'
import Logo from '../../../components/Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import menuIcon from '../../../assets/images/collapse-menu.png'

const toolbar = (props) => {

   
    return (
        <header className={classes.Toolbar}>
            <img  
                src={menuIcon}
                className={classes.MenuIcon} 
                alt="Menu"
                onClick={props.clickOpenSideDrawer} />
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    )
    
}
    


export default toolbar