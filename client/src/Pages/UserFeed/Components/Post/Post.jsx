import React from 'react';
import LikeSection from './LikeSection';
import CommentSection from './CommentSection';

function Post(props){
    const {
        id, 
        userEmail, 
        postEmail, 
        firstName, 
        lastName, 
        date, 
        content, 
        deletePost
    } = props;

    let deleteButton;

    if(userEmail===postEmail){
         deleteButton=<button className='delete' onClick={()=>{deletePost(id);}}>
                        X
                      </button>
    }

    return(
        <div className='Post'>
            <h3>{firstName + " " + lastName} {deleteButton}</h3>
    
            <h5>{date.toLocaleString()}</h5>
                
            <p>{content}</p> 

            <LikeSection id={id} userEmail={userEmail}/> 

            <CommentSection id={id} userEmail={userEmail}/>
        </div>
    )
}

export default Post;