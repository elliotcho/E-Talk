import React from 'react';
import {HashRouter, Route} from 'react-router-dom';
import Home from './Pages/Home/Home';
import Signup from './Pages/Signup/Signup';
import UserFeed from './Pages/UserFeed/UserFeed';
import './App.css';


class App extends React.Component{
  constructor(){
    super();
    
    this.state={
      userInfo: {}
    };

    this.getUserInfo=this.getUserInfo.bind(this);
  }

  getUserInfo(info){
    this.setState({
      userInfo: info
    });
  }

  render(){
    return(
      <HashRouter>
        <div className='App'>
          <Route exact path='/' render={()=><Home getUserInfo={this.getUserInfo}/>}/>
          <Route exact path='/signup' render={()=><Signup getUserInfo={this.getUserInfo}/>}/>
          <Route exact path='/userfeed' render={()=><UserFeed userInfo={this.state.userInfo}/>}/>
        </div>
      </HashRouter>
    )
  }
}

export default App;
