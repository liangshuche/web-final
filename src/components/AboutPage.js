import React, { Component } from 'react';
import developer1 from '../img/developer1.jpg';
import developer2 from '../img/developer2.jpg';
import developer3 from '../img/developer3.jpg';
import logo from '../img/icon.png';

class AboutPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div class="jumbotron jumbotron-fluid">
                    <div class="container">
                        <h1 class="display-4">About EEAT</h1>
                        <div class="card text-center card-dark cardlg">
                            <div class="card-body">
                            <p class="lead logo-text"> </p>
                            <p class="lead logo-text"> </p>
                            <p class="lead logo-text"> </p>
                                <img class="logo center" src={logo} alt="EEAT LOGO"/>
                                
                                <p class="lead logo-text">EEAT台灣在大台北地區、新竹、台中、高雄與超過5間餐廳合作！</p>
                                <p class="lead logo-text">作為全台最大的線上美食外送訂餐平台，我們深信訂餐應該是一件簡單、迅速又有趣的事，於是有了 EEAT 的誕生！</p>
                                <p class="lead logo-text">為您整合附近的優質餐廳並提供外送服務，讓您可以直接在線上訂餐，享受無需出門也能在家輕鬆吃美食！</p>
                                
                                <p class="lead"><div class="card-deck">
                            <div class="card">
                                <img class="card-img-top" src={developer1} alt="Card image cap"/>
                                <div class="card-body">
                                    <h5 class="card-title">梁書哲</h5>
                                    <p class="card-text">This is a guy wearing blue T-shirt standing beside a gray wall.</p>
                                </div>
                            </div>
                            <div class="card">
                                <img class="card-img-top" src={developer2} alt="Card image cap"/>
                                <div class="card-body">
                                    <h5 class="card-title">陳鴻智</h5>
                                    <p class="card-text">This is a guy wearing dark red T-shirt and having a gray bag.</p>
                                </div>
                            </div>
                            <div class="card">
                                <img class="card-img-top" src={developer3} alt="Card image cap"/>
                                <div class="card-body">
                                    <h5 class="card-title">杜承穎</h5>
                                    <p class="card-text">This is a guy wearing blue T-shirt and riding on a bike.</p>
                                </div>
                            </div></div></p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default AboutPage;