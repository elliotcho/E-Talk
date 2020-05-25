import React, {Component} from 'react';

class ProfileBio extends Component{
    constructor(){
        super();

        this.state={
            editStyle: {display: 'block'},
            bioStyle: {display: 'inline-block'},
            textareaStyle: {display: 'none'},
            cancelStyle: {display: 'none'},
            saveStyle: {display: 'none'}, 
            bioContent: '',
            textareaContent: ''
        }

        this.handleClick=this.handleClick.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }

    componentDidMount(){
        this.setState({}, ()=>{
            const data={
                action: 'load',
                email: this.props.profileEmail
            }
    
            fetch('/bio',{
                method: 'POST',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(obj =>{
                this.setState({bioContent: obj.bio});
            });
        });
    }

    handleClick(e){
        const {name}=e.target;

        const {textareaContent, bioContent}=this.state;

        if(name==='edit'){
            this.setState({
                editStyle: {display: 'none'},
                bioStyle: {display: 'none'},
                textareaStyle: {display: 'block'},
                cancelStyle: {display: 'inline-block'},
                saveStyle: {display: 'inline-block'},
                textareaContent: bioContent
            });
        }

        else if(name==='cancel'){
            this.setState({
                editStyle: {display: 'block'},
                bioStyle: {display: 'inline-block'},
                textareaStyle: {display: 'none'},
                cancelStyle: {display: 'none'},
                saveStyle: {display: 'none'},
                textareaContent: bioContent
            });
        }

        else{
            this.setState({
                editStyle: {display: 'block'},
                bioStyle: {display: 'inline-block'},
                textareaStyle: {display: 'none'},
                cancelStyle: {display: 'none'},
                saveStyle: {display: 'none'},
                bioContent: textareaContent
            },  () =>{
                const data={
                    action: 'save',
                    email: this.props.profileEmail,
                    bio: this.state.bioContent
                };
    
                fetch('/bio',{
                    method: 'POST',
                    headers:{'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
                })
                .then(()=> "Success");
            });
        }
    }

    handleChange(e){
        const {value,name}=e.target 

        this.setState({
            [name]: value
        });
    }

    render(){
        const {
            profileEmail,
            userEmail
        }=this.props;

        const hideBio= (profileEmail===userEmail)? this.state.editStyle: {display: 'none'}; 

        return(
            <div className='profileBio'>
                <button className='editProfile' 
                        name='edit' 
                        onClick={this.handleClick} 
                        style={hideBio}>
                        Edit Profile
                </button>
        

                <p style={this.state.bioStyle}>
                    {this.state.bioContent}
                </p>

               <textarea name='textareaContent' 
                         onChange={this.handleChange}
                         style={this.state.textareaStyle}
                         value={this.state.textareaContent}
                         minLength='1'
                         maxLength='50'
               />

               <button className='cancelButton' 
                    name='cancel' 
                    style={this.state.cancelStyle} 
                    onClick={this.handleClick}>
                    Cancel
               </button>
              
               <button className='saveButton' 
                    name='save' 
                    style={this.state.saveStyle} 
                    onClick={this.handleClick}>
                    Save
               </button>
            </div>
        )
    }
}

export default ProfileBio;