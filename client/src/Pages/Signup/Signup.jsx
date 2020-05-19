import React, {Component} from 'react';
import EntryNavbar from '../Navbars/EntryNavbar';
import SignupBox from './Components/SignupBox';
import './Signup.css';

class Signup extends Component{
    componentDidMount(){
        document.body.style.background='#5a535aee';
    }

    render(){
        return(
           <div>
               <EntryNavbar/>           
               <SignupBox getUserInfo={this.props.getUserInfo}/>
           </div>
        )
    }
}

export default Signup;