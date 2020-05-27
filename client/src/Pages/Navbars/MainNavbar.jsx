import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

class MainNavbar extends Component{
    constructor(){
        super();

        this.state={
            email: ''
        }

        this.toHome=this.toHome.bind(this);
        this.logout=this.logout.bind(this);
    }

    toHome(){
        this.props.history.push('/userfeed');
    }

    logout(){
        window.localStorage.clear();
        window.location.href='/';
    }

    render(){
        return(
            <ul className='Navbar MainNavbar'>
               <li onClick={this.toHome}>Home</li>
               <li onClick={this.logout}>Logout</li>
            </ul>
        )
    }
}

export default withRouter(MainNavbar);