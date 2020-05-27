import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import BackNavbar from '../Navbars/BackNavbar';
import Comment from './Components/Comment';
import './CommentsPage.css';

class CommentsPage extends Component{
    constructor(){
        super();
        
        this.state={
            postId: -1,
            userEmail: "",
            list:[]
        }

        this.getComments=this.getComments.bind(this);
        this.pressEnter=this.pressEnter.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    componentDidMount(){
        if(typeof this.props.location.state!== 'undefined'){
            this.setState({
                postId: this.props.location.state.postId,
                userEmail: this.props.location.state.userEmail
            }, ()=>{
                window.localStorage.setItem('comments', JSON.stringify(this.state));
                this.getComments();
            });
        }

        else{
            this.setState({
                ...JSON.parse(window.localStorage.getItem('comments')),
            }, ()=>{
                window.localStorage.setItem('comments', JSON.stringify(this.state));
                this.getComments();
            });
        }
    }

    getComments(){
        const data={
            action: 'get',
            postId: this.state.postId
        }

        fetch('/comments', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(data)
        }).then(response => response.json())
        .then(obj=> {this.setState({list: obj.comments})});
    }

    checkIfEmpty(s){
        let split=s.split('\n');

        let flag=true;

        for(let i=0;i<split.length;i++){
            if(split[i].length>0){
                flag=false;
                break;
            }
        }

        return flag;
    }

    handleSubmit(e){
        e.preventDefault();

        const{postId, userEmail}=this.state;
        const content=e.target.content.value;

        if(this.checkIfEmpty(content)){return;}

        const data={
            action: 'comment',
            postId: postId,
            userEmail: userEmail,
            content: content
        }

        fetch('/comments', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(data)
        }).then(()=>{window.location.reload()});
    }

    pressEnter(e){
        if(e.keyCode===13 && e.shiftKey===false){
            this.myComment.dispatchEvent(new Event('submit'));   
        }
    }

    render(){
        const comments=this.state.list.map(comment =>{
            return(
                <Comment 
                    key={comment.commentId}
                    commentId={comment.commentId}
                    userEmail={this.state.userEmail}
                    commentEmail={comment.email}
                    firstName={comment.firstName}
                    lastName={comment.lastName}
                    date={comment.date}
                    content={comment.content}
                />
            )
        });

        return(
            <div className='commentsPage'>
                <BackNavbar title='Comments'/>

                <form ref={element => this.myComment=element} onSubmit={this.handleSubmit}>
                    <textarea
                        minLength='1' 
                        maxLength='300' 
                        name='content' 
                        required={true}
                        onKeyDown={this.pressEnter}
                    />
                </form>

                {comments.length!==0? comments: <p className='nocomments'>No comments available</p>}
            </div>
        )
    }
}

export default withRouter(CommentsPage);