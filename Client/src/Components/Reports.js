import React from 'react'
import { useEffect, useState } from 'react';
import classes from './Reports.module.css'

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
        </li>
      ))}
    </ul>
  )
}

export default Reports
