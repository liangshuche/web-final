import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Image from 'react-image-resizer';
import avatar from '../img/avatar.jpg';
import './Style.css';

class PostList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        }
        this.socket = this.props.socket;

        this.socket.emit('GET_POST');
        
        this.socket.on('RECEIVE_POST', (data) => {
            this.setState({ posts: data});
        });

        this.handleOnClick = this.handleOnClick.bind(this);
    }
    handleOnClick(id) {
        
    }
    render() {
        let card_list = [];

            for (let i=0; i<this.state.posts.length; ++i){
                let url = '/post/'+this.state.posts[i]._id;
                card_list.push(
                    <div className="card">
                        <Image className="card-img-top fixed-img" src={avatar} height={200} width={295} alt="img"/>
                        <div className="card-body">
                            <h5 className="card-title text-truncate">{this.state.posts[i].title}</h5>
                            <p className="card-text text-truncate d-block">{this.state.posts[i].content}</p>
                            <Link to={url}><span onClick={() => this.handleOnClick(this.state.posts[i].id)}>Read more...</span></Link>
                        </div>
                        <div className="card-footer">
                            <small className="text-muted">{this.state.posts[i].user} - <span className='text-right'>{this.state.posts[i].time}</span></small>
                        </div>
                    </div>
                )
            }
        return (
            <div className="container-scroll">
                <div className="d-flex flex-row flex-now">
                    {card_list}
                </div>
            </div>
        );
    }
}

export default PostList;