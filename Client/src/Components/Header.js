import React from 'react'
import classes from './Header.module.css';

const Header = (props) => {
  return (
    <header className={classes.header}>
      <h1>Situation Report app</h1>
        <div id="signInDiv"></div>
        {Object.keys(props.user).length !== 0 &&
            <>
        
            <div>
              <button className={classes.button} onClick={ (e) => props.handleSignOut(e)}>Sign Out</button>
                <img className={classes.userImage} src={props.user.picture} alt="" referrerPolicy="no-referrer"></img>
                <p className={classes.username}>{props.user.name}</p>                
            </div>
            </>
        }
    </header>
  )
}

export default Header