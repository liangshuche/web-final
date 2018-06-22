import React, { Component } from 'react';
import avatar from '../img/avatar.jpg'
import { Link } from 'react-router-dom';
class HomePage extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <Link to='/shop/shop1'>
                    <h6>Shop1</h6>
                    <img src='' alt='shop-img'/>
                    <h4>Rate:5</h4>
                </Link>
                <Link to='/shop/shop2'>
                    <h6>Shop2</h6>
                    <img src='' alt='shop-img'/>
                    <h4>Rate:1</h4>
                </Link>
            </div>
        );
    }
}

export default HomePage;