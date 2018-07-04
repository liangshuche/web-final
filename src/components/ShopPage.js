import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './Style.css';

let errBar = '';
class ShopPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            account: this.props.account,
            shopname: this.props.shop,
            food: '',
            img: '',
            rate: 0,
            cart: [],
            redirect: false,
            nologin: false,
            error: false,
        };
        axios.get('/api/shop', {
            params: {
                shopname: this.props.shop,
                img: this.props.img,
            }
        })
            .then(res => {
                console.log(res.data);
                this.setState({ 
                    food: res.data.food,
                    img: res.data.img,
                    rate: res.data.rate,
                });
            })
            .catch(function (err) {
                console.log(err);
            });
        this.handleAdd = this.handleAdd.bind(this);
        this.handleQuantity = this.handleQuantity.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleCheckout = this.handleCheckout.bind(this);
    }
    handleAdd(e) {
        let idx = this.state.cart.findIndex(function(o){
            return o.name === e.name;
        });
        if (idx === -1){
            let newitem = {
                name: e.name,
                price: e.price,
                quantity: 1,
            };
            this.setState({
                cart: [...this.state.cart, newitem]
            });
        }
        
        console.log(this.state.cart);
    }

    handleQuantity(e) {
        let idx = this.state.cart.findIndex(function(o) {
            return o.name === e.name;
        });
        if (idx > -1){
            let cart = this.state.cart;
            cart[idx].quantity = e.quantity;
            this.setState( {cart: cart} );
        }
        console.log(this.state.cart);
    }

    handleRemove(e) {
        let idx = this.state.cart.findIndex(function(o) {
            return o.name === e.name;
        });
        if (idx > -1){
            var newCart = this.state.cart;
            newCart.splice(idx, 1);
            this.setState( {cart: newCart} );
        }
    }
    handleCheckout() {
        if (!this.props.account){
            this.setState( {nologin: true });
        } else if (!this.state.cart.length){
            this.setState( {error: true });
        }
        else {
            console.log('check out');
            axios.post('/api/addtocart', {
                account: this.state.account,
                cart: this.state.cart,
            })
                .then((res) => {
                    if (res.data.success){
                        this.setState({ redirect: true });
                    }
                    else {
                        <alert>Something Went Wrong...</alert>;
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
        
    }

    render() {
        if (this.state.nologin){
            return (
                <Redirect push to='/login'/>
            );
        }
        if (this.state.redirect){
            return (
                <Redirect push to='/cart'/>
            );
        }
        if (this.state.error){
            errBar = (
                <div class="alert alert-danger" role="alert">
                    Cart Empty!  Aren't You Hungry?
                </div>
            );
        }
        var _foods = [];
        for(let i=0; i<this.state.food.length; ++i){
            _foods.push(<FoodListItem name={this.state.food[i].name} price={this.state.food[i].price} account={this.props.account} handleAdd={this.handleAdd}/>);
        }

        var food_orders = [];
        for(let i=0; i<this.state.cart.length; ++i){
            food_orders.push(<FoodOrderItem name={this.state.cart[i].name} price={this.state.cart[i].price} quantity={this.state.cart[i].quantity} handleQuantity={this.handleQuantity} handleRemove={this.handleRemove}/>);
        }


        let info = (
            <div class="card card-shop">
                <img class="card-img-top" src={this.state.img}  alt={this.state.shopname}/>
                <div class="card-body was-validated">
                    <h2 class="card-title" id="shopname">{this.state.shopname}</h2>
                    <label for="shopname">Rate: {this.state.rate}</label>
                    <ul class='list-group list-group-flush'>
                        {food_orders}
                    </ul>
                    <div>{errBar}</div>
                    <a class="btn btn-secondary btn-lg btn-block" onClick={this.handleCheckout}>結一波</a>
                </div>
            </div>
        );
        

        return (
            <div class="row">
                <br/>
                <div class="col col-lg-7 margin-left margin-top">
                    <ul class='list-group list-group-flush' id="food_card">
                        {_foods}   
                    </ul>
                </div>
                <div class="col-lg-4">
                    <ul class='list-group list-group-flush'>
                        {info}
                    </ul>
                </div>
            </div>
        );
    }}

export default ShopPage;

class FoodListItem extends Component {
    constructor(props) {
        super(props);
        this.handleOnClick = this.handleOnClick.bind(this);
    }
    handleOnClick() {
        this.props.handleAdd({
            name: this.props.name,
            price: this.props.price,
        });
    }
    render() {
        return (
            <li class="list-group-item">
                <div class='container'>
                    <div class="row">
                        <div class="col-lg-6">
                            <h6>{this.props.name}</h6>
                        </div>
                        <div class="col-lg-3">
                            <h6>{this.props.price}</h6>
                        </div>
                        <div class="col col-lg-3">
                            <a class="btn" onClick={this.handleOnClick}>+</a>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}

class FoodOrderItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
        };

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
    }


    handleOnChange(ev) {
        this.setState( {quantity: ev.target.value });
        this.props.handleQuantity({
            name: this.props.name,
            quantity: parseInt(ev.target.value),
        });
    }
    handleOnClick() {
        this.props.handleRemove({
            name: this.props.name,
        });
    }
    
  
    render() {
        return (
            <li class="list-group-item">

                <div class="row">
                    <div class="col-2">
                        <h6 class="btn" onClick={this.handleOnClick}>x</h6> 
                    </div>
                    <div class="col-4">
                        <h6>{this.props.name}</h6>
                    </div>
                    <div class="col-3">
                        <h6>{this.props.price}</h6>
                    </div>
                    <div class="col-3">
                        <div class="form-group">
                            <select class="form-control" value={this.state.quantity} onChange={this.handleOnChange}>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                            </select>
                        </div>
                    </div>
                </div>
                
            </li>
        );
    }
}
/*
<div class="custom-control custom-checkbox mb-3">
                        <input type="checkbox" class="custom-control-input" id="customControlValidation1" required></input>
                        <label class="custom-control-label" for="customControlValidation1"><small>我已詳閱公開說明書</small></label>
                        <div class="invalid-feedback"><small>母湯</small></div>
                    </div>
*/