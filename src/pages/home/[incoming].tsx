import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import FileUploadSection from "./components/FileUpload/FileUploadSection";
import {
  setCopyText,
  setShowLoader,
  setFileUpLoadName,
  setSummarizeSetting,
  setuploadedText,
  setuploloadedUri,
} from "@/redux/reducer/summarySlice";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import LoadingModal from "./components/FileUpload/LoadingModal";
import SummarizeCopyPasteSetting from "./components/ModalPopUp/summarizeCopyPasteSetting";
import TextareaAutosize from "react-textarea-autosize";

import NotificationService from "@/services/notification.service";
import HomeContent from "./components/FileUpload/[homecontent]";
import { Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import { Cookies } from "react-cookie";
import Loader from "../history/history/Loader";
import CustomModal from "@/components/ui/CustomModal";
import { setUserInfo } from "@/redux/reducer/authReducer";
import Auth from "../../services/auth.service";

function FileUpload() {
  const { summarizeSetting, copyText, showLoader } = useSelector(
    (store: any) => store.summary
  );
  const { summaryTitle } = useSelector((store: any) => store.summary);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState("");
  const [file, setFile] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadDisabled, setUploadDisabled] = useState(true);
  const router = useRouter();
  const { incoming } = router.query;
  const cookies = new Cookies();
  const token = cookies.get("deep-access");
  const headers = {
    "deep-token": token,
  };

  useEffect(() => {
    setLoading(true);
    Auth.getUserViaAccessToken()
      .then((response) => {
        setLoading(false);
        if (response.status) {
          dispatch(setUserInfo(response.data));
        }
      })
      .catch((err) => {
        setLoading(false);
        NotificationService.error({
          message: "Error!",
          addedText: <p>Access forbidden. Redirecting to login page.</p>,
          position: "top-center",
        });
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (typeof incoming === "string") {
        try {
          const [routeId, routeName] = incoming.split("&");
          let url;
          switch (routeName) {
            case "summarizer":
              url = `http://192.81.213.226:81/82/summary/${routeId}`;
              break;
            case "translator":
              url = `http://192.81.213.226:81/83/translation/${routeId}`;
              break;
            case "irp":
              url = `http://192.81.213.226:81/84/fact/${routeId}`;
              break;
            case "factcheck":
              url = `http://192.81.213.226:81/84/fact/${routeId}`;
              break;
            case "deepchat":
              url = `http://192.81.213.226:81/85/deepchat/${routeId}`;
              break;
            case "analyser":
              url = `http://192.81.213.226:81/81/analysis/${routeId}`;
              break;
            case "interrogator":
              url = `http://192.81.213.226:81/87/interrogation/message/${routeId}`;
              break;
            case "collab":
              url = `http://192.81.213.226:81/86/api/v1/doc/${routeId}`;
              break;
            default:
              throw new Error("Invalid routeName");
          }

          const response = await fetch(url, {
            method: "GET",
            headers: headers,
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          if (response.status === 403) {
            console.error("403 Forbidden: Redirecting to the login page");
            // Redirect to the login page
            window.location.href = "http://192.81.213.226:30/auth/login";
            throw new Error("Access forbidden. Redirecting to login page.");
          }

          const data = await response?.json();
          
          switch (routeName) {
            case "translator":
              setFormData(data?.data?.textTranslation);
              break;
            case "factcheck":
              setFormData(data?.data?.confidence?.content5wh);
              break;
            case "irp":
              setFormData(data?.data?.confidence?.content5wh);
              break;
            case "analyser":
              setFormData(data?.data?.text);
              break;
            case "collab":
              const collabData: string[] = data?.data?.data?.ops.map((el) => {
                return el.insert;
              });
              setFormData(collabData?.join(" "));
              break;
            case "interrogator":
              setFormData(data?.data?.answer);
            case "deepchat":
              break;
            default:
              break;
          }
          setLoading(false);
        } catch (error: any) {
          NotificationService?.error({
            message: "Error!",
            addedText: <p>{`${error.message}, please try again`}</p>,
            position: "top-center",
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [incoming]);

  //function to cleare text
  const handleClearTextarea = () => {
    setFormData("");
  };

  const handleTextSummarySubmit = (event) => {
    event?.preventDefault();
    const cleanedFormData = formData.trim();
    const minLength = 50; // Change this to your desired minimum length

    if (cleanedFormData.length >= minLength) {
      dispatch(setCopyText(cleanedFormData));
      dispatch(setSummarizeSetting(true));
      setFormData("");
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
      formData.append("files", selectedFile);
      console.log(formData);

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
      {loading && (
        <CustomModal
          style="md:w-[30%] w-[90%] relative top-[20%] rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={() => setLoading(false)}
        >
          <div className="flex justify-center items-center mt-[10rem]">
            <Loader />
          </div>
        </CustomModal>
      )}
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
                  src={require("../../../public/icons/link.svg")}
                  alt="upload image"
                  width={20}
                  height={20}
                  priority
                />
              </span>
              <TextareaAutosize
                minRows={1}
                placeholder="Copy and paste content text here"
                onChange={(e) => setFormData(e.target.value)}
                className={`w-[95%] p-5 text-justify`}
                value={formData}
                maxRows={20}
                style={{ border: "none", outline: "none" }} // Add this inline style
              />
              <span className="flex align-middle justify-center mx-3">
                <Tooltip title="Clear TextArea">
                  <Image
                    className="flex align-middle justify-center font-light text-[#A1ADB5] cursor-pointer"
                    src={require("../../../public/icons/x.svg")}
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
                src={require(`../../../public/icons/no_history.svg`)}
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
