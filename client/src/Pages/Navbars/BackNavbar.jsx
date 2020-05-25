import React from 'react';
import {NavLink} from 'react-router-dom';

function BackNavbar(props){
    return(
        <ul className='Navbar BackNavbar'>
                    <li><NavLink exact to='/userfeed' className='backButton'>&larr;</NavLink></li>
                    <div className='header'>{props.title}</div>
        </ul>
    )
}

export default BackNavbar;