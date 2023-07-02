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
        <p>Moj komunalni  pomoćnik je platforma koja omogućava da na jednostavan način prijavite probleme sa kojima se susrećete svakodnevno, a možda ih do sada niste prijavili jer niste znali kome da se obratite.</p>
        <p>Aplikacija Moj komunalni pomoćnik Vas oslobađa nedoumica ili pozivanja neodgovarajućih institucija, koje Vas onda prusmeravaju na druge, treće... Zvuči poznato?</p>
        <p>Umesto ovog mukotrpnog procesa, zbog kojeg često oni manje strpljivi i odustaju od prijavljivanja, dovoljno je da nakon logovanja na aplikaciju uz pomoć svog Google naloga, otvorite novu prijavu, izaberete jednu od ponuđenih vrsta problema, i vaša prijava će biti poslata na pravu adresu. Ukoliko želite, možete odmah i pozvati nadležnu instituciju preko linka u formi.
        </p>
      </form>
    </div>
  );
};

export default About;
