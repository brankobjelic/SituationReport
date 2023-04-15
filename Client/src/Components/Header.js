import React from 'react'
import { useState, useEffect } from 'react';
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

  //prevents scrolling of background behind modal on IOS devices
  const preventIOSScroll = (e) => {
    e.preventDefault();
  }

  useEffect(() => {
    if (showContactForm){
      document.body.style.overflow = "hidden";
      document.body.addEventListener('touchmove', preventIOSScroll);
    }else{
      document.body.style.overflow = "scroll";
    }
  },[showContactForm])

  return (
    <header className={classes.header}>
      <h1>Moj komunalni pomoćnik</h1>
        <div className={classes.googleSignIn} id="signInDiv"></div>
        {Object.keys(props.user).length !== 0 &&
            <>
        
            <div className={classes.googleSignIn}>
              <button className={classes.button} onClick={ (e) => props.handleSignOut(e)}>Odjavi se</button>
                <img className={classes.userImage} src={props.user.picture} alt="" referrerPolicy="no-referrer"></img>
                <p className={classes.username}>{props.user.name}</p>                
            </div>
            </>
        }
        <b className={classes.menuItem} onClick={showContactFormHandler}>Kontaktirajte nas</b>
        {showContactForm && <ContactForm onLeaveContactForm={leaveContactFormHandler} />}
    </header>
  )
}

export default Header