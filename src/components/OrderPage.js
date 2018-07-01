import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
class OrderPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            account: this.props.account,
            id: this.props.id,
            content: '',
            rate: 0,
        }
        if (!this.state.account){
            this.setState({ account: 'anonymous'})
        }
        axios.get('http://localhost:5000/order', {
            params: {
                account: this.props.account,
                id: this.props.id,
            }
        })
        .then(res => {
            if (res.data.status === 'success') {
                this.setState({
                    content: res.data.content,
                    rate: res.data.rate,
                })
            }
            else {
                console.log('Some Thing Went Wrong')
            }
        })
        .catch(function (err) {
          console.log(err);
        });
    }

    render() {
        let list = [];
        for (let i=0; i<this.state.content.length; ++i){
            let item = this.state.content[i]
            list.push(
                <div>
                    <h6>{item.quantity} X {item.food} = {item.price*item.price}</h6>
                </div>
            )
        }
        return (
            <div>
                <h6>######</h6>
                {list}
                <h6>Rate: {this.state.rate}</h6>
                <Link to={'/account/'+this.state.id+'/rate'}><button className='btn btn-secondary'>Rate</button></Link>
            </div>
        );
    }
}

export default OrderPage;