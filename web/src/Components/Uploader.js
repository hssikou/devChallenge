import React, { Component, useState } from 'react';
import Mountain from '../images/Mountain.svg'
import { Button } from "@chakra-ui/react";
import Loading from './Loading';
import { uploadImage } from '../API/UploadImage';
// import DragAndDrop from './DragAndDrop';

export default function Uploader() {
  const [isuploading, setIsuploading] = useState(false);
  const [isuploaded, setIsuploaded] = useState(false);
  const [image, setUploadedImage] = useState(null);
  const inputFileRef = React.useRef();

  const _open = (event) => {
    // console.log('open clicked', event.target.files[0]);
  }
  const _onFileChangeCapture = (e) => {
    /*Selected files data can be collected here.*/
    console.log(e.target.files);
    const {
    target
    } = e;
    const {
      files
      } = target;
    if (files.length > 0) {
      setIsuploading(true);
      uploadImage(files[0]).then((response) => {
        console.log('getting response', response);
        setIsuploaded(true);
        setUploadedImage(URL.createObjectURL(files[0]));
      });
      
    }
  };
  const _buttonClick = () => {
    inputFileRef.current.click();
  }

  return (
    <>
      <div className="container">

        {!isuploaded && (
          <div className={`${isuploading ? "hidden" : "uploader"} `}>
            <h1>Upload your image</h1>
            <p>File should be Jpeg, Png,...</p>
            <div
              className="dragzone">
              <img src={Mountain} alt="mountain" />
              <p>Drag & Drop your image here</p>
            </div>
            <div className="fileselection">
              <p>Or</p>
              <input
                className='fileSelector'
                type='file'
                onChange={(event) => _onFileChangeCapture(event)}
                ref={inputFileRef}
              />
              <button className="button" onClick={() => _buttonClick()}>
                Choose a file
              </button>
            </div>
          </div>
        )}
        {isuploading &&(
          <Loading />
        )}
        {isuploaded && (
          <div className="uploaded">
            <div>
              <h2>
                Succesfully Uploaded !
              </h2>
            </div>
            <img src={image} className="img-container" />
          </div>
        )}
      </div>
    </>
  );
}




