import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Button from "@/components/ui/Button";
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
import HomeContent from "../../[homecontent]";
import { useRouter } from "next/router";

function FileUpload() {
  const { summarizeSetting, copyText, showLoader } = useSelector(
    (store: any) => store.summary
  );
  const router = useRouter();
  const { summaryTitle } = useSelector((store: any) => store.summary);

  const dispatch = useDispatch();
  const [formData, setFormData] = useState("");
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
      formData.append("files", selectedFile);

      try {
        const response = await fetch(
          "http://192.81.213.226:89/api/v1/uploads",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.status) {
          const responseData = await response.json();
          dispatch(setuploadedText(responseData.data[0].text));
          dispatch(setuploloadedUri(responseData.data[0].uri));
          NotificationService.success({
            message: "Success!",
            addedText: <p>File uploaded successfully</p>,
            position: "bottom-right",
          });
        } else {
          NotificationService.error({
            message: "Error!",
            addedText: <p>something happend. please try again</p>,
            position: "bottom-right",
          });
        }
      } catch (error) {
        NotificationService.error({
          message: "Error!",
          addedText: <p>something happend. please try again</p>,
          position: "bottom-right",
        });
      }
    }
  };

  return (
    <div className="m-5">
      {isFileUploaded ? (
        <FileUploadSection file={file} handleDeleteFile={handleDeleteFile} />
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
              />
            </div>
          ) : (
            <div className="flex items-center pb-[2rem] w-[100%] justify-end pr-[3rem]"
            onClick={handleTextSummarySubmit}>
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
            <div className="flex align-middle w-full border-2 rounded-full border-[#E5E7EB]-500 border-dotted">
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
                  src={require("../../../../../public/icons/x.svg")}
                  alt="upload image"
                  width={20}
                  height={20}
                  onClick={() => setFormData("")}
                />
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
