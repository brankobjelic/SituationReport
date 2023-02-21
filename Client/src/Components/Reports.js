import React from 'react'
//import { useState } from 'react';
import classes from './Reports.module.css'
import DeleteReportButton from './DeleteReportButton';
import EditReportButton from './EditReportButton';

const Reports = (props) => {
  //console.log(props.reports)

  return (
    <ul>
      {props.reports.slice(0).reverse().map(report => (
        <li className={classes.reportItem} key={report.dateAndTime}>
          <p className={classes.liHeader}>{report.dateAndTime}<br /><small>{report.institution} <br /> {report.causeDescription} <br />Lokacija: {report.location}</small> </p>      
          <p><b>{report.title}</b></p>
          <p>{report.description}</p>
          <div className={classes.liFooter}>          
            <p className={classes.alignLeft}><small>Fotografije: </small><b>{report.pic1 ? '☑' : '☐'}{report.pic2 ? '☑' : '☐'}{report.pic3 ? '☑' : '☐'}</b></p>
            <span className={classes.alignRight}>
              <span className={classes.penIcon}>
                <EditReportButton email={props.email} report={report} onUpdatedReport={props.onDel} />
              </span>  
              <DeleteReportButton onDel={props.onDel} report={report} />
            </span>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default Reports
