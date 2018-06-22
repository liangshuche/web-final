import React, { Component } from 'react';

class CartPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            account: this.props._account,
        }
    }

    render() {
        return (
            <div>
                <h6>{this.account}</h6>
                
            </div>
        );
    }
}

export default CartPage;