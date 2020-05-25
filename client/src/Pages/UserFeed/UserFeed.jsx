import React, {Component} from 'react';
import PostBox from './Components/PostBox'
import Post from './Components/Post';
import ProfileCard from '../Profile/Components/ProfileCard'
import './UserFeed.css'

class UserFeed extends Component{
    constructor(){
      super();

      this.state={
        userInfo: {}, 
        posts:[]
      }

      this.deletePost=this.deletePost.bind(this);
    }

    componentDidMount(){
      if(JSON.stringify(this.props.userInfo) !== JSON.stringify({})){
        this.setState({
          userInfo: this.props.userInfo
        }, ()=>{
          window.localStorage.setItem('userInfo', JSON.stringify(this.state.userInfo));
        });
      }

      else{
        this.setState({
          userInfo: JSON.parse(window.localStorage.getItem('userInfo'))
        }, ()=>{
          window.localStorage.setItem('userInfo', JSON.stringify(this.state.userInfo));
        });
      }
    
      fetch('/getposts', {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'}
      }
      ).then(response =>response.json())
      .then(posts =>{this.setState({posts: posts});
      });
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

      fetch('/deletepost', {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({id: id})
      }
      ).then(response =>response.json());
    }

    render(){
      const posts=this.state.posts.map(post=>
          <Post 
                key={post.id}  
                id={post.id}
                userEmail={this.state.userInfo.email}
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
            <ul className='Navbar'>
            </ul>

            <PostBox userInfo={this.state.userInfo}/>

            <br/>

            <ProfileCard 
                    profileInfo={
                      {userEmail: this.state.userInfo.email,
                       profileEmail: this.state.userInfo.email,
                       firstName: this.state.userInfo.firstName,
                       lastName: this.state.userInfo.lastName
                      }
                    } 
            />

            {posts.length!==0? posts : <p className='noposts'>There are no posts available</p>}
          </div>
      )
    }
}

export default UserFeed;