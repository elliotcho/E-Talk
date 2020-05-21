import React, {Component} from 'react';
import ProfileCard from './Components/ProfileCard';
import './Profile.css';

class Profile extends Component{
    constructor(){
        super();

        this.state={
            userInfo: {}
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
    }

    render(){
        return(
            <div>
                <ul className='Navbar'>
                </ul>

                <ProfileCard userInfo={this.state.userInfo}/>
            </div>
        )
    }
}

export default Profile;