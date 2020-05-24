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
        this.getImages=this.getImages.bind(this);
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
        .then(users =>{
            this.setState({list: users}, ()=>{this.getImages();});
        });
    }

    getImages(){
        const list=this.state.list;

        list.forEach(user => {
            fetch('/profilepic', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({action: 'load', email: user.email})
            }).then(response => response.blob())
            .then(obj => {
                user.imageURL=URL.createObjectURL(obj);
                
                this.setState({
                    list: list
                });
            });
        });
    }

    render(){
        const list=this.state.list.map(user =>{
            return(
                <div className='userContainer'>
                    <img src={user.imageURL} alt='Profile Pic'/>
                    <p>{user.firstName} {user.lastName}</p>
                </div>
            )
        });

        return(
            <div className='likesPage'>
                <ul className='Navbar'>
                    <li><NavLink exact to='/userfeed' className='backButton'>&larr;</NavLink></li>
                    <div className='likesHeader'>Post Liked By...</div>
                </ul>

                {list}
            </div>
        )
    }
}

export default withRouter(LikesPage);