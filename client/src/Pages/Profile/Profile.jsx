import React, {Component} from 'react';
import ProfileCard from './Components/ProfileCard';
import Post from '../UserFeed/Components/Post';
import './Profile.css';

class Profile extends Component{
    constructor(){
        super();

        this.state={
            userInfo: {},
            posts: []
        }
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

          this.setState({}, ()=>{
              const data={email: this.props.userInfo.email};

              fetch('/userposts', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
              }).then(response => response.json())
              .then(obj =>{this.setState({posts: obj})});
          });
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
              //deletePost={this.deletePost}
          />
        );

        return(
            <div>
                <ul className='Navbar'>
                </ul>

                <ProfileCard userInfo={this.state.userInfo}/>

                {posts}
            </div>
        )
    }
}

export default Profile;