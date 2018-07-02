import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
class CartPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            cart: [],
            redirect: false,
            deliver: '',
        };
        axios.get('/api/cart', {
            params: {
                account: this.props.account,
            }
        })
            .then(res => {
                this.setState({ cart: res.data });
            })
            .catch(function (err) {
                console.log(err);
            });
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }
    handleOnClick(){
        axios.get('/api/checkout', {
            params: {
                account: this.props.account,
                deliver: this.state.deliver,
            }
        })
            .then((res) => {
                if (res.data.success === true){
                    this.setState({ redirect: true });
                }
                else {
                    alert('Something Went Wrong...\nPlease Try Again.');
                }
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    handleOnChange(ev){
        this.setState( {deliver: ev.target.value} );
    }

    render() {
        if (!this.props.account) {
            return <Redirect push to ='/login'/>;
        }
        if (this.state.redirect) {
            return <Redirect push to ='/account'/>;
        }
        let list = [];
        for (let i=0; i<this.state.cart.length; ++i){
            list.push(
                <div>
                    <h6>{this.state.cart[i].food}: #{this.state.cart[i].quantity}  price:{this.state.cart[i].price}</h6>
                </div>
            );
        }
        return (
            <div>
                {list}
                <div className='form-row fixed-bottom'>
                    <div class="form-group col-8">
                        <select class="form-control" value={this.state.deliver} onChange={this.handleOnChange}>
                            <option value='' disabled selected>請選擇取貨地點</option>
                            <option value='電機一館'>電機一館</option>
                            <option value='電機二館'>電機二館</option>
                            <option value='博理館'>博理館</option>
                            <option value='明達館'>明達館</option>
                        </select>
                    </div>
                    <div class='col-auto'>
                        <button className='btn btn-secondary' onClick={this.handleOnClick} disabled={!this.state.deliver || this.state.cart.length === 0}>Check Out</button> 
                    </div>
                </div>
            </div>
        );
    }
}

export default CartPage;