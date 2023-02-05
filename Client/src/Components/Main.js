import React from 'react'
import Reports from './Reports';
import Form from './Form';
import classes from './Main.module.css'
import { useState, useEffect } from 'react';

const Main = (props) => {
  const [showForm, setShowForm] = useState(false)
  const [addedReport, setAddedReport] = useState(false)
  const [reports, setReports] = useState(false)
  const [deletedReport, setDeletedReport] = useState(false)

  function fetchReports(){
    var host = "https://localhost:";
    var port = "7281/";
    var loginEndpoint = "api/reports/allbyuser?email=" + props.email;
    var requestUrl = host + port + loginEndpoint;
    console.log(requestUrl)
    fetch(requestUrl)
    .then(response => {
        if(response.status === 200){
            response.json().then((data) => {
              console.log(data)
              setReports(data)
            });
        }else{
            console.log("Error occured with code " + response.status);
            console.log(response);
            alert("Desila se greska!");
        }
    })
    .catch(error => console.log(error));
  }

  useEffect(() => {
    fetchReports()
  },[addedReport, deletedReport]);


  return (
    <div>
      {!showForm && <button className={classes.button} onClick={e =>{setShowForm(true)}}>Nova prijava</button>}
      {showForm && <Form onLeaveForm={setShowForm} email={props.email} onAddedReport={setAddedReport}></Form>}
      {reports && <Reports email={props.email} reports={reports} onDel={setDeletedReport}></Reports>}
    </div>
  )
}

export default Main