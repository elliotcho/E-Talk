import React from 'react';
import EntryNavbar from '../Navbars/EntryNavbar';
import SignupBox from './Components/SignupBox';
import './Signup.css';

function Signup(props){
    
    return(
        <div>
            <EntryNavbar/>           
            <SignupBox getUserInfo={props.getUserInfo}/>
        </div>
    )
    
}

export default Signup;