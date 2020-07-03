import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../css/mainView.css';
import { Headers, BaseApi } from '../../api/api';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', email: '' };

    this.handlePassword = this.handlePassword.bind(this);

    this.handleEmail = this.handleEmail.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(e) {
    e.preventDefault();
    fetch(
        BaseApi + 'clients/login', {
            method: 'post',
            body: JSON.stringify({username: this.state.username, password: this.state.password}),
            headers: Headers 
        }

      )
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem('token', res)
      });
  }

  handleEmail(event) {
    event.persist();

    this.setState({ username: event.target.value });
  }

  handlePassword(event) {
    event.persist();
    this.setState({ password: event.target.value });
  }
  render() {
    return (
      <div>
        <div className='login-wrap'>
          <form className='form-props' noValidate autoComplete='off'>
            <TextField
              id='standard-basic'
              label='Email'
              onChange={this.handleEmail}
            />
            <TextField
              id='standard-password-input'
              type='password'
              label='Password'
              onChange={this.handlePassword}
            />
            <Button
              variant='contained'
              type='submit'
              onClick={this.handleLogin}
            >
              Log in
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
