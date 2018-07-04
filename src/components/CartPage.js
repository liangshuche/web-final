import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import deliver from '../img/deliver.png';

class CartPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            cart: [],
            redirect: false,
            deliver: '',
            check: false,
        };

        this.getCartItems = this.getCartItems.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
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
            })
            .catch(function (err) {
                console.log(err);
            });
    }
    handleQuantityChange(e) {
        let newCart = this.state.cart;
        newCart[e.idx].quantity = e.quantity;
        this.setState({cart: newCart});
    }
    handleCheck(){
        this.setState( {check: !this.state.check });
    }
    handleOnClick(){

        let cart = this.state.cart.filter(item => item.quantity !== 0);

        axios.post('/api/checkout', {
            account: this.props.account,
            deliver: this.state.deliver,
            cart: cart,
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
                throw err;
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
            food_orders.push(<CartItem name={this.state.cart[i].name} price={this.state.cart[i].price} quantity={this.state.cart[i].quantity} idx={i} handleQuantityChange={this.handleQuantityChange}/>);
            sum = sum + parseInt(this.state.cart[i].price)*parseInt(this.state.cart[i].quantity);
        }

            
        return (
            <div class="row">
                <div class="col col-lg-7 margin-left margin-top">
                    <h3>您的訂單</h3>
                    <ul class='list-group list-group-flush margin-top'>
                        {food_orders}  
                    </ul>
                </div>
                <div class="col-lg-4">
                    <ul class='list-group list-group-flush'>
                        <div class="card card-shop center">
                            <br/>
                            <img class="card-img-top center" src={deliver} style={{maxWidth:200}}  alt="no internet"/>
                            <div class="card-body was-validated center">
                                <select class="form-control" value={this.state.deliver} onChange={this.handleOnChange}>
                                    <option value='' disabled selected>請選擇取貨地點</option>
                                    <option value='電機一館'>電機一館</option>
                                    <option value='電機二館'>電機二館</option>
                                    <option value='博理館'>博理館</option>
                                    <option value='明達館'>明達館</option>
                                </select>
                                <br/>
                                <h8 class="card-title" id="user">確認付款後將會立即幫您派送餐點。</h8>
                                <div class="custom-control custom-checkbox mb-3">
                                    <input type="checkbox" class="custom-control-input" onClick={this.handleCheck} id="customControlValidation1" required></input>
                                    <label class="custom-control-label" for="customControlValidation1"><small>我已詳閱公開說明書。</small></label>
                                    <div class="invalid-feedback"><small>母湯</small></div>
                                </div>
                                <button class="btn btn-danger btn-lg btn-block" onClick={this.handleOnClick} disabled={!this.state.deliver || this.state.cart.length === 0 || !this.state.check || !sum}>確認付款，共 {sum} USD</button> 
                                <br/>
                                <button class="btn btn-secondary btn-lg btn-block" onClick={this.handleClear} disabled={this.state.cart.length === 0}>刪除訂單</button> 
                            </div>
                        </div>
                    </ul>
                </div>
            </div>







            
        );
    }
}

export default CartPage;

class CartItem extends Component {
    constructor(props){
        super(props);
        this.state= {
            quantity: this.props.quantity,
        };
        this.handleOnChange = this.handleOnChange.bind(this);
    }
    handleOnChange(ev) {
        if(ev.target.value === ''){
            this.setState( {quantity: 0} );
            this.props.handleQuantityChange({
                idx: this.props.idx,
                quantity: 0,
            });
        }
        else if(parseInt(ev.target.value) > 0){
            this.setState( {quantity: parseInt(ev.target.value)});
            this.props.handleQuantityChange({
                idx: this.props.idx,
                quantity: parseInt(ev.target.value),
            });
        }
    }
    render() {
        return (
            <li class="list-group-item">
                <div class='container' style={{hight: 50}}>
                    <div class="row">
                        <div class="col-6 text-left">
                            {this.props.name}
                        </div>
                        <div class="col-3">
                            <div>{this.props.price} USD</div>
                        </div>
                        <div class="col-3">
                            <div class="form-group align-self-bottom">
                                <input type="text" class="form-control align-self-center" id="quantity" value={this.state.quantity} onChange={this.handleOnChange}/>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
    
}