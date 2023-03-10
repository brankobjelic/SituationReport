import React from 'react'
import { useState } from 'react'
import Form from './Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPen } from '@fortawesome/free-solid-svg-icons'


const EditReportButton = (props) => {

  const [showEditForm, setShowEditForm] = useState(false)

  function showEditFormHandler(){
    setShowEditForm(true)
  }

  function hideEditFormHandler(){
    setShowEditForm(false)
  }

  if (showEditForm){
    document.body.style.overflow = "hidden";
  }else{
    document.body.style.overflow = "scroll";
  }

  return (
    <>
      <FontAwesomeIcon icon={faPen} size = 'lg' onClick={showEditFormHandler}/>
      {showEditForm && <Form email={props.email} report={props.report} onLeaveForm={hideEditFormHandler} onUpdatedReport={props.onUpdatedReport}></Form>}
    </>
  )
}

export default EditReportButton