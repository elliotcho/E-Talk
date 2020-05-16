import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

class LoginBox extends Component{
    constructor(){
        super();

        this.state={
            email: '',
            password: '',
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
            password: this.state.password
        }

        fetch('/login', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }
        ).then(response =>
            response.json()
        ).then(obj =>{
            if(obj.msg==='success'){
                this.props.getUserInfo(obj);

                setTimeout(()=>{
                    this.props.history.push('/userfeed');
                }, 1000);
            }
    
            else{
                alert("Email or password is incorrect");
            }
        });
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='email'>Email</label>
                    <input type='email' 
                        value={this.state.email}
                        onChange={this.handleChange}
                        name='email' 
                        required={true} 
                        minLength='1' 
                        maxLength='50'
                    />

                    <label htmlFor='password'>Password</label>
                    <input type ='password' 
                           value={this.state.password}
                           onChange={this.handleChange}
                           name='password' 
                           required={true}
                           minLength='1' 
                           maxLength='50'
                    />

                    <button>Login</button>
                </form>
            </div>
        )
    }
}

export default withRouter(LoginBox);