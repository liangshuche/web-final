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
        let list = [];
        for (let i=0; i<this.state.content.length; ++i){
            let item = this.state.content[i];
            list.push(
                <div>
                    <h6>{item.quantity} X {item.name} = {item.quantity*item.price}</h6>
                </div>
            );
        }
        return (
            <div>
                <h6>######</h6>
                {list}
                <h6>Rate: {this.state.rate}</h6>
                <h6>Deliver To: {this.state.dest}</h6>
                <Link to={'/account/'+this.state.id+'/rate'}><button className='btn btn-secondary'>Rate</button></Link>
            </div>
        );
    }
}

export default OrderPage;