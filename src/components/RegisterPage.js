import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

let errBar = <div><br/></div>;

class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            accountClass: '',
            password: '',
            passwordClass: '',
            firstname: '',
            firstnameClass: '',
            lastname: '',
            lastnameClass: '',
            age: '',
            ageClass: '',
            redirect: false,
            error: false,
            account_exist: false,
        };


        this.handleAccountChange = this.handleAccountChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
        this.handleLastnameChange = this.handleLastnameChange.bind(this);
        this.handleAgeChange = this.handleAgeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleAccountChange(ev) {
        if( ev.target.value.length > 1 && ev.target.value.length < 21 ){
            this.setState({ accountClass: 'is-valid'});
        }
        else {
            this.setState({ accountClass: 'is-invalid'});
        }
        this.setState({ account: ev.target.value });
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
    handleFirstnameChange(ev) {
        if( ev.target.value.length > 0 && ev.target.value.length < 21 ){
            this.setState({ firstnameClass: 'is-valid'});
        }
        else {
            this.setState({ firstnameClass: 'is-invalid'});
        }
        this.setState({ firstname: ev.target.value });
    }

    handleLastnameChange(ev) {
        if( ev.target.value.length > 0 && ev.target.value.length < 21 ){
            this.setState({ lastnameClass: 'is-valid'});
        }
        else {
            this.setState({ lastnameClass: 'is-invalid'});
        }
        this.setState({ lastname: ev.target.value });
    }
    handleSubmit(ev) {
        ev.preventDefault()
        if( this.state.accountClass === 'is-valid' && this.state.passwordClass === 'is-valid' && this.state.firstnameClass === 'is-valid' && this.state.lastnameClass === 'is-valid' && this.state.ageClass === 'is-valid'){
            axios.post('/api/register', {
                account: this.state.account,
                password: this.state.password,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                age: this.state.age,
            })
                .then((res) => {
                    if (res.data.valid === true){
                        this.setState({ redirect: true });
                    }
                    else {
                        this.setState({ account_exist: true });
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });
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
                            <label for="Account">Account</label>
                            <input type="text" className={"form-control " + this.state.accountClass} id="account" value={this.state.account} onChange={this.handleAccountChange}/>
                            <div class="invalid-feedback">Username must contain 2~20 characters</div>
                        </div>
                        <div class="form-group">
                            <label for="Password">Password</label>
                            <input type="password" className={"form-control " + this.state.passwordClass} id="password" value={this.state.password} onChange={this.handlePasswordChange}/>
                            <div class="invalid-feedback">Password must contain 2~20 characters</div>                            
                        </div>
                        <div class="form-group">
                            <label for="First-name">First Name</label>
                            <input type="text" className={"form-control " + this.state.firstnameClass} id="firstname" value={this.state.firstname} onChange={this.handleFirstnameChange}/>
                            <div class="invalid-feedback">First Name must contain 2~20 characters</div>
                        </div>
                        <div class="form-group">
                            <label for="Last-name">Last Name</label>
                            <input type="text" className={"form-control " + this.state.lastnameClass} id="lastname" value={this.state.lastname} onChange={this.handleLastnameChange}/>
                            <div class="invalid-feedback">Last Name must contain 2~20 characters</div>
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