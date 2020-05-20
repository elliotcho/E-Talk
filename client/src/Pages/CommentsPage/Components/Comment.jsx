import React from 'react';

function Comment(props){
    let styleDelete;

    if(props.userEmail === props.commentEmail){
        styleDelete={display: 'inline'};
    }

    else{
        styleDelete={display:'none'};
    }

    return(
        <div className='comment'>
            
            <h3>{props.firstName} {props.lastName}</h3>
            <h5>{props.date}</h5>
            
            <p>{props.content}</p>

            <button style={styleDelete} className='delete' onClick={()=>handleClick(props.commentId)}> 
                X 
            </button>
        </div>
    )
}

function handleClick(commentId){
    const data={
        action: 'delete',
        commentId: commentId
    }

    fetch('./comments',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(data)
    })
    .then(()=>{window.location.reload()});
}

export default Comment;