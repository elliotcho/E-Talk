import React from 'react';
import LoginNavbar from '../Navbars/LoginNavbar';
import LoginMsg from './Components/LoginMsg'
import LoginBox from './Components/LoginBox';
import './Home.css';

function Home(props){
    return(
        <div>
            <LoginNavbar/>

            <LoginMsg/>

            <LoginBox getUserInfo={props.getUserInfo}/>
        </div>
    )
}

export default Home;
