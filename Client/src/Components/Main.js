import React from 'react'
import Reports from './Reports';
import Form from './Form';
import classes from './Main.module.css'
import { useState, useEffect } from 'react';

const Main = (props) => {

  const [showForm, setShowForm] = useState(false)
  const [addedReport, setAddedReport] = useState(false)
  const [updatedReport, setUpdatedReport] = useState(false)
  const [deletedReport, setDeletedReport] = useState(false)

  function addedReportHandler(){
    setAddedReport(!addedReport)
  }

  function updatedReportHandler(){
    setUpdatedReport(!updatedReport)
  }

  function deletedReportHandler(){
    setDeletedReport(!deletedReport)
  }

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
      {showForm && <Form onLeaveForm={() => {hideFormHandler()}} email={props.email} onAddedReport={() => {addedReportHandler()}}></Form>}
      <Reports addedReport={addedReport} deletedReport={deletedReport} updatedReport={updatedReport} email={props.email} onDel={deletedReportHandler} onUpdate={updatedReportHandler} onShowForm={showFormHandler} onLeaveForm={hideFormHandler}></Reports>
    </div>
  )
}

export default Main