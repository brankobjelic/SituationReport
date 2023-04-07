import React from 'react'
import { useState, useContext } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import classes from './Form.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import FetchContext from '../Store/fetch-context';

const ContactForm = (props) => {

    const ctx = useContext(FetchContext)
    const method = "POST"
    var contactFormEndpoint = "api/contactForm"

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [body, setBody] = useState('')

    function handleNameChange(e){
        setName(e.target.value)
    }

    function handleEmailChange(e){
        setEmail(e.target.value)
    }

    function handleBodyChange(e){
        setBody(e.target.value)
    }

    function submitContactFormHandler(event){
        event.preventDefault()
        var requestUrl = ctx.protocol + ctx.host + ctx.port + contactFormEndpoint;
        var headers = {};
        headers["Content-Type"] = 'application/json'
        var sendData = { "name": name, "emailAddress": email, "messageContent": body }
        console.log(sendData)
        fetch(requestUrl, { method: method, headers: headers, body: JSON.stringify(sendData) })
            .then(response => {
                if (response.status === 200) {
                    console.log(response)
                    console.log("Successfuly sent contact form");
                    alert("Vaša poruka je uspešno poslata. Odgovorićemo Vam u najkraćem mogućem roku.")
                } else{
                    console.log("Error occured with code " + response.status);
                    console.log(response);
                    alert("Desila se greska!");
                }
                props.onLeaveContactForm()
            })
    }

  return (
    <div className={classes.modal}>
            <div className={classes.overlay}></div>
            <>                    
                <form onSubmit={(e) => {submitContactFormHandler(e)}}
                    className={`${classes['modal-content']} ${classes['form-style-1']}`}
                >
                    <FontAwesomeIcon onClick={props.onLeaveContactForm} icon={faCircleXmark} className={classes.boxclose} size = '2x'/>
                    <br />
                    <label htmlFor="name" >Ime*</label>
                    <input id="name" className={classes['field-long']} type="text" onChange={handleNameChange} maxLength={200} size={200} required /><br />
                    <label htmlFor='email' >Email adresa*</label>
                    <input id="email" className={classes['field-long']} type="email" onChange={handleEmailChange} maxLength={200} size={200} required /><br />                    
                    <label htmlFor="body">Ostavite nam poruku*</label>
                    <textarea id="body" className={`${classes['field-long']} ${classes['field-textarea']}`} onChange={handleBodyChange} required />
                    <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY}/>
                    <button type="submit" name="submitContactForm" className={classes.button} style={{ float: "right" }}>Pošalji poruku</button>
                </form>
            </>
    </div>
  )
}

export default ContactForm