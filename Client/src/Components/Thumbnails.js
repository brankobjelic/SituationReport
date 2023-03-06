import React from 'react'
import classes from './Thumbnails.module.css'
import { useState, useContext, useEffect } from 'react'
import FetchContext from '../Store/fetch-context';

const ThumbNails = (props) => {

    const ctx = useContext(FetchContext)
    //console.log(props)

    const [fileDataURLs, setFileDataURLs] = useState([])

    useEffect(() => {
        setFileDataURLs([])
        if(props.pic1){
            getImage(`${props.pic1}_tn`)
        }
        if(props.pic2){
            getImage(`${props.pic2}_tn`)
        }
        if(props.pic3){
            getImage(`${props.pic3}_tn`)
        }
    }, [props])

        function getImage(imageFileName){

            var imageEndpoint = "api/reports/getimage?name=" + imageFileName;
            var requestUrl = ctx.protocol + ctx.host + ctx.port + imageEndpoint;
            console.log(requestUrl)
            //console.log(requestUrl)
            fetch(requestUrl)
            .then(response => {
                if(response.status === 200){
                    //console.log(response)
                    response.blob().then((data) => {
                        //console.log(data)
                        var reader = new window.FileReader();
                        reader.readAsDataURL(data);
                        reader.onloadend = function() {
                            var base64data = reader.result;
                            
                            setFileDataURLs(fileDataURLs => [...fileDataURLs, base64data])
                            // console.log(fileDataURLs[0])
                        };
                    });
                }else{
                    console.log("Error occured with code " + response.status);
                    console.log(response);
                    alert("Desila se greska!");
                }
            })
            .catch(error => console.log(error));
        }

    return (
        <>
            {fileDataURLs.map((fileDataURL, index) => 
                <span key={index}>
                    <img src={fileDataURL} className={classes.img} id={`image${index+1}`} alt='' />
                </span>                           
            )}   
        </>
    )
}

export default ThumbNails