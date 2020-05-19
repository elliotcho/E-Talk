import React, {Component} from 'react';
import EntryNavbar from '../Navbars/EntryNavbar';
import LoginMsg from './Components/LoginMsg'
import LoginBox from './Components/LoginBox';
import './Home.css';

class Home extends Component{
    componentDidMount(){
        document.body.style.background='#5a535aee';
    }

    render(){
        return(
            <div>
                <EntryNavbar/>

                <LoginMsg/>

                <LoginBox getUserInfo={this.props.getUserInfo}/>
            </div>
        )
    }
}

export default Home;
