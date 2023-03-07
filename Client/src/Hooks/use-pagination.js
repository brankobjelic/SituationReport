import { useEffect } from "react";
import { useState, useContext } from "react";
import FetchContext from '../Store/fetch-context';

export const usePaginationFetch = (
    email
  ) => {
    const ctx = useContext(FetchContext)

    const [page, setPage] = useState(1)
    const [results, setResults] = useState([])
    const pageSize = 5

    useEffect(() => {
        var endpoint = `api/reports/paginatedbyuser?PageNumber=${page}&PageSize=${pageSize}&email=${email}`;
        var requestUrl = ctx.protocol + ctx.host + ctx.port + endpoint;
        console.log(requestUrl)
        fetch(requestUrl)
        .then(response => {
            console.log(response)
            if(response.status === 200){
                response.json().then((data) => {
                  //console.log(data)
                  setResults(data)
                });
            }else{
                console.log("Error occured with code " + response.status);
                console.log(response);
                alert("Desila se greska!");
            }
        })
        .catch(error => console.log(error));
    }, [page])

    const nextPage = () => setPage(page + 1)
    const previousPage = () => setPage(Math.max(0, page -1))
  
    return {results, page, setPage, nextPage, previousPage}
  };