import React from 'react';
import {NavLink} from 'react-router-dom';

function HomeNavbar(){
    const styleNavLink={
        color:'white',
        textDecoration:'none'
    }

    return(
        <ul className='HomeNavbar'>
            <li><NavLink to='/' style={styleNavLink}>Sign In</NavLink></li>
            <li><NavLink to='/signup' style={styleNavLink}>Sign up</NavLink></li>
        </ul>
    )
}

export default HomeNavbar;
