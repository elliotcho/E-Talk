import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';

class CommentSection extends Component{
    constructor(){
        super();

        this.state={
            numComments: -1
        };

        this.handleClick=this.handleClick.bind(this);
    }

    componentDidMount(){
        const data={
            action: 'total',
            postId: this.props.id
        }

        fetch('/comments',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({data})
        }).then(response => response.json())
        .then(obj => {this.setState({numComments: obj.total})});
    }

    handleClick(e){
        this.props.history.push({
            pathname: '/comments',
            state:{
                postId: this.props.id,
                userEmail: this.props.userEmail,
                firstName: this.props.firstName,
                lastName: this.props.lastName
            }
        });
    }

    render(){
        const {numComments}=this.state;
        let commentsMsg;
        let styleCount;

        if(numComments>=1){
            commentsMsg=(numComments===1)? numComments + " comment": numComments + " comments";
        }

        else{
            styleCount={display: 'none'};
        }

        return(
            <div className='commentSection'>
                <button className='comment' onClick={this.handleClick}>
                     Comment
                </button> 

                <div className='commentCount' style={styleCount}> 
                     <div onClick={this.handleClick} className='commentsListLink'>
                            {commentsMsg}
                     </div> 
                </div>
            </div> 
        )
    }
}

export default withRouter(CommentSection);