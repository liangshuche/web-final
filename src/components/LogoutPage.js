import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class LogoutPage extends Component {
    componentDidMount() {
        setTimeout(function () {
            return (
                <Redirect push to='/home'/>
            )
         }, 500);
    }
    render() {
        return (
            <div class="jumbotron jumbotron-fluid">
                <div class="container">
                    <h1 class="display-4">Logout</h1>
                    <p class="lead">Redirecting To Home Page...</p>
                </div>
            </div>
        );
    }
}

export default LogoutPage;