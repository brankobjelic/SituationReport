import React from 'react'
import classes from './Reports.module.css'
import DeleteReportButton from './DeleteReportButton';
import EditReportButton from './EditReportButton';
import Thumbnails from './Thumbnails';
import ReadMore from './ReadMore';
import {usePaginationFetch} from '../Hooks/use-pagination'

const Reports = (props) => {

  const {results, page, totalPages, nextPage, previousPage, firstPage, lastPage} = usePaginationFetch(props.email, props.addedReport, props.deletedReport)
    const reports = results.map((report) => {
      let dateAndTime = new Date(report.dateAndTime)
      report.dateAndTime = dateAndTime.toLocaleString('sr-RS')
      return report
    })


  return (
    <>
      <ul>
        {reports.slice(0).map(report => (
          <li className={classes.reportItem} key={report.id}>
            <p className={classes.liHeader}>{report.dateAndTime}<br />
            <small>{report.institution} <br /> {report.causeDescription} <br />Lokacija: {report.location}</small> </p>      
            <p><b>{report.title}</b></p>
            <ReadMore>
              {report.description}
            </ReadMore>
            <div className={classes.liFooter}>          
              <p className={classes.alignLeft}>
                <Thumbnails pic1={report.pic1} pic2={report.pic2} pic3={report.pic3} />
              </p>
              <span className={classes.alignRight}>
                <span className={classes.penIcon}>
                  <EditReportButton email={props.email} report={report} onUpdatedReport={props.onDel} onShowform={props.showFormHandler} showForm={props.showForm} onLeaveForm={props.onLeaveForm}/>
                </span>  
                <DeleteReportButton onDel={props.onDel} report={report} />
              </span>
            </div>
          </li>
        ))}
      </ul>
      <div className={classes.paginationDiv}>
          <button disabled={page === 1} onClick={firstPage}>⯇⯇</button>
          <button disabled={page === 1} onClick={previousPage}>⯇</button><span> {page}/{totalPages} </span>
          <button disabled={page === totalPages} onClick={nextPage} >⯈</button>
          <button disabled={page === totalPages} onClick={lastPage} >⯈⯈</button>
      </div>   
    </>
  )
}

export default Reports
