import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import HomeService from "@/services/home.service";
import {
  setSummaryContentType,
  setSummarizeSetting,
  setShowLoader,
  setSummaryTitle,
  setSummaryContent,
} from "@/redux/reducer/summarySlice";
import { useTruncate } from "@/components/custom-hooks";
import NotificationService from "@/services/notification.service";

function SummarizeCopyPasteSetting() {
  const { copyText, summaryContentType } = useSelector(
    (store: any) => store.summary
  );
  const dispatch = useDispatch();
  const homeService = new HomeService();
  const [customSummaryLength, setCustomSummaryLength] = useState(""); // State for custom input

  const handleContentTypeChange = (e) => {
    const newContentType = e.target.value;
    dispatch(setSummaryContentType(newContentType));
  };

  const handleCustomLengthChange = (e) => {
    const newValue = e.target.value;
    if (newValue >= 0) {
      setCustomSummaryLength(newValue);
    }
  };

  const handleCopyText = async (event) => {
    event.preventDefault();
    dispatch(setShowLoader(true));
    dispatch(setSummarizeSetting(false));

    const summaryNumber = `${customSummaryLength} ${summaryContentType}`;

    try {
      const dataObj = {
        text: copyText,
        number: summaryNumber, // Use the custom input
      };

      const response = await homeService.summarizeText(dataObj);

      if (response.status) {
        const { title, summaryArray } = response.data;
        dispatch(setSummaryTitle(title));
        dispatch(setSummaryContent(summaryArray[0]?.summary));
        dispatch(setShowLoader(false));
      } else {
        NotificationService.error({
          message: "Error!",
          addedText: <p>Something happened. Please try again.</p>,
          position: "top-right",
        });
        dispatch(setShowLoader(false));
      }
    } catch (error) {
      console.log(error);
      NotificationService.error({
        message: "Error!",
        addedText: <p>Error. Please try again</p>,
        position: "top-right",
      });
      dispatch(setShowLoader(false));
    }
  };

  const closeModal = () => {
    dispatch(setShowLoader(false));
  };

  return (
    <div>
      <div className="my-5">
        <h1 className="text-3xl font-bold ml-5 text-black">Summary Settings</h1>
        <div className="flex gap-5 mt-5 mx-5 items-center">
          <small className="text-sm text-gray-500 mb-5">Title:</small>
          <p className="text-[14px] font-sm pb-[1.4rem]">
            {useTruncate(copyText, 35)}
          </p>
        </div>
        <form onSubmit={handleCopyText} className="flex flex-col mx-5">
          <label htmlFor="content-type" className="text-sm text-gray-500">
            Content Type
          </label>
          <select
            name="content-type"
            id="content-type"
            onChange={handleContentTypeChange}
            className="border p-2 my-3 rounded-[.3rem]"
            value={summaryContentType}
          >
            <option value="sentence">Sentence(s)</option>
            <option value="paragraph">Paragraph(s)</option>
          </select>
          <label htmlFor="custom-length" className="text-sm text-gray-500">
            Length
          </label>
          <input
            type="number"
            id="custom-length"
            value={customSummaryLength}
            onChange={handleCustomLengthChange}
            className="border p-2 my-3 rounded-[.3rem]"
            placeholder="Enter custom length"
          />

          <div>
            <button className="p-4 cursor-pointer flex w-[100%] align-middle justify-center bg-sirp-primary text-white rounded-[1rem] text-[15px]">
              Summarize Content
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SummarizeCopyPasteSetting;
