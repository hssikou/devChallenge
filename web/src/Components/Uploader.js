import React, { Component, useState, useCallback } from 'react';
import Mountain from '../images/Mountain.svg'
import { Button } from "@chakra-ui/react";
import Loading from './Loading';
import { uploadImage } from '../API/UploadImage';
import { useDropzone } from 'react-dropzone';
// import { ReactNativeFile } from 'extract-files';
// import storage from '../firebase';
// import DragAndDrop from './DragAndDrop';

export default function Uploader() {
  const [isuploading, setIsuploading] = useState(false);
  const [isuploaded, setIsuploaded] = useState(false);
  const [image, setUploadedImage] = useState(null);
  const inputFileRef = React.useRef();

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    console.log('dropping somthing', acceptedFiles[0]);
    _dealWithFiles(acceptedFiles[0]);
    // if (acceptedFiles.length > 0) {
    //   setIsuploading(true);
    //   const formData = new FormData();
    //   formData.append('files', acceptedFiles[0]);
    //   uploadImage(formData).then((response) => {
    //     console.log('getting response', response);
    //     setIsuploaded(true);
    //     setUploadedImage(URL.createObjectURL(acceptedFiles[0]));
    //     setIsuploading(false);
    //   });
    // }
  }, []);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  const _open = (event) => {
    // console.log('open clicked', event.target.files[0]);
  }
  const _onFileChangeCapture = (e) => {
    /*Selected files data can be collected here.*/
    console.log(e.target.files[0]);
    const {
    target
    } = e;
    const {
      files
      } = target;
      _dealWithFiles(files);
    // if (files.length > 0) {
    //   setIsuploading(true);
    //   const formData = new FormData();
    //   formData.append('files', files[0]);
    //   uploadImage(formData).then((response) => {
    //     console.log('getting response', response);
    //     setIsuploaded(true);
    //     setUploadedImage(URL.createObjectURL(files[0]));
    //     setIsuploading(false);
    //   });
    //   // storage.ref(`/images/${files[0].name}`).put(files[0]).on("state_changed" , alert("success") , alert);
    // }
  };

  const _dealWithFiles = (data) => {
    if (data.length > 0) {
      setIsuploading(true);
      const formData = new FormData();
      formData.append('files', data[0]);
      uploadImage(formData).then((response) => {
        console.log('getting response', response);
        setIsuploaded(true);
        setUploadedImage(URL.createObjectURL(data[0]));
        setIsuploading(false);
      });
    }
  }


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
            {...getRootProps()}
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




