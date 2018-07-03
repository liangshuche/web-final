import React, { Component } from 'react';
import axios from 'axios';
import './ShopPage.css';

class ShopPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            account: this.props.account,
            shopname: this.props.shop,
            food: '',
            img: '',
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
                });
            })
            .catch(function (err) {
                console.log(err);
            });
    }


    render() {

        var _foods = [];
        for(let i=0; i<this.state.food.length; ++i){
            let food_info =
            <ul class='list-group list-group-flush center' id="food_card">
                <li class="list-group-item">
                    <div class='container'>
                        <div class="row">
                            <div class="col">
                                <h6>{this.state.food[i].name}</h6>
                            </div>
                            <div class="col-md-auto">
                                <h6>{this.state.food[i].price}</h6>
                            </div>
                            <div class="col col-lg-2">
                                <a href="#" class="btn">+</a>
                            </div>
                        </div>
                    </div>
                </li></ul>;
            
            _foods.push(food_info);
            ///_foods.push(<FoodList name={this.state.food[i].name} price={this.state.food[i].price} account={this.props.account}/>);
        }

        var food_orders = [];
        for(let i=0; i<this.state.food.length; ++i){
            let food_order =
            <ul class='list-group list-group-flush'>
                <li class="list-group-item">
                    <div class='container'>
                        <div class="row">
                            <div class="col-4 food-name">
                                <h6>{this.state.food[i].name}</h6>
                            </div>
                            <div class="col-3">
                                <h6>{this.state.food[i].price}</h6>
                            </div>
                            <div class="col-5">
                                <div class="form-group">
                                    <select class="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </li></ul>;
            
            food_orders.push(food_order);
            ///_foods.push(<FoodList name={this.state.food[i].name} price={this.state.food[i].price} account={this.props.account}/>);
        }


        var _infos = [];
        let info =
                <div class="card card-shop">
                    <img class="card-img-top" src={this.state.img}  alt={this.state.shopname}/>
                    <div class="card-body was-validated">
                        <h2 class="card-title" id="shopname">{this.state.shopname}</h2>
                        <label for="shopname">Rate</label>
                        <div class="custom-control custom-checkbox mb-3">
                            <input type="checkbox" class="custom-control-input" id="customControlValidation1" required></input>
                            <label class="custom-control-label" for="customControlValidation1"><small>我已詳閱公開說明書</small></label>
                            <div class="invalid-feedback"><small>母湯</small></div>
                        </div>
                        {food_orders}
                        <a href="#" class="btn btn-secondary btn-lg btn-block">結一波</a>
                    </div>
                </div>;
        _infos.push(info);

        return (
            <div class="row">
                <div class="col-md-3 col-md-push-9">
                    {_foods}
                </div>
                <div class="col-md-9 col-md-pull-3">
                    {_infos}
                </div>
            </div>
        );
        
    
    }}

export default ShopPage;

class FoodList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
            account: this.props.account,
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleMinus = this.handleMinus.bind(this);
        this.handlePlus = this.handlePlus.bind(this);
    }
    handleClick() {
        axios.post('/api/addtocart', {
            account: this.state.account,
            food: this.props.name,
            price: this.props.price,
            quantity: this.state.quantity
        })
            .catch(function (err) {
                console.log(err);
            });
    }
    handleMinus() {
        if(this.state.quantity > 1){
            this.setState ({
                quantity: this.state.quantity-1,
            });
        }
    }

    handlePlus() {
        if(this.state.quantity < 99){
            this.setState ({
                quantity: this.state.quantity+1,
            });
        }
    }
  
    render() {
        if (this.state.account){
            return (
                <div>
                    <span>Name: {this.props.name} Price: {this.props.price}</span>
                    <button className="btn btn-secondary" onClick={this.handleMinus}>-</button>
                    <span>{this.state.quantity}</span>
                    <button className="btn btn-secondary" onClick={this.handlePlus}>+</button>
                    <button className="btn btn-outline-secondary" onClick={this.handleClick}>Add To Cart</button>
                </div>
            );
        }
        else {
            return (
                <div>
                    <span>Name: {this.props.name} Price: {this.props.price}</span>                    
                </div>
            );
        }
    }
}