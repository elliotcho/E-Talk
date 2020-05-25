import React from 'react';
import ProfileBio from './ProfileBio';
import ProfileImage from './ProfileImage';

function ProfileCard(props){
        const {
            firstName, 
            lastName, 
            profileEmail
        } =props.profileInfo;

        return(
            <div className='profileCard'>
               <ProfileImage profileEmail={profileEmail}/>

                <p>{firstName} {lastName}</p>

                <ProfileBio profileEmail={profileEmail}/>
            </div>
        )
}

export default ProfileCard;