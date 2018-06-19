import React, { Component } from 'react';

class AboutPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div class="jumbotron jumbotron-fluid">
                    <div class="container">
                        <h1 class="display-4">About</h1>
                        <p class="lead">Some Fancy Text</p>
                    </div>
                </div>
                <div>
                </div>
            </div>
        );
    }
}

export default AboutPage;