import React from 'react'
import { useState } from 'react'
import Form from './Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPen } from '@fortawesome/free-solid-svg-icons'


const EditReportButton = (props) => {

  const [showForm, setShowForm] = useState(false) 

  return (
    <>
      <FontAwesomeIcon icon={faPen} size = 'lg' onClick={e =>{setShowForm(true)}}/>
      {showForm && <Form email={props.email} report={props.report} onLeaveForm={setShowForm} onUpdatedReport={props.onUpdatedReport}></Form>}
    </>
  )
}

export default EditReportButton