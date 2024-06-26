import React, { useState } from 'react';
import Icon from '../../assets/icon';

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const files = e.dataTransfer.files;
    if (files.length) {
      setFile(files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <>
      <h1 className="text-[16px] font-semibold text-[#28292C] mt-6"> Upload Image</h1> 
    <div
      className={`border-2 border-dashed border-gray-300 bg-[#F1F5F9] rounded-lg p-6 text-center transition-colors duration-300 ease-in-out mt-2 ${
        dragging ? 'bg-gray-100' : ''
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <input type="file" id="file" className="hidden" onChange={handleFileChange} />
      <label htmlFor="file" className="cursor-pointer">
        {file ? (
          <span className="text-gray-700 font-semibold">{file.name}</span>
        ) : (
          <div className="text-[#8098AB] flex flex-col justify-center items-center text-[12px] font-medium">
            <Icon name='imagePaperIcon' />
            <p>Choose a file to upload</p>
            <p>or drag and drop it here</p>
          </div>
        )}
      </label>
    </div>
    </>
  );
};

export default ImageUpload;
