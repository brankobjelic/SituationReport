import React from 'react'
import { useRef } from 'react'
import classes from './Form.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

const ImageModal = (props) => {

    const hiddenFileInput = useRef(null)

    const handleClick = event => {
        hiddenFileInput.current.click();
    }

    const handleFileChange = (event, image) => {
      props.onCancelImage(image)
      props.onAddFile(event)
      props.unsetShowImageModal()
    }

  return (
    <div className={`${classes['modal-content']} ${classes['form-style-1']}`}>
        <FontAwesomeIcon onClick={props.unsetShowImageModal} icon={faCircleXmark} className={classes.boxclose} size = '3x'/>
        {/* <a className={classes.boxclose} onClick={props.unsetShowImageModal}></a><br/><br/> */}
        <img src={props.fileDataUrl} className={classes.imageBig} alt="preview" onClick={props.unsetShowImageModal}/> 
        <div className={classes.break}></div>
        <div className={classes.centeringDiv}>
            <button type="button" className={classes.button} onClick={handleClick}>Izmeni</button>
            <input type="file" id={props.id} accept='image/*' ref={hiddenFileInput} style={{display:"none"}} onChange={e => {handleFileChange(e, props.fileDataUrl)}} />
            <button className={classes.button} onClick={e => {props.onCancelImage(props.fileDataUrl)}}>Obriši</button>
        </div>
    </div>
  )
}

export default ImageModal