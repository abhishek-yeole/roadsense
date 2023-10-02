import React, { useState } from 'react';
// import * as cocoSsd from '@tensorflow-models/coco-ssd';

function AccidentDetectionComponent() {
  const [imageDataList, setImageDataList] = useState([]);
  const [totalFrames, setTotalFrames] = useState(0);
  const [frameConfidences, setFrameConfidences] = useState([]);
  const [displayedImageIndex, setDisplayedImageIndex] = useState(0);
  const [fetched, setFetched] = useState();
//   const [modelLoaded, setModelLoaded] = useState(false);

  const handleImageSliderChange = (event) => {
    const newIndex = parseInt(event.target.value);
    setDisplayedImageIndex(newIndex);
  };

  const handleFileUpload = async (event) => {
    const formData = new FormData();
    formData.append('file', event.target.files[0]);

    // Make an API call to process the uploaded video and get results
    const response = await fetch('http://192.168.0.104:5000/detection', {
      method: 'POST',
      body: formData,
    });

    console.log(response);

    const processedData = await response.json();
    setImageDataList(processedData.image_data_list);
    setTotalFrames(processedData.totalFrames);
    setFrameConfidences(Object.entries(processedData.targetFrames));
    setFetched(processedData.fetched);
  };

  return (
    <div>
      <input type="file" accept="video/mp4" onChange={handleFileUpload} />
      <input
        type="range"
        min="0"
        max={imageDataList.length - 1}
        value={displayedImageIndex}
        onChange={handleImageSliderChange}
      />
      <div id="imageContainer">
        <img
          id="displayedImage"
          src={'data:image/jpeg;base64,' + imageDataList[displayedImageIndex]}
          alt={'Image'+ displayedImageIndex}
        />
      </div>
      <div>
        Total Frames: {totalFrames}
        <div>
            <h1>Frame Confidences</h1>
            <ul>
                {frameConfidences.map(([frameNumber, confidence]) => (
                    <li key={frameNumber}>
                        Frame {frameNumber}: {confidence}
                    </li>
                ))}
            </ul>
        </div>
        <img
          id="displayedImage"
          src={'data:image/jpeg;base64,' + fetched}
          alt={'Image'+ displayedImageIndex}
        />
      </div>
    </div>
  );
}

export default AccidentDetectionComponent;
