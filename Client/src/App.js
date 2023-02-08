import React from 'react'
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode"
import './App.css';
import Header from './Components/Header';
import Main from './Components/Main';

function App() {
  const [ user, setUser] = useState({})

  function handleCallbackResponse(response){
      console.log("Encoded JWT ID token: " + response.credential)
      var userObject = jwt_decode(response.credential)
      console.log(userObject)
      setUser(userObject)
      document.getElementById("signInDiv").hidden = true
      sendUserToServer(userObject)
  }

  function sendUserToServer(user){
    var host = "https://localhost:";
    var port = "7281/";
    var loginEndpoint = "api/users/check";
    var requestUrl = host + port + loginEndpoint;
    var sendData = {"name": user.name, "email": user.email};
    fetch(requestUrl, {method: "POST", headers: {'Content-Type':'application/json'}, body: JSON.stringify(sendData)})
    .then(response => {
        if(response.status === 200){
            console.log("Successful login on server");
            //alert("Successful login");
            // response.json().then((data) => {
            //     console.log(data);
            //     authCtx.login(data.token)
            //     authCtx.onReceivedUsername(data.username)
            //     props.onToggleLoginForm()             
            // });
        }else{
            console.log("Error occured with code " + response.status);
            console.log(response);
            alert("Desila se greska!");
        }
    })
    .catch(error => console.log(error));
  }

  function handleSignOut(event){
    setUser({})
    document.getElementById("signInDiv").hidden = false
  }

  useEffect(() => {
    window.onload = function(e){ 
    //const google = window.google;
    window.google.accounts.id.initialize({
      client_id: "843401142734-cp1pr3dg56c2m9o2g635jq3gmk3t2q0t.apps.googleusercontent.com",
      callback: handleCallbackResponse
    
    })

    window.google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: "filled_black", size: "large", shape: "pill"}
    )}
  }, [])

  return (
    <div className="App">
      <Header user={user} handleSignOut={handleSignOut}></Header>
      {Object.keys(user).length !== 0 &&
        <Main email={user.email}></Main>
      }
    </div>
  );
}

export default App;
