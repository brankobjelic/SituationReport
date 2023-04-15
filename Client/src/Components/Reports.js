import React from 'react'
import classes from './Reports.module.css'
import DeleteReportButton from './DeleteReportButton';
import EditReportButton from './EditReportButton';
import Thumbnails from './Thumbnails';
import ReadMore from './ReadMore';
import {usePaginationFetch} from '../Hooks/use-pagination'
import { useContext } from 'react';
import FetchContext from '../Store/fetch-context';

const Reports = (props) => {
  const ctx = useContext(FetchContext)
  const {results, page, totalPages, nextPage, previousPage, firstPage, lastPage} = usePaginationFetch(props.email, props.addedReport, props.deletedReport, props.updatedReport)

  return (
    <>
      <ul>
        {results.slice(0).map(report => (
            <li className={classes.reportItem} key={report.id} id={report.id}>
            <p className={classes.liHeader}>{new Date(report.dateAndTime).toLocaleString('sr-RS')}<br />
            <small>{report.institution} <br /> {report.causeDescription} <br />
            {report.location && <span>Lokacija: {report.location} </span>}
            {!!report.latitude && <span>Gps koordinate: {report.latitude}, {report.longitude}</span>}
            </small> </p><hr />      
            <p><b>{report.title}</b></p>
            <ReadMore>
              {report.description}
            </ReadMore>
            <div className={classes.liFooter}>          
              <div className={classes.alignLeft}>
                <Thumbnails pic1={report.pic1} pic2={report.pic2} pic3={report.pic3} />
              </div>
              <span className={classes.alignRight}>
                <span className={classes.penIcon}>
                  <EditReportButton email={props.email} report={report} onUpdatedReport={props.onUpdate} onShowform={props.showFormHandler} showForm={props.showForm} onLeaveForm={props.onLeaveForm}/>
                </span>  
                <span className={classes.trashIcon}>
                  <DeleteReportButton onDel={props.onDel} report={report} />
                </span>
              </span>
            </div>
          </li>
        ))}
      </ul>
      <div className={classes.paginationDiv}>
          <button disabled={page === 1} onClick={firstPage}><b>&lt;&lt;</b></button>
          <button disabled={page === 1} onClick={previousPage}><b>&lt;</b></button><span> {page}/{totalPages} </span>
          <button disabled={page === totalPages} onClick={nextPage} ><b>&gt;</b></button>
          <button disabled={page === totalPages} onClick={lastPage} ><b>&gt;&gt;</b></button>
      </div>
    </>
  )
}

export default React.memo(Reports)
