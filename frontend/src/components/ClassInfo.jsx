import React, { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import './ClassInfo.css';
import DisplayCourses from './DisplayCourses';
import DisplayFeedback from './DisplayFeedback';
import DisplayProctoring from './DisplayProctoring';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
const ClassInfo = () => {
  const navigate = useNavigate();
  const [feedbackData, setFeedbackData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    toast.success('File Uploaded successfully');
  };

  const handleUpload = async () => {
    toast.success('File Uploaded successfully');
  }

  return (
    <>
      <ToastContainer />
      <div className="class-container">
        <div className="header">
          <h2 className="title">1.Courses Average Pass Percentage:</h2>
          <div className="flex items-center gap-2">
<<<<<<< HEAD
            <input type="file" name="image" style={{ border: '1px solid #ccc', padding: '5px', borderRadius: '8px' }} onChange={handleFileChange} />
            <button className="bg-blue-500 text-white rounded text-sm w-21 h-8 flex items-center justify-center" onClick={handleUpload}>Upload</button>
            <button className=" bg-blue-500 text-white rounded text-sm h-8 w-21 flex items-center justify-center" onClick={() => navigate('/class')}>
=======
            <input type="file" name="image" style={{ border: '1px solid #ccc', padding: '5px', borderRadius: '8px' }} />
            <button className="bg-blue-500 text-white rounded text-sm w-21 h-8 flex items-center justify-center no-print" onClick={handleUpload}>Upload</button>
            <button className=" bg-blue-500 text-white rounded text-sm h-8 w-21 flex items-center justify-center no-print" onClick={() => navigate('/class')}>
>>>>>>> 25829bfa86117348c33ba0780c7065ad922299a1
              <IoMdAdd /> Add
            </button>
          </div>
        </div>
        <DisplayCourses />
      </div>

      <div className="class-container">
        <div className="header">
          <h2 className="title">2.Course Feedback:</h2>
          <div className="flex items-center gap-2">
            <input type="file" style={{ border: '1px solid #ccc', padding: '5px', borderRadius: '8px' }} />
<<<<<<< HEAD
            <button className=" bg-blue-500 text-white rounded text-sm w-21 h-8 flex items-center justify-center">Upload</button>
            <button className=" bg-blue-500 text-white rounded text-sm h-8 w-21 flex items-center justify-center" onClick={() => navigate('/feedback')} >
=======
            <button className=" bg-blue-500 text-white rounded text-sm w-21 h-8 flex items-center justify-center no-print" onClick={handleUpload} >Upload</button>
            <button className=" bg-blue-500 text-white rounded text-sm h-8 w-21 flex items-center justify-center no-print" onClick={() => navigate('/feedback')} >
>>>>>>> 25829bfa86117348c33ba0780c7065ad922299a1
              <IoMdAdd /> Add
            </button>
          </div>
        </div>
        <DisplayFeedback feedbackData={feedbackData} />
      </div>

      <div className="class-container">
        <div className="header">
          <h2 className="title">3.Proctoring Students Average Pass Percentage:</h2>
          <div className="flex items-center gap-2">
            <input type="file" style={{ border: '1px solid #ccc', padding: '5px', borderRadius: '8px' }} />
<<<<<<< HEAD
            <button className=" bg-blue-500 text-white rounded text-sm w-21 h-8 flex items-center justify-center">Upload</button>
            <button className=" bg-blue-500 text-white rounded text-sm w-21 h-8 flex items-center justify-center" onClick={() => navigate('/proctoring')} >
=======
            <button className=" bg-blue-500 text-white rounded text-sm w-21 h-8 flex items-center justify-center no-print" onClick={handleUpload}>Upload</button>
            <button className=" bg-blue-500 text-white rounded text-sm w-21 h-8 flex items-center justify-center no-print" onClick={() => navigate('/proctoring')} >
>>>>>>> 25829bfa86117348c33ba0780c7065ad922299a1
              <IoMdAdd /> Add
            </button>
          </div>
        </div>
        <DisplayProctoring />
      </div>
    </>
  );
};

export default ClassInfo;
