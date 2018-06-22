import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import io from 'socket.io-client';
import './App.css';

import NavBar from './components/Navbar';
import PostList from './components/PostList';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import PostPage from './components/PostPage';
import ContentPage from './components/ContentPage';
import ShopPage from './components/ShopPage';
import CartPage from './components/CartPage';
import AccountPage from './components/AccountPage';
import RatePage from './components/RatePage';
import OrderPage from './components/OrderPage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      username: '',
    };

    this.socket = io('localhost:5000');

    this.socket.on('RECEIVE_LOGIN', (data) => {
      this.setState({
        login: true,
        username: data,
      });
    });

    this.socket.on('RECEIVE_LOGOUT', () => {
      this.setState({
        login: false,
        username: '',
      });
    });
  }


  render() {
    const MyNavBar = (props) => {
      return (
        <NavBar login={this.state.login} username={this.state.username} socket={this.socket}/>
      );
    }
    const MyLoginPage = (props) => {
      return (
        <LoginPage socket={this.socket}/>
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
          <PostList socket={this.socket}/>
          <HomePage login={this.state.login} username={this.state.username} socket={this.socket}/>
        </div>
      );
    }

    const MyPostPage = (props) => {
      return (
        <PostPage login={this.state.login} username={this.state.username} socket={this.socket}/>
      );
    }

    const MyContentPage = (props) => {
      return (
        <div>
          <PostList socket={this.socket}/>
          <ContentPage socket={this.socket} _id={props.match.params._id}/>
        </div>
      );
    }

    const MyShopPage = (props) => {
      return (
        <ShopPage _shop={props.match.params.shop}/>
      )
    }

    const MyCartPage = (props) => {
      return (
        <CartPage _account={props.match.params.account}/>
      )
    }

    const MyAccountPage = (props) => {
      return (
        <AccountPage _account={props.match.params.account}/>
      )
    }

    const MyRatePage = (props) => {
      return (
        <RatePage _account={props.match.params.account} _order={props.match.params.order}/>
      )
    }

    const MyOrderPage = (props) => {
      return (
        <OrderPage _account={props.match.params.account} _order={props.match.params.order}/>
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
          <Route exact path='/user/:account/cart' render={MyCartPage}/>
          <Route exact path='/user/:account/account' render={MyAccountPage}/>
          <Route exact path='/user/:account/:order' render={MyOrderPage}/>
          <Route exact path='/user/:account/:order/rate' render={MyRatePage}/>
          <Route exact path='/newpost' render={MyPostPage}/>
          <Route path='/post/:_id' render={MyContentPage}/>
        </div>
      </BrowserRouter>
    )
  }
}



export default App;
