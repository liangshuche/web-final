import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

let errBar = <div><br/></div>;

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: false,
            error: false,
        }

        this.socket = this.props.socket;

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.socket.on('RECEIVE_LOGIN', (data) => {
            this.setState({redirect: true});
        });

        this.socket.on('LOGIN_ERROR', () => {
            this.setState({error: true});
        });
    }
    handleUsernameChange(ev) {
        this.setState({ username: ev.target.value });
    }

    handlePasswordChange(ev) {
        this.setState({ password: ev.target.value });
    }

    handleSubmit(ev) {
        ev.preventDefault()
        this.setState({ password: ''});
        this.socket.emit('LOGIN', {
            username: this.state.username,
            password: this.state.password
            }
        );
    }

    render() {
        if (this.state.redirect){
            return <Redirect push to='/'/>;
        }
        if (this.state.error){
            errBar = (
                <div class="alert alert-danger" role="alert">
                    Username or Password error!
                </div>
            );
        }
        else {
            errBar = (
                <div><br/></div>
            )
        }
        return (
            <div className='row'>
                <div className='col-4'></div>
                <div className='col-4'>
                    <br/>
                    <br/>
                    <form>
                        <div class="form-group">
                            <label >Username</label>
                            <input type="text" class="form-control" id="account" value={this.state.username} onChange={this.handleUsernameChange}/>
                        </div>
                        <div class="form-group">
                            <label >Password</label>
                            <input type="password" class="form-control" id="password" value={this.state.password} onChange={this.handlePasswordChange}/>
                        </div>
                        <div>{errBar}</div>
                        <button type="submit" class="btn btn-outline-secondary btn-block" onClick={this.handleSubmit}>Login</button>
                        <br/>
                        <Link to='/register' style={{ textDecoration: 'none'}} ><button type='submit' class='btn btn-secondary btn-block'>Register</button></Link>
                    </form>
                </div>
                <div className='col-4'></div>
                
            </div>
        );
    }
}

export default LoginPage;