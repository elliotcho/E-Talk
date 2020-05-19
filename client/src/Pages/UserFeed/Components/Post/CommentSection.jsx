import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';

class CommentSection extends Component{
    componentDidMount(){
     
    }

    render(){
        const {id}=this.props;

        return(
            <div className='commentSection'>
                <button className='comment'>
                     Comment
                </button> 

                <div className='commentCount'>
                    <div>    
                     <NavLink exact to={{pathname: '/comments', postId: id}} className='likedByLink'>
                            128 Comments
                     </NavLink> 
                    </div>
                </div>
            </div> 
        )
    }
}

export default CommentSection;