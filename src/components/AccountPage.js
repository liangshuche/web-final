import React, { Component } from 'react';

class AccountPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            account: this.props._account,
        }
    }

    render() {
        return (
            <div>{this.account}</div>
        );
    }
}

export default AccountPage;