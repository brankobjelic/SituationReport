import React from 'react'
import classes from './Form.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'

const ImageViewModal = (props) => {

    console.log(props)
    useEffect(() => {
        if (+props.index<=1){
            document.getElementById('btn1').setAttribute('disabled', '')
        }else{
            document.getElementById('btn1').removeAttribute('disabled')
        }
        if(+props.index >= +props.picsLength){
            document.getElementById('btn2').setAttribute('disabled', '')
        }else{
            document.getElementById('btn2').removeAttribute('disabled')
        }
    }, [props])


  return (
    <div className={classes.modal}>
        <div className={classes.overlay}></div>
        <div className={`${classes['modal-content']} ${classes['form-style-1']}`}>
            <FontAwesomeIcon onClick={props.unsetShowImageViewModal} icon={faCircleXmark} className={classes.boxclose} size = '2x'/>
            <img src={props.image} className={classes.imageBig} alt="preview"/> 
            <div className={classes.break}></div>
            <div className={classes.centeringDiv}>
                <button id="btn1" type="button" className={classes.button} onClick={props.getPreviousImage} >Prethodna</button>
                <button id="btn2" className={classes.button} onClick={props.getNextImage} >Sledeća</button>
            </div>
        </div>
    </div>
  )
}

export default ImageViewModal