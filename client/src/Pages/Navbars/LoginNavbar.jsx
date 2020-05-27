import React from 'react';
import {NavLink} from 'react-router-dom';
import './Navbars.css';

function LoginNavbar(){
    const style={
        color:'white',
        textDecoration:'none'
    }

    return(
        <ul className='Navbar LoginNavbar'>
            <li><NavLink to='/' style={style}>Sign In</NavLink></li>
            <li><NavLink to='/signup' style={style}>Sign up</NavLink></li>
        </ul>
    )
}

export default LoginNavbar;
