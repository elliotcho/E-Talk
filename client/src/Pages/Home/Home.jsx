import React, {Component} from 'react';
import HomeNavbar from '../../HomeNavbar';
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
                <HomeNavbar/>

                <LoginMsg/>

                <LoginBox getUserInfo={this.props.getUserInfo}/>
            </div>
        )
    }
}

export default Home;
