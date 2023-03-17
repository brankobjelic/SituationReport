import React from 'react'
import classes from './Thumbnails.module.css'
import { useState, useContext, useEffect } from 'react'
import FetchContext from '../Store/fetch-context';

const Thumbnails = (props) => {

    const ctx = useContext(FetchContext)

    const [fileDataUrl1, setFileDataUrl1] = useState()
    const [fileDataUrl2, setFileDataUrl2] = useState()
    const [fileDataUrl3, setFileDataUrl3] = useState()

    useEffect(() => {

        setFileDataUrl1()
        setFileDataUrl2()
        setFileDataUrl3()
        if(props.pic1){
            getImage(`${props.pic1}_tn`, 1)
        }
        if(props.pic2){
            getImage(`${props.pic2}_tn`, 2)
        }
        if(props.pic3){
            getImage(`${props.pic3}_tn`, 3)
        }
    }, [props])
        

        function getImage(imageFileName, index){

            var imageEndpoint = "api/reports/getimage?name=" + imageFileName;
            var requestUrl = ctx.protocol + ctx.host + ctx.port + imageEndpoint;
            console.log(requestUrl)
            //console.log(requestUrl)
            fetch(requestUrl)
            .then(response => {
                if(response.status === 200){
                    //console.log(response)
                    // response.blob().then((data) => {
                    //     //console.log(data)
                    //     var reader = new window.FileReader();
                    //     reader.readAsDataURL(data);
                    //     reader.onloadend = function() {
                    //         var base64data = reader.result;
                            
                    //         setFileDataURLs(fileDataURLs => [...fileDataURLs, base64data])
                    //         console.log(fileDataURLs)
                    //     };
                    // });
                    response.blob().then((data) => {
                        //console.log(data)
                        var reader = new window.FileReader();
                        reader.readAsArrayBuffer(data);
                        reader.onloadend = function() {
                            var data = reader.result;

                            var arrayBufferView = new Uint8Array( data );
                            var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
                            var urlCreator = window.URL || window.webkitURL;
                            var imageUrl = urlCreator.createObjectURL( blob );
                            //console.log(imageUrl)
                            //return imageUrl
                            //setFileDataURLs(fileDataURLs => [...fileDataURLs, imageUrl])
                            //console.log(fileDataURLs)
                            if (index === 1){
                                setFileDataUrl1(imageUrl)
                            }
                            if (index === 2){
                                setFileDataUrl2(imageUrl)
                            }
                            if (index === 3){
                                setFileDataUrl3(imageUrl)
                            }
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
            {/* {fileDataURLs.map((fileDataURL, index) => 
                <span key={index}>
                    <img src={fileDataURL} className={classes.img} id={`image${index+1}`} alt='' />
                </span>                           
            )}    */}
            {fileDataUrl1 && <span>
                                <img src={fileDataUrl1} className={classes.img} id='image1' alt='' />
                            </span>
            }
            {fileDataUrl2 && <span>
                                <img src={fileDataUrl2} className={classes.img} id='image2' alt='' />
                            </span>  
            }
            {fileDataUrl3 && <span>
                                <img src={fileDataUrl3} className={classes.img} id='image3' alt='' />
                            </span>  
            }
        </>
    )
}

export default React.memo(Thumbnails)