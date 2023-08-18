import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useTruncate } from '@/components/custom-hooks';
import Image from 'next/image';
import ListItemModels from '../../../utils/model/home.models';
import {
  setSummaryLength,
} from '@/redux/reducer/summarySlice';
import { useDispatch } from 'react-redux';
import { DateTime } from 'luxon';
import HomeService from '@/services/home.service';

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


  //hover effect in
  const handleHover = () => {
    setShowAction(1);
  };

  //hover effect out
  const handleHoverOut = () => {
    setShowAction(0);
  };

  //handle item click to open the summary from history
  const handleItemClick = () => {
    dispatch(setSummaryLength('5'));
    router.push(`/home/${summaryUuid}`);
  };

  //handle bookmark
  const handleBookMark = (e, uuid) => {
    e.stopPropagation();
    try {
      const request = HomeService.bookMarkSummary(uuid);
      console.log(request, 'request', uuid);
      window.location.reload();
    } catch (error) {
      console.error('Error archiving summary:', error);
    }
  };


  //handle delete
  const handleDelete = async (e, uuid) => {
    e.stopPropagation();
    try {
      const request = await HomeService.deleteSummary(uuid);
      console.log(request, 'request', uuid);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting summary:', error);
    }
  };

  // Parse the JSON string into an array of objects
  const parsedSummary = JSON.parse(summary);

  // Access the first summary
  const firstSummary = parsedSummary[0].summary;
  const lastSummary = parsedSummary[parsedSummary.length - 1].summary;

  // Truncate the summary
  const truncatedSummary = useTruncate(firstSummary, 18);
  const truncatedFirstSummary = useTruncate(lastSummary, 45);

  // Format the date
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Get user's time zone
  const parsedDate = DateTime.fromISO(time, { zone: userTimeZone }); // Convert UTC date to user's local time zone
  const formattedDate = parsedDate.toFormat('yyyy-MM-dd HH:mm'); // Format the parsed date

  return (
    <div
      onClick={handleItemClick}
      onMouseOut={handleHoverOut}
      onMouseOver={handleHover}
      className={
        'text-[14px] flex items-center hover:text-gray-400 hover:bg-sirp-primaryLess2 p-2 cursor-pointer rounded-lg hover:rounded-none hover:shadow justify-between'
      }
    >
      <div className="flex gap-3 items-center  hover:text-gray-400">
        {/* Save icon */}
        <Image
          src={require(`../../../assets/icons/on.saved.svg`)}
          alt="documents"
          className="cursor-pointer w-4 h-4"
          width={10}
          height={10}
          onClick={(e) => handleBookMark(e, uuid)}
        />
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
        <div className="border-l-2" onClick={e => handleDelete(e, uuid)}>
          {actionButtons}
        </div>
      )}
    </div>
  );
}

export default ListItem;
