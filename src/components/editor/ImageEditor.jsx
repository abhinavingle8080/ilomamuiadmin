/* eslint-disable react/self-closing-comp */
/* eslint-disable  prefer-destructuring */
/* eslint-disable react/button-has-type */

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import React, { useState, createRef } from 'react';

import './ImageEditor.css'

function ImageEditor() {
  const [image, setImage] = useState(
    'https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg'
  );
  const [cropData, setCropData] = useState('#');
  const cropperRef = createRef(Cropper);

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    console.log('cropperRef', cropperRef);
    if (typeof cropperRef.current.cropper === 'undefined') {
      return;
    }
    setCropData(cropperRef.current.cropper.getCroppedCanvas().toDataURL());
  };
  return (
    <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
      <div style={{ width: '100%' }}>
        <input type="file" onChange={onChange} />

        <Cropper
          style={{ height: 400, width: '100%' }}
          initialAspectRatio={1}
          preview=".img-preview"
          src={image}
          ref={cropperRef}
          viewMode={1}
          guides
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive
          autoCropArea={1}
          checkOrientation={false}
        />
      </div>

      <div>
        <div
          style={{ display: 'inline-block', padding: '10px', boxSizing: 'border-box', float: 'right', width: '50%' }}
        >
          <h1>Preview</h1>

          <div className="img-preview" style={{ width: '200px', float: 'left', height: '200px'}}></div>
        </div>

        <div
          className="box"
          style={{
            display: 'inline-block',
            padding: '10px',
            boxSizing: 'border-box',
            width: '50%',
            float: 'right',
            height: '300px',
          }}
        >
          <h1>
            <span>Crop</span>
            <button style={{ float: 'left' }} onClick={getCropData}>
              Crop Image
            </button>
          </h1>
          <img style={{ width: '200px', height: '200px' }} src={cropData} alt="cropped" />
        </div>
      </div>
    </div>
  );
}

export default ImageEditor;

/* eslint-disable react/button-has-type */
/* eslint-disable  prefer-destructuring */
/* eslint-disable react/self-closing-comp */
