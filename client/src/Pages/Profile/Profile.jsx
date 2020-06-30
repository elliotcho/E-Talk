import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import MainNavbar from '../Navbars/MainNavbar';
import ProfileCard from './Components/ProfileCard';
import Post from '../UserFeed/Components/Post';
import './Profile.css';

class Profile extends Component{
    constructor(){
        super();

        this.state={
            profileEmail:'',
            userEmail:'',
            firstName:'',
            lastName:'', 
            posts: []
        }

        this.getPosts=this.getPosts.bind(this);
        this.deletePost=this.deletePost.bind(this);
    }

    componentDidMount(){
        if(typeof this.props.location.state!== 'undefined'){
            this.setState({
                profileEmail: this.props.location.state.profileEmail,
                userEmail: this.props.location.state.userEmail,
                firstName: this.props.location.state.firstName,
                  lastName: this.props.location.state.lastName
            }, ()=>{
                  window.localStorage.setItem('profile', JSON.stringify(this.state));
                  this.getPosts();
              });
        }

        else{
            this.setState({
                  ...JSON.parse(window.localStorage.getItem('profile')),
            }, ()=>{
                 window.localStorage.setItem('profile', JSON.stringify(this.state));
                 this.getPosts();
             });
        }
    }

    getPosts(){
        fetch('http://localhost:5000/userposts', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: this.state.profileEmail})
        }).then(response => response.json())
        .then(obj=> {this.setState({posts: obj});});
    }

    deletePost(id){
        if(!window.confirm("Are you sure you want to delete this post?")){
            return;
        }
    
          const posts=this.state.posts;   
    
          for(let i=0;i<posts.length;i++){
            if(id===posts[i].id){
              posts.splice(i, 1);
              break;
            }
          }
    
          this.setState({posts: posts});
    
          fetch('http://localhost:5000/deletepost', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({id: id})
          }
          ).then(response =>response.json());
    }

    render(){
        const posts=this.state.posts.map(post =>
                <Post
                    key={post.id}
                    id={post.id}
                    userEmail={this.state.userEmail}
                    postEmail={post.email}
                    firstName={post.firstName}
                    lastName={post.lastName}
                    date={post.date}
                    content={post.content}
                    deletePost={this.deletePost}
                />
        );

        return(
            <div className='Profile'>
                <MainNavbar email={this.state.userEmail}/>

                <ProfileCard profileInfo={this.state}/>

                {posts.length!==0? posts: <p className='noposts'>There are no posts available</p>}
            </div>
        )
    }
}

export default withRouter(Profile);