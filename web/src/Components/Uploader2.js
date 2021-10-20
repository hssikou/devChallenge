import React, { Component } from 'react';
import Mountain from '../images/Mountain.svg'
import { Button } from "@chakra-ui/react";
// import DragAndDrop from './DragAndDrop';
import FilesDragAndDrop from '@yelysei/react-files-drag-and-drop';


export default class Uploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isuploading: false,
      isuploaded: false
    };
  }

  _open = () => {
    console.log('open clicked');
  }

  _handleDrop = (e) => {
    console.log(e);
  }

  render() {
    console.log('this is a render');
    const {
      isuploaded,
      isuploading
    } = this.state;
    return (
      <>
        <div className="container">

          {!isuploaded && (
            <div className={`${isuploading ? "hidden" : "uploader"} `}>
              <h1>Upload your image</h1>
              <p>File should be Jpeg, Png,...</p>
              {/* <DragAndDrop
          handleDrop={() => this._handleDrop()}
        >
          
        </DragAndDrop> */}
              <FilesDragAndDrop
                // onUpload={(files) => console.log(files)}
                // count={3}
                // formats={['jpg', 'png', 'svg']}
                // containerStyles={{
                //   width: '200px',
                //   height: '200px',
                //   border: '1px solid #cccccc',
                // }}
                // openDialogOnClick
              >
                <div
                  className="dragzone">
                  <img src={Mountain} alt="mountain" />
                  <p>Drag & Drop your image here</p>
                </div>
              </FilesDragAndDrop>
              <div className="fileselection">
                <p>Or</p>
                <button className="button" onClick={() => this._open()}>
                  Choose a file
                </button>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}

