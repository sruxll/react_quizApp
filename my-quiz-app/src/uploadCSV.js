import React, { useState } from 'react';
import axios from 'axios';
// import Toast from './components/Toast.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Body from './components/Body.js';
import './components/header.css';


function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    // Perform actions with the selected file
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      //<script src="https://unpkg.com/axios/dist/axios.min.js">
      axios.post('/api/upload', formData).then(response => {
          // Handle response from the server
          toast.success("File Uploaded Successfully");
      }).catch(error => {
          // Handle error
          toast.error("File Uploaded Failed");
      });
      setSelectedFile([]);  
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button className='button' onClick={handleUpload}>UploadFile</button>
      <ToastContainer />
    </div>
  );
}

export default FileUpload;
