import React from 'react'
import Reports from './Reports';
import Form from './Form';
import classes from './Main.module.css'
import { useState } from 'react';

const Main = (props) => {
  const [showForm, setShowForm] = useState(false)
  const [addedReport, setAddedReport] = useState(false)


  function addedReportHandler(){  }

  return (
    <div>
      {!showForm && <button className={classes.button} onClick={e =>{setShowForm(true)}}>Nova prijava</button>}
      {showForm && <Form onLeaveForm={setShowForm} email={props.email} onAddedReport={setAddedReport}></Form>}
      <Reports email={props.email} onAdded={addedReportHandler}></Reports>
    </div>
  )
}

export default Main