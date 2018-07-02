import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

import NavBar from './components/Navbar';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ShopPage from './components/ShopPage';
import CartPage from './components/CartPage';
import AccountPage from './components/AccountPage';
import RatePage from './components/RatePage';
import OrderPage from './components/OrderPage';
import MessengerPage from './components/MessengerPage';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      acocunt: '',
    };

    
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogin(e) {
    this.setState({
      login: e.login,
      account: e.account,
    })
  }

  handleLogout() {
    this.setState({
      login: false,
      account: '',
    })
  }


  render() {
    const MyNavBar = (props) => {
      return (
        <NavBar login={this.state.login} account={this.state.account} handleLogout={this.handleLogout}/>
      );
    }
    const MyLoginPage = (props) => {
      return (
        <LoginPage handleLogin={this.handleLogin} socket={this.socket}/>
      );
    } 
    const MyRegisterPage = (props) => {
      return (
        <RegisterPage socket={this.socket}/>
      );
    }
    const MyHomePage = (props) => {
      return (
        <div>
          <HomePage login={this.state.login} username={this.state.username} />
        </div>
      );
    }

    const MyShopPage = (props) => {
      return (
        <ShopPage shop={props.match.params.shop} account={this.state.account}/>
      )
    }

    const MyCartPage = (props) => {
      return (
        <CartPage account={this.state.account}/>
      )
    }

    const MyAccountPage = (props) => {
      return (
        <AccountPage account={this.state.account}/>
      )
    }

    const MyOrderPage = (props) => {
      return (
        <OrderPage account={this.state.account} id={props.match.params.order}/>
      )
    }

    const MyRatePage = (props) => {
      return (
        <RatePage account={this.state.account} id={props.match.params.order}/>
      )
    }

    const MyMessenger = (props) => {
      return (
        <MessengerPage account={this.state.account}/>
      )
    }

    return (
      <BrowserRouter>
        <div>
          <Route path='/' render={MyNavBar}/>
          <Route exact path='/' render={MyHomePage}/>
          <Route path='/about' component={AboutPage}/>
          <Route path='/login' render={MyLoginPage}/>
          <Route path='/register' render={MyRegisterPage}/>
          <Route path='/shop/:shop' render={MyShopPage}/>
          <Route exact path='/cart' render={MyCartPage}/>
          <Route exact path='/account' render={MyAccountPage}/>
          <Route exact path='/account/:order' render={MyOrderPage}/>
          <Route exact path='/account/:order/rate' render={MyRatePage}/>
          <Route exact path='/messenger' render={MyMessenger}/>
        </div>
      </BrowserRouter>
    )
  }
}



export default App;
