import React from 'react'
import { useState } from 'react';
import classes from './Header.module.css';
import ContactForm from './ContactForm';

const Header = (props) => {

  const [showContactForm, setShowContactForm] = useState(false)

  function showContactFormHandler(){
    setShowContactForm(true)
  }

  function leaveContactFormHandler(){
    setShowContactForm(false)
  }

  return (
    <header className={classes.header}>
      <h1>Prijavi problem</h1>
        <div id="signInDiv"></div>
        {Object.keys(props.user).length !== 0 &&
            <>
        
            <div>
              <button className={classes.button} onClick={ (e) => props.handleSignOut(e)}>Odjavi se</button>
                <img className={classes.userImage} src={props.user.picture} alt="" referrerPolicy="no-referrer"></img>
                <p className={classes.username}>{props.user.name}</p>                
            </div>
            </>
        }
        {!showContactForm && <b onClick={showContactFormHandler}>Kontaktirajte nas</b>}
        {showContactForm && <ContactForm onLeaveContactForm={leaveContactFormHandler} />}
    </header>
  )
}

export default Header