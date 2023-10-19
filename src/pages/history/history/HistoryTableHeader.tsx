import React from 'react';

function HistoryTableHeader() {
  return (
    <div className="flex items-center md:justify-start justify-between bg-gray-200 w-full p-2 rounded-t-lg">
      <div className="md:pl-9 md:pr-[7rem]">
        <p className="font-bold">Summary Title</p>
      </div>
      <div className="hidden md:block md:pr-[18.6rem] ">
        <p className="font-bold">Summary Snippet</p>
      </div>
      <div className="">
        <p className="font-bold hidden md:block  md:pr-[3rem]">Summary Content</p>
      </div>
      <div className="">
        <p className="font-bold mr-[5rem] md:mr-0">Time Stamp</p>
      </div>
      {/* <div className="border-l-2"></div> */}
    </div>
  );
}

export default HistoryTableHeader;
