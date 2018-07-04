import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

        let user_info =
            <div class="card card-shop center">
                <img class="card-img-top rounded-circle" src={head}  alt={this.props.account}/>
                <div class="card-body was-validated center">
                    <h3 class="card-title" id="user">Hi! {this.props.account} .</h3>
                    <h5 class="card-title">You've got {this.state.orders.length} order records .</h5>
                </div>
            </div>  
            
        
        return (
            <div class="row">
                <div class="col col-lg-7 margin-left margin-top">
                    <h3>Order history</h3>
                    <ul class='list-group list-group-flush margin-top'>
                        {list}  
                    </ul>
                </div>
                <div class="col-lg-4">
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
        console.log(this.props.order);
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
        let list = [];
        for (let i=0; i<this.state.order.length; ++i){
            let item = this.state.order[i];
            list.push(
                <div>
                    <h6>{item.name} {item.price} X {item.quantity} = {item.price*item.quantity}</h6>
                </div>    
            );
        }
        
        let rate = []
        rate.push(<RateStatus id={this.state.id} />);
        let rate_status=[]
        if (rate==0){
            let star=
                <h6>尚未評價</h6>;
                rate_status.push(star);
            }
        else{
            let star=
                <h6>已評價為</h6>;
                rate_status.push(star);
        }



        return (
            <li class="list-group-item">
            <div class="margin-top">
                <div class='container'>
                    <div class="row">
                        <div class="col-lg-2">
                            <h6>{this.state.id}</h6>
                        </div>
                        <div class="col-lg-3">
                            <h6>{rate_status}{rate}</h6>
                        </div>
                        <div class="col-md-4">
                            <h6>Deliver To: {this.state.dest}</h6>
                        </div>
                        <div class="col col-lg-3">
                        <Link to={'/account/'+this.state.id} ><button className='btn btn-secondary' onClick={this.handleOnClick}>Detail</button></Link>
                        </div>
                    </div>
                </div>
            </div>
            </li>
        );
    }
}

class RateStatus extends Component {
    constructor(props) {
        super(props);
        this.state={
            account: this.props.account,
            id: this.props.order,
            rate: 0,
            redirect: false,
        };
        axios.get('/api/rate', {
            params: {
                account: this.props.account,
                id: this.props.id,        
            }
        })
            .then(res => {
                if (res.data.success) {
                    this.setState( {rate: res.data.rate });
                }
                else {
                    console.log('Some Thing Went Wrong');
                }
            })
            .catch(function (err) {
                console.log(err);
            });}
    render() {
        return(
        <h6>{this.state.rate}</h6>
        )
    }
    
}