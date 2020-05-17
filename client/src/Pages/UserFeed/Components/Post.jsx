import React, {Component}from 'react';
import {NavLink} from 'react-router-dom';

class Post extends Component{
    constructor(){
        super();

        this.state={
            numLikes: 0,
            userLiked: false,
            likeColor: 'white'
        }

        this.handleLike=this.handleLike.bind(this);
    }

    componentDidMount(){
        const data={
            action: 'total',
            postId: this.props.id,
            userEmail: this.props.userEmail
        }

        fetch('/handlelikes', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON.stringify(data)
        })
        .then(response => response.json())
        .then(obj=>{
            this.setState({
                numLikes: obj.total,
                userLiked: obj.userLiked
            }, ()=>{
                if(this.state.userLiked){
                    this.setState({
                        likeColor: 'red'
                    });
                }
            });
        }); 
    }

    handleLike(e){
        let {color} = e.target.style;
        let {numLikes}=this.state;

        let action;

        if(color==='red'){
            e.target.style.color='white';

            this.setState({
                numLikes: numLikes-1
            });

            action="unlike";
        }

        else{
            e.target.style.color='red';
            this.setState({
                numLikes: numLikes+1
            });

            action="like";
        }

        const data={
            action: action,
            postId: this.props.id,
            userEmail: this.props.userEmail
        }

        fetch('/handlelikes', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json());  
    }
    
    render(){
        const {
               id, 
               userEmail, 
               postEmail, 
               firstName, 
               lastName, 
               date, 
               content, 
               deletePost
            } = this.props;

        let deleteButton;
    
        if(userEmail===postEmail){
            deleteButton=<button className='delete' 
                                 onClick={()=>{deletePost(id);}}
                          >
                          X
                          </button>
        }

        let {numLikes}=this.state;
        let likesMsg="";
        let likeCursor;

        if(numLikes>=1){
            likesMsg=(numLikes===1)? numLikes + " like": numLikes+ " likes";
            likeCursor='pointer';
        }
        
        return(
            <div className='Post'>
                <h3>{firstName + " " + lastName} {deleteButton}</h3>
    
                <h5>{date.toLocaleString()}</h5>
                <p>
                    {content}
                </p> 

                <div className='likesContainer'>
                    <button className='like' 
                            onClick={this.handleLike}
                            style={{color: this.state.likeColor}}
                    >
                            &hearts;
                    </button> 
                    <div className='likesMsg' style={{cursor: likeCursor}}>    
                        {(likesMsg!=="") ? <NavLink 
                                                exact to={{pathname: '/likedby',
                                                           postId: id}}
                                                className='likedByLink'
                                            >
                                                {likesMsg}
                                            </NavLink> 
                                            : null}
                    </div>
                </div>  
            </div>
        )
    }
}

export default Post;