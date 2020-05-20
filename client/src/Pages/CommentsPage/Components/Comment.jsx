import React from 'react';

function Comment(props){
    return(
        <div className='comment'>
            
            <h3>{props.firstName} {props.lastName}</h3>
            <h5>{props.date}</h5>
            
            <p>{props.content}</p>
        </div>
    )
}

export default Comment;