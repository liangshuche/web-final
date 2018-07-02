import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class AccountPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            account: this.props.account,
            orders: [],
        };
        axios.get('/api/account', {
            params: {
                account: this.props.account,
            }
        })
            .then(res => {
                this.setState({ orders: res.data });
                console.log(res.data);
            })
            .catch(function (err) {
                console.log(err);
            });

    }

    render() {
        let list = [];
        for (let i=0; i<this.state.orders.length; ++i){
            list.push(<OrderItem order={this.state.orders[i]} />);
        }
        return (
            <div>
                {list}
            </div>
        );
    }
}

export default AccountPage;

class OrderItem extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.order);
        this.state={
            id: this.props.order.id,
            order: this.props.order.content
        };
        this.handleOnClick = this.handleOnClick.bind(this);
    }
    handleOnClick() {

    }
    render() {
        let list = [];
        for (let i=0; i<this.state.order.length; ++i){
            let item = this.state.order[i];
            list.push(
                <div>
                    <h6>{item.quantity} X {item.food} = {item.price*item.price}</h6>
                </div>    
            );
        }
        return (
            <div>
                <h6>######</h6>
                {list}
                <Link to={'/account/'+this.state.id} ><button className='btn btn-secondary' onClick={this.handleOnClick}>Go To Detail</button></Link>
            </div>
        );
    }
}