import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { useState, useEffect, useContext } from 'react';
import FetchContext from '../Store/fetch-context';
import classes from './Form.module.css'
import ImageModal from './ImageModal';

const imageMimeType = /image\/(png|jpg|jpeg)/i;
var fileDataUrl
var imageId
var imageLinksString

const Form = (props) => {
    const ctx = useContext(FetchContext)
    var causesEndpoint = "api/causes";
    var reportsEndpoint = "api/Reports/"
    var updatingReportId = ""
    var institutionByCauseIdEndpoint = "api/InstitutionByCauseId?id="
    var method = "POST"

    if(props.report){
        updatingReportId = props.report.id
        method = "PUT"
    }

    const [file, setFile] = useState(null);
    const [fileDataURLs, setFileDataURLs] = useState([])

    const [causes, setCauses] = useState([])
    const [causeId, setCauseId] = useState('DEFAULT')

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')

    const [showImageModal, setShowImageModal] = useState(false)

    //const [isSubmitted, setIsSubmitted] = useState(false)
    const [reportForEmail, setReportForEmail] = useState(false)

    useEffect(
        getDataForDropdown
    , [])

    useEffect(() => {
        let fileReader, isCancel = false;
        if(file){
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCancel) {
                    setFileDataURLs(fileDataURLs => [...fileDataURLs, result])
                }
            }
            fileReader.readAsDataURL(file);
        }
        return () => {
          isCancel = true;
          if (fileReader && fileReader.readyState === 1) {
            fileReader.abort();
          }
        }
    
      }, [file]);

    useEffect(() => {
        if(props.report){
            //console.log(props.report)
            setCauseId(props.report.causeId)
            setTitle(props.report.title)
            setLocation(props.report.location)
            setDescription(props.report.description)
            if(props.report.pic1){
                getImage(props.report.pic1)
            }
            if(props.report.pic2){
                getImage(props.report.pic2)
                }
            if(props.report.pic3){
                getImage(props.report.pic3)
            }
        }
    }
    , [])

    //Here a report gets prepared for sending to coresponding institution by email
    useEffect(() => {
        if(reportForEmail){
            console.log(reportForEmail)
            let requestUrl = ctx.protocol + ctx.host + ctx.port + institutionByCauseIdEndpoint +reportForEmail.causeId
            //fetching institution data
            fetch(requestUrl)
            .then((response) => {
                if (response.status === 200) {
                    response.json()
                        .then((data) => {
                            console.log(data)
                            if(reportForEmail.pic1){
                                const imageLinkElement1 = document.createElement("a");
                                imageLinkElement1.href = `${ctx.protocol}${ctx.host}${ctx.port}api/reports/getimage?name=${reportForEmail.pic1}`
                                imageLinksString = imageLinkElement1
                            }
                            if(reportForEmail.pic2){
                                const imageLinkElement2 = document.createElement("a");
                                imageLinkElement2.href = `${ctx.protocol}${ctx.host}${ctx.port}api/reports/getimage?name=${reportForEmail.pic2}`
                                imageLinksString = imageLinksString +"%0D%0A" +imageLinkElement2
                            }
                            if(reportForEmail.pic3){
                                const imageLinkElement3 = document.createElement("a");
                                imageLinkElement3.href = `${ctx.protocol}${ctx.host}${ctx.port}api/reports/getimage?name=${reportForEmail.pic3}`
                                imageLinksString = imageLinksString + "%0D%0A" + imageLinkElement3
                            }                   

                            var email = document.createElement("a");
                            email.href = `mailto:${data.email}?subject=${reportForEmail.title}&body=Lokacija: ${reportForEmail.location}
                                %0D%0A%0D%0A${reportForEmail.description}
                                %0D%0A%0D%0AFotografije uz prijavu:%0D%0A${imageLinksString}`
                            email.click();
                            props.onLeaveForm()
                        });
                } else {
                    console.log(response.status);
                }
            })
            .catch(error => console.log(error));

        }
        return () => {
            setReportForEmail()
        }
    }, [reportForEmail])

    function getDataForDropdown() {
        var requesturl = ctx.protocol + ctx.host + ctx.port + causesEndpoint;
        var headers = {};
        fetch(requesturl, { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    response.json()
                        .then((data) => {
                            setCauses(data);
                        });
                } else {
                    console.log(response.status);
                }
            })
            .catch(error => console.log(error));
    }


    /*Fetching image from server*/

    function getImage(imageFileName){

        var imageEndpoint = "api/reports/getimage?name=" + imageFileName;
        var requestUrl = ctx.protocol + ctx.host + ctx.port + imageEndpoint;
        console.log(requestUrl)
        fetch(requestUrl)
        .then(response => {
            if(response.status === 200){
                response.blob().then((data) => {
                    var reader = new window.FileReader();
                    reader.readAsDataURL(data);
                    reader.onloadend = function() {
                        var base64data = reader.result;
                        setFileDataURLs(fileDataURLs => [...fileDataURLs, base64data])
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

    function handleAddFile(e) {
        const newFile = e.target.files[0];
        if (!newFile.type.match(imageMimeType)) {
          alert("Image mime type is not valid");
          return;
        }       
        setFile(newFile)
        handleUnsetShowImageModal()   
    }

    function handleShowImageModal(e) {
        fileDataUrl = e.target.src
        imageId = e.target.id
        setShowImageModal(true)
    }

    function handleCancelImage(image){
        setFileDataURLs(prev => {return prev.filter(fileDataURL => fileDataURL !== image)})
        handleUnsetShowImageModal()
    }

    function handleUnsetShowImageModal(){
        setShowImageModal(false)
    }

    function submitReportHandler(event) {
        if(event){
            event.preventDefault()
        }
        if (!causeId) {
            document.getElementById('cause').style.backgroundColor = "salmon"
            return
        }
        var requestUrl = ctx.protocol + ctx.host + ctx.port + reportsEndpoint + updatingReportId;
        //console.log(requestUrl)
        var headers = {};
        headers["Content-Type"] = 'application/json'
        var sendData = { "userEmail": props.email, "title": title, "description": description,
         "location": location, "causeId": causeId, "pic1": fileDataURLs[0], "pic2": fileDataURLs[1], "pic3": fileDataURLs[2] };
        console.log(sendData)
        fetch(requestUrl, { method: method, headers: headers, body: JSON.stringify(sendData) })
            .then(response => {
                if (response.status === 201) {
                    console.log(response)
                    console.log("Successfuly added Report");
                    props.onAddedReport()
                } else if(response.status === 200){
                    console.log("Successfuly updated Report");
                    props.onUpdatedReport()
                } else{
                    console.log("Error occured with code " + response.status);
                    console.log(response);
                    alert("Desila se greska!");
                }
                props.onLeaveForm()
            })
    }

    function handleGeoLocation(){
        if ("geolocation" in navigator) {
            console.log("Geolocation is available!")
            navigator.geolocation.getCurrentPosition((position) => {
              console.log(position)
              setLocation(`GPS koordinate: ${position.coords.latitude},${position.coords.longitude}  ${location}`)
            });
          } else {
            console.log("Geolocation is not available!")
      
          }
    }

    function sendReportHandler(){
        if (!causeId) {
            document.getElementById('cause').style.backgroundColor = "salmon"
            return
        }
        var requestUrl = ctx.protocol + ctx.host + ctx.port + reportsEndpoint + updatingReportId;
        var headers = {};
        headers["Content-Type"] = 'application/json'
        var sendData = { "userEmail": props.email, "title": title, "description": description,
         "location": location, "causeId": causeId, "pic1": fileDataURLs[0], "pic2": fileDataURLs[1], "pic3": fileDataURLs[2] };
        console.log(sendData)
        fetch(requestUrl, { method: method, headers: headers, body: JSON.stringify(sendData) })
            .then(response => {
                if (response.status === 201) {  //on created report
                    response.json().then((data) => {
                        console.log(data)
                        let reportsEndpoint = "api/Reports/"
                        requestUrl = ctx.protocol + ctx.host + ctx.port + reportsEndpoint + data.id
                        fetchReport(requestUrl)
                    })
                    console.log("Successfuly added Report");
                    
                    props.onAddedReport()
                    //setIsSubmitted(true)
                } else if(response.status === 200){     //on updated report
                    console.log(response)
                    console.log("Successfuly updated Report");
                    fetchReport(response.url)
                    props.onUpdatedReport()
                    //setIsSubmitted(true)
                } else{
                    console.log("Error occured with code " + response.status);
                    console.log(response);
                    alert("Desila se greska!");
                }
            })
    }

    function fetchReport(url){
        fetch(url)
        .then((response) => {
            if (response.status === 200) {
                response.json()
                    .then((data) => {
                        setReportForEmail(data);
                    });
            } else {
                console.log(response.status);
            }
        })
        .catch(error => console.log(error)
    );
    }


    return (
        <div className={classes.modal}>
            <div className={classes.overlay}></div>
            {!showImageModal && 
                <form onSubmit={submitReportHandler} className={`${classes['modal-content']} ${classes['form-style-1']}`}>
                    <a className={classes.boxclose} onClick={props.onLeaveForm}></a><br/><br/>
                    <div>
                    <label htmlFor="cause">Razlog prijave</label>
                    <select id="cause" className={classes['field-select']} value={causeId} onChange={handleChange} required>
                        <option value="DEFAULT" disabled>Izaberite razlog za prijavu...</option>
                        {causes.map((cause, index) => {
                            return (
                                <option key={cause.id} value={cause.id}>{cause.description}</option>
                            )
                        })}
                    </select>
                    </div>
                    <label htmlFor="title" >Naslov</label>
                    <input id="title" className={classes['field-long']} type="text" value={title} onChange={handleTitleChange} required /><br />
                    <label htmlFor='location' >Adresa ili opis lokacije</label>
                    <div className={classes.locationDiv}>
                        <input id='location' className={classes['field-long']} type="text" value={location} onChange={handleLocationChange} required></input>
                        <button type="button" onClick={handleGeoLocation}><FontAwesomeIcon icon={faLocationDot} size = 'lg' /></button>
                    </div>
                    <label htmlFor="description">Tekst prijave</label>
                    <textarea id="description" className={`${classes['field-long']} ${classes['field-textarea']}`} value={description} onChange={handleDescriptionChange} required />
                    <div className={classes.imgUploads}>
                        {fileDataURLs.map((fileDataURL, index) => 
                            <span key={index} className={classes.hiddenFileInput}>
                                <img src={fileDataURL} id={`image${index+1}`} alt="preview" 
                                    onClick={e => {handleShowImageModal(e)}}/>
                            </span>                           
                        )}   
                        {fileDataURLs.length <3 &&

                        <span className={classes.hiddenFileInput}>
                            <input type="file" accept='image/*' id={`img${fileDataURLs.length+1}`} onChange={handleAddFile} />
                            </span>
                        }
                    </div>
                    <button className={classes.button}>Sačuvaj</button>
                    <button type="button" className={classes.button} style={{ float: "right" }} onClick={sendReportHandler}>Pošalji prijavu</button>
                </form>
            }
            {showImageModal && 
                <ImageModal 
                    fileDataUrl={fileDataUrl}
                    id={imageId}
                    unsetShowImageModal={handleUnsetShowImageModal}
                    onCancelImage={handleCancelImage}
                    onAddFile={handleAddFile}
                />
            }
        </div>
    )
}

export default Form