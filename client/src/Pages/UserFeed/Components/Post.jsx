import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import LikeSection from './LikeSection';
import CommentSection from './CommentSection';

import pic from './default.jpg';

class Post extends Component{
    constructor(){
        super();

        this.state={
            imageURL: ''
        }

        this.handleClick=this.handleClick.bind(this);
    }

    componentDidMount(){
        this.setState({}, ()=>{
            const data={
                action: 'load',
                email: this.props.postEmail
            }

            fetch('/profilepic', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }).then(response=> response.blob())
            .then(obj =>{
                this.setState({imageURL: URL.createObjectURL(obj)});
            });
        });
    }

    handleClick(){

    }

 
    render(){
        const {
            id, 
            userEmail, 
            postEmail, 
            firstName, 
            lastName, 
            date, 
            content, 
            deletePost
        } = this.props;
    
        let deleteButton;
    
        if(userEmail===postEmail){
             deleteButton=<button className='delete' onClick={()=>{deletePost(id);}}>
                                X
                          </button>
        }

        //<img src={this.state.imageURL} alt='profilePic'/>
    
        return(
            <div className='post'>
                <img src={this.state.imageURL} alt='profilePic'/>
    
                <div className='content'>
                    <h3 onClick={this.handleClick}>{firstName + " " + lastName}</h3>

                    {deleteButton}
            
                    <h5>{date.toLocaleString()}</h5>
                        
                    <p>{content}</p> 
    
                    <LikeSection id={id} userEmail={userEmail}/> 
    
                    <CommentSection id={id} 
                                    userEmail={userEmail} 
                                    firstName={firstName}
                                    lastName={lastName}
                    />
                </div>
            </div>
        )
    }
}

export default withRouter(Post);