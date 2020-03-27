import React from "react";
import MenuSection from "./MenuSection";
import "./App.css";
import Login from './Login';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authKey: "",
      isAuthenticated: false
    }
    this.loginCallback = this.loginCallback.bind(this);
    this.userAuthCallback = this.userAuthCallback.bind(this);
  }
  
loginCallback(value) {
  this.setState({
    authKey: value
  })
}

userAuthCallback(value) {
  this.setState({
    isAuthenticated: value
  })
}

render() {
  return (
    <div>
      <Login onLogin={this.loginCallback} onUserAuth={this.userAuthCallback}/>
      <MenuSection authKey={this.state.authKey} isAuth={this.state.isAuthenticated}/>
    </div>
  );
}

}

export default App;
