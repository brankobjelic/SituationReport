import React from 'react'
import { useState, useEffect } from 'react';
import classes from './Header.module.css';
import ContactForm from './ContactForm';
import Navigation from './Navigation';
import UsernameForm from './UsernameForm';
import About from './About';

const Header = (props) => {

  const [showContactForm, setShowContactForm] = useState(false)
  const [showUsernameForm, setShowUsernameForm] = useState(false)
  const [showAboutModal, setShowAboutModal] = useState(false)

  useEffect(() => {
    if (showContactForm || showUsernameForm || showAboutModal) {
      document.body.style.overflow = "hidden";
      document.body.addEventListener('touchmove', preventIOSScroll);
    }else{
      document.body.style.overflowX = "auto";
      document.body.style.overflowY = "scroll";
    }
  },[showContactForm, showUsernameForm, showAboutModal])

  //prevents scrolling of background behind modal on IOS devices
  const preventIOSScroll = (e) => {
    e.preventDefault();
  }

  function showContactFormHandler(){
    setShowContactForm(true)
  }

  function leaveContactFormHandler(){
    setShowContactForm(false)
  }

  function showUsernameFormHandler(){
    setShowUsernameForm(true)
  }

  function updateUsernameFormHandler(name){
    props.onUpdatedUsername(name)
    setShowUsernameForm(false)
  }

  function leaveUsernameFormHandler(){
    setShowUsernameForm(false)
  }

  function showAboutModalHandler(){
    setShowAboutModal(true)
  }

  function leaveAboutModalHandler(){
    setShowAboutModal(false)
  }

  return (
    <header className={classes.header}>
      <h1>Moj komunalni pomoćnik</h1>
        <div className={classes.googleSignIn} id="signInDiv"></div>
        {Object.keys(props.user).length !== 0 &&
            <>       
              <div className={classes.googleSignOut}>
                <button className={classes.button} onClick={ (e) => props.handleSignOut(e)}>Odjavi se</button>
                  <img className={classes.userImage} src={props.user.picture} alt="" referrerPolicy="no-referrer"></img>
                  <p className={classes.username}>{props.username}</p>                
              </div>
            </>
        }
        <Navigation user={props.user} onShowUsernameForm={showUsernameFormHandler} onShowContactForm={showContactFormHandler} onShowAboutModal={showAboutModalHandler} />
        {showContactForm && <ContactForm onLeaveContactForm={leaveContactFormHandler} />}
        {showUsernameForm && <UsernameForm  email={props.user.email} name={props.username} onUpdatedUsername={updateUsernameFormHandler} onLeaveUsernameForm={leaveUsernameFormHandler} nameChange={true} />}
        {showAboutModal && <About onLeaveAboutModal={leaveAboutModalHandler} />}
    </header>
  )
}

export default Header