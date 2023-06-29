import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import classes from './Navigation.module.css'
import { useState } from 'react'

const Navigation = (props) => {

    const [open, setOpen] = useState(false)

  return (
    <div className={classes.navigation} onClick={() => setOpen(!open)}>
        <div className={classes.menu} >
          <div className={classes.hamburger}></div>
          <div className={classes.hamburger}></div>
          <div className={classes.hamburger}></div>
        </div>
        {open && <div className={classes.modal}>
            <div className={classes.overlay}></div>
                <div className={classes.modalContent}>
                <FontAwesomeIcon onClick={() => setOpen(false)} icon={faCircleXmark} className={classes.boxclose} size = '2x'/><br/>
                    <nav>
                    <ul>
                        <li>
                            <b>Početna</b>
                        </li>
                        {Object.keys(props.user).length !== 0 &&
                            <li onClick={props.onShowUsernameForm}>
                                <b>Promena korisničkog imena</b>
                            </li>
                        }
                        <li onClick={props.onShowAboutModal}>
                            <b>O nama</b>
                        </li>
                        <li onClick={props.onShowContactForm}>
                            <b>Kontaktirajte nas</b>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>}

    </div>
  )
}

export default Navigation