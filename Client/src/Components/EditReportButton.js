import React from 'react'
import { useState } from 'react'
import Form from './Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPen } from '@fortawesome/free-solid-svg-icons'


const EditReportButton = () => {

  const [showForm, setShowForm] = useState(false)

  

  return (
    <button onClick={e =>{setShowForm(true)}}>
    <FontAwesomeIcon icon={faPen} size = 'lg'/>
    {showForm && <Form></Form>}
  </button>
  )
}

export default EditReportButton