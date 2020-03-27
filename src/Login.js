
import { Button, FormGroup, FormControl } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Amplify, { Auth } from "aws-amplify";
import CircularProgress from '@material-ui/core/CircularProgress';


Amplify.configure({
  region: "us-east-1",
  userPoolId: "us-east-1_q9e7jrM82",
  userPoolWebClientId: "3l96mngn0f61gpb64o4nsu3sks"
});

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function userAuth(value) {
    userHasAuthenticated(value);
    props.onUserAuth(value);
    setLoading(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      let val = await Auth.signIn(username, password);
      props.onLogin(val.signInUserSession.idToken.jwtToken);
      userAuth(true);
      alert("Logged in");
    } catch (e) {
      alert(e.message);
      userAuth(false);
    }
  }

  const [isAuthenticated, userHasAuthenticated] = useState(false);

  async function handleLogout() {
    await Auth.signOut();
    userAuth(false);
    props.onLogin("");
  }

  function onLoad() {
    Auth.currentSession()
      .then(data => props.onLogin(data.idToken.jwtToken))
      .then(userAuth(true))
      .catch(e => {
        console.log(e);
        userAuth(false);
        props.onLogin("");
      });
  }

  useEffect(() => {
    onLoad();
  }, []);



  return (
    <div>
      {isAuthenticated ? (
        isLoading ? <CircularProgress /> :
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <div className="Login">
          <form onSubmit={handleSubmit}>
            <FormGroup controlId="username">
              Username
              <FormControl
                autoFocus
                type="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="password">
              Password
              <FormControl
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
              />
            </FormGroup>
            {isLoading ? <CircularProgress/> : 
            <Button block disabled={!validateForm()} type="submit">
              Login
            </Button>}
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
