import React, {Component} from 'react';
import ProfileBio from './ProfileBio';
import ProfileImage from './ProfileImage';

class ProfileCard extends Component{
    render(){
        return(
            <div className='profileCard'>
               <ProfileImage email={this.props.userInfo.email}/>

               <p>Gugsa Challa</p>

                <ProfileBio email={this.props.userInfo.email}/>
            </div>
        )
    }
}

export default ProfileCard;