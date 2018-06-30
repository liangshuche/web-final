import React, { Component } from 'react';
import axios from 'axios';

class AccountPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            account: this.props.account,
            order: [],
        }
        axios.get('http://localhost:5000/account', {
            params: {
                account: this.props.account,
            }
        })
        .then(res => {
            this.setState({ order: res.data });
        })
        .catch(function (err) {
          console.log(err);
        });
    }

    render() {
        let list = [];
        for (let i=0; i<this.state.order.length; ++i){
            list.push(<h6>this.state.order[i][0].food</h6>)
        }
        return (
            <div>
                {list}
            </div>
        );
    }
}

export default AccountPage;