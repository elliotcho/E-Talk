import React, {Component} from 'react';
import ProfileImage from './ProfileImage';

class ProfileCard extends Component{
    render(){
        return(
            <div className='profileCard'>
                <ProfileImage/>

               <p>Gugsa Challa</p>

               <button className='editProfile'>Edit Profile</button>
            </div>
        )
    }
}

export default ProfileCard;