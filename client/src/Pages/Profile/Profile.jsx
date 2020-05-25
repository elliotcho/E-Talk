import React, {Component} from 'react';
import ProfileCard from './Components/ProfileCard';
import './Profile.css';

class Profile extends Component{
    constructor(){
        super();

        this.state={
            profileEmail:'',
            userEmail:'',
            firstName:'',
            lastName:''
        }
    }

    componentDidMount(){
      if(typeof this.props.location.state!== 'undefined'){
          const {
            profileEmail,
            userEmail,
            firstName, 
            lastName
          }=this.props.location.state;

          this.setState({
              profileEmail: profileEmail,
              userEmail: userEmail,
              firstName: firstName,
              lastName: lastName
          }, ()=>{
              window.localStorage.setItem('profile', JSON.stringify(this.state));
          });
      }

      else{
          this.setState({
              ...JSON.parse(window.localStorage.getItem('profile')),
          }, ()=>{
              window.localStorage.setItem('profile', JSON.stringify(this.state));
          });
      }
  }

    render(){
        return(
            <div>
                <ul className='Navbar'>
                </ul>

                <ProfileCard profileInfo={this.state}/>
            </div>
        )
    }
}

export default Profile;