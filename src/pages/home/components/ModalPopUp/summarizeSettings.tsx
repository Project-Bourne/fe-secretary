import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HomeService from '@/services/home.service';
import {
  setSummaryContentType,

  setSummarizeSettingUpload,
  setShowLoaderUpload,
  setSummaryTitle,
  setSummaryContent,
} from '@/redux/reducer/summarySlice';
import { useTruncate } from '@/components/custom-hooks';
import { useRouter } from 'next/router';
import NotificationService from '@/services/notification.service';

function SummarizeCopyPasteSetting() {
  const {
    summaryContentType,
    fileName,
    uploloadedUri,
    uploadedText,
  } = useSelector((store:any) => store.summary);

  const dispatch = useDispatch();
  const homeService = new HomeService();
  const [customSummaryLength, setCustomSummaryLength] = useState('');

  const handleContentTypeChange = ({ target: { value: newContentType } }) => {
    dispatch(setSummaryContentType(newContentType));
  };

  const handleCustomLengthChange = (e) => {
    const newValue = e.target.value;
    if (newValue >= 0) {
      setCustomSummaryLength(newValue);
    }
  };

  const handleDocumentSummary = async (event) => {
    event.preventDefault();
    dispatch(setShowLoaderUpload(true));
    dispatch(setSummarizeSettingUpload(false));

    const summaryNumber = `${customSummaryLength} ${summaryContentType}`;
    console.log(summaryNumber);

    try {
      const uploadData = {
        text: uploadedText,
        uri: uploloadedUri,
        number: summaryNumber,
      };
      const response = await homeService.summarizeUpload(uploadData);
      if (response.status) {
        const { title, summaryArray } = response.data;
        dispatch(setSummaryTitle(title));
        dispatch(setSummaryContent(summaryArray[0]?.summary));
        dispatch(setShowLoaderUpload(false));
      } else {
        NotificationService.error({
          message: 'Error!',
          addedText: <p>Something happened. Please try again</p>,
          position: 'top-right',
        });
        dispatch(setShowLoaderUpload(false));
      }
    } catch (error) {
      NotificationService.error({
        message: 'Error!',
        addedText: <p>Something happened. Please try again</p>,
        position: 'top-right',
      });
      dispatch(setShowLoaderUpload(false));
    }
  };

  return (
    <div>
      <div className="my-5">
        <h1 className="text-3xl font-bold ml-5 text-black">Summary Settings</h1>
        <div className="flex gap-5 mt-5 mx-5 items-center">
          <small className="text-sm text-gray-500 mb-5">Title:</small>
          <p className="text-[14px] font-sm pb-[1.4rem]">
            {useTruncate(fileName, 35)}
          </p>
        </div>
        <form onSubmit={handleDocumentSummary} className="flex flex-col mx-5">
          <label htmlFor="content-type" className="text-sm text-gray-500">
            Content Type
          </label>
          <select
            name="content-type"
            id="content-type"
            value={summaryContentType}
            onChange={handleContentTypeChange}
            className="border p-2 my-3 rounded-[.3rem]"
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
