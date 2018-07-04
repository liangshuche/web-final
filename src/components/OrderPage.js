import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
class OrderPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            account: this.props.account,
            id: this.props.id,
            content: '',
            rate: 0,
            dest: '',
        };
        axios.get('/api/order', {
            params: {
                account: this.props.account,
                id: this.props.id,
            }
        })
            .then(res => {
                if (res.data.success) {
                    this.setState({
                        content: res.data.content,
                        rate: res.data.rate,
                        dest: res.data.dest,
                    });
                }
                else {
                    console.log('Some Thing Went Wrong');
                }
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    render() {
        if (!this.props.account) {
            return <Redirect push to ='/login'/>;
        }
        let sum = 0;
        let button_text = ''; 
        if (this.state.rate){
            button_text = 'Rate: '+this.state.rate;
        } else {
            button_text = 'Rate This Order';
        }
        let list = [];
        for (let i=0; i<this.state.content.length; ++i){
            let item = this.state.content[i];
            sum += item.quantity*item.price;
            list.push(
                <li class="list-group-item">
                    <div class="margin-top">
                        <div class='container'>
                            <div class="row text-right">
                                <div class="col-4">
                                    <h6>{item.name}</h6>
                                </div>
                                <div class="col-2">
                                    <h6>{item.price}</h6>
                                </div>
                                <div class="col-2">
                                    <h6>{item.quantity}</h6>
                                </div>
                                <div class="col-4">
                                    <h6>{item.quantity*item.price}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>  
            );
        }
        return (
            <div class="row">
                <div class="col col-lg-7 margin-left margin-top">
                    <div class='row'>
                        <div class='col-4'>
                            <h3>訂單內容 #{this.state.id}</h3>
                        </div>
                        <div class='col-4'>
                        </div>
                        <div class='col-4'>
                            <Link to={'/account/'+this.state.id+'/rate'}><button className='btn btn-secondary float-right'>{button_text}</button></Link>
                        </div>
                    </div>
                    <ul class='list-group list-group-flush margin-top'>
                        <li class="list-group-item">
                            <div class="margin-top">
                                <div class='container'>
                                    <div class="row text-right">
                                        <div class="col-4">
                                            <h6>商品名稱</h6>
                                        </div>
                                        <div class="col-2">
                                            <h6>價格</h6>
                                        </div>
                                        <div class="col-2">
                                            <h6>數量</h6>
                                        </div>
                                        <div class="col-4">
                                            <h6>總額</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        {list}  
                        <li class="list-group-item">
                            <div class="margin-top">
                                <div class='container'>
                                    <div class="row text-right">
                                        <div class="col-4">
                                            <h5>Deliver To: {this.state.dest}</h5>
                                        </div>
                                        <div class="col-4"></div>
                                        <div class="col-4">
                                            <h5>{sum}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <br/>
                    <div class='row'>
                        <div class='col-8'></div>
                        <div class='col-4'>
                            <Link to='/account/'><button class='btn btn-secondary float-right'>返回帳戶</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default OrderPage;