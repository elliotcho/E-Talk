import React, {Component} from 'react';
import PostBox from './Components/PostBox'
import Post from './Components/Post';
import './UserFeed.css'

class UserFeed extends Component{
    constructor(){
      super();
      this.state={
        posts:[
          {
            id:1,
            email: 'dummyemail',
            firstName: 'dummyfirst',
            lastName: 'dummylast',
            date: 'dummydate',
            content: 'dummycontent'
          },
          {
            id: 2,
            email: 'dummyemail',
            firstName: 'dummyfirst',
            lastName: 'dummylast',
            date: 'dummydate',
            content: 'dummycontent'
          },
          {
            id: 3,
            email: 'dummyemail',
            firstName: 'dummyfirst',
            lastName: 'dummylast',
            date: 'dummydate',
            content: 'dummycontent'
          }
        ]
      }

      this.deletePost=this.deletePost.bind(this);
    }

    componentDidMount(){
      document.body.style.background='#5a535aee';

      fetch('/getposts', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        }
      }
      ).then(response =>
        response.json()
      )
      .then(posts =>{
        this.setState({
          posts: posts
        });
      });
    }

    deletePost(id){
      if(!window.confirm("Are you sure you want to delete this post?")){
        return;
      }

      const posts=this.state.posts;   

      fetch('/deletepost', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        }, 
        body: JSON.stringify({id: id})
      }
      ).then(response =>
        response.json()
      )
      .then(() =>{
        posts.splice(posts.indexOf(id), 1);   
      });
      
      this.setState({posts: posts});
    }

    render(){
      const posts=this.state.posts.map(post=>
          <Post 
                id={post.id}
                userEmail={this.props.userInfo.email}
                postEmail={post.email}
                firstName={post.firstName}
                lastName={post.lastName}
                date={post.date}
                content={post.content}
                deletePost={this.deletePost}
          />
      );

      return(
          <div className='UserFeed'>
            <ul className='UserNavbar'>
            </ul>

            <PostBox userInfo={this.props.userInfo}/>

            <br/>

            {posts}
          </div>
      )
    }
}

export default UserFeed;