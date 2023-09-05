import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Min_and_Max_icon from "./components/Min_Max_icon";
import ActionIcons from "./components/actionIcons/ActionIcon";

import { useDispatch, useSelector } from "react-redux";

function HomeContent() {
  const [hideMeta, setHideMeta] = useState(true);
  const { summaryContent, summaryTitle } = useSelector(
    (store: any) => store.summary
  );

  const handleMax = () => {
    setHideMeta(true);
  };

  const handleMin = () => {
    setHideMeta(false);
  };

  return (
    <div className="bg-sirp-secondary2 h-[100%] mx-5 rounded-[1rem]">
      <div className="flex justify-end w-full pr-5 pt-5 ">
        <ActionIcons />
      </div>
      <div className="bg-white border my-10 mx-10 rounded-[1rem]">
        <Min_and_Max_icon maxOnClick={handleMax} minOnClick={handleMin} />
        {hideMeta ? (
          <div className="pl-5 my-5">
            <p className="text-md text-gray-500">Title</p>
            <h1 className="md:text-3xl whitespace-nowrap overflow-hidden overflow-ellipsis">
              {summaryTitle || <h1> No available title</h1>}
            </h1>
          </div>
        ) : (
          <h1 className="md:text-lg font-bold pl-5 pb-2">
            {summaryTitle || <h1> No available title</h1>}
          </h1>
        )}
      </div>
      <div className="my-10 mx-5">
        <div className="text-justify pr-10">
          <p className="py-5 text-[14px] mb-10">
            <p className="text-md text-gray-500 py-5">Content</p>
            {summaryContent ? (
              summaryContent.split("\n").map((paragraph, index) => (
                <p key={index} className="py-1 text-[1rem] leading-8 mb-10">
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="py-20 text-center font-bold text-[1.5rem]">
                No available summary
              </p>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomeContent;
