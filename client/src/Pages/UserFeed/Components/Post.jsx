import React from 'react';

function Post(props){
    return(
        <div className='Post'>
            <h3>{props.firstName + " " + props.lastName}</h3>
            <h4>{props.date.toLocaleString()}</h4>
            <p>
                {props.content}
            </p> 
        </div>
    )
}

export default Post;