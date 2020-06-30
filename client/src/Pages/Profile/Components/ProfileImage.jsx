import React, {Component} from 'react';
import UploadImage from './UploadImage';

const axios=require('axios');

class ProfileImage extends Component{
    constructor(){
        super();

        this.state={
            imageURL: '',
            styleImage: {}
        }

        this.handleChange=this.handleChange.bind(this);
        this.handleMouseOut=this.handleMouseOut.bind(this);
        this.handleMouseOver=this.handleMouseOver.bind(this);
    }

    componentDidMount(){
        this.setState({}, ()=>{
            const data={
                action: 'load',
                email: this.props.profileEmail
            }

            fetch('http://localhost:5000/profilepic', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }).then(response => response.blob())
            .then(obj =>{
                this.setState({imageURL: URL.createObjectURL(obj)});
            });
        });
    }

    handleChange(e){
        const imgFile=e.target.files[0];

        this.setState({
            imageURL: URL.createObjectURL(e.target.files[0])
        });

        const formData=new FormData();

        formData.append('email', this.props.profileEmail);
        formData.append('image', imgFile);

        const config={
            headers:{'content-type': 'multipart/form-data'}
        }

        axios.post('http://localhost:5000/profilepic', formData, config).then(()=>{window.location.reload();});
    }

    handleMouseOut(){
        this.setState({
            styleImage: {visibility: 'hidden'}
        });
    }

    handleMouseOver(){
        this.setState({
            styleImage:{
                visibility: 'visible',
                opacity: 0.8
            }
        });
    }

    render(){
        const {
            profileEmail,
            userEmail
        }=this.props;

        let mouseOut, mouseOver, cursorStyle;

        let updateVisibility='hidden';

        if(profileEmail===userEmail){
            mouseOver=this.handleMouseOver;
            mouseOut=this.handleMouseOut;
            cursorStyle={cursor: 'pointer'}
            updateVisibility=this.state.styleImage.visibility;
        }

        return(
            <div className='profileImage'>
                    <div 
                       onMouseOver={mouseOver} 
                       onMouseOut={mouseOut}
                       style={cursorStyle}
                    >
                    
                    <img src={this.state.imageURL} alt="Profile pic"/>
                    
                    <UploadImage 
                                 style={{display: 'none'}}
                                 content='Update' 
                                 handleChange={this.handleChange}
                                 visibility={updateVisibility}
                                 opacity={this.state.styleImage.opacity}
                    />
                    </div>
            </div>
        )
    }
}

export default ProfileImage;