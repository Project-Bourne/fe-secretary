import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ActionIcons from "./components/actionIcons/ActionIcon";
import HomeService from "@/services/home.service";
import NotificationService from "@/services/notification.service";
import Loader from "../history/history/Loader";
import CustomModal from "@/components/ui/CustomModal";

function HomeContent() {
  const [summaryContent, setSummaryContent] = useState("");
  const [summaryTitle, setSummaryTitle] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const router = useRouter();
  const { incoming } = router.query;

  useEffect(() => {
    const getSummaryText = async () => {
      console.log("id", incoming);

      setLoading(true); // Set loading state to true
      if (incoming) {
        try {
          const request = await HomeService.getSummaryText(incoming);
          if (request.status) {
            const { title, summaryArray } = request.data;
            setSummaryTitle(title);
            setSummaryContent(summaryArray[0]?.summary);
            setLoading(false); // Update loading state regardless of success or error
          } else {
            console.error(request.message);
            NotificationService.error({
              message: "Error!",
              addedText: <p>{request.message}. Please try again.</p>,
            });
          }
        } catch (error) {
          console.error(error);
          NotificationService.error({
            message: "Error!",
            addedText: <p>Something went wrong. Please try again.</p>,
          });
        } finally {
          setLoading(false); // Update loading state regardless of success or error
        }
      }
    };
    getSummaryText();
  }, [incoming]);

  //   if (loading) {
  //     return <div>Loading...</div>; // Add loading indicator
  //   }

  return (
    <div className="bg-sirp-secondary2 h-[100%] mx-5 rounded-[1rem]">
      <div className="flex justify-end w-full pr-5 pt-5 ">
        <ActionIcons />
      </div>
      <div className="bg-white border my-10 mx-5 rounded-[1rem]">
        <div className="pl-5 my-5">
          <p className="text-md text-gray-500">Title</p>
          <h1 className="md:text-3xl whitespace-nowrap overflow-hidden overflow-ellipsis">
            {summaryTitle || "No available title"}{" "}
            {/* Provide a default title */}
          </h1>
        </div>
      </div>
      <div className="my-10 mx-5">
        <div className="text-justify pr-10">
          <p className="py-5 text-[14px] mb-10">
            <p className="text-md text-gray-500 py-">Content</p>
            {summaryContent ? (
              summaryContent.split("\n").map((paragraph, index) => (
                <p key={index} className="py-1 text-[1rem] leading-8 mb-1">
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="py-20 text-center font-bold text-[1.5rem]">
                No available summary.
              </p>
            )}
          </p>
        </div>
      </div>
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
    </div>
  );
}

export default HomeContent;
