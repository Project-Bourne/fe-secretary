import React, { useState } from 'react';
import Image from 'next/image';
import FileUploadSection from './FileUploadSection';
import HomeService from '@/services/home.service';
import { useRouter } from 'next/router';

const FileUpload = () => {
  const route = useRouter();
  const [formData, setFormData] = useState('');
  const [file, setFile] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New state for loading
  const [showReader, setShowReader] = useState(false);
  const homeService = new HomeService();

  const handleChange = (e) => {
    setFormData(e.target.value);
  };

  const handleTextSummarySubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true); // Set loading to true before API call
      const dataObj = {
        text: formData,
        numberOfSentence: 5,
      };
      const response = await homeService.summarizeText(dataObj);
      setIsLoading(false); // Set loading back to false after API call
      route.push(`/home/${response.data.uuid}`);
    } catch (error) {
      setIsLoading(false); // Set loading back to false if there's an error
      console.error(error);
    }
  };

  const handleDeleteFile = () => {
    setFile(null);
    setIsFileUploaded(false);
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setIsFileUploaded(true);
      console.log(selectedFile, 'selectedFile');
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
    if (droppedFile) {
      setIsFileUploaded(true);
    }
  };

  return (
    <div className="m-5">
      {isFileUploaded && !showReader ? (
        <FileUploadSection
          file={file}
          handleDeleteFile={handleDeleteFile}
          isLoading={isLoading}
        />
      ) : (
        <div>
          {/* Text Summary Form */}
          <form onSubmit={handleTextSummarySubmit}>
            <div className="flex align-middle w-full border-2 rounded-full border-[#E5E7EB]-500 border-dotted">
              <span className="flex align-middle justify-center mx-3">
                <Image
                  src={require('../../../../assets/icons/link.svg')}
                  alt="upload image"
                  width={20}
                  height={20}
                  priority
                />
              </span>
              <input
                type="text"
                placeholder="Copy and paste link here"
                className="w-[95%] bg-sirp-secondary2 h-[4rem] outline-none focus:ring-0"
                onChange={handleChange}
              />
              <span className="flex align-middle justify-center mx-3">
                <Image
                  className="flex align-middle justify-center font-light text-[#A1ADB5]"
                  src={require('../../../../assets/icons/x.svg')}
                  alt="upload image"
                  width={20}
                  height={20}
                />
              </span>
            </div>
          </form>

          {/* File Upload */}
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="h-[30vh] mt-5 flex align-middle w-full justify-center border rounded-[30px] border-[#E5E7EB]"
          >
            <div className="flex flex-col align-middle justify-center">
              <span className="flex align-middle justify-center mx-3">
                <Image
                  className="flex align-middle justify-center"
                  src={require('../../../../assets/icons/cloud.svg')}
                  alt="upload image"
                  width={25}
                  height={25}
                  priority
                />
              </span>
              <span className="font-normal text-[#383E42]">
                <input
                  id="file-upload"
                  type="file"
                  accept=".txt,.rtf,.doc,.docx,.pdf,.ppt,.pptx"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <label
                  className="text-blue-400 cursor-pointer"
                  htmlFor="file-upload"
                >
                  Upload a file
                </label>{' '}
                or drag and drop
              </span>
              <span className="font-light text-[#383E42]">
                TXT, RFT, DOC, PDF up to 5MB
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
