import React from "react";
import ActionIcons from "../actionIcons/ActionIcon";
import { useSelector } from "react-redux";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useRouter } from "next/router";
import { Tooltip } from "@mui/material";
import ReactMarkdown from 'react-markdown';

/**
 * HomeContent component displays the summary content with markdown formatting
 * @returns {JSX.Element} Rendered component
 */
function HomeContent() {
  const router = useRouter();
  const { summaryContent, summaryTitle, summaryId } = useSelector(
    (store: any) => store.summary
  );
  return (
    <div className="bg-sirp-secondary2 h-[100%] mx-5 rounded-[1rem]">
      <div className="flex flex-row justify-between items-center w-full pl-5 py-4">
        <div>
          {" "}
        </div>
        {/* <Tooltip title="Back" placement="top">
          <KeyboardBackspaceIcon onClick={() => router.back()} />
        </Tooltip> */}
        <ActionIcons docId={summaryId} />
      </div>
      <div className="bg-white border my-10 mx-5 rounded-[1rem]">
        <div className="pl-5 my-5">
          <p className="text-md text-gray-500">Title</p>
          <h1 className="md:text-3xl whitespace-nowrap overflow-hidden overflow-ellipsis">
            {summaryTitle || "No available title"}
          </h1>
        </div>
      </div>
      <div className="my-10 mx-5">
        <div className="text-justify pr-10">
          <p className="text-md text-gray-500 py-">Result</p>
          {summaryContent ? (
            <div className="py-1 text-[1rem] leading-8 mb-1 prose max-w-none">
              {/* <ReactMarkdown>{summaryContent}</ReactMarkdown> */}
              <ReactMarkdown
                // className="first-letter:capitalize text-justify leading-6 text-[1rem] mb-10"
                components={{
                  p: ({ children }) => <p className="mb-4">{children}</p>,
                }}
              >
                {summaryContent}
              </ReactMarkdown>
            </div>
          ) : (
            <p className="py-20 text-center font-bold text-[1.5rem]">
              No available summary
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeContent;
