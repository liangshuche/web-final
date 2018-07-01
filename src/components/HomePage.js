import React, { Component } from 'react';
import avatar from '../img/avatar.jpg'
import { Link } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';

//slides
import Image from 'react-image-resizer';
import slide1 from '../img/1.jpg'
import slide2 from '../img/2.png'
import slide3 from '../img/Black.png'

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shops: '',
        }
        axios.get('http://localhost:5000/')
        .then(res => {
            this.setState({ shops: res.data });
        })
        .catch(function (err) {
          console.log(err);
        });

    }
    
    
    render() {
        var _shops = []
        for(let i=0; i<this.state.shops.length; ++i){
            let shop = 
                <div>
                    <Link to={'/shop/'+this.state.shops[i].name}><h1>Name: {this.state.shops[i].name}</h1></Link>
                    <h4>Rate: {this.state.shops[i].rate}</h4>
                    <img style={{ width: 200 }} src={this.state.shops[i].img}/>
                </div>
            _shops.push(shop);
        }
        return (
                <div id="carouselExampleControls" class="carousel slide container col-md-8 col-md-offset-2" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <Image className=" img-responsive" src={slide1} height={600} width={800} alt="slide1"/>
                        </div>
                        <div class="carousel-item">
                            <Image className="card-img-top fixed-img" src={slide2} height={600} width={800} alt="slide1"/>
                        </div>
                        <div class="carousel-item">
                            <img src={slide3} class="img-responsive" alt="Responsive image"/>
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>

        );
    }
}

export default HomePage;