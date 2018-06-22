import React, { Component } from 'react';

class OrderPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            account: this.props._account,
            order: this.props._order,
        }
    }

    render() {
        return (
            <div>
                <div>{this.account}</div>
                <div>Order: {this.state.order}</div>
            </div>
        );
    }
}

export default OrderPage;