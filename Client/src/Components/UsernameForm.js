import React from 'react'
import { useState, useContext } from 'react'
import classes from './Form.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import FetchContext from '../Store/fetch-context'

const UsernameForm = (props) => {
    const ctx = useContext(FetchContext)
    const [name, setName] = useState(props.name)

    var usersEndpoint = "api/Users/"
    var method = "PUT"

    function handleNameChange(e){
        setName(e.target.value)
    }

    function submitUsernameFormHandler(e){
        e.preventDefault()
        var requestUrl = ctx.protocol + ctx.host + ctx.port + usersEndpoint
            var headers = {};
            headers["Content-Type"] = 'application/json'
            headers.Authorization = 'Bearer ' + sessionStorage.getItem('idToken');
            headers.From = sessionStorage.getItem('email')
            var sendData = { "username": name, "email": props.email };
            //console.log(sendData)
            fetch(requestUrl, { method: method, headers: headers, body: JSON.stringify(sendData) })
                .then(response => {
                    if(response.status === 200){
                        console.log("Successfuly updated Username");
                        props.onUpdatedUsername(name)
                    }
                    else if (response.status === 401){
                        alert("Niste ulogovani. U jednom trenutku možete biti ulogovani samo na jednoj instanci aplikacije. Pokušajte ponovo da se ulogujete.")
                        props.handleSignOut()
                    }
                    else{
                        console.log("Error occured with code " + response.status);
                        console.log(response);
                        alert("Desila se greska!");
                    }
                })
    }

  return (
    <div className={classes.modal}>
        {props.nameChange ? <div className={classes.overlay} onClick={props.onLeaveUsernameForm}></div> : <div className={classes.overlay}></div>}          
            <>                    
                <form onSubmit={(e) => {submitUsernameFormHandler(e)}}
                    className={`${classes['modal-content-username']} ${classes['form-style-1']}`}
                >
                    { props.nameChange && <><FontAwesomeIcon onClick={props.onLeaveUsernameForm} icon={faCircleXmark} className={classes.boxclose} size = '2x'/>
                    <br /></>}
                    <label htmlFor="name" >Unesite korisničko ime koje ćete koristiti. Preporučujemo da to bude Vaše puno ime i prezime jer će se to ime pojavljivati na vašim prijavama.</label>
                    <input id="name" className={classes['field-long']} type="text" value={name} onChange={handleNameChange} maxLength={150} size={150} required /><br />
                    <button type="submit" name="submitUsernameForm" className={classes.button} style={{ float: "right" }}>Nastavi</button>
                </form>
            </>
    </div>
  )
}

export default UsernameForm