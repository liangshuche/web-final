import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Style.css';

//slides
import slide1 from '../img/slide1.png';
import slide2 from '../img/slide2.png';
import slide3 from '../img/slide3.png';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shops: '',
        };
        axios.get('/api/home')
            .then(res => {
                this.setState({ shops: res.data });
            })
            .catch(function (err) {
                console.log(err);
            });

    }
    
    
    render() {
        var deck_1 = [];
        for(let i=0; i<this.state.shops.length; ++i){
            if(i<3){
                let shops = 
                <div class="card">
                    <Link to={'/shop/'+this.state.shops[i].name}><img class="card-img-top"  src={this.state.shops[i].img}/></Link>
                    <div class="card-body">
                        <h5 class="card-title">{this.state.shops[i].name}</h5>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">Rate: {this.state.shops[i].rate}</small>
                    </div>
                
                </div>;
                deck_1.push(shops);}}

        var deck_2 = [];
        for(let i=3; i<this.state.shops.length; ++i){
            if(i<6){
                let shops = 
                <div class="card">
                    <Link to={'/shop/'+this.state.shops[i].name}><img class="card-img-top"  src={this.state.shops[i].img}/></Link>
                    <div class="card-body">
                        <h5 class="card-title">{this.state.shops[i].name}</h5>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">Rate: {this.state.shops[i].rate}</small>
                    </div>
                
                </div>;
                deck_2.push(shops);}}
        

        return (
            <div>
                <div id="slideControls" class="carousel slide container" data-ride="carousel">
                    <div class="carousel-inner center">
                        <div class="carousel-item active">
                            <img src={slide1} class="img-responsive center" alt="Responsive image"/>
                        </div>
                        <div class="carousel-item">
                            <img src={slide2} class="img-responsive center" alt="Responsive image"/>
                        </div>
                        <div class="carousel-item">
                            <img src={slide3} class="img-responsive center" alt="Responsive image"/>
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#slideControls" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#slideControls" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
                <div class='center'>
                    <div id="deck1" class="card-deck">
                        {deck_1}
                    </div>
                    <div id="deck1" class="card-deck">
                        {deck_2}
                    </div>
                </div>

            </div>
        );
    }
}

export default HomePage;