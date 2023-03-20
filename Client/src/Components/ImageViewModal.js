import React from 'react'
import { useRef } from 'react'
import classes from './Form.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

const ImageViewModal = (props) => {

  return (
    <div className={`${classes['modal-content']} ${classes['form-style-1']}`}>
        <FontAwesomeIcon onClick={props.unsetShowImageViewModal} icon={faCircleXmark} className={classes.boxclose} size = '2x'/>
        <img src={props.image} className={classes.imageBig} alt="preview"/> 
        <div className={classes.break}></div>
        <div className={classes.centeringDiv}>
            <button type="button" className={classes.button} >Prethodna</button>
            <button className={classes.button} >Sledeća</button>
        </div>
    </div>
  )
}

export default ImageViewModal