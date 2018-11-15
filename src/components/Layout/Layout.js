import React, { Component } from 'react'

import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'


class Layout extends Component {

    state = {
        openSideDrawer: true
    }

    closeSideDrawer = () => {
        this.setState({ openSideDrawer: false })
    }

    openSideDrawer = () => {
        this.setState({ openSideDrawer: true })
    }

    render() {


        return (
            <React.Fragment>
                <Toolbar 
                    clickOpenSideDrawer={this.openSideDrawer} />
                <SideDrawer 
                    clickBackdrop={this.closeSideDrawer}
                    open={this.state.openSideDrawer} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }
    
}

export default Layout;