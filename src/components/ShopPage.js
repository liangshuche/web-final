import React, { Component } from 'react';
import axios from 'axios';
class ShopPage extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.account);
        this.state={
            account: this.props.account,
            shopname: this.props.shop,
            food: '',
        }
        axios.get('http://localhost:5000/shop', {
            params: {
                shopname: this.props.shop,
            }
        })
        .then(res => {
            this.setState({ food: res.data });
        })
        .catch(function (err) {
          console.log(err);
        });
    }


    render() {
        var _foods = []
        for(let i=0; i<this.state.food.length; ++i){
                _foods.push(<FoodList name={this.state.food[i].name} price={this.state.food[i].price} account={this.props.account}/>);
            }
        return (
            

            <div>
                <h1>Shop ID:{this.state.shopname}</h1>
                {_foods}
            </div>
        );
    }
}

export default ShopPage;

class FoodList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
            account: this.props.account,
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleMinus = this.handleMinus.bind(this);
        this.handlePlus = this.handlePlus.bind(this);
    }
    handleClick() {
        axios.post('http://localhost:5000/addtocart', {
            acoount: this.state.account,
            food: this.props.name,
            price: this.props.price,
            quantity: this.state.quantity
        })
        .catch(function (err) {
            console.log(err);
        })
    }
    handleMinus() {
        if(this.state.quantity > 1){
            this.setState ({
                quantity: this.state.quantity-1,
            })
        }
    }

    handlePlus() {
        if(this.state.quantity < 99){
            this.setState ({
                quantity: this.state.quantity+1,
            })
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
            )
        }
    }
  }