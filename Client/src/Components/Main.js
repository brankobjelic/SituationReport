import React from 'react'
import Reports from './Reports';
import Form from './Form';
import classes from './Main.module.css'
import { useState, useEffect, useContext } from 'react';
import FetchContext from '../Store/fetch-context';

const Main = (props) => {
  const ctx = useContext(FetchContext)
  const [showForm, setShowForm] = useState(false)
  const [addedReport, setAddedReport] = useState(false)
  const [reports, setReports] = useState()

  function fetchReports(){
    //var host = "https://brankobjelic.duckdns.org:";
    //var port = "7281/";
    var loginEndpoint = "api/reports/allbyuser?email=" + props.email;
    var requestUrl = ctx.protocol + ctx.host + ctx.port + loginEndpoint;
    //console.log(requestUrl)
    fetch(requestUrl)
    .then(response => {
        if(response.status === 200){
            response.json().then((data) => {
              //console.log(data)
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

  function addedReportHandler(){
    setAddedReport(!addedReport)
  }
  useEffect(() => {
    fetchReports()
  },[addedReport]);

  useEffect(() => {
    if (showForm){
      document.body.style.overflow = "hidden";
    }else{
      document.body.style.overflow = "scroll";
    }
  },[showForm])

  function showFormHandler(){
    setShowForm(true)
  }

  function hideFormHandler(){
    setShowForm(false)
  }


  //console.log(reports)
  return (
    <div>
      {!showForm && <button className={classes.button} onClick={showFormHandler}>Nova prijava</button>}
      {showForm && <Form onLeaveForm={() =>{hideFormHandler()}} email={props.email} onAddedReport={() =>{addedReportHandler()}}></Form>}
      {reports && <Reports email={props.email} reports={reports} onDel={addedReportHandler} onShowForm={showFormHandler} onLeaveForm={hideFormHandler}></Reports>}
    </div>
  )
}

export default Main