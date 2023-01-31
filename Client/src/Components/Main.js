import React from 'react'
import Reports from './Reports';
import Form from './Form';
import classes from './Main.module.css'
import { useState } from 'react';

const Main = (props) => {
  const [showForm, setShowForm] = useState(false)
  const [addedReport, setAddedReport] = useState(false) 

  return (
    <div>
      {!showForm && <button className={classes.button} onClick={e =>{setShowForm(true)}}>Nova prijava</button>}
      {showForm && <Form onLeaveForm={setShowForm} email={props.email} onAdd={setAddedReport}></Form>}
      <Reports email={props.email} addedReport={addedReport}></Reports>
    </div>
  )
}

export default Main