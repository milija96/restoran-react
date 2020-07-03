import React, { Component } from 'react';
import '../css/mainView.css';
import { Link } from 'react-router-dom';
export default class Header extends Component {
  render() {
    return (
      <div>
        <nav>
          <ul className='nav-wrap'>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/cart'>Cart</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/orders'>Orders</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
