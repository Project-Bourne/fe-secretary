import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import FileUploadSection from './FileUploadSection';
import {
  setCopyText,
  setShowLoader,
  setFileUpLoadName,
  setSummarizeSetting,
  setuploadedText,
  setuploloadedUri,
} from '@/redux/reducer/summarySlice';
import LoadingModal from './LoadingModal';
import SummarizeCopyPasteSetting from '../ModalPopUp/summarizeCopyPasteSetting';
import CustomModal from '@/components/ui/CustomModal';

function FileUpload() {
  const { summarizeSetting, copyText, showLoader } = useSelector(
    (store:any) => store.summary
  );

  const dispatch = useDispatch();
  const [formData, setFormData] = useState('');
  const [file, setFile] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const handleTextSummarySubmit = (event) => {
    event.preventDefault();
    const cleanedFormData = formData.trim();
    if (cleanedFormData.length > 0) {
      dispatch(setCopyText(cleanedFormData));
      dispatch(setSummarizeSetting(true));
    }
  };
  
  

  const handleDeleteFile = () => {
    setFile(null);
    setIsFileUploaded(false);
  };

  const handleFileUpload = async (event) => {
    event.preventDefault();
    const selectedFile = event.target.files[0];
    dispatch(setFileUpLoadName(selectedFile.name));

    if (selectedFile) {
      setIsFileUploaded(true);
      const formData = new FormData();
      formData.append('files', selectedFile);

      try {
        const response = await fetch('http://192.81.213.226:89/api/v1/uploads', {
          method: 'POST',
          body: formData,
        });

        if (response.status) {
          const responseData = await response.json();
          dispatch(setuploadedText(responseData.data[0].text));
          dispatch(setuploloadedUri(responseData.data[0].uri));
        } else {
          console.error('File upload failed.');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } 
  };

  return (
    <div className="m-5">
      {isFileUploaded ? (
        <FileUploadSection
          file={file}
          handleDeleteFile={handleDeleteFile}
        />
      ) : (
        <div>
          <form onSubmit={handleTextSummarySubmit}>
            {/* Text Summary Form */}
            <div className="flex align-middle w-full border-2 rounded-full border-[#E5E7EB]-500 border-dotted">
              {/* Input */}
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
                placeholder="Copy and paste content text here"
                className="w-[95%] h-[4rem] outline-none focus:ring-0"
                onChange={(e) => setFormData(e.target.value)}
                value={formData}
              />
              <span className="flex align-middle justify-center mx-3">
                <Image
                  className="flex align-middle justify-center font-light text-[#A1ADB5] cursor-pointer"
                  src={require('../../../../assets/icons/x.svg')}
                  alt="upload image"
                  width={20}
                  height={20}
                  onClick={() => setFormData('')}
                />
              </span>
            </div>
          </form>
           {/* File Upload */}
           <div
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
                </label>
                <span> </span>or drag and drop
              </span>
              <span className="font-light text-[#383E42]">
                TXT, RFT, DOC, PDF up to 5MB
              </span>
            </div>
          </div>
        </div>
      )}

      {summarizeSetting && (
        <CustomModal
          style="bg-white md:w-[30%] w-[90%] relative top-[20%] rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={() => dispatch(setSummarizeSetting(false))}
        >
          <SummarizeCopyPasteSetting />
        </CustomModal>
      )}

      {showLoader && (
        <LoadingModal
          closeModal={() => dispatch(setShowLoader(false))}
          formData={copyText}
        />
      )}
    </div>
  );
}

export default FileUpload;
