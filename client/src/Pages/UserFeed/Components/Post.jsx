import React from 'react';

function Post(props){
    //props.userEmail

    let dummyemail='dummyemail';

    let deleteButton;
    
    if(props.userEmail===props.postEmail){
        deleteButton=<button className='delete' 
                             onClick={()=>{props.deletePost(props.id);}}
                      >
                      X
                      </button>
    }

    return(
        <div className='Post'>
            <h3>{props.firstName + "\t" + props.lastName} {deleteButton}</h3>

            <h5>{props.date.toLocaleString()}</h5>
            <p>
                {props.content}
            </p> 
        </div>
    )
}

export default Post;