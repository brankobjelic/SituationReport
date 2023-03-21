import React from 'react'
import classes from './Thumbnails.module.css'
import { useState, useContext, useEffect } from 'react'
import FetchContext from '../Store/fetch-context';
import ImageViewModal from './ImageViewModal';


const Thumbnails = (props) => {

    const ctx = useContext(FetchContext)

    const [fileDataUrl1, setFileDataUrl1] = useState()
    const [fileDataUrl2, setFileDataUrl2] = useState()
    const [fileDataUrl3, setFileDataUrl3] = useState()

    const [showImageViewModal, SetShowImageViewModal] = useState(false)
    const [imageUrl, setImageUrl] = useState()
    const [index, setIndex] = useState(0)

    const pics = []
    if (props.pic1 !== ''){
        pics.push(props.pic1)
    }
    if (props.pic2 !== ''){
        pics.push(props.pic2)
    }
    if (props.pic3 !== ''){
        pics.push(props.pic3)
    }

    console.log(pics)
    function handleSetImageViewModal(e){   
      setIndex(e.target.name)
      getImage(e.target.id, e.target.name)
      SetShowImageViewModal(true)
    }
  
    function handleUnsetImageViewModal(){
      setImageUrl()
      SetShowImageViewModal(false)
    }


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
            console.log(index)
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
                            var imgUrl = urlCreator.createObjectURL( blob );
                            //console.log(imageUrl)
                            //return imageUrl
                            //setFileDataURLs(fileDataURLs => [...fileDataURLs, imageUrl])
                            //console.log(fileDataURLs)
                            if (imageFileName.substr(imageFileName.length-3, 3) === '_tn'){
                                if (index === 1){
                                    setFileDataUrl1(imgUrl)
                                }
                                if (index === 2){
                                    setFileDataUrl2(imgUrl)
                                }
                                if (index === 3){
                                    setFileDataUrl3(imgUrl)
                                }
                            }else{
                                setImageUrl(imgUrl)
                                //setIndex(index)
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

        function handleGetNextImage(){
            getImage(pics[index])   //pic1 ~ index 0
            setIndex(+index + 1)
            console.log(index)
            console.log(pics)
        }

        function handleGetPreviousImage(){
            getImage(pics[index-2])
            setIndex(+index - 1)
        }
        
    return (
        <>
            {showImageViewModal && <ImageViewModal index={index} picsLength={pics.length} image={imageUrl} getPreviousImage={handleGetPreviousImage} getNextImage={handleGetNextImage} unsetShowImageViewModal={handleUnsetImageViewModal}
          >
        </ImageViewModal>}
            {fileDataUrl1 && <span>
                                <img src={fileDataUrl1} className={classes.img} id={props.pic1} name='1' alt='' onClick={handleSetImageViewModal} />
                            </span>
            }
            {fileDataUrl2 && <span>
                                <img src={fileDataUrl2} className={classes.img} id={props.pic2} name='2' alt='' onClick={handleSetImageViewModal}/>
                            </span>  
            }
            {fileDataUrl3 && <span>
                                <img src={fileDataUrl3} className={classes.img} id={props.pic3} name='3' alt='' onClick={handleSetImageViewModal}/>
                            </span>  
            }
        </>
    )
}

export default React.memo(Thumbnails)