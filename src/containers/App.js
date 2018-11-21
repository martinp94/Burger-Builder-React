import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import Layout from '../components/Layout/Layout';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Checkout from './Checkout/Checkout'
import Orders from '../containers/Orders/Orders'

class App extends Component {

  render() {
    return (
        <Layout>

          <Switch>
            <Route path="/burgerbuilder" exact component={BurgerBuilder} />

            <Route path="/checkout" component={Checkout} />

            <Route path="/orders" component={Orders} />
          </Switch>

        </Layout>
    );
  }
}

export default App;