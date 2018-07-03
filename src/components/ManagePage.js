import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class ManagePage extends Component {
    constructor(props) {
        super(props);
        this.state={
            shop: this.props.manage,
            content: '',
        };
        
        axios.get('/api/manage', {
            params: {
                shop: this.props.account,
            }
        })
            .then(res => {
                if (res.data.status === 'success') {
                    this.setState({
                        content: res.data.content,
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
        return (
            <div>
                <h6>######</h6>
                <h6>Managing {this.state.shop}</h6>
            </div>
        );
    }
}

export default ManagePage;