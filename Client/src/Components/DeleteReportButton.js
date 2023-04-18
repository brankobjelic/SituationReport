import React from 'react'
import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import FetchContext from '../Store/fetch-context'

const DeleteReportButton = (props) => {
  const ctx = useContext(FetchContext)
  var reportsEndpoint = "api/Reports/" + props.report.id;
  
  function deleteReport(){
    //console.log(props.report)
    var requestUrl = ctx.protocol + ctx.host + ctx.port + reportsEndpoint;
    var headers = {}
    //console.log(requestUrl);
    if(window.confirm("Da li ste sigurni da želite da izbrišete prijavu?")){
      fetch(requestUrl, { method: "DELETE", headers: headers })
          .then((response) => {
              if (response.status === 200) {
                  console.log("Succesfuly deleted Report")
                  props.onDel()
              } else {
                  console.log("Error occured with code " + response.status);
                  alert("Doslo je do greske!");
              }
          })
          .catch(error => console.log(error));
    }
  }

  return (
      <FontAwesomeIcon icon={faTrashCan} size = 'lg' onClick={deleteReport}/>
  )
}

export default DeleteReportButton