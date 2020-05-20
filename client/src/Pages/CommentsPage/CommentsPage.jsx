import React, {Component} from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import Comment from './Components/Comment';
import './CommentsPage.css';

class CommentsPage extends Component{
    constructor(){
        super();
        this.state={
            postId: -1,
            userEmail: "",
            firstName: "",
            lastName: "",
            list:[]
        }

        this.handleSubmit=this.handleSubmit.bind(this);
        this.getComments=this.getComments.bind(this);
        this.pressEnter=this.pressEnter.bind(this);
    }

    componentDidMount(){
        document.body.style.background='#5a535aee';

        if(typeof this.props.location.state!== 'undefined'){
            this.setState({
                postId: this.props.location.state.postId,
                userEmail: this.props.location.state.userEmail,
                firstName: this.props.location.state.firstName,
                lastName: this.props.location.state.lastName
            }, ()=>{
                window.localStorage.setItem('info', JSON.stringify(this.state));
                this.getComments();
            });
        }

        else{
            this.setState({
                ...JSON.parse(window.localStorage.getItem('info')),
            }, ()=>{
                window.localStorage.setItem('info', JSON.stringify(this.state));
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

        const{postId, userEmail, firstName, lastName}=this.state;
        const content=e.target.content.value;

        if(this.checkIfEmpty(content)){return;}

        const data={
            action: 'comment',
            postId: postId,
            userEmail: userEmail,
            firstName: firstName,
            lastName: lastName,
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
        return(
            <div className='commentsPage'>
                <ul className='Navbar'>
                    <div className='header'>Comments</div>
                    <li><NavLink exact to='/userfeed' className='back'>&larr;</NavLink></li>
                </ul>

                <Comment/>

                <form ref={element => this.myComment=element} onSubmit={this.handleSubmit}>
                    <textarea
                        minLength='1' 
                        maxLength='8000' 
                        name='content' 
                        required={true}
                        onKeyDown={this.pressEnter}
                    />
                </form>
            </div>
        )
    }
}

export default withRouter(CommentsPage);