import React from 'react'
import { useEffect, useState, useContext } from 'react';
import jwt_decode from "jwt-decode"
import './App.css';
import Header from './Components/Header';
import Main from './Components/Main';
import FetchContext from './Store/fetch-context';

function App() {
  var userObject
  const ctx = useContext(FetchContext)

  const [ user, setUser] = useState({})

  function handleCallbackResponse(response){
      //.log(response)
      //console.log("Encoded JWT ID token: " + response.credential)
      userObject = jwt_decode(response.credential)
      sessionStorage.setItem('idToken', response.credential)
      sessionStorage.setItem('email', userObject.email)
      //console.log(userObject)
      document.getElementById("signInDiv").hidden = true
      sendUserToServer(userObject)
  }

  function sendUserToServer(user){
    var loginEndpoint = "api/users/signin";
    var requestUrl = ctx.protocol + ctx.host + ctx.port + loginEndpoint;
    var headers={'Content-Type':'application/json'}
    headers.Authorization = 'Bearer ' + sessionStorage.getItem('idToken');
    //console.log(headers)
    var sendData = {"name": user.name, "email": user.email};
    fetch(requestUrl, {method: "POST", headers: headers, body: JSON.stringify(sendData)})
    .then(response => {
        if(response.status === 200){
            console.log("Successful login on server");
            setUser(userObject)
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
  


    window.onload = () => {
      /*global google*/
        window.google.accounts.id.initialize({
          client_id: "843401142734-cp1pr3dg56c2m9o2g635jq3gmk3t2q0t.apps.googleusercontent.com",
          context: 'signin',
          callback: handleCallbackResponse     
        })

      window.google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        {theme: "filled_black", size: "large", shape: "pill"}
      )

    }


  return (
      <div className="App">
        <Header user={user} handleSignOut={handleSignOut}></Header>
        <div>
          {Object.keys(user).length === 0 &&
          <>
            <p>Dobrodošli na platformu Moj komunalni pomoćnik. Namena ove aplikacije je da Vam omogući jednostavno
              prijavljivanje komunalnih i drugih problema odgovarajućim institucijama.
            </p>
            <p>
              U aplikaciju se možete ulogovati pomoću svog Google naloga, pritiskom na dugme u gornjem desnom uglu ekrana. 
              Ukoliko imate bilo kakva pitanja ili sugestije budite slobodni da nas kontaktirate.
            </p>
          </>
          }
        </div>
        {Object.keys(user).length !== 0 &&
          <Main email={user.email} userName={user.name} handleSignOut={handleSignOut}></Main>
        }
      </div>
  );
}

export default App;
