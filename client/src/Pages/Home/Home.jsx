import React from 'react';
import EntryNavbar from '../Navbars/EntryNavbar';
import LoginMsg from './Components/LoginMsg'
import LoginBox from './Components/LoginBox';
import './Home.css';

function Home(props){
    return(
        <div>
            <EntryNavbar/>

            <LoginMsg/>

            <LoginBox getUserInfo={props.getUserInfo}/>
        </div>
    )
}

export default Home;
