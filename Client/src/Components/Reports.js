import React from 'react'
import classes from './Reports.module.css'
import DeleteReportButton from './DeleteReportButton';
import EditReportButton from './EditReportButton';
import Thumbnails from './Thumbnails';
import ReadMore from './ReadMore';
import ImageViewModal from './ImageViewModal';
import {usePaginationFetch} from '../Hooks/use-pagination'
import { useState, useContext, useEffect } from 'react';
import FetchContext from '../Store/fetch-context';

const Reports = (props) => {
  const ctx = useContext(FetchContext)
  const {results, page, totalPages, nextPage, previousPage, firstPage, lastPage} = usePaginationFetch(props.email, props.addedReport, props.deletedReport, props.updatedReport)

  // const [showImageViewModal, SetShowImageViewModal] = useState(false)
  // const [imageUrl, setImageUrl] = useState()

  // function handleExpandImage(e){   
  //   //console.log(e.target.id)
  //   getImage(e.target.id)
  //   SetShowImageViewModal(true)
  // }

  // function handleUnsetImageViewModal(){
  //   setImageUrl()
  //   SetShowImageViewModal(false)
  // }

  // /*Fetching image from server*/
  // function getImage(imageFileName){
  //   var imageEndpoint = "api/reports/getimage?name=" + imageFileName;
  //   var requestUrl = ctx.protocol + ctx.host + ctx.port + imageEndpoint;
  //   //console.log(requestUrl)
  //   fetch(requestUrl)
  //   .then(response => {
  //       if(response.status === 200){
  //           response.blob().then((data) => {
  //               var reader = new window.FileReader();
  //               // reader.readAsDataURL(data);
  //               // reader.onloadend = function() {
  //               //     var base64data = reader.result;
  //               //     setFileDataURLs(fileDataURLs => [...fileDataURLs, base64data])
  //               // };
  //               reader.readAsArrayBuffer(data);
  //               reader.onloadend = function() {
  //                   var data = reader.result;
  //                   var arrayBufferView = new Uint8Array( data );
  //                   var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
  //                   var urlCreator = window.URL || window.webkitURL;
  //                   var imgUrl = urlCreator.createObjectURL( blob );
  //                   setImageUrl(imgUrl)
  //                   //setFileDataURLs(fileDataURLs => [...fileDataURLs, imageUrl])
  //               }
  //           });
  //       }else{
  //           console.log("Error occured with code " + response.status);
  //           console.log(response);
  //           alert("Desila se greska!");
  //       }
  //   })
  //   .catch(error => console.log(error));
  // }

  return (
    <>
      <ul>
        {results.slice(0).map(report => (
            <li className={classes.reportItem} key={report.id} id={report.id}>
            <p className={classes.liHeader}>{new Date(report.dateAndTime).toLocaleString('sr-RS')}<br />
            <small>{report.institution} <br /> {report.causeDescription} <br />Lokacija: {report.location}</small> </p><hr />      
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
          <button disabled={page === 1} onClick={firstPage}>⯇⯇</button>
          <button disabled={page === 1} onClick={previousPage}>⯇</button><span> {page}/{totalPages} </span>
          <button disabled={page === totalPages} onClick={nextPage} >⯈</button>
          <button disabled={page === totalPages} onClick={lastPage} >⯈⯈</button>
      </div>
    </>
  )
}

export default React.memo(Reports)
