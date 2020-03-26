import React from 'react';
import logo from './logo.svg';
import MenuSection from './MenuSection';
import './App.css';
import Amplify, {Auth} from "aws-amplify";

Amplify.configure({
  region: "us-east-1",
  userPoolId: "us-east-1_q9e7jrM82",
  userPoolWebClientId: "3l96mngn0f61gpb64o4nsu3sks"
});

function App() {
  // Auth.signIn("kigaru-admin", "ilovesushi12345")
  //   .then(res => console.log(res))
  //   .catch(err => console.log(err));
  return (
    <MenuSection/>
    // <div>

    // </div>
  );
}

export default App;
