import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import HomeService from '@/services/home.service';
import {
  setSummaryLength,
  setSummaryContentType,
  setSummaryLengthRange
} from '@/redux/reducer/summarySlice';
import { useTruncate } from '@/components/custom-hooks';
import LoadingModal from '../FileUpload/LoadingModal';

function SummarizeCopyPasteSetting() {
  const { summaryLength, summaryContentType, copyText, summaryLengthRange } = useSelector(
    (store:any) => store.summary
  );
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const homeService = new HomeService();
  const route = useRouter();

  const handleContentTypeChange = (e) => {
    const newContentType = e.target.value;
    dispatch(setSummaryContentType(newContentType));

    let newSummaryLength;
    let newSummaryLengthRange;

    if (newContentType === 'paragraph') {
      newSummaryLength = '3';
      newSummaryLengthRange = ['1', '2', '3'];
    } else if (newContentType === 'sentence') {
      newSummaryLength = '5';
      newSummaryLengthRange = ['1', '2', '3', '4', '5'];
    }

    dispatch(setSummaryLength(newSummaryLength));
    setSummaryLengthRange(newSummaryLengthRange); // Assuming you have a state for length range
  };

  const handleCopyText = async (event) => {
    event.preventDefault();
    try {
      setShowLoader(true);
      setIsLoading(true);
      const dataObj = {
        text: copyText,
        index: summaryLength
      };
      const response = await homeService.summarizeText(dataObj);
      setTimeout(() => {
        setShowLoader(false);
        route.push(`/home/${response.data.uuid}`);
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const closeModal = () => {
    setShowLoader(false);
  };

  return (
    <div>
      {showLoader && (
        <LoadingModal closeModal={closeModal} formData={copyText} />
      )}

      <div className="my-5">
        <h1 className="text-3xl font-bold ml-5 text-black">Summary Settings</h1>
        <div className="flex gap-5 mt-5 mx-5 items-center">
          <small className="text-sm text-gray-500  mb-5">Title:</small>
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
            value={summaryContentType}
            onChange={handleContentTypeChange}
            className="border p-2 my-3 rounded-[.3rem]"
          >
            <option value="sentence">Sentence(s)</option>
            <option value="paragraph">Paragraph(s)</option>
          </select>
          <label htmlFor="length" className="text-sm text-gray-500">
            Length
          </label>
          <select
            name="length"
            id="length"
            value={summaryLength}
            className="border p-2 my-3 rounded-[.3rem]"
            onChange={(e) => dispatch(setSummaryLength(e.target.value))}
          >
            {summaryLengthRange?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <div>
            <button className="p-4 cursor-pointer flex w-[100%] align-middle justify-center bg-sirp-primary  text-white rounded-[1rem] text-[15px]">
              Summarize Content
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SummarizeCopyPasteSetting;
