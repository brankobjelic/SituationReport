import { useEffect } from "react";
import { useState, useContext } from "react";
import FetchContext from '../Store/fetch-context';

export const usePaginationFetch = (
    email, addedReport, deletedReport, updatedReport, handleSignOut
  ) => {
    const ctx = useContext(FetchContext)

    const [page, setPage] = useState(1)
    const [results, setResults] = useState([])
    const [totalPages, setTotalPages] = useState(1)
    const pageSize = 5

    //sets current page to first page if new report added so it's visible on screen
    useEffect(() => {
        setPage(1)
    },[addedReport, updatedReport])

    useEffect(() => {
        fetchReports()
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
    }, [page, deletedReport, addedReport, updatedReport])

    function fetchReports(){
        var endpoint = `api/reports/paginatedbyuser?PageNumber=${page}&PageSize=${pageSize}&email=${email}`;
        var requestUrl = ctx.protocol + ctx.host + ctx.port + endpoint;
        console.log(requestUrl)
        var headers={'Content-Type':'application/json'}
        headers.Authorization = 'Bearer ' + sessionStorage.getItem('idToken');
        headers.From = sessionStorage.getItem('email')
        fetch(requestUrl, {headers: headers})
        .then(response => {
            if(response.status === 200){
                let paginationHeader = JSON.parse(response.headers.get('x-pagination'))
                setTotalPages(paginationHeader.TotalPages)
                response.json().then((data) => {
                  console.log(data)
                  setResults(data)
                });
            }
            else if (response.status === 401){
                alert("Niste ulogovani. U jednom trenutku možete biti ulogovani samo na jednoj instanci aplikacije. Pokušajte ponovo da se ulogujete.")
                handleSignOut()
            }
            else{
                console.log("Error occured with code " + response.status);
                console.log(response);
                alert("Desila se greska!");
            }
        })
        .catch(error => console.log(error));
    }

    const nextPage = () => {setPage(prevState => Math.min(prevState + 1, totalPages))}
    const previousPage = () => {setPage(prevState => Math.max(0, prevState - 1))}
    const firstPage = () => {setPage(1)}
    const lastPage = () => {setPage(totalPages)}
    return {results, page, totalPages, nextPage, previousPage, firstPage, lastPage}
  };