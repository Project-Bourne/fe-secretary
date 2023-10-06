import React, { useState } from "react";
import { useRouter } from "next/router";
import { useTruncate } from "@/components/custom-hooks";
import Image from "next/image";
import ListItemModels from "../../../utils/model/home.models";
import {
  setShowLoader,
  setSummarizeSetting,
  setSummaryContent,
  setSummaryTitle,
  setSummaryId,
} from "@/redux/reducer/summarySlice";
import { useDispatch, useSelector } from "react-redux";
import { DateTime } from "luxon";
import HomeService from "@/services/home.service";
import { fetchData } from "@/hooks/FetchData";
import NotificationService from "@/services/notification.service";
import CustomModal from "@/components/ui/CustomModal";
import Loader from "../history/Loader";
import { Tooltip } from "@mui/material";


function ListItem({
  uuid,
  summaryUuid,
  title,
  summary,
  time,
  actionButtons,
}: ListItemModels) {
  const [showaction, setShowAction] = useState(0);
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  //hover effect in
  const handleHover = () => {
    setShowAction(1);
  };

  //hover effect out
  const handleHoverOut = () => {
    setShowAction(0);
  };

  const handleItemClick = async () => {
    dispatch(setShowLoader(false));
    dispatch(setSummarizeSetting(false));

    try {
      setLoading(true);
      const response = await HomeService.getSummaryText(summaryUuid);
      if (response.status) {
        const { title, summaryArray } = response.data;
        dispatch(setSummaryTitle(title));
        dispatch(setSummaryId(summaryUuid));
        dispatch(setSummaryContent(summaryArray[0]?.summary));
        setLoading(false);
      } else {
        setLoading(false);

        NotificationService.error({
          message: "Error!",
          addedText: <p>something happened. please try again</p>,
          position: "top-center",
        });
        dispatch(setSummaryTitle(""));
        dispatch(setSummaryContent(""));
      }
    } catch (err) {
      setLoading(false);
      NotificationService.error({
        message: "Error!",
        addedText: <p>something happened. please try again</p>,
        position: "top-center",
      });
    }

    router.push(`/history/${summaryUuid}`);
  };

  const handleBookMark = async (e, uuid) => {
    e.stopPropagation();
    HomeService.bookMarkSummary(uuid)
      .then((res: any) => {
        fetchData(dispatch); // Pass the fetch the updated data
      })
      .catch((err) => {
        NotificationService.error({
          message: "Error!",
          addedText: <p>{err?.message}. Please try again</p>, // Add a closing </p> tag
          position: "top-center",
        });
      });
  };

  const handleDelete = async (e, uuid) => {
    e.stopPropagation();
    HomeService.deleteSummary(uuid)
      .then((res: any) => {
        fetchData(dispatch); // Pass the fetch the updated data
        NotificationService.success({
          message: "success!",
          addedText: <p>{res?.message} History deleted</p>, // Add a closing </p> tag
          position: "top-center",
        });
      })
      .catch((err) => {
        NotificationService.error({
          message: "Error!",
          addedText: <p>{err?.message} Please try again</p>, // Add a closing </p> tag
          position: "top-center",
        });
      });
  };

  // Access the first summary
  const firstSummary = summary[0].summary;
  const lastSummary = summary[summary.length - 1].summary;

  // Truncate the summary
  const truncatedSummary = useTruncate(firstSummary, 18);
  const truncatedFirstSummary = useTruncate(lastSummary, 45);

  // Format the date
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Get user's time zone
  const parsedDate = DateTime.fromISO(time, { zone: userTimeZone }); // Convert UTC date to user's local time zone
  const formattedDate = parsedDate.toFormat("yyyy-MM-dd HH:mm"); // Format the parsed date

  return (
    <>
      <div
        onClick={handleItemClick}
        onMouseOut={handleHoverOut}
        onMouseOver={handleHover}
        className={
          "text-[14px] flex items-center hover:text-gray-400 hover:bg-sirp-primaryLess2 p-2 cursor-pointer rounded-lg hover:rounded-none hover:shadow justify-between"
        }
      >
        <div className="flex gap-3 items-center  hover:text-gray-400">
          {/* Save icon */}
        <Tooltip title="Remove from bookmark">
          <Image
            src={require(`../../../../public/icons/on.saved.svg`)}
            alt="documents"
            className="cursor-pointer w-4 h-4"
            width={10}
            height={10}
            onClick={(e) => handleBookMark(e, uuid)}
          />
        </Tooltip>
          {/* name */}
          <p className="text-sirp-black-500 ml-2 md:w-[12rem] hover:text-gray-400">
            {useTruncate(title, 20)}
          </p>
        </div>
        {/* description */}
        <div className="hover:text-gray-400 hidden md:block">
          <p className="text-black-100 w-[25rem]">{truncatedFirstSummary}</p>
        </div>
        {/* message */}
        {showaction === 0 ? (
          <div className="md:w-[15%] hidden md:block">
            <p className="text-gray-400 border-l-2 pl-2 ">{truncatedSummary}</p>
          </div>
        ) : null}
        {/* time */}
        <div className="flex w-[8rem] mr-[3rem] md:mr-[5rem]">
          <p>{formattedDate}</p>
        </div>
        {/* overflow buttons */}
        {showaction === 1 && (
          <div className="border-l-2" onClick={(e) => handleDelete(e, uuid)}>
            {actionButtons}
          </div>
        )}
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
    </>
  );
}

export default ListItem;
