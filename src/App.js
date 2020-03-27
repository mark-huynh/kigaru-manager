import React, { useState, useEffect } from "react";
import MenuSection from "./MenuSection";
import "./App.css";
import Amplify, { Auth } from "aws-amplify";
import { Button, FormGroup, FormControl } from "react-bootstrap";

Amplify.configure({
  region: "us-east-1",
  userPoolId: "us-east-1_q9e7jrM82",
  userPoolWebClientId: "3l96mngn0f61gpb64o4nsu3sks"
});

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    Auth.signIn(username, password)
      // .then(data => console.log(data.signInUserSession.idToken.jwtToken))
      .then(data => setKey(data.signInUserSession.idToken.jwtToken))
      .then(userHasAuthenticated(true))
      .catch(e => alert(e.message));
  }

  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [authKey, setKey] = useState("");

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
  }

  useEffect(() => {
    onLoad();
  }, []);

  function onLoad() {
    Auth.currentSession()
      .then(data => console.log(data))
      .then(userHasAuthenticated(true))
      .catch(e => {
        console.log(e);
        userHasAuthenticated(false);
      });
  }

  return (
    <div>
      {isAuthenticated ? (
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
            <Button block disabled={!validateForm()} type="submit">
              Login
            </Button>
          </form>
        </div>
      )}
      <MenuSection />
    </div>
  );
}

export default App;
