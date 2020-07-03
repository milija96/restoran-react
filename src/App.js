import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Cart from './components/layout/Cart';
import Categories from './components/layout/Categories';
import Header from './components/layout/Header';
import Login from './components/user/login';
import Orders from './components/layout/Orders';
function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <Switch>
          <Categories exact path='/' component={Categories} />
          <Cart path='/cart' component={Cart} />
          <Login path='/login' component={Login} />
          <Orders path='/orders' component={Orders} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
