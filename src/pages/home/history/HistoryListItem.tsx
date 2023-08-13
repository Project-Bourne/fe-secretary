import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useTruncate } from '@/components/custom-hooks';
import Image from 'next/image';
import ListItemModels from '../../../utils/model/home.models';
import { setSummaryLength, setToggleArchive } from '@/redux/reducer/summarySlice';
import { useDispatch } from 'react-redux';

function ListItem({
  uuid,
  title,
  summary,
  time,
  actionButtons,
  isArchived, // Accept the isArchived prop
  viewDeleteButtons,
  buttonType
}: ListItemModels) {

  const [showaction, setShowAction] = useState(0);
  const router = useRouter()
  const dispatch = useDispatch();

  const handleHover = () => {
    setShowAction(1);
  };

  const handleHoverOut = () => {
    setShowAction(0);
  };

  const handleItemClick = () => {
    dispatch(setSummaryLength('5'))
    router.push(`/home/${uuid}`);

    
  };

  const handleArchive = e => {
    e.stopPropagation();
   dispatch(setToggleArchive())

  };

  const handleDelete = e => {
    e.stopPropagation();
    console.log('delete clicked', uuid);
  };

  // Access the first and last summary objects
  const firstSummary = summary[0].summary;
  const lastSummary = summary[summary.length - 1].summary;

  const truncatedSummary = useTruncate(lastSummary, 18); // Truncate the last summary text
  const truncatedFirstSummary = useTruncate(firstSummary, 50); // Truncate the first summary text
  const truncateTime = useTruncate(time, 10); // Truncate the time

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
          src={isArchived ? require(`../../../assets/icons/on.saved.svg`): require(`../../../assets/icons/saved.svg`)}
          alt="documents"
          className="cursor-pointer w-4 h-4"
          width={10}
          height={10}
          onClick={handleArchive}
        />
        {/* name */}
        <p className="text-sirp-black-500 ml-2 md:w-[12rem] hover:text-gray-400">
          {useTruncate(title, 20)}
        </p>
      </div>
      {/* decsription */}
      <div className="hover:text-gray-400 hidden md:block">
        <p className="text-black-100 w-[23rem]">{truncatedFirstSummary}</p>
      </div>
      {/* message */}
      {showaction === 0 ? (
        <div className="md:w-[15%] hidden md:block">
          <p className="text-gray-400 border-l-2 pl-2 ">{truncatedSummary}</p>
        </div>
      ) : null}
      {/* time */}
      {showaction === 0 ? (
        <div className="flex w-[6.5rem] mr-[3rem] md:mr-[5rem]">
          <p>{truncateTime}</p>
        </div>
      ) : (
        <div className="flex w-[6.5rem] mr-[3rem] md:mr-[5rem]">
          <p>{truncateTime}</p>
        </div>
      )}
      {/* overflow buttons */}
      {showaction === 1 && (
        <div className="border-l-2" onClick={handleDelete}>
          {actionButtons}
        </div>
      )}
    </div>
  );
}

export default ListItem;
