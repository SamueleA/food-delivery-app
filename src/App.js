import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route  } from "react-router-dom";
import MainPage from './components/MainPage';
import MyOrders from './components/MyOrders';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Switch>
              <Route exact path='/' component={MainPage}/>
              <Route path='/myorders' component={MyOrders}/>
            </Switch>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App;