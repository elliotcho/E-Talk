import React from 'react';
import ProfileBio from './ProfileBio';
import ProfileImage from './ProfileImage';

function ProfileCard(props){
        const {
            firstName, 
            lastName, 
            profileEmail,
            userEmail
        } =props.profileInfo;

        return(
            <div className='profileCard'>
               <ProfileImage profileEmail={profileEmail} userEmail={userEmail}/>

                <p>{firstName} {lastName}</p>

                <ProfileBio profileEmail={profileEmail} userEmail={userEmail}/>
            </div>
        )
}

export default ProfileCard;