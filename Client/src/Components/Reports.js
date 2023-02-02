import React from 'react'
import { useEffect, useState } from 'react';
import classes from './Reports.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import DeleteReportButton from './DeleteReportButton';

const Reports = (props) => {
    const [reports, setReports] = useState([])

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
    },[props.addedReport]);

  return (
    <ul>
      {reports.slice(0).reverse().map(report => (
        <li className={classes.reportItem} key={report.dateAndTime}>
          <p>{report.dateAndTime} {report.institution}</p>          
          <p><b>{report.title}</b></p>
          <p>{report.description}</p>
          <div className={classes.icons}>
            <span className={classes.penIcon}>
              <FontAwesomeIcon icon={faPen} size = 'lg'/>
            </span>
            <DeleteReportButton onDelete={fetchReports} report={report} />
          </div>
        </li>
      ))}
    </ul>
  )
}

export default Reports
