import React, { Component } from 'react';
import avatar from '../img/avatar.jpg'
import { Link } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shops: '',
        }
        axios.get('http://localhost:5000/')
        .then(res => {
            this.setState({ shops: res.data });
        })
        .catch(function (err) {
          console.log(err);
        });

    }
    
    
    render() {
        var _shops = []
        for(let i=0; i<this.state.shops.length; ++i){
            let shop = 
                <div>
                    <Link to={'/shop/'+this.state.shops[i].name}><h1>Name: {this.state.shops[i].name}</h1></Link>
                    <h4>Rate: {this.state.shops[i].rate}</h4>
                    <img style={{ width: 200 }} src={this.state.shops[i].img}/>
                </div>
            _shops.push(shop);
        }
        return (
            <div>
                {_shops}
            </div>
        );
    }
}

export default HomePage;