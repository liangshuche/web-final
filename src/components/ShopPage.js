import React, { Component } from 'react';
import axios from 'axios';
class ShopPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            shopname: this.props._shop,
            food: '',
        }
        axios.get('http://localhost:5000/shop', {
            params: {
                shopname: this.props._shop,
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
            let fooditem = 
                <div>
                    <h1>Name: {this.state.food[i].name} Price: {this.state.food[i].price}</h1>
                    <br/>
                </div>
                _foods.push(fooditem);
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