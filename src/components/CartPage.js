import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
class CartPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            cart: [],
            redirect: false,
        }
        axios.get('http://localhost:5000/cart', {
            params: {
                account: this.props.account,
            }
        })
        .then(res => {
            this.setState({ cart: res.data });
        })
        .catch(function (err) {
          console.log(err);
        });
        this.handleOnClick = this.handleOnClick.bind(this);
    }
    handleOnClick(){
        axios.get('http://localhost:5000/checkout', {
            params: {
                account: this.props.account,
            }
        })
        .then((res) => {
            if (res.data.success === true){
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
        if (!this.props.account) {
            return <Redirect push to ='/login'/>
        }
        if (this.state.redirect) {
            return <Redirect push to ='/account'/>
        }
        let list = []
        for (let i=0; i<this.state.cart.length; ++i){
            list.push(
            <div>
                <h6>{this.state.cart[i].food}: #{this.state.cart[i].quantity}  price:{this.state.cart[i].price}</h6>
            </div>
            )
        }
        return (
            <div>
                {list}
                <button className='btn btn-secondary' onClick={this.handleOnClick}>Check Out</button> 
            </div>
        );
    }
}

export default CartPage;