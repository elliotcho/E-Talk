import React from 'react';

function UserFeed(props){
    return(
        <div style={{color: 'white'}}>
          Welcome {props.userInfo.firstName} {props.userInfo.lastName}
        </div>
    )
}

export default UserFeed;