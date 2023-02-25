import { faHouseMedicalCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import React from 'react'
import { useState, useRef, useEffect } from 'react';
import classes from './Form.module.css'
import ImageModal from './ImageModal';

const imageMimeType = /image\/(png|jpg|jpeg)/i;
var fileDataUrl
var imageId

const Form = (props) => {
    var host = "https://localhost:";
    var port = "7281/";
    var causesEndpoint = "api/causes";
    var reportsEndpoint = "api/Reports"
    var updatingReportId = ""
    var method = "POST"
    var initialCauseId

    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [file3, setFile3] = useState(null);
    const [fileDataURL1, setFileDataURL1] = useState(null);
    const [fileDataURL2, setFileDataURL2] = useState(null);
    const [fileDataURL3, setFileDataURL3] = useState(null);
    const [showImageModal, setShowImageModal] = useState(false)

    if(props.report){
        updatingReportId = "?id=" + props.report.id
        method = "PUT"
        initialCauseId = props.report.causeId
    }
    const [causes, setCauses] = useState([])
    const [causeId, setCauseId] = useState('DEFAULT')

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')

    //console.log(props.report)
    //console.log(props.email)


    useEffect(
        getDataForDropdown
    , [])
    useEffect(() => {
        let fileReader, isCancel = false;
        if (file1) {
          fileReader = new FileReader();
          fileReader.onload = (e) => {
            //console.log(e.target)
            const { result } = e.target;
            if (result && !isCancel) {
              setFileDataURL1(result)
            }
          }
          fileReader.readAsDataURL(file1);
        }
        if (file2) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
              //console.log(e.target)
              const { result } = e.target;
              if (result && !isCancel) {
                setFileDataURL2(result)
              }
            }
            fileReader.readAsDataURL(file2);
        }
        if (file3) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
              //console.log(e.target)
              const { result } = e.target;
              if (result && !isCancel) {
                setFileDataURL3(result)
              }
            }
            fileReader.readAsDataURL(file3);
        }
        return () => {
          isCancel = true;
          if (fileReader && fileReader.readyState === 1) {
            fileReader.abort();
          }
        }
    
      }, [file1, file2, file3]);

    useEffect(() => {
        if(props.report){
            //console.log(props.report)
            setCauseId(props.report.causeId)
           setTitle(props.report.title)
           setLocation(props.report.location)
           setDescription(props.report.description)
           if(props.report.pic1){
                getImage(props.report.pic1, setFileDataURL1)
           }
           if(props.report.pic2){
                getImage(props.report.pic2, setFileDataURL2)
            }
            if(props.report.pic3){
                getImage(props.report.pic3, setFileDataURL3)
            }
        }
    }
    , [])

    function getDataForDropdown() {
        var requesturl = host + port + causesEndpoint;
        //console.log(requesturl);
        var headers = {};
        fetch(requesturl, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    response.json()
                        .then((data) => {
                            //console.log(data);
                            setCauses(data);
                        });
                } else {
                    console.log(response.status);
                }
            })
            .catch(error => console.log(error));
    }


    /*Fetching image from server*/

    function getImage(imageFileName, setFileDataURL){
        var host = "https://localhost:";
        var port = "7281/";
        var imageEndpoint = "api/reports/getimage?name=" + imageFileName;
        var requestUrl = host + port + imageEndpoint;

        //console.log(requestUrl)
        fetch(requestUrl)
        .then(response => {
            if(response.status === 200){
                //console.log(response)
                response.blob().then((data) => {
                    //console.log(data)
                    var reader = new window.FileReader();
                    reader.readAsDataURL(data);
                    reader.onloadend = function() {
                        var base64data = reader.result;
                        setFileDataURL(base64data)
                    };
                });
            }else{
                console.log("Error occured with code " + response.status);
                console.log(response);
                alert("Desila se greska!");
            }
        })
        .catch(error => console.log(error));
    }

    function handleChange(e) {
        setCauseId(e.target.value)
    }

    function handleTitleChange(e) {
        setTitle(e.target.value)
    }

    function handleLocationChange(e) {
        setLocation(e.target.value)
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value)
    }

    function handleFileChange(e) {
        const file = e.target.files[0];
        //console.log(file)
        //console.log(e.target.id)
        if (!file.type.match(imageMimeType)) {
          alert("Image mime type is not valid");
          return;
        }
        switch(e.target.id) {
            case "img1":
                console.log(file)
                setFile1(file)
              break
              case "image1":
                setFile1(file)
              break
            case "img2":
                setFile2(file)
              break
              case "image2":
                setFile2(file)
              break
            case "img3":
                setFile3(file)
            break
            case "image3":
                setFile3(file)
            break
        }
        handleUnsetShowImageModal()
    }

    function handleShowImageModal(e) {
        //console.log(e.target)
        fileDataUrl = e.target.src
        imageId = e.target.id
        setShowImageModal(true)
        //console.log(imageId)
    }

    function handleCancelImage(image){
        //console.log(image)
        switch(image){
            case 'image1':
                setFile1(null)
                setFileDataURL1(null)
            break
            case 'image2':
                setFile2(null)
                setFileDataURL2(null)
            break
            case 'image3':
                setFile3(null)
                setFileDataURL3(null)
            break
        }
        handleUnsetShowImageModal()

    }

    function handleUnsetShowImageModal(){
        setShowImageModal(false)
    }

    function submitReportHandler(event) {
        event.preventDefault()
        if (!causeId) {
            document.getElementById('cause').style.backgroundColor = "salmon"
            return
        }
        var requestUrl = host + port + reportsEndpoint + updatingReportId;
        //console.log(requestUrl)
        var headers = {};
        headers["Content-Type"] = 'application/json'
        var sendData = { "userEmail": props.email, "title": title, "description": description,
         "location": location, "causeId": causeId, "pic1": fileDataURL1, "pic2": fileDataURL2, "pic3": fileDataURL3 };
        console.log(sendData)
        fetch(requestUrl, { method: method, headers: headers, body: JSON.stringify(sendData) })
            .then(response => {
                if (response.status === 201) {
                    console.log("Successfuly added Report");
                    //alert("Successfuly added Report");
                    props.onAddedReport(true)
                } else if(response.status === 200){
                    console.log("Successfuly updated Report");
                    props.onUpdatedReport(true)
                } else{
                    console.log("Error occured with code " + response.status);
                    console.log(response);
                    alert("Desila se greska!");
                }
                props.onLeaveForm()
            })
    }

    return (
        <div className={classes.modal}>
            <div className={classes.overlay}></div>
            {!showImageModal && <form onSubmit={submitReportHandler} className={`${classes['modal-content']} ${classes['form-style-1']}`}>
                <label htmlFor="cause">Razlog prijave</label>
                <select id="cause" className={classes['field-select']} value={causeId} onChange={handleChange} required>
                    <option value="DEFAULT" disabled>Izaberite razlog za prijavu...</option>
                    {causes.map((cause, index) => {
                        return (
                            <option key={cause.id} value={cause.id}>{cause.description}</option>
                        )
                    })}
                </select><br />
                <label htmlFor="title" >Naslov</label>
                <input id="title" className={classes['field-long']} type="text" value={title} onChange={handleTitleChange} required /><br />
                <label htmlFor='location' >Adresa ili opis lokacije</label>
                <input id='location' className={classes['field-long']} type="text" value={location} onChange={handleLocationChange} required></input>
                <label htmlFor="description">Tekst prijave</label>
                <textarea id="description" className={`${classes['field-long']} ${classes['field-textarea']}`} value={description} onChange={handleDescriptionChange} required />
                <div className={classes.imgUploads}>
                    <span className={classes.hiddenFileInput}>
                     {fileDataURL1 ?
                        <img src={fileDataURL1} id="image1" alt="preview" onClick={e => {handleShowImageModal(e)}}/> 
                        :
                        <input type="file" accept='image/*' id="img1" onChange={handleFileChange} />
                    }   
                    </span>
                    <span className={classes.hiddenFileInput}>
                    {fileDataURL2 ?
                        <img src={fileDataURL2} id="image2" alt="preview" onClick={e => {handleShowImageModal(e)}}/> 
                        :
                        <input type="file" accept='image/*' id="img2" onChange={handleFileChange} />
                    }
                    </span>
                    <span className={classes.hiddenFileInput}>
                    {fileDataURL3 ?
                        <img src={fileDataURL3} id="image3" alt="preview" onClick={e => {handleShowImageModal(e)}}/> 
                        :
                        <input type="file" accept='image/*' id="img3" onChange={handleFileChange} />
                    }
                    </span>
                </div>
                <button className={classes.button}>Sačuvaj</button>
                <button type="button" className={classes.button} style={{ float: "right" }} onClick={props.onLeaveForm}>Odustajanje</button>
            </form>}
            {showImageModal && <ImageModal 
                                    fileDataUrl={fileDataUrl}
                                    id={imageId}
                                    handleFileChange={handleFileChange}
                                    unsetShowImageModal={handleUnsetShowImageModal}
                                    onCancelImage={handleCancelImage}
                                />
            }
        </div>
    )
}

export default Form