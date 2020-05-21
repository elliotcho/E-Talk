import React, {Component} from 'react';

class ProfileCard extends Component{
    constructor(){
        super();

        this.state={
            image: ''
        }

        this.handleChange=this.handleChange.bind(this);
    }

    handleChange(e){
        this.setState({
            image: URL.createObjectURL(e.target.files[0])
        });
    }

    render(){
        let img;
        let style;

        if(this.state.image!==''){
            img=<img src={this.state.image} alt="Profile pic"></img>
            style={display: 'none'};
        }

        else{
            style={display: 'block'};
        }

        return(
            <div className='profileCard'>
                {img}

               <div className='profileImg' style={style}>
                    <div className='addPhoto'>
                    </div>

                    <label htmlFor='upload'>
                        <span>+</span>
                        <br/>
                        Add Photo
                    </label>

                    <input
                        id='upload'
                        type='file' 
                        accept='jpg jpeg png'
                        style={{visibility: 'hidden'}}
                        onChange={this.handleChange}
                    />
               </div>

               <p>Gugsa Challa</p>

               <button className='editProfile'>Edit Profile</button>
            </div>
        )
    }
}

export default ProfileCard;