import React, {Component} from 'react';
import HomeNavbar from '../../HomeNavbar';
import SignupBox from './Components/SignupBox';
import './Signup.css';

class Signup extends Component{
    render(){
        return(
           <div className='Signup'>
               <HomeNavbar/>
               <h1>Create your account</h1>
               <SignupBox getUserInfo={this.props.getUserInfo}/>
           </div>
        )
    }
}

export default Signup;