import React from 'react';
import LoginNavbar from '../Navbars/LoginNavbar';
import SignupBox from './Components/SignupBox';
import './Signup.css';

function Signup(props){
    
    return(
        <div>
            <LoginNavbar/>           
            <SignupBox getUserInfo={props.getUserInfo}/>
        </div>
    )
    
}

export default Signup;