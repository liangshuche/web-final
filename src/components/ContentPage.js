import React, { Component } from 'react';


class ContentPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: this.props._id,
            user: '',
            title: '',
            content: '',
            time: '',   
        }

        this.socket = this.props.socket;

        this.socket.emit('GET_POST_BY_ID', (this.state._id));         
        
        this.socket.on('RECEIVE_POST_BY_ID', (data) => {
            this.setState({
                user: data.user,
                title: data.title,
                content: data.content,
                time: data.time,
            });
        });
    }

    componentWillReceiveProps = (nextProps)=> {
        if (nextProps._id !== this.state._id) {
            this.socket.emit('GET_POST_BY_ID', (nextProps._id));
            this.setState({_id: nextProps._id});
        }
        
    };

    render() {
        return (
            <div>
            <div className='row'>
                <br/>
                <br/>
            </div>
            <div className='row'>
                <div className='col-1'></div>
                <div class="col-10 shadow p-3 mb-5 bg-white rounded border-top">
                    <br/>
                    <h1 className='text-truncate'>{this.state.title}</h1>
                    <h4 className='text-truncate'>{this.state.user}</h4>
                    <h5 className='text-truncate' style={{color: 'gray'}}>{this.state.time}</h5>
                    <br/>
                    <br/>
                    {this.state.content.split('\n').map((item, key) => {
                        return <span key={key}>{item}<br/></span>
                    })}
                </div>
                <div className='col-1'></div>                
            </div>
            </div>
        );
    }
}

export default ContentPage;