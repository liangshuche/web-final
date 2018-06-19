import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

let errBar = <div><br/></div>;

class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            usernameClass: '',
            password: '',
            passwordClass: '',
            age: '',
            ageClass: '',
            redirect: false,
            error: false,
            account_exist: false,
        }

        this.socket = this.props.socket;

        this.socket.on('ACCOUNT_EXIST', () => {
            this.setState({ account_exist: true });
        });

        this.socket.on('RECEIVE_REGISTER', () => {
            this.setState({ redirect: true });
        })

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleAgeChange = this.handleAgeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleUsernameChange(ev) {
        if( ev.target.value.length > 1 && ev.target.value.length < 21 ){
            this.setState({ usernameClass: 'is-valid'});
        }
        else {
            this.setState({ usernameClass: 'is-invalid'});
        }
        this.setState({ username: ev.target.value });
    }

    handlePasswordChange(ev) {
        if( ev.target.value.length > 1 && ev.target.value.length < 21 ){
            this.setState({ passwordClass: 'is-valid'});
        }
        else {
            this.setState({ passwordClass: 'is-invalid'});
        }
        this.setState({ password: ev.target.value });
    }

    handleAgeChange(ev) {
        if ( parseInt(ev.target.value) > 0 ){
            this.setState({ ageClass: 'is-valid'});
        }
        else {
            this.setState({ ageClass: 'is-invalid'});
        }
        this.setState({ age: ev.target.value });
    }
    handleSubmit(ev) {
        ev.preventDefault()
        if( this.state.ageClass === 'is-valid' && this.state.passwordClass === 'is-valid' && this.state.usernameClass === 'is-valid'){
            this.socket.emit('REGISTER', {
                username: this.state.username,
                password: this.state.password,
                age: this.state.age,
            });
            this.setState({ password: ''});
        }
        else {
            this.setState({ 
                password: '',
                error: true,
            });
        }
        
    }

    render() {
        if (this.state.redirect){
            return <Redirect push to='/login'/>;
        }
        if (this.state.error){
            errBar = (
                <div class="alert alert-danger" role="alert">
                    Please fix invalid input(s)!
                </div>
            );
        }
        else if (this.state.account_exist){
            errBar = (
                <div class="alert alert-danger" role="alert">
                    Username Exists!
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
                            <label for="Account">Username</label>
                            <input type="text" className={"form-control " + this.state.usernameClass} id="account" value={this.state.username} onChange={this.handleUsernameChange}/>
                            <div class="invalid-feedback">Username must contain 2~20 characters</div>
                        </div>
                        <div class="form-group">
                            <label for="Password">Password</label>
                            <input type="password" className={"form-control " + this.state.passwordClass} id="password" value={this.state.password} onChange={this.handlePasswordChange}/>
                            <div class="invalid-feedback">Password must contain 2~20 characters</div>                            
                        </div>
                        <div class="form-group">
                            <label for="Password">Age</label>
                            <input type="text" className={"form-control " + this.state.ageClass} id="age" value={this.state.age} onChange={this.handleAgeChange}/>
                            <div class="invalid-feedback">Invalid input</div>                                                    
                        </div>
                        <div>{errBar}</div>
                        <button type="button" className="btn btn-outline-secondary btn-block" onClick={this.handleSubmit}>Register</button>
                    </form>
                </div>
                <div className='col-4'></div>
                
            </div>
        );
    }
}

export default RegisterPage;