import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

//import images
import logo from '../img/icon.png'

const brandStyle = {color: '#fff', cursor: 'default'};

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        }

        this.handleLogout = this.handleLogout.bind(this);
    }
    handleLogout(ev) {
        this.props.socket.emit('LOGOUT');
        this.setState({redirect: true});
    }

    render() {
        let navBar_left;
        if ( this.props.login ) {
            navBar_left = 
                <div class='navbar-nav ml-auto'>
                    <Link to={'/cart'}><a class="nav-item nav-link" >Cart</a></Link>                            
                    <Link to={'/account'}><a class="nav-item nav-link" >{this.props.account}</a></Link>  
                    <Link to='/'><a class="nav-item nav-link" onClick={this.props.handleLogout} >Logout</a></Link>
                </div>
            } else {
            navBar_left = 
                <div class='navbar-nav ml-auto'>
                    <Link to='/login'><a class="nav-item nav-link" >Login</a></Link>
                </div>
        }

        return (
            <nav class="navbar navbar-expand-sm navbar-dark bg-dark navbar-static-top" >
                <a class="navbar-brand" href="/">
                    <img src={logo} width="120"  alt=""/>
                </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav mr-auto">
                    <Link to='/about'><a class="nav-item nav-link brandStyle" >About</a></Link>
                    <Link to='/messenger'><a class="nav-item nav-link">Messenger</a></Link>
                </div>
                {navBar_left}
            </div>
          </nav>
        );
    }
}

export default NavBar;