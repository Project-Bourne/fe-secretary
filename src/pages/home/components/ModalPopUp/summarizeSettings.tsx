import React, { useState } from 'react';
import { useRouter } from 'next/router';
import HomeService from '@/services/home.service';
import { setSummaryLength } from '@/redux/reducer/summarySlice';
import { useSelector, useDispatch } from 'react-redux';
import LoadingModal from '../FileUpload/LoadingModal';

function SummarizeSettings({ file }) {
  const { summaryLength } = useSelector((state: any) => state.summary);
  const dispatch = useDispatch();
  const [selectedLength, setSelectedLength] = useState('1');
  const [selectedContentType, setSelectedContentType] = useState('sentence');
  const [isLoading, setIsLoading] = useState(false); // New state for loading
  const homeService = new HomeService();
  const route = useRouter(); // Add this line to get access to the router
  const selelectedFile = file;

  const handlePDFSumit = async event => {
    event.preventDefault();
    try {
      setIsLoading(true); // Set loading to true before API call
      dispatch(setSummaryLength(selectedLength));
      const dataObj = {
        pdf: selelectedFile,
        numberOfSentence: selectedLength,
        contentType: selectedContentType
      };
      const response = await homeService.summarizePDF(dataObj);
      setIsLoading(false); // Set loading back to false after API call
      route.push(`/home/${response.data.uuid}`);
    } catch (error) {
      setIsLoading(false); // Set loading back to false if there's an error
      console.error(error);
    }
  };
  // console.log(summaryLength, 'summaryLength');

  return (
    <div>
      <div className="my-5">
        <h1 className="text-3xl font-bold ml-5 text-black">Summary Settings</h1>
        <div className="flex gap-5 mt-5 mx-5 items-center">
          <small className="text-sm text-gray-500  mb-5">Title:</small>
          <p className="text-[14px] font-sm pb-[1.4rem]">{file.name}</p>
        </div>
        <form onSubmit={handlePDFSumit} className="flex flex-col mx-5">
          <label htmlFor="length" className="text-sm text-gray-500">
            Length
          </label>
          <select
            name="cars"
            id="cars"
            className="border p-2 my-3 rounded-[.3rem]"
            onChange={e => setSelectedLength(e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <label htmlFor="length" className="text-sm text-gray-500">
            Content Type
          </label>
          <select
            name="cars"
            id="cars"
            onChange={e => setSelectedContentType(e.target.value)}
            className="border p-2 my-3 rounded-[.3rem]"
          >
            <option value="sentence">Sentence(s)</option>
            <option value="paragraph">Paragraph(s)</option>
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

export default SummarizeSettings;
