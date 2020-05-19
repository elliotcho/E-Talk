import React, {Component} from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import './list.css';

class CommentsList extends Component{
    constructor(){
        super();
        this.state={
            postId: -1,
            userEmail: "",
            firstName: "",
            lastName: "",
            list:[]
        }
    }

    componentDidMount(){
        document.body.style.background='#5a535aee';

        const {
            postId,
            userEmail,
            firstName,
            lastName
        }=this.props.location;

        if(typeof postId!== 'undefined'){
            this.setState({
                postId: postId,
                userEmail: userEmail,
                firstName: firstName,
                lastName:lastName
            }, ()=>{
                window.localStorage.setItem('info', JSON.stringify(this.state));
            });
        }

        else{
            this.setState({
                ...JSON.parse(window.localStorage.getItem('info')),
            }, ()=>{
                window.localStorage.setItem('info', JSON.stringify(this.state));
            });
        }
    }

   

    render(){
        return(
            <div className='commentsList'>
                <ul className='Navbar'>
                    <div className='header'>Comments</div>
                    <li><NavLink exact to='/userfeed' className='back'>&larr;</NavLink></li>
                </ul>

                <form onSubmit={this.handleSubmit}>
                    <textarea
                        minLength='1' 
                        maxLength='8000' 
                        name='content' 
                        required={true}
                    />
                </form>
            </div>
        )
    }
}

export default withRouter(CommentsList);