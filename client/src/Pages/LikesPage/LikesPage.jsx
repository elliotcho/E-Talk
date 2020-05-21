import React, {Component} from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import './LikesPage.css';

class LikesPage extends Component{
    constructor(){
        super();
        
        this.state={
            postId: -1,
            list:[]
        }

        this.getUsers=this.getUsers.bind(this);
    }

    componentDidMount(){
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
        .then(users =>{this.setState({list: users});});
    }

    render(){
        const list=this.state.list.map(user =>{
            return(
                <div className='user'>
                    <div>{user.firstName} {user.lastName}</div>
                </div>
            )
        });

        return(
            <div className='likesPage'>
                <ul className='Navbar'>
                    <li><NavLink exact to='/userfeed' className='back'>&larr;</NavLink></li>
                    <div className='likesHeader'>Post Liked By...</div>
                </ul>

                {list}
            </div>
        )
    }
}

export default withRouter(LikesPage);