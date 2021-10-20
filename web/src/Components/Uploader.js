import React, { useCallback, useState } from 'react';
// import { useDropzone } from "react-dropzone";
import Mountain from '../images/Mountain.svg'
import { Button } from "@chakra-ui/react";
// import { app } from '../firebase/index.js'
// import {
//   getStorage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
// } from "firebase/storage";
// import Loading from './Loading';
// import Uploaded from './Uploaded';
function Upload() {

const [image, setImage] = useState("null");
const [url, setUrl] = useState("null");
const [progress, setProgress] = useState("null");
const [isuploading, setIsuploading] = useState(false);
const [isuploaded, setIsuploaded] = useState(false);
// const storage = getStorage();


// const onDrop = useCallback(acceptedFiles => {
//   const file = acceptedFiles[0];
//   setImage(file);
//   handleUpload({image: file});
// }, []);

// const storageRef = ref(storage, "images/" + image.name);

// const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
//   accept: "image/*",
//   maxFiles: 1,
//   onDrop
// }, []);

// console.log(image)
// const handleUpload = ({image}) => {
//  const uploadTask = uploadBytesResumable(storageRef, image);
//  setIsuploading(true);

//  uploadTask.on(
//    "state_changed",
//    (snapshot) => {
   
//      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//      setProgress(progress)
//      // eslint-disable-next-line default-case
//      switch (snapshot.state) {
//        case "paused":
//          console.log("Upload is paused");
//          break;
//        case "running":
//          console.log("Upload is running");
//          break;
//      }
//    },
//    (error) => {
  
//    },
//    () => {
    
//      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//        setIsuploading(false)
//        setIsuploaded(true)
//        setUrl(downloadURL)

//      });
//    }
//  );
//  }


       return (
         <>
           <div className="container">
             {!isuploaded && (
               <div className={`${isuploading ? "hidden" : "uploader"} `}>
                 <h1>Upload your image</h1>
                 <p>File should be Jpeg, Png,...</p>
                 <div 
                //  {...getRootProps()} 
                 className="dragzone">
                   <input 
                //    {...getInputProps()}
                   />
                   <img src={Mountain} alt="mountain" />
                   <p>Drag & Drop your image here</p>
                   {/* {isDragActive ? (
                     <p>Drag & Drop your image here</p>
                   ) : (
                     <p>
                       Drag 'n' drop some files here, or click to select files
                     </p>
                   )} */}
                 </div>
                 <div className="fileselection">
                   <p>Or</p>
                   <Button colorScheme="blue" size="sm" 
                   onClick={open}
                   >
                     Choose a file
                   </Button>
                 </div>
               </div>
             )}
             {/* {isuploading && <Loading progress={progress} />} */}
             {/* {isuploaded && <Uploaded url={url} />} */}
           </div>
         </>
       );
     
}

export default Upload
import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Uploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> Uploader </Text>
      </View>
    );
  }
}
