import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

const DeleteReportButton = (props) => {

  var host = "https://localhost:";
  var port = "7281/";
  var reportsEndpoint = "api/Reports/" + props.report.id;
  
  function deleteReport(){
    console.log(props.report)
    var requestUrl = host + port + reportsEndpoint;
    var headers = {}
    console.log(requestUrl);
    if(window.confirm("Da li ste sigurni da želite da izbrišete prijavu?")){
      fetch(requestUrl, { method: "DELETE", headers: headers })
          .then((response) => {
              if (response.status === 200) {
                  //alert("Brisanje uspesno izvrseno!")
                  props.onDelete()
              } else {
                  console.log("Error occured with code " + response.status);
                  alert("Doslo je do greske!");
              }
          })
          .catch(error => console.log(error));
    }
  }

  return (
    <button onClick={deleteReport}>
      <FontAwesomeIcon icon={faTrashCan} size = 'lg'/>
    </button>
  )
}

export default DeleteReportButton