import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import FileUploadSection from "./FileUploadSection";
import {
  setCopyText,
  setShowLoader,
  setFileUpLoadName,
  setSummarizeSetting,
  setuploadedText,
  setuploloadedUri,
} from "@/redux/reducer/summarySlice";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import LoadingModal from "./LoadingModal";
import SummarizeCopyPasteSetting from "../ModalPopUp/summarizeCopyPasteSetting";
import CustomModal from "@/components/ui/CustomModal";
import NotificationService from "@/services/notification.service";
import HomeContent from "./[homecontent]";
import { Tooltip } from "@mui/material";

function FileUpload() {
  const { summarizeSetting, copyText, showLoader, summaryTitle } = useSelector(
    (store: any) => store.summary
  );
  const { userInfo } = useSelector((state: any) => state?.auth);
  const fullName = `${userInfo?.firstName} ${userInfo?.lastName}`;
  const userId = userInfo?.uuid


  const dispatch = useDispatch();
  const [formData, setFormData] = useState("");
  const [file, setFile] = useState(null);
  const [uploadDisabled, setUploadDisabled] = useState(true);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  // function to set text
  const handleTextareaChange = (e) => {
    setFormData(e.target.value);
    // Automatically adjust the textarea's height
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  //function to cleare text
  const handleClearTextarea = () => {
    setFormData("");
  };

  const handleTextSummarySubmit = (event) => {
    event.preventDefault();
    const cleanedFormData = formData.trim();
    const minLength = 50; // Change this to your desired minimum length

    if (cleanedFormData.length >= minLength) {
      dispatch(setCopyText(cleanedFormData));
      dispatch(setSummarizeSetting(true));
    } else {
      NotificationService.error({
        message: "Error!",
        addedText: <p>Text is too short. Minimum length requirement 50</p>, // Add a closing </p> tag
        position: "top-center",
      });
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
      formData?.append("files", selectedFile);
      formData?.append("userId", userId);
      formData?.append("userName", fullName);
      console?.log(formData);

      try {
        const response = await fetch(
          "http://192.81.213.226:81/89/api/v1/uploads",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.status) {
          const responseData = await response.json();
          dispatch(setuploadedText(responseData.data[0].text));
          dispatch(setuploloadedUri(responseData.data[0].uri));
          setUploadDisabled(false);
          NotificationService.success({
            message: "Success!",
            addedText: <p>File uploaded successfully</p>,
            position: "top-center",
          });
        } else {
          NotificationService.error({
            message: "Error!",
            addedText: <p>something happend. please try again</p>,
            position: "bottom-right",
          });
        }
      } catch (error: any) {
        NotificationService.error({
          message: "Error!",
          addedText: <p>{`${error?.message}, please try again`}</p>,
          position: "top-center",
        });
      }
    }
  };
  return (
    <div className="m-5">
      {isFileUploaded ? (
        <FileUploadSection
          file={file}
          handleDeleteFile={handleDeleteFile}
          uploadDisabled={uploadDisabled}
        />
      ) : (
        <div>
          {formData?.length == 0 ? (
            <div className="flex items-center pb-[2rem] w-[100%] justify-end pr-[3rem]">
              <span className="text-grey-400 mr-2 text-sm text-sirp-primary">
                {file?.name}
              </span>
              <label
                htmlFor="file-input"
                className="px-4 py-1 rounded-lg"
                style={{
                  cursor: "pointer",
                  color: "#4582C4",
                  backgroundColor: "white",
                  border: "1px solid #4582C4",
                }}
              >
                <DriveFolderUploadIcon
                  style={{ color: "#4582C4", cursor: "pointer" }}
                />
                Upload File
              </label>

              <input
                type="file"
                id="file-input"
                style={{ display: "none" }}
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileUpload}
                onClick={() => {
                  setUploadDisabled(true);
                }}
              />
            </div>
          ) : (
            <div
              className="flex items-center pb-[2rem] w-[100%] justify-end pr-[3rem]"
              onClick={handleTextSummarySubmit}
            >
              <label
                htmlFor="file-input"
                className="px-4 py-1 rounded-lg"
                style={{
                  cursor: "pointer",
                  color: "#4582C4",
                  backgroundColor: "white",
                  border: "1px solid #4582C4",
                }}
              >
                Summarize
              </label>
            </div>
          )}
          <form onSubmit={handleTextSummarySubmit}>
            {/* Text Summary Form */}
            <div className="flex align-middle w-full border-2 rounded-[1rem] border-[#E5E7EB]-500 border-dotted">
              {/* Input */}
              <span className="flex align-middle justify-center mx-3">
                <Image
                  src={require("../../../../../public/icons/link.svg")}
                  alt="upload image"
                  width={20}
                  height={20}
                  priority
                />
              </span>
              <textarea
                placeholder="Copy and paste content text here"
                className={`w-[95%] outline-none text-justify focus:ring-0 pt-[0.5rem] my-[2rem] resize-y min-h-[2rem] max-h-[15rem] overflow-auto`}
                value={formData}
                onChange={handleTextareaChange}
              />
              <span className="flex align-middle justify-center mx-3">
                <Tooltip title="Clear TextArea">
                  <Image
                    className="flex align-middle justify-center font-light text-[#A1ADB5] cursor-pointer"
                    src={require("../../../../../public/icons/x.svg")}
                    alt="upload image"
                    width={20}
                    height={20}
                    onClick={handleClearTextarea}
                  />
                </Tooltip>
              </span>
            </div>
          </form>
        </div>
      )}

      {summaryTitle?.length == 0 ? (
        <main className="flex items-center justify-center flex-col gap-4 mt-[5rem]">
          <div className="flex items-center justify-centery w-[50%] font-bold flex-col p-3 rounded-[1rem] gap-3 text-xl ">
            <span>
              {" "}
              <Image
                src={require(`../../../../../public/icons/no_history.svg`)}
                alt="upload image"
                width={150}
                height={150}
                priority
              />
            </span>
            <h1 className="font-[700] text-2xl">No Summary yet</h1>
            <span className="text-gray-400">
              Your recent Summary will appear here
            </span>
          </div>
        </main>
      ) : (
        <div className="mt-5">
          <HomeContent />
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
