import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
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
          this.setState({
              profileEmail: this.props.location.state.profileEmail,
              userEmail: this.props.location.state.userEmail,
              firstName: this.props.location.state.firstName,
              lastName: this.props.location.state.lastName
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

export default withRouter(Profile);