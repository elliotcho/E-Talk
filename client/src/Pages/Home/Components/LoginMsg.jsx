import React from 'react';

function LoginMsg(){
    return(
        <div className='loginMsg'>
            <h1>Welcome to E-Talk</h1>

            <p>
                E-Talk is a social media platform with three goals
                that we hope to achieve by creating a network of
                individuals who are currently a part of or are hoping
                to break into the tech industry.
            </p>

            <ul>
                <li><span>1</span> Build knowledge relevant to the industry</li>
                <li><span>2</span> Develop connections for employment opportunities</li>
                <li><span>3</span> Discover those who are crazy enough to change the world</li>
            </ul>
        </div>
    )
}

export default LoginMsg;