import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
class OrderPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            account: this.props.account,
            id: this.props.order,
            rate: 0,
            redirect: false,
        }
        axios.get('http://localhost:5000/rate', {
            params: {
                account: this.props.account,
                id: this.props.id,        
            }
        })
        .then(res => {
            if (res.data.status === 'success') {
                this.setState( {rate: res.data.rate })
            }
            else {
                console.log('Some Thing Went Wrong')
            }
        })
        .catch(function (err) {
          console.log(err);
        });

        this.handleMinus = this.handleMinus.bind(this);
        this.handlePlus = this.handlePlus.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleMinus() {
        if(this.state.rate > 0){
            this.setState ({
                rate: this.state.rate-1,
            })
        }
    }

    handlePlus() {
        if(this.state.rate < 5){
            this.setState ({
                rate: this.state.rate+1,
            })
        }
    }

    handleSubmit() {
        axios.get('http://localhost:5000/updaterate', {
            params: {
                account: this.props.account,
                id: this.props.id,
                rate: this.state.rate
            }
        })
        .then((res) => {
            if (res.data.status === 'success'){
                this.setState({ redirect: true })
            }
            else {
                alert('Something Went Wrong...\nPlease Try Again.')
            }
        })
        .catch(function (err) {
            console.log(err);
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to={'/account/'+this.props.id}/>
        }
        return (
            <div>
                <button className='btn btn-secondary' onClick={this.handleMinus}>-</button>
                <span>{this.state.rate}</span>
                <button className='btn btn-secondary' onClick={this.handlePlus}>+</button>
                <br/>
                <button className='btn btn-secondary' onClick={this.handleSubmit}>Submit</button>
            </div>
        );
    }
}

export default OrderPage;