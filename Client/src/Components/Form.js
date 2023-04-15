import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faCircleXmark, faSlash } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { useState, useEffect, useContext, useRef } from 'react';
import FetchContext from '../Store/fetch-context';
import classes from './Form.module.css'
import ImageModal from './ImageModal';
import ReCAPTCHA from 'react-google-recaptcha';

const imageMimeType = /image\/(png|jpg|jpeg)/i;
var fileDataUrl
var imageId
const maxImages = 3
var requestUrl

const Form = (props) => {
    const ctx = useContext(FetchContext)
    var causesEndpoint = "api/causes";
    var reportsEndpoint = "api/Reports/"
    var updatingReportId = ""
    var imageLinksString = ""
    var locationTxt = ""
    var institutionByCauseIdEndpoint = "api/InstitutionByCauseId?id="
    var method = "POST"

    const [file, setFile] = useState(null);
    const [fileDataURLs, setFileDataURLs] = useState([])

    const [causes, setCauses] = useState([])
    const [causeId, setCauseId] = useState('DEFAULT')

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')
    const [latitude, setLatitude] = useState()
    const [longitude, setLongitude] = useState()

    const [showImageModal, setShowImageModal] = useState(false)
    const [reportForEmail, setReportForEmail] = useState(false)

    const captchaRef = useRef(null)

    if(props.report){
        updatingReportId = props.report.id
        method = "PUT"
    }

    useEffect(() =>{
        getDataForDropdown()
    }, [])

    /* When new file added to form, its fileDataURL is added to array */
    useEffect(() => {
        let fileReader, isCancel = false;
        if(file){
            fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCancel)
                     setFileDataURLs(fileDataURLs => [...fileDataURLs, result])
            }
        }
        return () => {
          isCancel = true;
          if (fileReader && fileReader.readyState === 1) {
            fileReader.abort();
          }
        }
    
      }, [file]);

    /* If the form is entered to edit existing report, the form fields are populated here */
    useEffect(() => {
        if(props.report){
            setCauseId(props.report.causeId)
            setTitle(props.report.title)
            setLocation(props.report.location)
            if (props.report.latitude) 
                setLatitude(props.report.latitude)           
            if(props.report.longitude)
                setLongitude(props.report.longitude)
            setDescription(props.report.description)
            if(props.report.pic1){
                getImage(props.report.pic1, 0)
            }
            if(props.report.pic2){
                getImage(props.report.pic2, 1)
                }
            if(props.report.pic3){
                getImage(props.report.pic3, 2)
            }
        }
    }
    , [])

    /*Here a report gets prepared for sending to coresponding institution by email*/
    useEffect(() => {
        if(reportForEmail){
            console.log(reportForEmail)
            const desc = reportForEmail.description.replace(/\n/g, "%0D%0A")
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
                                imageLinksString = "Fotografije uz prijavu:%0D%0A" + imageLinkElement1
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
                            if(reportForEmail.location){
                                locationTxt = `Lokacija: ${reportForEmail.location}%0D%0A`
                            }
                            const googleMapsLinkElement = document.createElement("a");
                            googleMapsLinkElement.href = `//google.com/maps/?q=${reportForEmail.latitude},${reportForEmail.longitude}`
                            var email = document.createElement("a");

                            //populating data for email in mailto link
                            email.href = `mailto:${data.email}?subject=${reportForEmail.title}&body=${locationTxt}${googleMapsLinkElement} %0D%0A%0D%0A${desc}
                                %0D%0A%0D%0A${imageLinksString}`

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
    function getImage(imageFileName, index){
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
                        //const updatedArray = fileDataURLs.map((val, idx) => idx === {index} ? base64data : val)
                        setFileDataURLs(fileDataURLs => [...fileDataURLs, base64data])
                        //setFileDataURLs(base64data)
                        // if (index === 1){
                        //     setFileDataUrl1(base64data)
                        // }
                        // if (index === 2){
                        //     setFileDataUrl2(base64data)
                        // }
                        // if (index === 3){
                        //     setFileDataUrl3(base64data)
                        // }
                    };
                    // reader.readAsArrayBuffer(data);
                    // reader.onloadend = function() {
                    //     var data = reader.result;
                    //     var arrayBufferView = new Uint8Array( data );
                    //     var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
                    //     var urlCreator = window.URL || window.webkitURL;
                    //     var imageUrl = urlCreator.createObjectURL( blob );
                    //     setFileDataURLs(fileDataURLs => [...fileDataURLs, imageUrl])
                    // }
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
        console.log(newFile)
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

    function handleAddGeoLocation(){
        if ("geolocation" in navigator) {
            console.log("Geolocation is available!")
            navigator.geolocation.getCurrentPosition((position) => {
              console.log(position)
              setLatitude(position.coords.latitude.toFixed(9))
              setLongitude(position.coords.longitude.toFixed(9))
              //setLocation(`GPS koordinate: ${position.coords.latitude},${position.coords.longitude}  ${location}`)
            });
          } else {
            console.log("Geolocation is not available!")
      
          }
    }

    function handleRemoveGeoLocation(){
        setLatitude()
        setLongitude()
    }

    function submitReportHandler(event) {
        if(event){
            event.preventDefault()
        }
        if (causeId === 'DEFAULT') {     //form validation - when cause not selected from dropdown menu
            document.getElementById('cause').style.backgroundColor = "salmon"
            return
        }
        const token = captchaRef.current.getValue()
        if (token){
            var requestUrl = ctx.protocol + ctx.host + ctx.port + reportsEndpoint + updatingReportId;
            var headers = {};
            headers["Content-Type"] = 'application/json'
            console.log(description)
            var sendData = { "userEmail": props.email, "title": title, "description": description,
             "location": location, "latitude": latitude, "longitude": longitude, "causeId": causeId, "pic1": fileDataURLs[0], "pic2": fileDataURLs[1], "pic3": fileDataURLs[2], "reCaptchaToken": token };
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
        else{
            alert("Morate potvrditi da niste robot.")
        }
    }

    function sendReportHandler(event){
        if(event){
            event.preventDefault()
        }
        if (causeId === 'DEFAULT') {
            document.getElementById('cause').style.backgroundColor = "salmon"
            return
        }
        const token = captchaRef.current.getValue()
        if (token){
            var requestUrl = ctx.protocol + ctx.host + ctx.port + reportsEndpoint + updatingReportId;
            var headers = {};
            headers["Content-Type"] = 'application/json'
            var sendData = { "userEmail": props.email, "title": title, "description": description,
             "location": location, "latitude": latitude, "longitude": longitude, "causeId": causeId, "pic1": fileDataURLs[0], "pic2": fileDataURLs[1], "pic3": fileDataURLs[2], "reCaptchaToken": token };
            console.log(sendData)
            fetch(requestUrl, { method: method, headers: headers, body: JSON.stringify(sendData) })
                .then(response => {
                    if (response.status === 201) {  //on created report
                        response.json().then((data) => {
                            console.log(data)
                            let reportsEndpoint = "api/Reports/"
                            requestUrl = ctx.protocol + ctx.host + ctx.port + reportsEndpoint + data.id
                            fetchReport(requestUrl) //after succesfully submitting a report to db, fetching the report to email it 
                        })
                        console.log("Successfuly added Report");                   
                        props.onAddedReport()
                    } else if(response.status === 200){     //on updated report
                        console.log(response)
                        console.log("Successfuly updated Report");
                        fetchReport(response.url)   //after succesfully updating a report to db, fetching the report to email it
                        props.onUpdatedReport()
                    } else{
                        console.log("Error occured with code " + response.status);
                        console.log(response);
                        alert("Desila se greska!");
                    }
                })
        }
        else{
            alert("Morate potvrditi da niste robot.")
        }
    }

    //fetching a report from db and and setting data to reportForEmail state
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
            <>                    
                <form onSubmit={(e) => {
                                    const buttonName = e.nativeEvent.submitter.name //having two submit buttons
                                    if (buttonName === "submitToServer") submitReportHandler(e)
                                    if (buttonName === "sendEmail") sendReportHandler(e)
                                }}
                                 className={`${classes['modal-content']} ${classes['form-style-1']}`}
                >
                    <FontAwesomeIcon onClick={props.onLeaveForm} icon={faCircleXmark} className={classes.boxclose} size = '2x'/>
                    <br />
                    <div>
                    <label htmlFor="cause">Razlog prijave*</label>
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
                    <input id="title" className={classes['field-long']} type="text" maxLength={200} size={200} value={title} onChange={handleTitleChange} /><br />
                    <label htmlFor='location' >Adresa ili opis lokacije</label>
                    <div className={classes.locationDiv}>
                        <input id='location' className={classes['field-long']} type="text" value={location} onChange={handleLocationChange}></input>
                        {!latitude && <button type="button" className={classes.locationButton} onClick={handleAddGeoLocation}>
                                        <span className="fa-layers fa-fw">
                                            <FontAwesomeIcon icon={faLocationDot} size = 'lg' />
                                            <FontAwesomeIcon style={{opacity: "0"}} icon={faSlash} size='lg' transform="left-2" />
                                        </span>
                                    </button>}
                        {latitude && <button type="button" className={classes.locationButton} onClick={handleRemoveGeoLocation}>
                                        <span className="fa-layers fa-fw">
                                            <FontAwesomeIcon icon={faLocationDot} size='lg' />
                                            <FontAwesomeIcon icon={faSlash} size='lg' transform="left-2" />
                                        </span>
                                    </button>}
                    </div>
                    {latitude &&<small className={classes.gpsCoordinates}>GPS koordinate: {latitude},{longitude}</small>}
                    <label htmlFor="description">Tekst prijave*</label>
                    <textarea id="description" className={`${classes['field-long']} ${classes['field-textarea']}`} value={description} onChange={handleDescriptionChange} required />
                    <div className={classes.imgUploads}>
                        {fileDataURLs.map((fileDataURL, index) => 
                            <span key={index} className={classes.hiddenFileInput}>
                                <img src={fileDataURL} id={`image${index+1}`} alt="preview" 
                                    onClick={e => {handleShowImageModal(e)}}/>
                            </span>                           
                        )}   
                        {fileDataURLs.length < maxImages &&

                        <span className={classes.hiddenFileInput}>
                            <input type="file" accept='image/*' id={`img${fileDataURLs.length+1}`} onChange={handleAddFile} />
                            </span>
                        }
                    </div>
                    <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} ref={captchaRef} />
                    <button type="submit" name="submitToServer" className={classes.button}>Sačuvaj</button>
                    <button type="submit" name="sendEmail" className={classes.button} style={{ float: "right" }}>Pošalji prijavu</button>
                </form>
            </>
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