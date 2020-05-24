import React, {Component} from 'react';

class Comment extends Component{
    constructor(){
        super();

        this.state={
            imageURL: ''
        }
    }

    componentDidMount(){
        this.setState({}, ()=>{
            const data={
                action: 'load',
                email: this.props.commentEmail
            }

            fetch('/profilepic', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }).then(response=> response.blob())
            .then(obj =>{
                this.setState({imageURL: URL.createObjectURL(obj)});
            });
        });
    }
    
    deleteComment(commentId){
        if(!window.confirm("Are you sure you want to delete this comment?")){return;}
    
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

    
    render(){
        const{
            commentId,
            userEmail,
            commentEmail,
            firstName,
            lastName,
            date,
            content,
        }=this.props;

        let styleDelete;

        if(userEmail === commentEmail){
            styleDelete={display: 'inline'};
        }

        else{
            styleDelete={display:'none'};
        }

        return(
            <div className='comment'>
                <img src={this.state.imageURL} alt='Profile Pic'/>
            
                <h3>{firstName} {lastName}</h3>
                <h5>{date}</h5>
            
                <p>{content}</p>

                <button style={styleDelete} className='delete' onClick={()=>this.deleteComment(commentId)}> 
                    X 
                </button>
            </div>
        )
    }
}

export default Comment;