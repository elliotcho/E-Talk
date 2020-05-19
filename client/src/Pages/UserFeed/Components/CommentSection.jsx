import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';

class CommentSection extends Component{
    componentDidMount(){
     
    }

    render(){
        const data={
            postId: this.props.id,
            userEmail: this.props.userEmail,
            firstName: this.props.firstName,
            lastName: this.props.lastName 
        }

        return(
            <div className='commentSection'>
                <button className='comment'>
                     Comment
                </button> 

                <div className='commentCount'>
                    <div>    
                     <NavLink exact to={{pathname: '/comments', ...data}} className='commentsListLink'>
                            128 Comments
                     </NavLink> 
                    </div>
                </div>
            </div> 
        )
    }
}

export default CommentSection;