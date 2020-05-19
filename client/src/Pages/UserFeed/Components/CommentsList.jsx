import React, {Component} from 'react';
import {NavLink, withRouter} from 'react-router-dom';

class CommentsList extends Component{
    /*constructor(){
        super();
        this.state={
            postId: -1,
            list:[]
        }

        this.getUsers=this.getUsers.bind(this);
    }

    componentDidMount(){
        document.body.style.background='#5a535aee';

        const {postId}=this.props.location;

        if(typeof postId!== 'undefined'){
            this.setState({
                postId: postId
            }, ()=>{
                window.localStorage.setItem('postId', this.state.postId);
                this.getUsers();
            });
        }

        else{
            this.setState({
                postId: window.localStorage.getItem('postId')
            }, ()=>{
                window.localStorage.setItem('postId', this.state.postId);
                this.getUsers();
            });
        }
    }

    getUsers(){
        fetch('/likedby', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({postId: this.state.postId})
        }).then(response => response.json())
        .then(users =>{
            this.setState({list: users});
        });
    }*/

    render(){
        /*const list=this.state.list.map(user =>{
            return(
                <div className='user'>
                    <div>{user.firstName} {user.lastName}</div>
                    <p>{user.content}</p>
                </div>
            )
        });*/

        return(
            <div className='commentsList'>
                <ul className='Navbar'>
                    <div className='header'>Comments</div>
                    <li><NavLink exact to='/userfeed' className='back'>&larr;</NavLink></li>
                </ul>
            </div>
        )
    }
}

export default withRouter(CommentsList);