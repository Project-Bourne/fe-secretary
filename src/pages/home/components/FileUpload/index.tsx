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
            <section className="flex justify-end wi-full mr-[2rem] mb-[1rem]">
              <span className="font-normal text-[#383E42]">
                <input
                  id="file-upload"
                  type="file"
                  accept=".txt,.doc,.docx,.pdf"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <label
                  className="text-blue-400 cursor-pointer"
                  htmlFor="file-upload"
                >
                  <div className="border px-5 py-5 rounded-[1rem] bg-sirp-primary text-white">
                    Upload File
                  </div>
                </label>
              </span>
            </section>
          ) : (
            <section className="flex justify-end wi-full mr-[2rem] mb-[1rem]">
              <span className="font-normal text-[#383E42]">
                <label
                  className="text-blue-400 cursor-pointer"
                  htmlFor="file-upload"
                >
                  <div
                    onClick={handleTextSummarySubmit}
                    className="border px-5 py-5 rounded-[1rem] bg-sirp-primary text-white"
                  >
                    Summarize
                  </div>
                </label>
              </span>
            </section>
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
        ""
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
