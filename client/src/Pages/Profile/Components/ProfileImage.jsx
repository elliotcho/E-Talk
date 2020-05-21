import React, {Component} from 'react';
import UploadImage from './UploadImage';

class ProfileImage extends Component{
    constructor(){
        super();

        this.state={
            imageURL: '',
            styleImage: {display: 'none'}
        }

        this.handleChange=this.handleChange.bind(this);
        this.handleMouseOut=this.handleMouseOut.bind(this);
        this.handleMouseOver=this.handleMouseOver.bind(this);
    }

    handleChange(e){
        this.setState({
            imageURL: URL.createObjectURL(e.target.files[0])
        });
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
        let styleForUpdate;
   
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

        else{
            styleForUpdate={display: 'block'};
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