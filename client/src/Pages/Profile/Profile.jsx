import React, {Component} from 'react';
import ProfileCard from './Components/ProfileCard';
import './Profile.css';

class Profile extends Component{
    render(){
        console.log(this.props.userInfo);

        return(
            <div>
                <ul className='Navbar'>
                </ul>

                <ProfileCard/>
            </div>
        )
    }
}

export default Profile;