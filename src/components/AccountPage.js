import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

import head from '../img/avatar.jpg';

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
            })
            .catch(function (err) {
                throw err;
            });

    }

    render() {
        if (!this.props.account) {
            return <Redirect push to ='/login'/>;
        }
        let list = [];
        for (let i=0; i<this.state.orders.length; ++i){
            list.push(<OrderItem order={this.state.orders[i]} />);
        }

        let user_info =
            <div class="card card-shop center">
                <img class="card-img-top rounded-circle" src={head}  alt={this.props.account}/>
                <div class="card-body was-validated center">
                    <h3 class="card-title" id="user">Hi! {this.props.account}.</h3>
                    <h5 class="card-title">You've got {this.state.orders.length} order records .</h5>
                </div>
            </div>;  
            
        
        return (
            <div class="row">
                <div class="col col-lg-7 margin-left margin-top">
                    <h3>Order history</h3>
                    <ul class='list-group list-group-flush margin-top'>
                        {list}  
                    </ul>
                </div>
                <div class="col-lg-4">
                    <br/>
                    <br/>
                    <br/>
                    <ul class='list-group list-group-flush'>
                        {user_info}
                    </ul>
                </div>
            </div>
        );
    }
}

export default AccountPage;

class OrderItem extends Component {
    constructor(props) {
        super(props);
        this.state={
            id: this.props.order.id,
            order: this.props.order.content,
            dest: this.props.order.deliver,
            rate: this.props.order.rate
        };
        this.handleOnClick = this.handleOnClick.bind(this);
    }
    handleOnClick() {

    }
    render() {       
        let rate_status= '';
        if (this.state.rate){
            rate_status = <h6>已評價:{this.state.rate}</h6>;
        }
        else{
            rate_status = <h6>未評價</h6>;
        }



        return (
            <li class="list-group-item">
                <div class="margin-top">
                    <div class='container'>
                        <div class="row">
                            <div class="col-2">
                                <h6>{this.state.id}</h6>
                            </div>
                            <div class="col-3">
                                <h6>{rate_status}</h6>
                            </div>
                            <div class="col-4">
                                <h6>Deliver To: {this.state.dest}</h6>
                            </div>
                            <div class="col-3">
                                <Link to={'/account/'+this.state.id} ><button className='btn btn-secondary' onClick={this.handleOnClick}>Detail</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}