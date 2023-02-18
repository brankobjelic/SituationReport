import React from 'react'
import { useRef } from 'react'
import classes from './Form.module.css'

const ImageModal = (props) => {

    const hiddenFileInput = useRef(null)

    const handleClick = event => {
        hiddenFileInput.current.click();
    }

  return (
    <div className={`${classes['modal-content']} ${classes['form-style-1']}`}>
        <img src={props.fileDataUrl} className={classes.imageBig} alt="preview" onClick={props.unsetShowImageModal}/> 
        <div className={classes.break}></div>
        <div className={classes.centeringDiv}>
            <button className={classes.button} onClick={props.unsetShowImageModal}>Zatvori</button>
            <button type="button" className={classes.button} onClick={handleClick}>Izmeni</button>
            <input type="file" id={props.id} accept='image/*' ref={hiddenFileInput} style={{display:"none"}} onChange={props.handleFileChange} />
            <button className={classes.button} onClick={e => {props.onCancelImage(props.id)}} >Otkaži</button>
        </div>
    </div>
  )
}

export default ImageModal