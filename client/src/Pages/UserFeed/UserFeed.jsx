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
            email: 'dummyemail',
            firstName: 'dummyfirst',
            lastName: 'dummylast',
            date: 'dummydate',
            content: 'dummycontent'
          },
          {
            email: 'dummyemail',
            firstName: 'dummyfirst',
            lastName: 'dummylast',
            date: 'dummydate',
            content: 'dummycontent'
          },
          {
            email: 'dummyemail',
            firstName: 'dummyfirst',
            lastName: 'dummylast',
            date: 'dummydate',
            content: 'dummycontent'
          }
        ]
      }
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

    render(){
      const posts=this.state.posts.map(post=>
          <Post firstName={post.firstName}
                lastName={post.lastName}
                date={post.date}
                content={post.content}
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