import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

class RatePage extends Component {
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
            });

        this.handle1 = this.handle1.bind(this);
        this.handle2 = this.handle2.bind(this);
        this.handle3 = this.handle3.bind(this);
        this.handle4 = this.handle4.bind(this);
        this.handle5 = this.handle5.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handle1() {
        if(this.state.rate >= 0){
            this.setState ({
                rate: this.state.rate=1,
            });
        }
    }

    handle2() {
        if(this.state.rate >= 0){
            this.setState ({
                rate: this.state.rate=2,
            });
        }
    }

    handle3() {
        if(this.state.rate >= 0){
            this.setState ({
                rate: this.state.rate=3,
            });
        }
    }

    handle4() {
        if(this.state.rate >= 0){
            this.setState ({
                rate: this.state.rate=4,
            });
        }
    }

    handle5() {
        if(this.state.rate < 5){
            this.setState ({
                rate: this.state.rate=5,
            });
        }
    }

    handleSubmit() {
        axios.get('/api/updaterate', {
            params: {
                account: this.props.account,
                id: this.props.id,
                rate: this.state.rate
            }
        })
            .then((res) => {
                if (res.data.success){
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

    render() {
        if (!this.props.account) {
            return <Redirect push to ='/login'/>;
        }
        if (this.state.redirect) {
            return <Redirect push to={'/account/'+this.props.id}/>;
        }
        return (
            
            <div class="center margin-top">
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous"/>
                <h2 class="center">Rate Now</h2>
                <br/>
                <div class="center">
                    <button class="btn btn-star " onClick={this.handle1}>{
                        this.state.rate>=1
                            ? <i class="fas fa-star"></i>
                            : <i class="far fa-star"></i>
                    }</button>
                    <button class="btn btn-star margin-minileft" onClick={this.handle2}>{
                        this.state.rate>=2
                            ? <i class="fa fa-star"></i>
                            : <i class="far fa-star"></i>
                    }</button>
                    <button class="btn btn-star margin-minileft" onClick={this.handle3}>{
                        this.state.rate>=3
                            ? <i class="fa fa-star"></i>
                            : <i class="far fa-star"></i>
                    }</button>
                    <button class="btn btn-star margin-minileft" onClick={this.handle4}>{
                        this.state.rate>=4
                            ? <i class="fa fa-star"></i>
                            : <i class="far fa-star"></i>
                    }</button>
                    <button class="btn btn-star margin-minileft" onClick={this.handle5}>{
                        this.state.rate>=5
                            ? <i class="fa fa-star"></i>
                            : <i class="far fa-star"></i>
                    }</button>

                </div>                                                       
                <br/>
                <button className='btn btn-secondary center' onClick={this.handleSubmit}>儲存</button>
                <br/>
                <Link to={'/account/'+this.props.id}><button className='btn btn-secondary center'>回到訂單</button></Link>

            </div>
        );
    }
}

export default RatePage;