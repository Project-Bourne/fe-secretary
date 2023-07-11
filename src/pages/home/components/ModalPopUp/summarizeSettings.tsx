import React from 'react';
import Image from 'next/image';
import Button  from '@/components/ui/Button';

function summarizeSettings() {
  return (
    <div>
       <div className="my-5">
            <h1 className="text-3xl font-bold ml-5 text-black">Summary Settings</h1>
            <div className="flex gap-5 mt-5 mx-5 items-center">
              <small className="text-sm text-gray-500  mb-5">Title:</small>
              <p className="text-1xl font-sm">
                Redesigned Naira: CBN launches Cash Swap Programme for rural
                Development
              </p>
            </div>
            <div className="p-4 cursor-pointer flex w-[100%] align-middle justify-center bg-[#4582C4]  border-2 text-white rounded-[15px] font-extrabold">
              <span className="ml-3">
                Summarize content
              </span>
            </div>
          </div>
    </div>
  );
}

export default summarizeSettings;
