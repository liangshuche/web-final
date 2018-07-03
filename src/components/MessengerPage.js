import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import './Messenger.css';
//import './Style.css';
const $ = require('jquery');

class MessengerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: this.props.account,
            message: '',
            log: '',
        };

        axios.get('/api/messenger')
            .then(res => {
                this.setState({ log: res.data.log });
            })
            .then(() => {
                $('.chat-log').animate({ scrollTop: this.state.log.length * 80 }, 200);
            })
            .catch(function (err) {
                console.log(err);
            });
    
        const loadMessage = (data) => {
            this.setState({ log: [...this.state.log, data] });
        };

        this.socket = io();
        this.socket.on('RECEIVE_MESSAGE', (data) => {
            loadMessage(data);
            $('.chat-log').animate({ scrollTop: this.state.log.length * 80 }, 200);
        });

        this.sendMessage = this.sendMessage.bind(this);
        this.autoGrow = this.autoGrow.bind(this);
    }
    sendMessage(ev) {
        ev.preventDefault();
        if (ev.keyCode === 13) {
            this.setState({ message: '' });
            if (this.state.message !== '\n') {
                this.socket.emit('SEND_MESSAGE', {
                    from: this.state.account,
                    message: this.state.message.trim(),
                });
                this.setState({ message: '' });
                $('.chat-log').animate({ scrollTop: $('.chat-log')[0].scrollHeight }, 1000);
                $('.input-box').css('height', '45px');
            }
        }
        else {
            if (ev.target.scrollHeight < 200)
                ev.target.style.height = `${ev.target.scrollHeight}px`;
        }
    }

    autoGrow(ev) {
        this.setState({ message: ev.target.value });
    }

    render() {
        if (!this.state.account) {

            return (
                <div>     
                    <Redirect push to='/login'/>
                </div>
            );
        }
        const log = [];
        for (let i = 0; i < this.state.log.length; i++) {
            if (this.state.log[i].from === this.state.account) {
                log.push(
                    <div className="Message-to">
                        <span className="Message-to-box">
                            {this.state.log[i].message}
                        </span>
                        <p className="time-str">{this.state.log[i].from+' '+this.state.log[i].time}</p>
                    </div>
                );
            } else if (this.state.log[i].from === 'Bot'){
                log.push(
                    <div className="Message-bot">
                        <span className="Message-bot-box">
                            {this.state.log[i].message}
                        </span>
                        <p className="time-str">{this.state.log[i].time+' '+this.state.log[i].from}</p>
                    </div>
                )
            }
            else {
                log.push(
                    <div className="Message-from">
                        <span className="Message-from-box">
                            {this.state.log[i].message}
                        </span>
                        <p className="time-str">{this.state.log[i].time+' '+this.state.log[i].from}</p>
                    </div>
                );
            }
        }


        return (
            <div className="container">
                <div className="row section2">
                    <div className="col-2"></div>
                    <div className="col-8 main-box">
                        <div className="row">
                            <div className="col-12 chat-log">
                                {log}
                            </div>
                        </div>
                        <div className="row bottom">
                            <textarea
                                type="text"
                                className="form-control input-box"
                                placeholder="Enter Message..."
                                value={this.state.message}
                                onChange={this.autoGrow}
                                onKeyUp={this.sendMessage}
                            />
                        </div>
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
        );
    }
}

export default MessengerPage;
