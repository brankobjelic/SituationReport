import React from 'react'
import { useState, useRef, useEffect } from 'react';
import classes from './Form.module.css'


const Form = (props) => {
    var host = "https://localhost:";
    var port = "7281/";
    var causesEndpoint = "api/causes";
    var reportsEndpoint = "api/Reports"

    const [causes, setCauses] = useState([])
    const [causeId, setCauseId] = useState()

    const titleRef = useRef('')
    const descriptionRef = useRef('')
    const locationRef = useRef('')

    useEffect(getDataForDropdown, [])
    
    function getDataForDropdown(){
        var requesturl = host + port + causesEndpoint;
        console.log(requesturl);
        var headers = { };
        fetch(requesturl,{ headers: headers })
        .then((response) => {if(response.status === 200){
            response.json()
            .then((data) => {
                console.log(data);
                setCauses(data);
            });
        }else{
            console.log(response.status);
        }
        })
        .catch(error => console.log(error));
    }

    function handleChange(e){
        setCauseId(e.target.value)
    }

    function submitReportHandler(event){
        event.preventDefault()
        const title = titleRef.current.value
        const description = descriptionRef.current.value
        const location = locationRef.current.value
        if (!causeId){
            document.getElementById('cause').style.backgroundColor="salmon"
            return
        }
        var requestUrl = host + port + reportsEndpoint;
        var headers = {};
        headers["Content-Type"] = 'application/json'
        var sendData = {"userEmail": props.email, "title": title, "description": description, "location": location, "causeId": causeId};
        console.log(sendData)
        fetch(requestUrl, {method: "POST", headers: headers, body: JSON.stringify(sendData)})
        .then(response => {
            if(response.status === 201){
                console.log("Successfuly added Report");
                //alert("Successfuly added Report");
                props.onAddedReport(true)
            }else{
                console.log("Error occured with code " + response.status);
                console.log(response);
                alert("Desila se greska!");
            }
            titleRef.current.value = ''
            descriptionRef.current.value = ''
            props.onLeaveForm(false)
        })
    }

  return (
    <form onSubmit={submitReportHandler} className={classes['form-style-1']}>
        <label htmlFor="cause">Razlog prijave</label>
        <select id="cause" className={classes['field-select']} defaultValue={'DEFAULT'} onChange={handleChange} required>
            <option value="DEFAULT" disabled>Izaberite razlog za prijavu...</option>
            {causes.map((cause, index) => {
                return (
                    <option key={cause.id} value={cause.id}>{cause.description}</option>
                )
            })}
        </select><br />

        <label htmlFor="title" >Naslov</label>
        <input id="title"  className={classes['field-long']} type="text" ref={titleRef} required /><br />
        <label htmlFor='location' >Adresa ili opis lokacije</label>
        <input id='location' className={classes['field-long']} type="text" ref={locationRef} required></input>
        <label htmlFor="description">Tekst prijave</label>
        <textarea id="description" className={`${classes['field-long']} ${classes['field-textarea']}`} ref={descriptionRef} required/>
            <button className={classes.button}>Sačuvaj</button>
            <button type="button" className={classes.button} style={{float: "right"}} onClick={e => props.onLeaveForm(false)}>Odustajanje</button>
    </form>
  )
}

export default Form