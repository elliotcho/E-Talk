import React, {Component} from 'react';
import UploadImage from './UploadImage';

const axios=require('axios');

class ProfileImage extends Component{
    constructor(){
        super();

        this.state={
            imageURL: '',
            styleImage: {display: 'none'},
        }

        this.handleChange=this.handleChange.bind(this);
        this.handleMouseOut=this.handleMouseOut.bind(this);
        this.handleMouseOver=this.handleMouseOver.bind(this);
    }

    componentDidMount(){
        this.setState({
            imageURL: ''
        }, ()=>{
            const data={
                action: 'load',
                email: this.props.email
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

        formData.append('email', this.props.email);
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
        let image;
        let styleForUpdate = {display: 'block'};
   
        if(this.state.imageURL!==''){
            image=<div 
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
                  </div>;

            styleForUpdate={display: 'none'};
        }

        return(
            <div className='profileImage'>
                    {image}

                    <div style={styleForUpdate}>
                        <div className='imageContainer'/>
                        <UploadImage content='Add Photo' handleChange={this.handleChange}/>
                    </div>
            </div>
        )
    }
}

export default ProfileImage;