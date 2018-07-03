import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './CartPage.css';


class CartPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            cart: [],
            redirect: false,
            deliver: '',
        };

        this.getCartItems = this.getCartItems.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleClear = this.handleClear.bind(this);

        this.getCartItems();
    }
    getCartItems(){
        axios.get('/api/cart', {
            params: {
                account: this.props.account,
            }
        })
            .then(res => {
                this.setState({ cart: res.data });
                console.log(res.data);
            })
            .catch(function (err) {
                console.log(err);
            });
    }
    handleOnClick(){
        axios.get('/api/checkout', {
            params: {
                account: this.props.account,
                deliver: this.state.deliver,
            }
        })
            .then((res) => {
                if (res.data.success === true){
                    this.setState({ redirect: true });
                }
                else {
                    alert('Something Went Wrong...\nPlease Try Again.');
                }
            })
            .catch(function (err) {
                console.log(err);
            });
            
    }

    handleOnChange(ev){
        this.setState( {deliver: ev.target.value} );
    }

    handleClear() {
        axios.get('/api/clearcart', {
            params: {
                account: this.props.account,
            }
        })
            .then((res) => {
                if (res.data.success){
                    this.setState({ cart: [] });
                }
                else {
                    alert('Something Went Wrong...\nPlease Try Again.');
                }
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    render() {
        if (!this.props.account) {
            return <Redirect push to ='/login'/>;
        }
        if (this.state.redirect) {
            return <Redirect push to ='/account'/>;
        }
        let sum = 0;
        var food_orders = [];
        for(let i=0; i<this.state.cart.length; ++i){
            let food_order =
                <li class="list-group-item">
                    <div class='container container_food'>
                        <div class="row">
                            <div class="col-6 text-left">
                                {this.state.cart[i].name}
                            </div>
                            <div class="col-3">
                                <div>{this.state.cart[i].price} USD</div>
                            </div>
                            <div class="col-3">
                                <div class="form-group align-self-bottom">
                                    <input type="text" class="form-control align-self-center" id="quantity" placeholder={this.state.cart[i].quantity}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>;
            food_orders.push(food_order);
            sum = sum + parseInt(this.state.cart[i].price)*parseInt(this.state.cart[i].quantity);
        }
        return (
            <div>
                <div class="row">
                    <div class='col-2'></div>
                    <div class='col-8'>
                        <ul class='list-group list-group-flush align-self-center'>
                            {food_orders}
                        </ul>
                    </div>
                    <div class='col-2'></div>
                </div>
                
                <div className='form-row fixed-bottom'>
                    <div class="col-2"></div>
                    <div class="form-group col-4">
                        <select class="form-control" value={this.state.deliver} onChange={this.handleOnChange}>
                            <option value='' disabled selected>請選擇取貨地點</option>
                            <option value='電機一館'>電機一館</option>
                            <option value='電機二館'>電機二館</option>
                            <option value='博理館'>博理館</option>
                            <option value='明達館'>明達館</option>
                        </select>
                    </div>
                    <div class="col-2">
                        <div class="alert alert-light text-right sum-box">
                            Total: {sum} USD
                        </div>
                    </div>
                    <div class='col-4'>
                        <button className='btn btn-secondary' onClick={this.handleOnClick} disabled={!this.state.deliver || this.state.cart.length === 0}>Check Out</button> 
                        <button className='btn btn-danger' onClick={this.handleClear} disabled={this.state.cart.length === 0}>Clear Cart</button> 
                    </div>
                </div>
            </div>
        );
    }
}

export default CartPage;