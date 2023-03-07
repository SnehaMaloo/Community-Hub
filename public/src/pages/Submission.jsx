import React, { useState } from 'react';
import axios from 'axios';
import { SubmissionRoute} from "../utils/APIRoutes";
import { useNavigate } from 'react-router-dom';
import NavbarComponent from '../components/Navbar';

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileSelectedHandler = event => {
    setSelectedFile(event.target.files[0]);
  };
  const [uploadStatus, setUploadStatus] = useState('');
  const navigate = useNavigate();
  const [newEvent, setNewEvent] = useState({
    title:'',
    data: '',
    description: '',
    likes: '',
    username: '',
    date:''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpload = async() => {
    try {
      const fd = new FormData();
    fd.append('image', selectedFile, selectedFile.name);
    axios.post('http://localhost:3000/upload', fd)
      .then(res => {
        console.log(res);
      });
      newEvent.data = selectedFile.name;
      newEvent.date=Date.now;
      newEvent.username = JSON.stringify(
        JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)).username
      );
      newEvent.likes = 0;
      console.log("file is sent");
      await axios.post(SubmissionRoute, newEvent);
      setUploadStatus(`Uploaded file(s) successfully.`);
      navigate("/home");
    } catch (error) {
      console.error(error);
      setUploadStatus('Failed to upload file(s).');
    }
  };
  

  return (
    <>
    <NavbarComponent></NavbarComponent>
    <div>
      <h1>Upload Images/Videos</h1>
      <input type="file" name="data" onChange={fileSelectedHandler} />
      <input type="text" name="description" value={newEvent.description} onChange={handleInputChange} />
      <button onClick={handleUpload}>Upload</button>
      <p>{uploadStatus}</p>
    </div>
    </>
  );
};

export default UploadPage;
