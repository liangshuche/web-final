import React, { Component } from 'react';

class ShopPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            shopname: this.props._shop,
        }
    }

    render() {
        return (


            <div>
                <h6>Shop ID:{this.state.shopname}</h6>
                <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                        <img class="d-block w-100" src="https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&h=350" alt="First slide"/>
                        </div>
                        <div class="carousel-item">
                        <img class="d-block w-100" src="https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&h=350" alt="Second slide"/>
                        </div>
                        <div class="carousel-item">
                        <img class="d-block w-100" src="https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&h=350" alt="Third slide"/>
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>

                <div class="card mb-3">
                    <img class="card-img-top" src="https://images.theconversation.com/files/180401/original/file-20170731-22175-67v3q2.jpg?ixlib=rb-1.1.0&rect=0%2C589%2C5472%2C2654&q=45&auto=format&w=1356&h=668&fit=crop" alt="Card image cap"/>
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>

                <div class="card mb-3">
                    <img class="card-img-top" src='https://cdn.cnn.com/cnnnext/dam/assets/171027052520-processed-foods-exlarge-tease.jpg' alt="Card image cap"/>
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
        
                <h1>{this.shopname}</h1>
            </div>
        );
    }
}

export default ShopPage;