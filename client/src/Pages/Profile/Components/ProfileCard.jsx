import React from 'react';
import ProfileBio from './ProfileBio';
import ProfileImage from './ProfileImage';

function ProfileCard(props){
        const {
            firstName, 
            lastName, 
            email
        } =props.userInfo;

        return(
            <div className='profileCard'>
               <ProfileImage email={email}/>

               <p>{firstName} {lastName}</p>

                <ProfileBio email={email}/>
            </div>
        )
}

export default ProfileCard;