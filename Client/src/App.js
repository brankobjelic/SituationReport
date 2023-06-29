import React from 'react'
import { useState, useContext } from 'react';
import jwt_decode from "jwt-decode"
import './App.css';
import Header from './Components/Header';
import Main from './Components/Main';
import UsernameForm from './Components/UsernameForm';
import FetchContext from './Store/fetch-context';
import PulseLoader from 'react-spinners/PulseLoader';

function App() {
  var userObject
  const ctx = useContext(FetchContext)

  const [user, setUser] = useState({})
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  
  function handleCallbackResponse(response){
      setLoading(true)
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
          response.json()
                        .then((data) => {
                            //console.log(data)
                            console.log("Successful login on server");
                            setUser(userObject)
                            setUsername(data.username)
                            setLoading(false)
                          })
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
  
  function tick(){
    /*global google*/
      window.google.accounts.id.initialize({
        client_id: "843401142734-cp1pr3dg56c2m9o2g635jq3gmk3t2q0t.apps.googleusercontent.com",
        context: 'signin',
        callback: handleCallbackResponse     
      })

    window.google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {type: "standard", theme: "filled_black", size: "large", shape: "pill"}
    )
  }
  setTimeout(tick, 1000)

  function updatedUsernameHandler(name){
    setUsername(name)
  }

  return (
      <div className="App">

        <div>
          <Header user={user} username={username} handleSignOut={handleSignOut} onUpdatedUsername={updatedUsernameHandler} />
          {loading && <div className="App-spinner">
                        <PulseLoader
                          color= "#1f464d"
                          loading={loading}
                          aria-label="Loading Spinner"
                          data-testid="loader"
                          speedMultiplier= "0.75"
                        />
                      </div>
          }
          {Object.keys(user).length === 0 && !loading &&
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
          <Main email={user.email} userName={username} handleSignOut={handleSignOut}></Main>
        }
        {Object.keys(user).length !== 0 && !username && <UsernameForm email={user.email} name={user.name} onUpdatedUsername={updatedUsernameHandler} />}
      </div>
  );
}

export default App;
