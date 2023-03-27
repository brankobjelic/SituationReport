import React from 'react'
import { useState } from 'react'
import classes from './Form.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

const ContactForm = (props) => {

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

    function submitContactFormHandler(e){
        
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
                    <input id="name" className={classes['field-long']} type="text" onChange={handleNameChange} required /><br />
                    <label htmlFor='email' >Email adresa*</label>
                    <input id="email" className={classes['field-long']} type="email" onChange={handleEmailChange} required /><br />                    
                    <label htmlFor="body">Ostavite nam poruku*</label>
                    <textarea id="body" className={`${classes['field-long']} ${classes['field-textarea']}`} onChange={handleBodyChange} required />
                    <button type="submit" name="submitContactForm" className={classes.button} style={{ float: "right" }}>Pošalji poruku</button>
                </form>
            </>
    </div>
  )
}

export default ContactForm