import React from "react";
import classes from './Form.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

const About = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.overlay} onClick={props.onLeaveAboutModal}></div>
      <form className={`${classes['modal-content']} ${classes['form-style-1']}`}>
        <FontAwesomeIcon onClick={props.onLeaveAboutModal} icon={faCircleXmark} className={classes.boxclose} size = '2x'/>
        <br />
        <p>Dobrodošli na platformu Moj komunalni pomoćnik. Namena ove aplikacije je da Vam omogući jednostavno
              prijavljivanje komunalnih i drugih problema odgovarajućim institucijama.
        </p>
      </form>
    </div>
  );
};

export default About;
