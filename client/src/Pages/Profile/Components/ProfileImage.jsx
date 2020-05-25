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

            fetch('/profilepic', {
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

        axios.post('/profilepic', formData, config).then(()=>"Success");
    }

    handleMouseOut(){
        this.setState({
            styleImage: {visibility: 'hidden'}
        });
    }

    handleMouseOver(e){
        this.setState({
            styleImage:{
                visibility: 'visible',
                opacity: 0.8
            }
        });
    }

    render(){
        return(
            <div className='profileImage'>
                    <div 
                       onMouseOver={this.handleMouseOver} 
                       onMouseOut={this.handleMouseOut}
                       style={{cursor: 'pointer'}}
                    >
                    
                    <img src={this.state.imageURL} alt="Profile pic"/>
                    
                    <UploadImage 
                                 content='Update' 
                                 handleChange={this.handleChange}
                                 visibility={this.state.styleImage.visibility}
                                 opacity={this.state.styleImage.opacity}
                    />
                    </div>
            </div>
        )
    }
}

export default ProfileImage;