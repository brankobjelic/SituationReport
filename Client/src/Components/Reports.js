import React from 'react'
import { useState } from 'react';
import classes from './Reports.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPen } from '@fortawesome/free-solid-svg-icons'
import DeleteReportButton from './DeleteReportButton';

const Reports = (props) => {
  console.log(props.reports)

    function onDel(){
      props.onDel(true)
    }

  return (
    <ul>
      {props.reports.slice(0).reverse().map(report => (
        <li className={classes.reportItem} key={report.dateAndTime}>
          <p>{report.dateAndTime} {report.institution} - {report.causeDescription}</p>      
          <p><b>{report.title}</b></p>
          <p>{report.description}</p>
          <div className={classes.icons}>
            <span className={classes.penIcon}>
              <FontAwesomeIcon icon={faPen} size = 'lg'/>
            </span>
            <DeleteReportButton onDel={onDel} report={report} />
          </div>
        </li>
      ))}
    </ul>
  )
}

export default Reports
