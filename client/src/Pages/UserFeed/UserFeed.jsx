import React, {Component} from 'react';
import './UserFeed.css'

class UserFeed extends Component{
    constructor(){
      super();
      this.handleSubmit=this.handleSubmit.bind(this);
    }

    componentDidMount(){
      document.body.style.background='white';

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
        posts.forEach(post =>{
          console.log(post);
        });
      });
    }

    handleSubmit(e){
      e.preventDefault();

      const {email, firstName, lastName}=this.props.userInfo;
      const content=e.target.content.value;

      const data={
          email: email,
          firstName: firstName,
          lastName: lastName,
          content: content,
      }

      fetch('/createpost', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
      }
      ).then(response =>{
        window.location.reload();
      });
  }

    render(){
      return(
          <div className='UserFeed'>
            <ul className='UserNavbar'>
            </ul>

            <form className='UserPost' onSubmit={this.handleSubmit}>
              <h2>What would you like to share?</h2>
              <textarea minlength='1' maxlength='60000' name='content' required='true'/>
              <button>Post</button>
            </form>
          </div>
      )
    }
}

export default UserFeed;