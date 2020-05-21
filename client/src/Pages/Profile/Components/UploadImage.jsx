import React from 'react';

function UploadImage(props){
    return(
        <div className='uploadImage' style={{visibility: props.visibility}}>
            <label htmlFor='upload' style={{opacity: props.opacity}}>
                {props.content}
            </label>

            <input
                id='upload'
                type='file' 
                accept='jpg jpeg png'
                style={{visibility: 'hidden'}}
                onChange={props.handleChange}
            />
        </div>
    )
}

export default UploadImage;