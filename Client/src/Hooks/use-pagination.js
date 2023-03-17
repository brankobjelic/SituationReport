import { useEffect, useMemo } from "react";
import { useState, useContext, useRef } from "react";
import FetchContext from '../Store/fetch-context';

export const usePaginationFetch = (
    email, addedReport, deletedReport
  ) => {
    const ctx = useContext(FetchContext)

    const [page, setPage] = useState(1)
    const [results, setResults] = useState([])
    const [totalPages, setTotalPages] = useState(1)
    const pageSize = 5

    //sets current page to first page if new report added so it's visible on screen
    useEffect(() => {
        setPage(1)
    },[addedReport])

    useEffect(() => {
        fetchReports()
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
    }, [page, deletedReport, addedReport])

    function fetchReports(){
        var endpoint = `api/reports/paginatedbyuser?PageNumber=${page}&PageSize=${pageSize}&email=${email}`;
        var requestUrl = ctx.protocol + ctx.host + ctx.port + endpoint;
        console.log(requestUrl)
        fetch(requestUrl)
        .then(response => {
            let paginationHeader = JSON.parse(response.headers.get('x-pagination'))
           setTotalPages(paginationHeader.TotalPages)
            if(response.status === 200){
                response.json().then((data) => {
                  console.log(data)
                  setResults(data)
                });
            }else{
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