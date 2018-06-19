import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

const brandStyle = {color: 'white', cursor: 'default'};

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
            navBar_left = <Link to='/'><a class="nav-item nav-link" onClick={this.handleLogout} >{this.props.username} - Logout</a></Link>
        } else {
            navBar_left = <Link to='/login'><a class="nav-item nav-link" >Login</a></Link>
        }

        return (
            <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
                <a style={brandStyle} class="navbar-brand">Everyone's Blog</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <Link to='/'><a class="nav-item nav-link" >Home</a></Link>
                    <Link to='/about'><a class="nav-item nav-link" >About</a></Link>
                    <Link to='/newpost'><a class="nav-item nav-link" >Post</a></Link>
                </div>
                    <div class='navbar-nav ml-auto'>
                        {navBar_left}
                    </div>
            </div>
          </nav>
        );
    }
}

export default NavBar;