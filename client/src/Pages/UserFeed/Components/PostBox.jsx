import React, {Component} from 'react';

class PostBox extends Component{
    constructor(){
        super();
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
  
        const {email, firstName, lastName}=this.props.userInfo;
        const content=e.target.content.value;
  
        const data={
            email: email,
            firstName: firstName,
            lastName: lastName,
            content: content,
        }
  
        fetch('/createpost', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        })
        .then(() =>{
          window.location.reload();
        });
    }

    render(){
        return(
            <div className='postBox'>
                <h2>What would you like to share?</h2>

                <form onSubmit={this.handleSubmit}>
                    <textarea minLength='1' 
                              maxLength='60000' 
                              name='content' 
                              required={true}
                    />
                    
                    <button>Post</button>
                </form>
            </div>
        )
    }
}

export default PostBox;