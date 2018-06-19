import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

let errBar = <div><br/></div>;
var options = {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
};
//import './PostPage.css';
class PostPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            file: null,
            wait: false,
            redirect: false,
            error: false,
        }

        this.socket = this.props.socket;
        this.socket.on('RECEIVE_NEW_POST', () => {
            this.setState({
                redirect: true,
            })
        });

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleTitleChange(ev) {
        this.setState({title: ev.target.value});
    }

    handleContentChange(ev) {
        this.setState({content: ev.target.value});
    }

    handleFileChange(ev) {
        this.setState({file: ev.target.files[0]});
    }



    handleOnClick() {
        if( this.state.title !== '' && this.state.content !== ''){
            let time = new Date();
            this.socket.emit('NEW_POST', {
                user: this.props.username,
                title: this.state.title,
                content: this.state.content,
                img: this.state.file,
                time: time.toLocaleString('en', options),
            });
            
            this.setState({
                title: '',
                content: '',
                file: null,
                wait: true,
                error: false,
            });
        } else {
            this.setState({
                error: true,
            })
        }
        
        
    }
    render() {
        let file_text =  'Choose file'
        let postBtn = <button onClick={this.handleOnClick} className="btn btn-outline-secondary btn-lg btn-block">Post</button>;
        if (this.state.file){
            file_text = this.state.file.name;
        }
        if (this.state.redirect) {
            return (
                <Redirect push to='/'/>
            );
        }
        if (this.state.wait) {
            postBtn = <button className="btn btn-outline-secondary btn-lg btn-block" disabled>Saving Post...</button>;
        }
        if (this.state.error){
            errBar = (
                <div class="alert alert-danger" role="alert">
                    Please fill in title and content!
                </div>
            );
        }
        else {
            errBar = (
                <div><br/></div>
            )
        }
        if( this.props.login) {
            return (
                <div>
                    
                
                    <div className='row'>
                        <div className='col-2'></div>
                        <div className='col-8'>
                            <br/>
                            <div class="alert alert-secondary text-center">
                                Write a new Post!
                            </div>
                            <div class="form-group">
                                <label >Title:</label>
                                <input type="text" class="form-control" id="title" value={this.state.title} onChange={this.handleTitleChange}></input>
                                <br/>
                                <label >Content:</label>
                                <textarea class="form-control" style={{resize: 'none'}}rows='10' id="content" value={this.state.content} onChange={this.handleContentChange}></textarea>
                            </div>
                        </div>
                        <div className='col-2'></div>
                    </div>
                    <div className='row'>
                        <div className='col-4'></div>
                        <div className='col-4'>
                            <div class="input-group mb-3">
                                <div class="custom-file">
                                    <input type="file" class="custom-file-input" onChange={this.handleFileChange}/>
                                    <label class="custom-file-label">{file_text}</label>
                                </div>
                            </div>
                            {errBar}
                            {postBtn}        
                        </div>
                        <div className='col-4'></div>                        
                    </div>
                </div>
            )
        }
        return (
            <Redirect push to='/login'/>
        );
    }
}

export default PostPage;