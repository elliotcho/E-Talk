import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

class SignupBox extends Component{
    constructor(){
        super();

        this.state={
            email: '',
            password: '',
            confirmPassword:'',
            firstName:'',
            lastName:''
        }

        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleChange(e){
        const {value, name}=e.target;
        
        this.setState({
            [name]: value
        });
    }

    
    handleSubmit(e){
        e.preventDefault();

        const data={
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            firstName: this.state.firstName,
            lastName: this.state.lastName
        }

        fetch('http://localhost:5000/signup', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        }
        ).then(response => response.json())
        .then(obj =>{
            if(obj.msg==='success'){
                this.props.getUserInfo(obj);

                setTimeout(()=>{
                    this.props.history.push('/userfeed');
                }, 1000);
            }
    
            else if(obj.msg==='pwd mismatch'){
                alert("Passwords do not match")
            }

            else{
                alert("Email has already been taken by another user");
            }
        });
    }

    render(){
        return(
            <div className='signupBox'>
                <h1>Create your account</h1>

                <form onSubmit={this.handleSubmit}>
                    
                    <label>Your first name here<span>*</span></label>
                    <input type ='text' 
                            value={this.state.firstName}
                            onChange={this.handleChange}
                            name='firstName' 
                            required={true} 
                            minLength='1' 
                            maxLength='50'
                    />

                    <label>Your last name here<span>*</span></label>
                    <input type ='text' 
                            value={this.state.lastName}
                            onChange={this.handleChange}
                            name='lastName' 
                            required={true} 
                            minLength='1' 
                            maxLength='50'
                    />

                    <label>Your email here<span>*</span></label>
                    <input type='email' 
                            value={this.state.email}
                            onChange={this.handleChange}
                            name='email' 
                            required={true}
                            minLength='1' 
                            maxLength='50'
                    />

                    <label>Your password here<span>*</span></label>
                    <input type ='password' 
                            value={this.state.password}
                            onChange={this.handleChange}
                            name='password' 
                            required={true} 
                            minLength='1' 
                            maxLength='50'
                    />

                    <label>Confirm password<span>*</span></label>
                    <input type ='password' 
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                            name='confirmPassword' 
                            required={true} 
                            minLength='1' 
                            maxLength='50'
                    />

                    <button>Sign up for E-Talk</button>
                </form>
            </div>
        )
    }
}

export default withRouter(SignupBox);