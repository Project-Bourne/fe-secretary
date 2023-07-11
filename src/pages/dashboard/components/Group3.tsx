import React from "react";
import Image from "next/image";

function Group3() {
  return (
    <div className="flex flex-row gap-5 ml-5 mr-5">
      <div className="border border-sirp-dashbordb1 rounded-[1.5rem] bg-sirp-secondary2 basis-1/3 h-[12rem] mt-5  pt-3">
        <div>
          <div className="flex flex-row items-center gap-3 pt-5">
            <div>
              <Image
                src={require("../../../assets/icons/Frame 011.svg")}
                alt="documents"
                className="pl-5 cursor-pointer"
                width={115}
              />
            </div>
            <div className="flex flex-col mr-2">
              <p className="font-bold">4000</p>
              <span className="font-light text-sirp-grey">
                Total documents fact checked
              </span>
            </div>
          </div>
        </div>
        <div className="ml-6 pt-8">
          <button className=" border border-sirp-dashboardcola w-[20rem] pb-2 pt-2 rounded-[1rem] hover:bg-sirp-dashboardcola hover:text-white text-sirp-dashboardcola font-bold">
          Open Fact checker
          </button>
        </div>
      </div>
      <div className="border border-sirp-dashbordb1 rounded-[1.5rem] bg-sirp-secondary2 basis-1/3 h-[12rem] mt-5  pt-3">
        <div>
          <div className="flex flex-row items-center gap-3 pt-5">
            <div>
              <Image
                src={require("../../../assets/icons/Frame 012.svg")}
                alt="documents"
                className="pl-5 cursor-pointer"
                width={115}
              />
            </div>
            <div className="flex flex-col mr-2">
              <p className="font-bold">4000</p>
              <span className="font-light text-sirp-grey">
              Total documents summarized
              </span>
            </div>
          </div>
        </div>
        <div className="ml-6 pt-8">
          <button className=" border border-sirp-dashboardcola w-[20rem] pb-2 pt-2 rounded-[1rem] hover:bg-sirp-dashboardcola hover:text-white text-sirp-dashboardcola font-bold">
          Open Summarizer
          </button>
        </div>
      </div>
      <div className="border border-sirp-dashbordb1 rounded-[1.5rem] bg-sirp-secondary2 basis-1/3 h-[12rem] mt-5  pt-3">
        <div>
          <div className="flex flex-row items-center gap-3 pt-5">
            <div>
              <Image
                src={require("../../../assets/icons/Frame 013.svg")}
                alt="documents"
                className="pl-10 cursor-pointer"
                width={130}
              />
            </div>
            <div>
              <p className="font-bold">4000</p>
              <span className="font-light text-sirp-grey">
                Total documents
              </span>
            </div>
          </div>
        </div>
        <div className="ml-6 pt-8 ">
        <button className=" border border-sirp-dashboardcola w-[20rem] pb-2 pt-2 rounded-[1rem] hover:bg-sirp-dashboardcola hover:text-white text-sirp-dashboardcola font-bold">
            Open Oracle
          </button>
        </div>
      </div>
    </div>
  );
}

export default Group3;
